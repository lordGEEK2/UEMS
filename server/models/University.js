const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    domain: {
        type: String,
        unique: true,
        sparse: true,
        lowercase: true,
        trim: true,
        description: 'Primary domain for SSO or tenant mapping (e.g. mits.ac.in)'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    branding: {
        logoUrl: String,
        primaryColor: String,
        secondaryColor: String
    },
    contactEmail: String,
    plan: {
        type: String,
        enum: ['free', 'premium', 'enterprise'],
        default: 'free'
    }
}, { timestamps: true });

module.exports = mongoose.model('University', universitySchema);
