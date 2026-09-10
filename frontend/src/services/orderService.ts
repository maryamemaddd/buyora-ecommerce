import api from './api';

export const orderService = {
    // User orders
    getMyOrders: async (params?: { page?: number; limit?: number }) => {
        const response = await api.get('/orders/myorders', { params });
        return response.data;
    },
    getOrderById: async (id: string) => {
        const response = await api.get(`/orders/${id}`);
        return response.data;
    },
    createOrder: async (data: { shippingAddress: any; paymentMethod: string }) => {
        const response = await api.post('/orders', data);
        return response.data;
    },
    createPaymentIntent: async () => {
        const response = await api.post('/orders/create-payment-intent');
        return response.data;
    },
    payOrder: async (id: string, paymentResult: any) => {
        const response = await api.put(`/orders/${id}/pay`, paymentResult);
        return response.data;
    },
    // Admin orders
    getAllOrders: async (params?: { page?: number; limit?: number }) => {
        const response = await api.get('/orders', { params });
        return response.data;
    },
    updateOrderStatus: async (id: string, status: string) => {
        const response = await api.put(`/orders/${id}/status`, { status });
        return response.data;
    }
};
