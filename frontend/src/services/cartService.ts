import api from './api';

export const cartService = {
    getCart: async () => {
        const response = await api.get('/cart');
        return response.data; // Expected format based on typical backend { success: true, data: { items: [], ... } }
    },
    addToCart: async (productId: string, quantity: number = 1) => {
        const response = await api.post('/cart', { productId, quantity });
        return response.data;
    },
    updateCartItem: async (itemId: string, quantity: number) => {
        const response = await api.put(`/cart/${itemId}`, { quantity });
        return response.data;
    },
    removeCartItem: async (itemId: string) => {
        const response = await api.delete(`/cart/${itemId}`);
        return response.data;
    },
    clearCart: async () => {
        const response = await api.delete('/cart');
        return response.data;
    }
};
