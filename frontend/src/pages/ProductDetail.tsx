import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

import { Button } from '../components/ui/Button';
import { Star, Truck, ShieldCheckIcon, AlertCircle, ArrowLeft } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import toast from 'react-hot-toast';

export const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState('');
    const { addToCart, loading: cartLoading } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await productService.getProductById(id!);
                const prod = res.data || res;
                setProduct(prod);
                if (prod.images && prod.images.length > 0) {
                    setActiveImage(prod.images[0].url);
                } else if (prod.image) {
                    setActiveImage(prod.image);
                } else {
                    setActiveImage('https://images.unsplash.com/photo-placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable');
                }
            } catch (error) {
                console.error('Failed to load product', error);
                toast.error('Product not found');
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!product) return;
        await addToCart(product._id, quantity);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <Link to="/products" className="text-blue-600 hover:underline">Return to products</Link>
            </div>
        );
    }

    const images = product.images?.length > 0
        ? product.images.map(img => img.url)
        : [product.image || 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable'];

    return (
        <div className="bg-transparent">
            <div className="max-w-2xl mx-auto lg:max-w-none">
                {/* Navigation and Breadcrumbs */}
                <ScrollReveal animation="-translate-x-10 opacity-0" duration="duration-[800ms]">

                    <nav aria-label="Breadcrumb" className="mb-4">
                        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/" className="hover:text-gray-900 dark:hover:text-white">Home</Link></li>
                            <li>/</li>
                            <li><Link to={`/products?category=${product.category}`} className="hover:text-gray-900 dark:hover:text-white">{product.category}</Link></li>
                            <li>/</li>
                            <li className="text-gray-900 dark:text-gray-100 font-medium truncate">{product.name}</li>
                        </ol>
                    </nav>

                    <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-8 font-semibold group w-max">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back
                    </button>

                </ScrollReveal>

                <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-12">
                    {/* Image gallery */}
                    <div className="flex flex-col-reverse">
                        <ScrollReveal delay={200} animation="translate-y-16 opacity-0" duration="duration-[1000ms]">
                            {images.length > 1 && (
                                <div className="mt-4 sm:mt-6 w-full max-w-2xl mx-auto lg:max-w-none">
                                    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 sm:grid sm:grid-cols-4 sm:gap-6 custom-scrollbar">
                                        {images.map((img, i) => (
                                            <button
                                                key={i}
                                                className={`relative flex-shrink-0 w-20 h-20 sm:w-auto sm:h-24 bg-white dark:bg-gray-800 rounded-xl sm:rounded-md flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-hidden transition-all ${activeImage === img ? 'ring-2 ring-brand-500 shadow-md scale-95' : 'ring-1 ring-transparent border border-gray-200 dark:border-gray-700'}`}
                                                onClick={() => setActiveImage(img)}
                                            >
                                                <span className="absolute inset-0 rounded-xl sm:rounded-md overflow-hidden">
                                                    <img
                                                        src={img}
                                                        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable' }}
                                                        alt=""
                                                        className="w-full h-full object-center object-cover"
                                                    />
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="w-full max-w-[400px] mx-auto aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-3xl relative shadow-2xl border border-gray-100/50 dark:border-white/10 flex items-center justify-center group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent dark:from-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20"></div>
                                <img
                                    src={activeImage}
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x800/18181b/3f3f46?text=Image+Unavailable' }}
                                    alt={product.name}
                                    className="w-full h-full object-center object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                                />
                                {product.stock === 0 && (
                                    <div className="absolute top-6 right-6 bg-red-600/90 backdrop-blur-xl text-white font-extrabold tracking-widest uppercase px-5 py-2.5 rounded-full shadow-2xl z-30">
                                        Sold Out
                                    </div>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 lg:mt-0">
                        <ScrollReveal delay={400} animation="translate-x-16 opacity-0" duration="duration-[1000ms]">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-400 dark:shimmer-text tracking-tight mb-3 leading-tight line-clamp-2">{product.name}</h1>

                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <p className="text-3xl font-extrabold text-gray-900 dark:text-slate-100 drop-shadow-md">${Number(product.price).toFixed(2)}</p>
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center bg-white/70 dark:bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm">
                                        <div className="flex text-yellow-500">
                                            <Star className="w-5 h-5 fill-current" />
                                        </div>
                                        <span className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{product.rating ? Number(product.rating).toFixed(1) : 'New Arrival'}</span>
                                    </div>
                                    {product.numReviews !== undefined && (
                                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">({product.numReviews} Verified Reviews)</span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 border-t border-b py-6 border-gray-200 dark:border-gray-700 space-y-4">
                                <h3 className="sr-only">Description</h3>
                                <div className="text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {product.description}
                                </div>
                            </div>

                            <div className="mt-6 flex flex-col space-y-6">
                                <div className="flex flex-wrap items-center gap-4 bg-white/40 dark:bg-slate-900/40 p-4 rounded-2xl border border-gray-200/50 dark:border-white/5 backdrop-blur-md w-full sm:w-max">
                                    <label htmlFor="quantity" className="text-base font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">Quantity</label>
                                    <div className="flex items-center space-x-4">
                                        <select
                                            id="quantity"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}
                                            disabled={product.stock === 0}
                                            className="rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white py-2 px-6 text-center font-bold shadow-sm focus:border-brand-500 focus:outline-hidden focus:ring-2 focus:ring-brand-500/50 text-lg cursor-pointer disabled:bg-gray-100 dark:disabled:bg-gray-900 disabled:opacity-50 transition-all hover:shadow-md"
                                        >
                                            {[...Array(product.stock > 0 ? Math.min(product.stock, 10) : 1)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                                            {product.stock > 0 ? <span className="text-green-600 dark:text-green-400">{product.stock} In Stock</span> : <span className="text-red-500">None available</span>}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    size="lg"
                                    className="w-full sm:w-[90%] max-w-[400px] h-[60px] text-xl rounded-full font-bold shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300 overflow-hidden relative group"
                                    disabled={product.stock === 0 || cartLoading}
                                    onClick={handleAddToCart}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
                                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart — Reserve Now'}
                                </Button>
                            </div>

                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pb-8">
                                <div className="flex items-start bg-white/60 dark:bg-slate-900/60 p-4 sm:p-6 rounded-[1.5rem] border border-gray-200/50 dark:border-white/5 backdrop-blur-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="p-3 bg-brand-50 dark:bg-brand-900/30 rounded-2xl group-hover:scale-110 transition-transform">
                                        <Truck className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-extrabold text-gray-900 dark:text-white text-base mb-1">Global Shipping</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">Complimentary on orders over $100</p>
                                    </div>
                                </div>
                                <div className="flex items-start bg-white/60 dark:bg-slate-900/60 p-6 rounded-[1.5rem] border border-gray-200/50 dark:border-white/5 backdrop-blur-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                                    <div className="p-3 bg-accent-50 dark:bg-accent-900/30 rounded-2xl group-hover:scale-110 transition-transform">
                                        <ShieldCheckIcon className="w-6 h-6 text-accent-500" />
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="font-extrabold text-gray-900 dark:text-white text-base mb-1">Secure Vault</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium leading-relaxed">100% encrypted checkout protocol</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </div>
            </div>
        </div>
    );
};
