const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['club', 'group', 'direct'],
        default: 'club',
    },
    club: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Club',
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    admins: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    lastMessageAt: Date,
    icon: String,
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
