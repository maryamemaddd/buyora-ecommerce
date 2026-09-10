import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
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
                // Handle varying backend response formats implicitly
                setOrder(res.data || res);
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

            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl px-4 py-5 border-b border-gray-200 dark:border-white/10 sm:px-6 flex items-center justify-between rounded-t-xl">
                <div>
                    <h3 className="text-xl leading-6 font-bold text-gray-900 dark:text-white">Order #{order._id}</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 font-medium capitalize text-gray-900 dark:text-white">
                        {getStatusIcon()}
                        <span className="text-lg">{order.status || 'Pending'}</span>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl shadow-xs border border-t-0 border-gray-200 dark:border-white/10 rounded-b-xl px-4 py-5 sm:p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                        {order.items.map((item, index) => (
                            <li key={index} className="p-4 flex items-center bg-white dark:bg-slate-900/20 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4 border border-gray-100 dark:border-gray-700" />
                                <div className="flex-1">
                                    <Link to={`/products/${item.product}`} className="font-semibold text-gray-900 dark:text-white hover:underline">{item.name}</Link>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Qty: {item.quantity}</p>
                                </div>
                                <div className="font-bold text-gray-900 dark:text-white">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="bg-gray-50 dark:bg-slate-800 p-4">
                        <div className="flex justify-end pt-2 text-sm">
                            <span className="w-48 text-gray-600 dark:text-gray-400">Subtotal</span>
                            <span className="w-32 text-right font-medium text-gray-900 dark:text-white">${(order.totalPrice - order.taxPrice - order.shippingPrice).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-end pt-2 text-sm">
                            <span className="w-48 text-gray-600 dark:text-gray-400">Shipping</span>
                            <span className="w-32 text-right font-medium text-gray-900 dark:text-white">${order.shippingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-end pt-2 text-sm">
                            <span className="w-48 text-gray-600 dark:text-gray-400">Tax</span>
                            <span className="w-32 text-right font-medium text-gray-900 dark:text-white">${order.taxPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-end pt-4 pb-2 border-t mt-4 border-gray-200 dark:border-white/10 font-bold text-lg">
                            <span className="w-48 text-gray-900 dark:text-white">Total</span>
                            <span className="w-32 text-right text-gray-900 dark:text-white">${order.totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
