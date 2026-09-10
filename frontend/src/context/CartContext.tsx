import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    addToCart: (productId: string, quantity?: number) => Promise<void>;
    updateQuantity: (itemId: string, quantity: number) => Promise<void>;
    removeItem: (itemId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    cartTotal: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const res = await cartService.getCart();
            const items = res.data?.items || res.data || [];
            setCartItems(Array.isArray(items) ? items : []);
        } catch (error) {
            console.error('Failed to fetch cart', error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId: string, quantity = 1) => {
        if (!isAuthenticated) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            const res = await cartService.addToCart(productId, quantity);
            setCartItems(res.data?.items || res.data || []);
            toast.success('Added to cart');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    const updateQuantity = async (itemId: string, quantity: number) => {
        try {
            const res = await cartService.updateCartItem(itemId, quantity);
            setCartItems(res.data?.items || res.data || []);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to update quantity');
        }
    };

    const removeItem = async (itemId: string) => {
        try {
            const res = await cartService.removeCartItem(itemId);
            setCartItems(res.data?.items || res.data || []);
            toast.success('Item removed from cart');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to remove item');
        }
    };

    const clearCart = async () => {
        try {
            const res = await cartService.clearCart();
            setCartItems([]);
            toast.success('Cart cleared');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to clear cart');
        }
    };

    const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, loading, addToCart, updateQuantity, removeItem, clearCart, cartTotal, itemCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
