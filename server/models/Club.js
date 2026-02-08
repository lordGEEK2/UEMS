const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Club name is required'],
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['technical', 'cultural', 'sports', 'professional', 'literary', 'social', 'other'],
    },
    description: {
        type: String,
        default: '',
    },
    coordinator: {
        type: String, // Faculty coordinator name
        required: true,
    },
    logo: String,
    members: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['member', 'admin', 'head'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
    }],
    pendingRequests: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        requestedAt: { type: Date, default: Date.now },
        message: String,
    }],
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatRoom',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Generate slug from name
clubSchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

// Get member count virtual
clubSchema.virtual('memberCount').get(function () {
    return this.members.length;
});

module.exports = mongoose.model('Club', clubSchema);
