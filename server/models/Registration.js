const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
            required: true,
        },
        team: {
            name: String,
            members: [
                {
                    user: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                    },
                    name: String,
                    email: String,
                    role: String, // 'leader', 'member'
                },
            ],
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled', 'waitlisted', 'attended'],
            default: 'pending',
        },
        paymentStatus: {
            type: String,
            enum: ['not_required', 'pending', 'completed', 'failed', 'refunded'],
            default: 'not_required',
        },
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment',
        },
        registrationNumber: {
            type: String,
            unique: true,
        },
        qrCode: String,
        checkInTime: Date,
        checkOutTime: Date,
        feedback: {
            rating: {
                type: Number,
                min: 1,
                max: 5,
            },
            comment: String,
            submittedAt: Date,
        },
        customFields: mongoose.Schema.Types.Mixed, // Dynamic form responses
        notes: String,
    },
    {
        timestamps: true,
    }
);

// Compound index for unique user-event registration
registrationSchema.index({ user: 1, event: 1 }, { unique: true });

// Generate registration number and QR code before saving
registrationSchema.pre('save', async function (next) {
    if (!this.registrationNumber) {
        const count = await this.constructor.countDocuments();
        const prefix = 'REG';
        const timestamp = Date.now().toString(36).toUpperCase();
        this.registrationNumber = `${prefix}-${timestamp}-${(count + 1).toString().padStart(4, '0')}`;
    }
    
    // Auto-generate QR Code data URL when status becomes confirmed
    if (this.isModified('status') && this.status === 'confirmed' && !this.qrCode) {
        try {
            const qrcode = require('qrcode');
            // The payload for the scanner
            const payload = JSON.stringify({
                regId: this._id.toString(),
                user: this.user.toString(),
                event: this.event.toString(),
                regNumber: this.registrationNumber
            });
            this.qrCode = await qrcode.toDataURL(payload, {
                errorCorrectionLevel: 'H',
                margin: 1,
                color: { dark: '#000000', light: '#ffffff' }
            });
        } catch (err) {
            console.error('Failed to generate QR Code:', err);
        }
    }
    
    next();
});

module.exports = mongoose.model('Registration', registrationSchema);
