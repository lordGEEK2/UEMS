import api from './api';

export const eventService = {
    getAllEvents: async (params) => {
        const response = await api.get('/events', { params });
        return response.data;
    },
    
    getEventBySlug: async (slug) => {
        const response = await api.get(`/events/${slug}`);
        return response.data;
    },
    
    createEvent: async (eventData) => {
        const response = await api.post('/events', eventData);
        return response.data;
    },
    
    registerForEvent: async (slug) => {
        const response = await api.post(`/events/${slug}/register`);
        return response.data;
    }
};
