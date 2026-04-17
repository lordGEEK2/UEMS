const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Registration = require('../models/Registration');
const { auth, authorize } = require('../middleware/auth');

// @route   POST /api/payments/create-order
// @desc    Create a new payment order (Razorpay)
// @access  Private
router.post('/create-order', auth, async (req, res) => {
    try {
        const { type, referenceId, amount, description } = req.body;

        // Validate required fields
        if (!type || !referenceId || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Type, referenceId, and amount are required'
            });
        }

        // Create payment record
        const payment = new Payment({
            user: req.user._id,
            type,
            referenceId,
            amount,
            description,
            status: 'pending',
        });

        // In production, create Razorpay order here
        // const razorpayOrder = await razorpay.orders.create({...});
        // payment.razorpayOrderId = razorpayOrder.id;

        // For development, generate mock order ID
        payment.razorpayOrderId = `order_mock_${Date.now()}`;

        await payment.save();

        res.status(201).json({
            success: true,
            data: {
                orderId: payment.razorpayOrderId,
                paymentId: payment._id,
                amount: payment.amount,
                currency: payment.currency,
            },
        });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   POST /api/payments/verify
// @desc    Verify payment after Razorpay callback
// @access  Private
router.post('/verify', auth, async (req, res) => {
    try {
        const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

        // Find payment
        const payment = await Payment.findOne({ razorpayOrderId });
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // In production, verify signature with Razorpay
        // const isValid = verifyRazorpaySignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);

        // For development, mark as successful
        payment.razorpayPaymentId = razorpayPaymentId || `pay_mock_${Date.now()}`;
        payment.razorpaySignature = razorpaySignature || 'mock_signature';
        payment.status = 'completed';
        payment.paidAt = new Date();

        await payment.save();

        // Update related registration if event payment
        if (payment.type === 'event_registration') {
            await Registration.findByIdAndUpdate(payment.referenceId, {
                paymentStatus: 'paid',
                paymentId: payment._id,
            });
        }

        res.json({
            success: true,
            message: 'Payment verified successfully',
            data: payment,
        });
    } catch (error) {
        console.error('Verify payment error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
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
        console.error('Get payments error:', error);
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

        // Only allow user to view their own payments, or admin
        if (payment.user._id.toString() !== req.user._id.toString() &&
            !['admin', 'super_admin'].includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }

        res.json({ success: true, data: payment });
    } catch (error) {
        console.error('Get payment error:', error);
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
                message: 'Can only refund completed payments'
            });
        }

        // In production, initiate Razorpay refund
        // const refund = await razorpay.payments.refund(payment.razorpayPaymentId, {...});

        payment.status = 'refund_pending';
        payment.refund = {
            requestedAt: new Date(),
            reason,
            status: 'pending',
        };

        await payment.save();

        res.json({
            success: true,
            message: 'Refund request submitted',
            data: payment,
        });
    } catch (error) {
        console.error('Refund request error:', error);
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

        // Calculate totals
        const totals = await Payment.aggregate([
            { $match: { status: 'completed' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
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
        console.error('Admin get payments error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// @route   PUT /api/payments/admin/:id/refund
// @desc    Process refund (Admin only)
// @access  Private (Admin)
router.put('/admin/:id/refund', auth, authorize('admin', 'super_admin'), async (req, res) => {
    try {
        const { action, adminNote } = req.body; // action: 'approve' or 'reject'
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        if (payment.status !== 'refund_pending') {
            return res.status(400).json({
                success: false,
                message: 'Payment is not pending refund'
            });
        }

        if (action === 'approve') {
            payment.status = 'refunded';
            payment.refund.status = 'completed';
            payment.refund.processedAt = new Date();
            payment.refund.processedBy = req.user._id;
            payment.refund.adminNote = adminNote;
        } else {
            payment.status = 'completed';
            payment.refund.status = 'rejected';
            payment.refund.processedAt = new Date();
            payment.refund.processedBy = req.user._id;
            payment.refund.adminNote = adminNote;
        }

        await payment.save();

        res.json({
            success: true,
            message: `Refund ${action === 'approve' ? 'approved' : 'rejected'}`,
            data: payment,
        });
    } catch (error) {
        console.error('Process refund error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
