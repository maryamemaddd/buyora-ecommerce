import api from './api';

export const productService = {
    getProducts: async (params?: Record<string, any>) => {
        const response = await api.get('/products', { params });
        return response.data;
    },
    getProductById: async (id: string) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },
    // Admin Endpoints
    createProduct: async (data: any) => {
        const response = await api.post('/products', data);
        return response.data;
    },
    updateProduct: async (id: string, data: any) => {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },
    deleteProduct: async (id: string) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }
};
