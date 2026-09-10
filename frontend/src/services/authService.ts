import api from './api';
import { User, LoginCredentials, RegisterCredentials } from '../types';

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },
    register: async (credentials: RegisterCredentials) => {
        const response = await api.post('/auth/register', credentials);
        return response.data;
    },
    getMe: async () => {
        const response = await api.get('/auth/me');
        return response.data;
    }
};
