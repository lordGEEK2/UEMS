const sgMail = require('@sendgrid/mail');
const Notification = require('../models/Notification');
const logger = require('../config/logger');
const { queueEmail } = require('../config/queue');

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    logger.info('SendGrid email service initialized');
} else {
    logger.warn('SENDGRID_API_KEY not set. Email notifications will be skipped.');
}

const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@uems.app';
const FROM_NAME = process.env.FROM_NAME || 'UEMS Platform';

/**
 * Send an email via SendGrid by pushing it onto the BullMQ background queue.
 */
const sendEmail = async ({ to, subject, html, text }) => {
    try {
        await queueEmail({
            to,
            subject,
            html,
            text: text || subject
        });
        logger.debug(`Queued email: ${subject} → ${to}`);
        return true;
    } catch (error) {
        logger.error('Failed to queue email:', { error: error.message, to, subject });
        return false;
    }
};

// ─── Pre-built Notification Templates ─────────────────────────────────────────

const notifyEventRegistration = async (user, event, registration) => {
    // In-app notification
    await Notification.send(user._id || user, {
        type: 'event_registration_confirmed',
        title: 'Registration Confirmed!',
        message: `You've successfully registered for "${event.title}".`,
        reference: { model: 'Registration', id: registration._id },
        actionUrl: `/events/${event.slug}`,
        actionLabel: 'View Event',
        priority: 'normal',
        channels: { inApp: true, email: true },
    });

    // Email notification
    const email = user.email || user;
    if (typeof email === 'string' && email.includes('@')) {
        await sendEmail({
            to: email,
            subject: `Registration Confirmed: ${event.title}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                    <h2 style="color:#6366f1">Registration Confirmed ✅</h2>
                    <p>Hi ${user.profile?.firstName || 'Student'},</p>
                    <p>You have been successfully registered for <strong>${event.title}</strong>.</p>
                    <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-IN')}</p>
                    <p><strong>Venue:</strong> ${event.venue}</p>
                    <p><strong>Registration #:</strong> ${registration.registrationNumber || 'Pending'}</p>
                    <hr/>
                    <p style="color:#888;font-size:12px">University Event Management System</p>
                </div>
            `,
        });
    }
};

const notifyPaymentSuccess = async (user, payment) => {
    await Notification.send(user._id || user, {
        type: 'payment_received',
        title: 'Payment Successful',
        message: `₹${payment.amount} payment completed successfully.`,
        reference: { model: 'Payment', id: payment._id },
        actionUrl: '/payments',
        actionLabel: 'View Receipt',
        priority: 'normal',
        channels: { inApp: true, email: true },
    });

    const email = user.email || user;
    if (typeof email === 'string' && email.includes('@')) {
        await sendEmail({
            to: email,
            subject: `Payment Receipt – ₹${payment.amount}`,
            html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                    <h2 style="color:#22c55e">Payment Received ✅</h2>
                    <p>Hi ${user.profile?.firstName || 'Student'},</p>
                    <p>Your payment of <strong>₹${payment.amount}</strong> has been processed successfully.</p>
                    <p><strong>Transaction ID:</strong> ${payment.transactionId || payment.razorpay?.paymentId || 'N/A'}</p>
                    <hr/>
                    <p style="color:#888;font-size:12px">University Event Management System</p>
                </div>
            `,
        });
    }
};

const notifyEventCancellation = async (recipientIds, event) => {
    await Notification.sendToMany(recipientIds, {
        type: 'event_cancelled',
        title: 'Event Cancelled',
        message: `"${event.title}" has been cancelled.`,
        reference: { model: 'Event', id: event._id },
        actionUrl: `/events/${event.slug}`,
        priority: 'high',
        channels: { inApp: true, email: true },
    });
};

module.exports = {
    sendEmail,
    notifyEventRegistration,
    notifyPaymentSuccess,
    notifyEventCancellation,
};
