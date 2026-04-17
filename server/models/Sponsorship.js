const mongoose = require('mongoose');

const sponsorshipSchema = new mongoose.Schema(
    {
        sponsor: {
            name: {
                type: String,
                required: true,
            },
            company: String,
            email: {
                type: String,
                required: true,
            },
            phone: String,
            website: String,
            logo: String,
            description: String,
        },
        // What they're sponsoring
        target: {
            type: {
                type: String,
                enum: ['event', 'club', 'general'],
                required: true,
            },
            event: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Event',
            },
            club: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Club',
            },
        },
        // Sponsorship tier
        tier: {
            type: String,
            enum: ['platinum', 'gold', 'silver', 'bronze', 'custom'],
            required: true,
        },
        // Financial details
        amount: {
            committed: {
                type: Number,
                required: true,
            },
            received: {
                type: Number,
                default: 0,
            },
            currency: {
                type: String,
                default: 'INR',
            },
        },
        // Benefits promised
        benefits: [
            {
                title: String,
                description: String,
                fulfilled: {
                    type: Boolean,
                    default: false,
                },
            },
        ],
        // Status tracking
        status: {
            type: String,
            enum: ['inquiry', 'negotiating', 'confirmed', 'active', 'completed', 'cancelled'],
            default: 'inquiry',
        },
        // Timeline
        validFrom: Date,
        validUntil: Date,
        // Communication log
        communications: [
            {
                date: {
                    type: Date,
                    default: Date.now,
                },
                type: {
                    type: String,
                    enum: ['email', 'call', 'meeting', 'other'],
                },
                summary: String,
                by: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        // Payment tracking
        payments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Payment',
            },
        ],
        // Documents
        documents: [
            {
                name: String,
                url: String,
                type: {
                    type: String,
                    enum: ['agreement', 'invoice', 'receipt', 'other'],
                },
                uploadedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        // Managed by
        managedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

// Indexes
sponsorshipSchema.index({ 'sponsor.email': 1 });
sponsorshipSchema.index({ status: 1 });
sponsorshipSchema.index({ tier: 1 });
sponsorshipSchema.index({ 'target.event': 1 });
sponsorshipSchema.index({ 'target.club': 1 });

module.exports = mongoose.model('Sponsorship', sponsorshipSchema);
