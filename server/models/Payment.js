const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        type: {
            type: String,
            enum: ['event_registration', 'club_membership', 'sponsorship', 'donation', 'other'],
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        currency: {
            type: String,
            default: 'INR',
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
            default: 'pending',
        },
        // Razorpay specific fields
        razorpay: {
            orderId: String,
            paymentId: String,
            signature: String,
        },
        // Reference to related entity
        reference: {
            model: {
                type: String,
                enum: ['Event', 'Club', 'Registration', 'Sponsorship'],
            },
            id: mongoose.Schema.Types.ObjectId,
        },
        // Payer details (for receipts)
        payerDetails: {
            name: String,
            email: String,
            phone: String,
        },
        // Transaction details
        transactionId: {
            type: String,
            unique: true,
            sparse: true,
        },
        paymentMethod: {
            type: String,
            enum: ['card', 'upi', 'netbanking', 'wallet', 'emi', 'other'],
        },
        // GST/Tax details
        tax: {
            gstin: String,
            amount: Number,
            percentage: Number,
        },
        // Refund details
        refund: {
            amount: Number,
            reason: String,
            refundId: String,
            refundedAt: Date,
        },
        // Receipt
        receiptUrl: String,
        invoiceNumber: String,
        notes: String,
        metadata: mongoose.Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
);

// Indexes
paymentSchema.index({ user: 1, createdAt: -1 });
paymentSchema.index({ 'razorpay.orderId': 1 });
paymentSchema.index({ status: 1 });

// Generate transaction ID before saving
paymentSchema.pre('save', function (next) {
    if (!this.transactionId && this.status === 'completed') {
        const prefix = 'TXN';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        this.transactionId = `${prefix}-${timestamp}-${random}`;
    }
    next();
});

// Generate invoice number after successful payment
paymentSchema.methods.generateInvoice = function () {
    if (!this.invoiceNumber && this.status === 'completed') {
        const prefix = 'INV';
        const year = new Date().getFullYear();
        const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        this.invoiceNumber = `${prefix}-${year}${month}-${random}`;
    }
    return this.invoiceNumber;
};

module.exports = mongoose.model('Payment', paymentSchema);
