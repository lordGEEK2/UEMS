const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false, // Don't include password in queries by default
    },
    role: {
        type: String,
        enum: ['student', 'club_member', 'club_admin', 'club_head', 'super_admin'],
        default: 'student',
    },
    profile: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        department: String,
        year: String,
        phone: String,
        avatar: String,
    },
    clubs: [{
        club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
        role: { type: String, enum: ['member', 'admin', 'head'], default: 'member' },
        joinedAt: { type: Date, default: Date.now },
    }],
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Get full name virtual
userSchema.virtual('fullName').get(function () {
    return `${this.profile.firstName} ${this.profile.lastName}`;
});

module.exports = mongoose.model('User', userSchema);
