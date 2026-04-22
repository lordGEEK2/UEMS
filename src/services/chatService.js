import api from './api';

export const chatService = {
    getRooms: async () => {
        const response = await api.get('/chat/rooms');
        return response.data;
    },
    
    getRoomDetails: async (roomId) => {
        const response = await api.get(`/chat/rooms/${roomId}`);
        return response.data;
    },

    getRoomByClub: async (clubId) => {
        const response = await api.get(`/chat/club/${clubId}`);
        return response.data;
    },

    getMessages: async (roomId, page = 1, limit = 50) => {
        const response = await api.get(`/chat/rooms/${roomId}/messages?page=${page}&limit=${limit}`);
        return response.data;
    },

    sendMessage: async (roomId, content, type = 'text') => {
        const response = await api.post(`/chat/rooms/${roomId}/messages`, { content, type });
        return response.data;
    },
    
    createGroup: async (name, participants) => {
        const response = await api.post('/chat/rooms', { name, participants });
        return response.data;
    },
    
    markAsRead: async (roomId) => {
        const response = await api.put(`/chat/rooms/${roomId}/read`);
        return response.data;
    }
};
