import api from './api';

export const clubService = {
    getAllClubs: async (params) => {
        const response = await api.get('/clubs', { params });
        return response.data;
    },
    
    getClubBySlug: async (slug) => {
        const response = await api.get(`/clubs/${slug}`);
        return response.data;
    },

    getMyClub: async () => {
        const response = await api.get(`/clubs/mine`);
        return response.data;
    },
    
    joinClub: async (slug, message) => {
        const response = await api.post(`/clubs/${slug}/join`, { message });
        return response.data;
    },
    
    approveMember: async (slug, userId) => {
        const response = await api.put(`/clubs/${slug}/approve/${userId}`);
        return response.data;
    }
};
