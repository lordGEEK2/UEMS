module.exports = (io) => {
    // Store online users
    const onlineUsers = new Map();

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        // User joins with their ID
        socket.on('user_online', (userId) => {
            onlineUsers.set(userId, socket.id);
            socket.userId = userId;
            io.emit('online_users', Array.from(onlineUsers.keys()));
        });

        // Join a chat room
        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room ${roomId}`);
        });

        // Leave a chat room
        socket.on('leave_room', (roomId) => {
            socket.leave(roomId);
            console.log(`User ${socket.id} left room ${roomId}`);
        });

        // Send message
        socket.on('send_message', (data) => {
            // Broadcast to all users in the room
            io.to(data.roomId).emit('new_message', {
                ...data,
                createdAt: new Date().toISOString(),
            });
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
                onlineUsers.delete(socket.userId);
                io.emit('online_users', Array.from(onlineUsers.keys()));
            }
            console.log('User disconnected:', socket.id);
        });
    });
};
