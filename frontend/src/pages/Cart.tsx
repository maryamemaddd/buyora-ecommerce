import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Trash2, ArrowRight, ShoppingCart } from 'lucide-react';

export const Cart = () => {
    const { cartItems, updateQuantity, removeItem, clearCart, cartTotal, loading } = useCart();
    const navigate = useNavigate();

    // Based on rules: Tax is 10%, Shipping is $0 if order > $100 else $10.
    const tax = cartTotal * 0.10;
    const shipping = cartTotal > 100 ? 0 : 10;
    const total = cartTotal > 0 ? cartTotal + tax + shipping : 0;

    if (loading && cartItems.length === 0) {
        return (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 px-4 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2.5rem] border border-dashed border-gray-300 dark:border-gray-700 shadow-inner mt-8 mx-2">
                <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                    <ShoppingCart className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight mb-4 text-gray-900 dark:text-white">Your cart is empty</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto text-lg text-center leading-relaxed">It looks like you haven't added anything to your cart yet. Discover some amazing items in our shop!</p>
                <Link to="/products">
                    <Button size="lg" className="rounded-full shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-2xl hover:-translate-y-1 hover:scale-105 transition-all duration-300 px-10 py-6 text-lg font-bold">
                        Start Curating Your Style
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-transparent">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
                <div className="lg:col-span-7">
                    <ul role="list" className="border-t border-b border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                        {cartItems.map((item, index) => (
                            <li key={`${item.product}-${index}`} className="flex py-6 sm:py-8">
                                <div className="shrink-0">
                                    <img
                                        src={item.image || 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable'}
                                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable' }}
                                        alt={item.name}
                                        className="w-24 h-24 rounded-2xl object-cover object-center sm:w-32 sm:h-32 shadow-sm hover:scale-105 transition-transform duration-300 border border-gray-100"
                                    />
                                </div>

                                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                        <div>
                                            <div className="flex justify-between">
                                                <h3 className="text-sm">
                                                    <Link to={`/products/${item.product}`} className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
                                                        {item.name}
                                                    </Link>
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">${Number(item.price).toFixed(2)}</p>
                                        </div>

                                        <div className="mt-4 sm:mt-0 sm:pr-9">
                                            <label htmlFor={`quantity-${index}`} className="sr-only">Quantity</label>
                                            <select
                                                id={`quantity-${index}`}
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item._id || item.product, Number(e.target.value))}
                                                className="max-w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white py-1.5 text-left text-base font-medium leading-5 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm"
                                            >
                                                {[...Array(10)].map((_, i) => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </select>

                                            <div className="absolute top-0 right-0">
                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item._id || item.product)}
                                                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <span className="sr-only">Remove</span>
                                                    <Trash2 className="h-5 w-5" aria-hidden="true" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 flex justify-between">
                        <button
                            onClick={clearCart}
                            className="text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                        >
                            Clear Entire Cart
                        </button>
                    </div>
                </div>

                {/* Order summary */}
                <section className="mt-16 bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2rem] px-6 py-10 sm:p-10 lg:p-12 lg:mt-0 lg:col-span-5 lg:sticky lg:top-28 border border-gray-200/50 dark:border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 opacity-50 z-0 pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Order summary</h2>

                        <dl className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center justify-between">
                                <dt>Subtotal</dt>
                                <dd className="text-gray-900 dark:text-white font-medium">${cartTotal.toFixed(2)}</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                                <dt className="flex items-center">
                                    <span>Shipping estimate</span>
                                </dt>
                                <dd className="text-gray-900 dark:text-white font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                                <dt className="flex items-center">
                                    <span>Tax estimate (10%)</span>
                                </dt>
                                <dd className="text-gray-900 dark:text-white font-medium">${tax.toFixed(2)}</dd>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4 text-base font-bold text-gray-900 dark:text-white">
                                <dt>Order total</dt>
                                <dd>${total.toFixed(2)}</dd>
                            </div>
                        </dl>

                        <div className="mt-10 relative">
                            <Button
                                className="w-full text-xl font-bold h-16 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center group hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                                onClick={() => navigate('/checkout')}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                                Secure Checkout <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover:translate-x-2" />
                            </Button>
                        </div>

                        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>
                                or{' '}
                                <Link to="/products" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Continue Browsing</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
