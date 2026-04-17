const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
    {
        recipient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: [
                // Event notifications
                'event_created',
                'event_updated',
                'event_cancelled',
                'event_reminder',
                'event_registration_confirmed',
                'event_registration_cancelled',
                // Club notifications
                'club_invite',
                'club_joined',
                'club_role_changed',
                'club_announcement',
                // Recruitment notifications
                'recruitment_posted',
                'application_received',
                'application_status_changed',
                // Payment notifications
                'payment_received',
                'payment_failed',
                'payment_refunded',
                // Chat notifications
                'new_message',
                'mention',
                // Admin notifications
                'admin_announcement',
                'account_verified',
                // General
                'other',
            ],
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        // Reference to related entity
        reference: {
            model: {
                type: String,
                enum: ['Event', 'Club', 'User', 'Registration', 'Payment', 'ChatRoom', 'Message'],
            },
            id: mongoose.Schema.Types.ObjectId,
        },
        // Link to navigate to
        actionUrl: String,
        actionLabel: String,
        // Read status
        isRead: {
            type: Boolean,
            default: false,
        },
        readAt: Date,
        // Priority
        priority: {
            type: String,
            enum: ['low', 'normal', 'high', 'urgent'],
            default: 'normal',
        },
        // Display options
        icon: String,
        color: String,
        // Channels
        channels: {
            inApp: {
                type: Boolean,
                default: true,
            },
            email: {
                type: Boolean,
                default: false,
            },
            push: {
                type: Boolean,
                default: false,
            },
        },
        // Email/push sent status
        emailSentAt: Date,
        pushSentAt: Date,
        // Expiry
        expiresAt: Date,
        // Metadata
        metadata: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
);

// Indexes for efficient querying
notificationSchema.index({ recipient: 1, createdAt: -1 });
notificationSchema.index({ recipient: 1, isRead: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Mark as read
notificationSchema.methods.markAsRead = function () {
    this.isRead = true;
    this.readAt = new Date();
    return this.save();
};

// Static method to create notification
notificationSchema.statics.send = async function (recipientId, data) {
    return this.create({
        recipient: recipientId,
        ...data,
    });
};

// Static method to send to multiple recipients
notificationSchema.statics.sendToMany = async function (recipientIds, data) {
    const notifications = recipientIds.map((recipientId) => ({
        recipient: recipientId,
        ...data,
    }));
    return this.insertMany(notifications);
};

module.exports = mongoose.model('Notification', notificationSchema);
