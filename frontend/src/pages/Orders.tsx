import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Order } from '../types';
import { Package, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await orderService.getMyOrders();
                setOrders(res.data || res || []);
            } catch (error) {
                toast.error('Failed to load orders');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="text-center py-20">
                <Package className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">No orders yet</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">You haven't placed any orders.</p>
                <div className="mt-6">
                    <Link to="/products" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors">
                        Start Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">My Orders</h1>

            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl shadow overflow-hidden sm:rounded-lg border border-gray-100 dark:border-white/5">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-white/10">
                    {orders.map((order) => (
                        <li key={order._id}>
                            <Link to={`/orders/${order._id}`} className="block hover:bg-gray-50 dark:hover:bg-white/5 transition">
                                <div className="flex items-center px-4 py-6 sm:px-6">
                                    <div className="min-w-0 flex-1 flex items-center">
                                        <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
                                            <Package className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                            <div>
                                                <p className="text-sm font-bold text-black dark:text-white truncate">Order #{order._id}</p>
                                                <p className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </p>
                                            </div>
                                            <div className="hidden md:block">
                                                <div>
                                                    <p className="text-sm text-gray-900 dark:text-gray-200">
                                                        Total: <span className="font-bold text-gray-900 dark:text-white">${order.totalPrice?.toFixed(2)}</span>
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                            {order.isPaid ? 'Paid' : 'Unpaid'}
                                                        </span>
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>
                                                            {order.status || (order.isDelivered ? 'Delivered' : 'Pending')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
