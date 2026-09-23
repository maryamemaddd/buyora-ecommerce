export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: 'user' | 'admin';
    address?: string;
}

export interface LoginCredentials {
    email: string;
    password?: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password?: string;
    phone: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: { url: string; publicId?: string }[];
    image?: string; // from list response
    rating?: number;
    numReviews?: number;
}

export interface CartItem {
    _id?: string;
    product: any;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

export interface Order {
    _id: string;
    items: CartItem[];
    shippingAddress: {
        street: string;
        city: string;
        country: string;
        postalCode: string;
    };
    paymentMethod: string;
    totalPrice: number;
    taxPrice: number;
    shippingPrice: number;
    status: string;
    isPaid: boolean;
    paidAt?: string;
    isDelivered: boolean;
    deliveredAt?: string;
    createdAt: string;
}
