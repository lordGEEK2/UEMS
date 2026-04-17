const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    recruitment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Recruitment',
        required: true
    },
    applicant: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    resume: {
        type: String
    },
    coverLetter: {
        type: String
    },
    portfolio: {
        type: String
    },
    answers: {
        type: mongoose.Schema.Types.Mixed
    },
    status: {
        type: String,
        enum: ['pending', 'reviewing', 'accepted', 'rejected'],
        default: 'pending'
    },
    feedback: {
        type: String
    },
    reviewedBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    reviewedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Prevent user from applying to the same recruitment multiple times
applicationSchema.index({ recruitment: 1, applicant: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
