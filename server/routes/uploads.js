const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { avatarUpload, bannerUpload, chatMediaUpload, generalUpload, cloudinary } = require('../config/cloudinary');
const logger = require('../config/logger');

// @route   POST /api/uploads/avatar
// @desc    Upload user avatar
// @access  Private
router.post('/avatar', protect, avatarUpload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Update user avatar URL
        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user._id, {
            'profile.avatar': req.file.path,
        });

        res.json({
            success: true,
            data: {
                url: req.file.path,
                publicId: req.file.filename,
            },
        });
    } catch (error) {
        logger.error('Avatar upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

// @route   POST /api/uploads/banner
// @desc    Upload event banner
// @access  Private (club admin/head)
router.post('/banner', protect, bannerUpload.single('banner'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        res.json({
            success: true,
            data: {
                url: req.file.path,
                publicId: req.file.filename,
            },
        });
    } catch (error) {
        logger.error('Banner upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

// @route   POST /api/uploads/chat
// @desc    Upload chat media
// @access  Private
router.post('/chat', protect, chatMediaUpload.single('media'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        res.json({
            success: true,
            data: {
                url: req.file.path,
                publicId: req.file.filename,
                type: req.file.mimetype.startsWith('image/') ? 'image' : 'file',
            },
        });
    } catch (error) {
        logger.error('Chat media upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

// @route   POST /api/uploads/general
// @desc    General file upload
// @access  Private
router.post('/general', protect, generalUpload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        res.json({
            success: true,
            data: {
                url: req.file.path,
                publicId: req.file.filename,
            },
        });
    } catch (error) {
        logger.error('General upload error:', error);
        res.status(500).json({ success: false, message: 'Upload failed' });
    }
});

// @route   DELETE /api/uploads/:publicId
// @desc    Delete an uploaded file
// @access  Private
router.delete('/:publicId', protect, async (req, res) => {
    try {
        const result = await cloudinary.uploader.destroy(req.params.publicId);
        if (result.result !== 'ok') {
            return res.status(400).json({ success: false, message: 'File not found or already deleted' });
        }

        res.json({ success: true, message: 'File deleted successfully' });
    } catch (error) {
        logger.error('File delete error:', error);
        res.status(500).json({ success: false, message: 'Delete failed' });
    }
});

module.exports = router;
