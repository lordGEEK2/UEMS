import api from './api';

export const recruitmentService = {
    getAllRecruitments: async (params) => {
        const response = await api.get('/recruitments', { params });
        return response.data;
    },
    
    getRecruitmentById: async (id) => {
        const response = await api.get(`/recruitments/${id}`);
        return response.data;
    },
    
    createRecruitment: async (data) => {
        const response = await api.post('/recruitments', data);
        return response.data;
    },
    
    applyForRecruitment: async (id, data) => {
        const response = await api.post(`/recruitments/${id}/apply`, data);
        return response.data;
    },

    getMyApplications: async () => {
        const response = await api.get('/recruitments/my/applications');
        return response.data;
    }
};
