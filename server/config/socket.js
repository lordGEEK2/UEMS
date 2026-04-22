const { createAdapter } = require('@socket.io/redis-adapter');
const Redis = require('ioredis');
const logger = require('./logger');

module.exports = (io) => {
    // Determine Redis URL
    const redisUrl = process.env.REDIS_URL;

    // Setup Redis Adapter for multi-instance scaling
    if (redisUrl) {
        try {
            const pubClient = new Redis(redisUrl, {
                maxRetriesPerRequest: 1,
                connectTimeout: 5000
            });
            const subClient = pubClient.duplicate();
            
            pubClient.on('error', (err) => logger.error('Redis PubClient Error:', err.message));
            subClient.on('error', (err) => logger.error('Redis SubClient Error:', err.message));

            pubClient.once('ready', () => {
                io.adapter(createAdapter(pubClient, subClient));
                logger.info('Socket.IO running with Redis adapter for horizontal scaling');
            });
        } catch (err) {
            logger.error('Failed to initialize Redis Adapter for Socket.IO. Falling back to in-memory.', err);
        }
    } else {
        logger.info('REDIS_URL not found. Socket.IO running in-memory.');
    }

    // Since users can be connected to different nodes, we store global online status in Redis.
    // For simplicity without deeply refactoring everything, we track local presence but emit globally.

    io.on('connection', (socket) => {
        logger.debug('User connected:', socket.id);

        // User joins with their ID
        socket.on('user_online', async (userId) => {
            socket.userId = userId;
            socket.join(`user:${userId}`); // Join personal namespace

            // In a fully scaled app, you'd track presence globally via Redis keys.
            // Emitting to everyone that a user is online.
            io.emit('online_users_update', { userId, status: 'online' });
        });

        // Join a chat room
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            logger.debug(`User ${socket.id} joined room ${roomId}`);
        });

        // Leave a chat room
        socket.on('leave_room', (roomId) => {
            socket.leave(roomId);
            logger.debug(`User ${socket.id} left room ${roomId}`);
        });

        // Send message
        socket.on('sendMessage', (data) => {
            // Broadcast to all users in the room across ALL nodes
            io.to(data.roomId).emit('newMessage', data.message);
        });

        // Typing indicator
        socket.on('typing', (data) => {
            socket.to(data.roomId).emit('user_typing', {
                userId: data.userId,
                userName: data.userName,
                roomId: data.roomId,
            });
        });

        // Stop typing
        socket.on('stop_typing', (data) => {
            socket.to(data.roomId).emit('user_stop_typing', {
                userId: data.userId,
                roomId: data.roomId,
            });
        });

        // Mark messages as read
        socket.on('mark_read', (data) => {
            socket.to(data.roomId).emit('messages_read', {
                userId: data.userId,
                roomId: data.roomId,
            });
        });

        // Disconnect
        socket.on('disconnect', () => {
            if (socket.userId) {
                io.emit('online_users_update', { userId: socket.userId, status: 'offline' });
            }
            logger.debug('User disconnected:', socket.id);
        });
    });
};
