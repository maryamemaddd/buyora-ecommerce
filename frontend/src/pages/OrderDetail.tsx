import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { productService } from '../services/productService';
import { Order } from '../types';
import toast from 'react-hot-toast';
import { CheckCircle2, Clock, Truck, Package, XCircle } from 'lucide-react';

export const OrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await orderService.getOrderById(id!);
                const orderData = res.data || res;

                // Ensure items have images by enriching product details if image is missing
                if (orderData && Array.isArray(orderData.items)) {
                    const enrichedItems = await Promise.all(
                        orderData.items.map(async (item: any) => {
                            if (item.image) return item;

                            // 1. If product is already an object with image or images
                            if (item.product && typeof item.product === 'object') {
                                const img = item.product.image || item.product.images?.[0]?.url;
                                if (img) return { ...item, image: img };
                            }

                            // 2. If product is an ID string, fetch product by ID
                            const prodId = typeof item.product === 'string' ? item.product : item.product?._id;
                            if (prodId) {
                                try {
                                    const prodRes = await productService.getProductById(prodId);
                                    const prod = prodRes.data || prodRes;
                                    const img = prod?.image || prod?.images?.[0]?.url;
                                    if (img) return { ...item, image: img };
                                } catch {
                                    // continue to search fallback
                                }
                            }

                            // 3. Fallback: search product by name
                            if (item.name) {
                                try {
                                    const searchRes = await productService.getProducts({ search: item.name });
                                    const productsList = searchRes.data || searchRes;
                                    const found = Array.isArray(productsList) ? productsList[0] : null;
                                    const img = found?.image || found?.images?.[0]?.url;
                                    if (img) return { ...item, image: img };
                                } catch {
                                    // UI fallback will handle it
                                }
                            }

                            return item;
                        })
                    );
                    orderData.items = enrichedItems;
                }

                setOrder(orderData);
            } catch (error) {
                toast.error('Order not found');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchOrder();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Order Not Found</h2>
                <Link to="/orders" className="text-blue-600 hover:underline">Return to Orders</Link>
            </div>
        );
    }

    const getStatusIcon = () => {
        switch (order.status) {
            case 'delivered': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
            case 'cancelled': return <XCircle className="w-8 h-8 text-red-500" />;
            case 'shipped': return <Truck className="w-8 h-8 text-blue-500" />;
            default: return <Clock className="w-8 h-8 text-yellow-500" />;
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-8">
            <Link to="/orders" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:underline mb-6 inline-block">
                &larr; Back to my orders
            </Link>

            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl px-4 py-5 border-b border-gray-200 dark:border-white/10 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-t-xl">
                <div>
                    <h3 className="text-lg sm:text-xl leading-6 font-bold text-gray-900 dark:text-white">Order #{order._id}</h3>
                    <p className="mt-1 max-w-2xl text-xs sm:text-sm text-gray-500 dark:text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2 font-medium capitalize text-gray-900 dark:text-white">
                    {getStatusIcon()}
                    <span className="text-base sm:text-lg">{order.status || 'Pending'}</span>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl shadow-xs border border-t-0 border-gray-200 dark:border-white/10 rounded-b-xl px-4 py-5 sm:p-6 mb-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Shipping Address</h4>
                        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                            <p>{order.shippingAddress.street}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                            <p>{order.shippingAddress.country}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Information</h4>
                        <div className="bg-gray-50 dark:bg-slate-800 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 space-y-2">
                            <div className="flex justify-between">
                                <span>Method</span>
                                <span className="capitalize font-medium">{order.paymentMethod}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment Status</span>
                                <span className={`font-semibold ${order.isPaid ? 'text-green-600' : 'text-red-500'}`}>
                                    {order.isPaid ? `Paid on ${order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'N/A'}` : 'Not Paid'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Status</span>
                                <span className={`font-semibold ${order.isDelivered ? 'text-green-600' : 'text-yellow-600'}`}>
                                    {order.isDelivered ? `Delivered on ${order.deliveredAt ? new Date(order.deliveredAt).toLocaleDateString() : 'N/A'}` : 'Not Delivered'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <h4 className="font-semibold text-gray-900 dark:text-white mt-8 mb-4">Order Items</h4>
                <div className="border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-white/10">
                        {order.items.map((item, index) => {
                            const prodObj = item.product as any;
                            const productId = typeof prodObj === 'object' && prodObj !== null ? prodObj._id : prodObj;
                            const fallbackImg = `https://placehold.co/400x400/1e293b/ffffff?text=${encodeURIComponent(item.name || 'Product')}`;
                            return (
                                <li key={index} className="p-4 flex items-center bg-white dark:bg-slate-900/20 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 dark:bg-slate-800 border border-gray-100 dark:border-gray-700 mr-3 sm:mr-4 flex-shrink-0 overflow-hidden flex items-center justify-center">
                                        <img
                                            src={item.image || fallbackImg}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.currentTarget.onerror = null;
                                                e.currentTarget.src = fallbackImg;
                                            }}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-2">
                                        <Link to={`/products/${productId || ''}`} className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white hover:underline truncate block">{item.name}</Link>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-sm sm:text-base text-gray-900 dark:text-white shrink-0">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="bg-gray-50 dark:bg-slate-800 p-4">
                        <div className="flex justify-between sm:justify-end sm:gap-8 pt-2 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="font-medium text-gray-900 dark:text-white">${(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between sm:justify-end sm:gap-8 pt-2 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                            <span className="font-medium text-gray-900 dark:text-white">${order.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between sm:justify-end sm:gap-8 pt-2 text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Tax</span>
                            <span className="font-medium text-gray-900 dark:text-white">${order.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between sm:justify-end sm:gap-8 pt-4 pb-2 border-t mt-4 border-gray-200 dark:border-white/10 font-bold text-base sm:text-lg">
                            <span className="text-gray-900 dark:text-white">Total</span>
                            <span className="text-gray-900 dark:text-white">${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
