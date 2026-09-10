import React, { useEffect, useState } from 'react';
import { orderService } from '../../services/orderService';
import { Order } from '../../types';
import toast from 'react-hot-toast';

export const AdminOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    const statuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await orderService.getAllOrders({ limit: 1000 });
            const fetched = res.data || res || [];
            setOrders(Array.isArray(fetched) ? fetched : []);
        } catch (error) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        if (window.confirm(`Update order status to ${newStatus}?`)) {
            setUpdatingId(orderId);
            try {
                await orderService.updateOrderStatus(orderId, newStatus);
                toast.success(`Order status updated to ${newStatus}`);
                fetchOrders();
            } catch (error) {
                toast.error('Failed to update status');
            } finally {
                setUpdatingId(null);
            }
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-1">Manage Orders</h1>
                    <p className="text-gray-500 dark:text-gray-400">View and update customer order statuses.</p>
                </div>
            </div>

            <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-lg border border-gray-100 dark:border-white/10 overflow-hidden sm:rounded-[2rem] animate-fade-in opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10 whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-zinc-900/50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions / Update</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-white/10">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center">
                                        <div className="flex justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black dark:border-white"></div></div>
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        No orders available.
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-brand-50/40 dark:hover:bg-zinc-800/60 transition-all duration-300 group">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors">
                                            #{order._id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-gray-200">
                                            ${order.totalPrice?.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                {order.isPaid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                                                {order.status || (order.isDelivered ? 'delivered' : 'pending')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm">
                                            <select
                                                disabled={updatingId === order._id}
                                                className="block w-full border-gray-300 dark:border-white/20 bg-transparent dark:text-white dark:[&>option]:bg-zinc-900 rounded-md shadow-sm focus:ring-brand-500 focus:border-brand-500 sm:text-sm p-1.5"
                                                value={order.status || (order.isDelivered ? 'delivered' : 'pending')}
                                                onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            >
                                                {statuses.map(s => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
