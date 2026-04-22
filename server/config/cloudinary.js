const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const logger = require('./logger');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer storage for different upload types
const createStorage = (folder, allowedFormats = ['jpg', 'jpeg', 'png', 'webp']) => {
    return new CloudinaryStorage({
        cloudinary,
        params: {
            folder: `uems/${folder}`,
            allowed_formats: allowedFormats,
            transformation: [{ width: 1200, height: 1200, crop: 'limit', quality: 'auto' }],
        },
    });
};

// Pre-configured upload middlewares
const avatarUpload = multer({
    storage: createStorage('avatars'),
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
});

const bannerUpload = multer({
    storage: createStorage('banners'),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const chatMediaUpload = multer({
    storage: createStorage('chat', ['jpg', 'jpeg', 'png', 'webp', 'gif']),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

const generalUpload = multer({
    storage: createStorage('general', ['jpg', 'jpeg', 'png', 'webp', 'pdf']),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

logger.info('Cloudinary configuration loaded');

module.exports = {
    cloudinary,
    avatarUpload,
    bannerUpload,
    chatMediaUpload,
    generalUpload,
};
