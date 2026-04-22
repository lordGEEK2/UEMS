const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');
const { getRazorpay } = require('../config/razorpay');
const { notifyPaymentSuccess } = require('../services/notificationService');
const logger = require('../config/logger');

// @route   POST /api/payments/create-order
// @desc    Create a real Razorpay order
// @access  Private
router.post('/create-order', auth, async (req, res) => {
    try {
        const { type, referenceId, amount, description } = req.body;

        if (!type || !referenceId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Type, referenceId, and amount are required',
            });
        }

        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be greater than zero',
            });
        }

        const razorpay = getRazorpay();

        // Create payment record first
        const payment = new Payment({
            user: req.user._id,
            type,
            reference: {
                model: type === 'event_registration' ? 'Registration' : 'Event',
                id: referenceId,
            },
            amount,
            status: 'pending',
            payerDetails: {
                name: `${req.user.profile.firstName} ${req.user.profile.lastName}`,
                email: req.user.email,
            },
            notes: description,
        });

        if (razorpay) {
            // ─── PRODUCTION: Create real Razorpay Order ───────────────────
            const razorpayOrder = await razorpay.orders.create({
                amount: Math.round(amount * 100), // Razorpay expects paise
                currency: 'INR',
                receipt: `receipt_${payment._id}`,
                notes: {
                    paymentId: payment._id.toString(),
                    userId: req.user._id.toString(),
                    type,
                },
            });

            payment.razorpay = { orderId: razorpayOrder.id };
            await payment.save();

            logger.info(`Razorpay order created: ${razorpayOrder.id} for user ${req.user._id}`);

            res.status(201).json({
                success: true,
                data: {
                    orderId: razorpayOrder.id,
                    paymentId: payment._id,
                    amount: payment.amount,
                    currency: payment.currency,
                    key: process.env.RAZORPAY_KEY_ID, // Frontend needs the key
                    prefill: {
                        name: `${req.user.profile.firstName} ${req.user.profile.lastName}`,
                        email: req.user.email,
                    },
                },
            });
        } else {
            // ─── DEVELOPMENT FALLBACK (no Razorpay keys) ──────────────────
            payment.razorpay = { orderId: `order_dev_${Date.now()}` };
            await payment.save();

            logger.warn(`Dev mode order created: ${payment.razorpay.orderId}`);

            res.status(201).json({
                success: true,
                data: {
                    orderId: payment.razorpay.orderId,
                    paymentId: payment._id,
                    amount: payment.amount,
                    currency: payment.currency,
                    key: 'rzp_test_placeholder',
                    devMode: true,
                },
            });
        }
    } catch (error) {
        logger.error('Create order error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/payments/verify
// @desc    Verify payment using Razorpay signature (client-side callback)
// @access  Private
router.post('/verify', auth, async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Missing payment verification parameters',
            });
        }

        const payment = await Payment.findOne({ 'razorpay.orderId': razorpay_order_id });
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment record not found' });
        }

        // Idempotency check – don't process twice
        if (payment.status === 'completed') {
            return res.json({ success: true, message: 'Payment already verified', data: payment });
        }

        // ─── Cryptographic signature verification ──────────────────────
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'dev_secret')
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (expectedSignature !== razorpay_signature) {
            payment.status = 'failed';
            await payment.save();
            logger.warn(`Payment signature mismatch for order ${razorpay_order_id}`);
            return res.status(400).json({ success: false, message: 'Invalid payment signature' });
        }

        // ─── Mark payment successful ─────────────────────────────────
        payment.razorpay.paymentId = razorpay_payment_id;
        payment.razorpay.signature = razorpay_signature;
        payment.status = 'completed';
        await payment.save();

        // Update related registration if event payment
        if (payment.type === 'event_registration' && payment.reference?.id) {
            await Registration.findByIdAndUpdate(payment.reference.id, {
                paymentStatus: 'completed',
                paymentId: payment._id,
                status: 'confirmed',
            });
        }

        // Send notification (async, don't block response)
        const user = await User.findById(payment.user);
        if (user) {
            notifyPaymentSuccess(user, payment).catch(err =>
                logger.error('Post-payment notification error:', err)
            );
        }

        logger.info(`Payment verified: ${razorpay_payment_id} for order ${razorpay_order_id}`);

        res.json({
            success: true,
            message: 'Payment verified successfully',
            data: payment,
        });
    } catch (error) {
        logger.error('Verify payment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/payments/webhook
// @desc    Razorpay Webhook handler (server-to-server)
// @access  Public (verified via webhook secret)
router.post('/webhook', async (req, res) => {
    try {
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
        if (!webhookSecret) {
            logger.warn('Razorpay webhook received but RAZORPAY_WEBHOOK_SECRET is not set');
            return res.status(200).json({ status: 'ok' }); // Always 200 to Razorpay
        }

        // Verify webhook signature
        const signature = req.headers['x-razorpay-signature'];
        const expectedSignature = crypto
            .createHmac('sha256', webhookSecret)
            .update(req.body) // raw body
            .digest('hex');

        if (signature !== expectedSignature) {
            logger.warn('Webhook signature verification failed');
            return res.status(200).json({ status: 'ok' });
        }

        const event = JSON.parse(req.body);
        logger.info(`Razorpay webhook received: ${event.event}`);

        if (event.event === 'payment.captured') {
            const rpPayment = event.payload.payment.entity;
            const orderId = rpPayment.order_id;

            const payment = await Payment.findOne({ 'razorpay.orderId': orderId });
            if (payment && payment.status !== 'completed') {
                payment.razorpay.paymentId = rpPayment.id;
                payment.paymentMethod = rpPayment.method;
                payment.status = 'completed';
                await payment.save();

                if (payment.type === 'event_registration' && payment.reference?.id) {
                    await Registration.findByIdAndUpdate(payment.reference.id, {
                        paymentStatus: 'completed',
                        paymentId: payment._id,
                        status: 'confirmed',
                    });
                }

                const user = await User.findById(payment.user);
                if (user) {
                    notifyPaymentSuccess(user, payment).catch(err =>
                        logger.error('Webhook notification error:', err)
                    );
                }

                logger.info(`Webhook: Payment ${rpPayment.id} captured for order ${orderId}`);
            }
        }

        if (event.event === 'payment.failed') {
            const rpPayment = event.payload.payment.entity;
            const orderId = rpPayment.order_id;

            const payment = await Payment.findOne({ 'razorpay.orderId': orderId });
            if (payment && payment.status === 'pending') {
                payment.status = 'failed';
                await payment.save();
                logger.info(`Webhook: Payment failed for order ${orderId}`);
            }
        }

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        logger.error('Webhook processing error:', error);
        res.status(200).json({ status: 'ok' }); // Always 200
    }
});

// @route   GET /api/payments/my-payments
// @desc    Get current user's payment history
// @access  Private
router.get('/my-payments', auth, async (req, res) => {
    try {
        const { status, type, page = 1, limit = 10 } = req.query;

        const query = { user: req.user._id };
        if (status) query.status = status;
        if (type) query.type = type;

        const payments = await Payment.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        const total = await Payment.countDocuments(query);

        res.json({
            success: true,
            data: payments,
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        logger.error('Get payments error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/payments/:id
// @desc    Get payment details
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id)
            .populate('user', 'email profile.firstName profile.lastName');

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.user._id.toString() !== req.user._id.toString() &&
            !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.json({ success: true, data: payment });
    } catch (error) {
        logger.error('Get payment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/payments/:id/refund
// @desc    Request refund for a payment
// @access  Private
router.post('/:id/refund', auth, async (req, res) => {
    try {
        const { reason } = req.body;
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        if (payment.status !== 'completed') {
            return res.status(400).json({
                success: false,
                message: 'Can only refund completed payments',
            });
        }

        // Attempt real Razorpay refund if SDK is available
        const razorpay = getRazorpay();
        if (razorpay && payment.razorpay?.paymentId) {
            try {
                const refund = await razorpay.payments.refund(payment.razorpay.paymentId, {
                    amount: Math.round(payment.amount * 100), // paise
                    notes: { reason },
                });
                payment.refund = {
                    amount: payment.amount,
                    reason,
                    refundId: refund.id,
                    refundedAt: new Date(),
                };
                payment.status = 'refunded';
                logger.info(`Refund processed: ${refund.id} for payment ${payment._id}`);
            } catch (refundErr) {
                logger.error('Razorpay refund API error:', refundErr);
                // Fall back to manual refund request
                payment.status = 'refund_pending';
                payment.refund = { amount: payment.amount, reason };
            }
        } else {
            payment.status = 'refund_pending';
            payment.refund = { amount: payment.amount, reason };
        }

        await payment.save();

        res.json({
            success: true,
            message: payment.status === 'refunded' ? 'Refund processed' : 'Refund request submitted',
            data: payment,
        });
    } catch (error) {
        logger.error('Refund request error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   GET /api/payments/admin/all
// @desc    Get all payments (Admin only)
// @access  Private (Admin)
router.get('/admin/all', auth, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const { status, type, startDate, endDate, page = 1, limit = 20 } = req.query;

        const query = {};
        if (status) query.status = status;
        if (type) query.type = type;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const payments = await Payment.find(query)
            .populate('user', 'email profile.firstName profile.lastName')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        const total = await Payment.countDocuments(query);

        const totals = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);

        res.json({
            success: true,
            data: payments,
            stats: {
                totalRevenue: totals[0]?.total || 0,
            },
            pagination: {
                current: parseInt(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        logger.error('Admin get payments error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/payments/admin/:id/refund
// @desc    Process refund (Admin only)
// @access  Private (Admin)
router.put('/admin/:id/refund', auth, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const { action, adminNote } = req.body;
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'refund_pending') {
            return res.status(400).json({
                success: false,
                message: 'Payment is not pending refund',
            });
        }

        if (action === 'approve') {
            payment.status = 'refunded';
            payment.refund.refundedAt = new Date();
        } else {
            payment.status = 'completed';
            payment.refund = undefined;
        }

        payment.notes = (payment.notes || '') + `\n[Admin] ${action}: ${adminNote || 'No note'}`;
        await payment.save();

        res.json({
            success: true,
            message: `Refund ${action === 'approve' ? 'approved' : 'rejected'}`,
            data: payment,
        });
    } catch (error) {
        logger.error('Process refund error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
