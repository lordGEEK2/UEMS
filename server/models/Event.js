const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['technology', 'cultural', 'sports', 'workshop', 'professional', 'competition', 'other'],
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
        required: true,
    },
    organizers: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: String,
    }],
    date: {
        type: Date,
        required: true,
    },
    endDate: Date,
    time: String,
    venue: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    maxRegistrations: {
        type: Number,
        default: 100,
    },
    registrations: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        registeredAt: { type: Date, default: Date.now },
        paymentStatus: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
        paymentId: String,
    }],
    tags: [String],
    image: String,
    status: {
        type: String,
        enum: ['draft', 'upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Generate slug from title
eventSchema.pre('save', function (next) {
    if (this.isModified('title')) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Get registration count virtual
eventSchema.virtual('registrationCount').get(function () {
    return this.registrations.length;
});

// Check if event is full
eventSchema.virtual('isFull').get(function () {
    return this.registrations.length >= this.maxRegistrations;
});

module.exports = mongoose.model('Event', eventSchema);
