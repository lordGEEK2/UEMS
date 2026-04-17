const mongoose = require('mongoose');

const recruitmentSchema = new mongoose.Schema({
    position: {
        type: String,
        required: [true, 'Please add a position title'],
        trim: true,
        maxLength: [100, 'Position title cannot be more than 100 characters']
    },
    club: {
        type: String,
        required: [true, 'Please provide the club name']
    },
    clubId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Club',
        required: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [2000, 'Description cannot be more than 2000 characters']
    },
    requirements: {
        type: String,
        required: [true, 'Please add requirements']
    },
    skills: {
        type: [String],
        default: []
    },
    deadline: {
        type: Date,
        required: [true, 'Please add a deadline']
    },
    positions: {
        type: Number,
        default: 1,
        min: [1, 'Must have at least 1 position']
    },
    status: {
        type: String,
        enum: ['open', 'closing_soon', 'closed'],
        default: 'open'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Virtual for getting the number of applications
recruitmentSchema.virtual('applicationCount', {
    ref: 'Application',
    localField: '_id',
    foreignField: 'recruitment',
    count: true
});

// To ensure virtuals are included when converted to JSON
recruitmentSchema.set('toJSON', { virtuals: true });
recruitmentSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Recruitment', recruitmentSchema);
