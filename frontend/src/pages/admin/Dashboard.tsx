import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { Product, Order } from '../../types';
import { Package, ShoppingBag, Truck, Users } from 'lucide-react';

export const AdminDashboard = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [prodRes, orderRes] = await Promise.all([
                    productService.getProducts({ limit: 100 }), // Simplified logic to derive stats
                    orderService.getAllOrders({ limit: 100 })
                ]);

                const fetchedProducts = prodRes.data?.products || prodRes.data || [];
                const fetchedOrders = orderRes.data || orderRes || [];

                setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
                setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
            } catch (error) {
                console.error('Failed to load dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const pendingOrders = orders.filter(o => !o.isDelivered && o.status !== 'cancelled').length;

    return (
        <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 mb-1">Dashboard</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome back, Admin.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
                <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-lg flex items-center hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.2)] transition-all duration-300 group animate-fade-in opacity-0" style={{ animationFillMode: 'forwards' }}>
                    <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Package className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                        <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{products.length}</p>
                    </div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-lg flex items-center hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(22,163,74,0.2)] transition-all duration-300 group animate-fade-in opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
                    <div className="p-4 rounded-2xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <ShoppingBag className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                        <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{orders.length}</p>
                    </div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-lg flex items-center hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(202,138,4,0.2)] transition-all duration-300 group animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
                    <div className="p-4 rounded-2xl bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 mr-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Truck className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending Orders</p>
                        <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">{pendingOrders}</p>
                    </div>
                </div>

                <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-lg flex items-center hover:scale-[1.02] hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(147,51,234,0.2)] transition-all duration-300 group animate-fade-in opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
                    <div className="p-4 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                        <Users className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Est. Revenue</p>
                        <p className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">${totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                <div className="bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-lg p-6 sm:p-8">
                    <h2 className="text-xl font-bold mb-6 dark:text-gray-100 flex items-center">
                        <span className="w-2 h-8 rounded-full bg-brand-500 mr-3"></span>
                        Quick Links
                    </h2>
                    <div className="space-y-4">
                        <Link to="/admin/products" className="block px-6 py-4 bg-gray-50 dark:bg-zinc-800/80 hover:bg-brand-50 hover:border-brand-200 dark:hover:bg-brand-900/20 border border-transparent dark:hover:border-brand-500/30 rounded-2xl font-semibold transition-all duration-300 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 hover:shadow-md hover:-translate-y-0.5 group">
                            Manage Products <span className="inline-block transform group-hover:translate-x-1 group-hover:text-brand-500 transition-transform">&rarr;</span>
                        </Link>
                        <Link to="/admin/orders" className="block px-6 py-4 bg-gray-50 dark:bg-zinc-800/80 hover:bg-brand-50 hover:border-brand-200 dark:hover:bg-brand-900/20 border border-transparent dark:hover:border-brand-500/30 rounded-2xl font-semibold transition-all duration-300 dark:text-gray-200 hover:text-brand-600 dark:hover:text-brand-400 hover:shadow-md hover:-translate-y-0.5 group">
                            Manage Orders <span className="inline-block transform group-hover:translate-x-1 group-hover:text-brand-500 transition-transform">&rarr;</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
