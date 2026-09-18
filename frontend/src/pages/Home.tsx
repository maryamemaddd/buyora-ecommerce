import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/ui/ProductCard';
import { ArrowRight, ShoppingBag, Truck, ShieldCheckIcon, Star } from 'lucide-react';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const heroImages = [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80"
    ];

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const res = await productService.getProducts({ limit: 4 });
                const items = res.data?.products || res.data || [];
                setFeaturedProducts(Array.isArray(items) ? items.slice(0, 4) : []);
            } catch (error) {
                console.error('Failed to load featured products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const categories = [
        { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80' },
        { name: 'Clothing', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80' },
        { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80' },
        { name: 'Beauty', image: 'https://images.unsplash.com/photo-1584846969629-fa7b839b1bd3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Books', image: 'https://plus.unsplash.com/premium_photo-1669652639337-c513cc42ead6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { name: 'Sports', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80' },
        { name: 'Home', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=400&q=80' },
    ];

    return (
        <div className="flex flex-col space-y-16 lg:space-y-24 overflow-hidden pb-12">
            {/* Hero Section */}
            <ScrollReveal animation="translate-y-10 opacity-0" duration="duration-[1200ms]">
                <section className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 h-[65vh] min-h-[450px] shadow-2xl mx-2 mt-4 group border border-gray-200 dark:border-gray-800">
                    <Swiper
                        modules={[Autoplay, EffectFade, Pagination]}
                        effect="fade"
                        speed={1500}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true, el: '.swiper-pagination', type: 'bullets' }}
                        loop={true}
                        className="absolute inset-0 w-full h-full z-0"
                    >
                        {heroImages.map((src) => (
                            <SwiperSlide key={src}>
                                <div className="w-full h-full relative">
                                    <img src={src} className="w-full h-full object-cover transition-transform duration-[10000ms] ease-out scale-100 hover:scale-110" alt="Hero" onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&q=80' }} />
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/40 to-transparent" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Centered Pagination Wrapper */}
                    <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                        <div className="swiper-pagination relative"></div>
                    </div>

                    {/* Passive Mechanics: Floating Balloons and Stars */}
                    <div className="absolute top-10 left-[10%] w-2 h-10 bg-white/20 rounded-full blur-[2px] animate-shooting-star z-10 pointer-events-none"></div>
                    <div className="absolute top-40 right-[20%] w-1.5 h-8 bg-blue-400/30 rounded-full blur-[1px] animate-shooting-star !animation-delay-[4000ms] z-10 pointer-events-none"></div>
                    <div className="absolute bottom-[-50px] left-[30%] w-8 h-10 rounded-full bg-brand-500/10 backdrop-blur-md animate-float-balloon z-10 pointer-events-none border border-white/5"></div>
                    <div className="absolute bottom-[-100px] right-[40%] w-12 h-16 rounded-full bg-accent-500/10 backdrop-blur-md animate-float-balloon !animation-delay-[7000ms] z-10 pointer-events-none border border-white/5"></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none">
                        <motion.h1
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 dark:shimmer-text tracking-tighter mb-6 drop-shadow-2xl"
                        >
                            Elevate Your Space
                        </motion.h1>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
                            className="text-lg md:text-xl lg:text-3xl text-gray-200 mb-10 max-w-3xl font-light drop-shadow-md"
                        >
                            Discover a curated collection of ultra-premium goods designed to redefine modern elegance.
                        </motion.p>
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
                            className="pointer-events-auto"
                        >
                            <Link
                                to="/products"
                                className="group/btn inline-flex items-center px-6 py-3 md:px-10 md:py-5 text-base md:text-lg font-bold text-gray-900 dark:text-gray-900 bg-white/90 dark:bg-white/90 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-white transition-all duration-500 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:scale-105 hover:-translate-y-1"
                            >
                                Explore Collection <ArrowRight className="ml-3 w-6 h-6 transition-transform group-hover/btn:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </ScrollReveal>

            {/* Features */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mt-8">
                <ScrollReveal delay={100} animation="-translate-x-12 opacity-0">
                    <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-20 h-20 bg-brand-50 dark:bg-brand-900/40 rounded-3xl flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <Truck className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">Free Worldwide Delivery</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">On all premium orders over $100</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={300} animation="translate-y-12 opacity-0">
                    <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-20 h-20 bg-accent-50 dark:bg-accent-900/40 rounded-3xl flex items-center justify-center mb-6 text-accent-500 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <ShieldCheckIcon className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">Secure Vault Payments</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">256-bit AES encryption by Stripe</p>
                    </div>
                </ScrollReveal>
                <ScrollReveal delay={500} animation="translate-x-12 opacity-0">
                    <div className="flex flex-col items-center text-center p-6 md:p-10 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 dark:border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/40 rounded-3xl flex items-center justify-center mb-6 text-yellow-600 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                            <ShoppingBag className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 tracking-tight">Curated Authenticity</h3>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">100% genuine curated artifacts</p>
                    </div>
                </ScrollReveal>
            </section>

            {/* Featured Products */}
            <section className="px-4">
                <ScrollReveal>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-slate-400 mb-2">Editor's Picks</h2>
                            <p className="text-gray-500 dark:text-slate-400 max-w-2xl font-medium">Curated selections of our finest premium products.</p>
                        </div>
                        <Link to="/products" className="hidden sm:flex items-center text-brand-600 dark:text-brand-400 font-bold hover:text-brand-700 dark:hover:text-brand-300 transition">
                            View everything <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product, index) => (
                            <ScrollReveal key={product._id} delay={index * 150} animation="translate-y-20 opacity-0 scale-95" duration="duration-[1000ms]">
                                <ProductCard product={product} />
                            </ScrollReveal>
                        ))}
                    </div>
                )}
            </section>

            {/* Featured Categories */}
            <section className="px-4 pb-12 w-full max-w-6xl mx-auto">
                <ScrollReveal>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:to-gray-500 mb-8 text-center">Shop by Category</h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((cat, index) => (
                        <ScrollReveal key={cat.name} delay={index * 200} animation="translate-y-10 opacity-0" duration="duration-[900ms]">
                            <Link
                                to={`/products?category=${cat.name}`}
                                className="relative rounded-3xl overflow-hidden aspect-[4/3] group shadow-lg hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_40px_rgba(99,102,241,0.2)] transition-all duration-500 block border border-transparent hover:border-white/20"
                            >
                                <img
                                    src={cat.image}
                                    onError={(e) => { e.currentTarget.src = 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable' }}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110 group-hover:blur-[2px]"
                                    alt={cat.name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent group-hover:from-brand-900/90 group-hover:via-indigo-900/40 transition-all duration-700" />

                                {/* Center Title (Moves up on hover) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-8">
                                    <span className="text-white text-lg md:text-xl font-bold uppercase tracking-widest drop-shadow-md">{cat.name}</span>
                                </div>

                                {/* Shop Now Button (Fades and rises from bottom) */}
                                <div className="absolute inset-x-0 bottom-8 px-6 flex flex-col items-center justify-end opacity-0 transform translate-y-12 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-75">
                                    <div className="bg-white text-gray-900 px-8 py-3.5 rounded-full font-bold shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 group/btn2">
                                        Shop Now <ArrowRight className="w-5 h-5 transition-transform group-hover/btn2:translate-x-1" />
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="px-6 py-12 md:py-20 bg-white/60 dark:bg-slate-900/40 rounded-[3rem] mx-2 shadow-2xl backdrop-blur-xl border border-white/60 dark:border-white/10 my-16">
                <ScrollReveal>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-slate-100 mb-12 text-center">What Our Customers Say</h2>
                </ScrollReveal>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: "Sarah K.", role: "Verified Buyer", text: "Absolutely stunning quality. The packaging alone felt extremely premium. Will definitely shop here again!" },
                        { name: "Jason M.", role: "Verified Buyer", text: "Customer service is top tier and shipping was lightning fast. The velvet accent chair is the centerpiece of my living room." },
                        { name: "Elena R.", role: "Verified Buyer", text: "Buyora is my go-to for curated gifts. Every product feels like it's been hand-picked by a world-class designer." }
                    ].map((t, idx) => (
                        <ScrollReveal key={idx} delay={idx * 200} animation="translate-y-10 opacity-0" duration="duration-[800ms]">
                            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                                <div className="flex text-yellow-400 mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{t.text}"</p>
                                <div className="mt-auto">
                                    <h4 className="font-bold text-gray-900 dark:text-slate-200">{t.name}</h4>
                                    <span className="text-xs text-brand-600 dark:text-brand-400 uppercase tracking-widest font-semibold">{t.role}</span>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </section>

            {/* Newsletter Subscription */}
            <section className="px-4 pb-16">
                <ScrollReveal animation="scale-95 opacity-0" duration="duration-[1000ms]">
                    <div className="relative rounded-[3rem] overflow-hidden bg-white/40 dark:bg-slate-900 border border-white dark:border-white/5 backdrop-blur-2xl p-8 md:p-16 lg:p-20 text-center shadow-xl dark:shadow-2xl group/newsletter transition-all duration-700">
                        {/* Advanced Animated Aurora Background */}
                        <div className="absolute inset-0 z-0 overflow-hidden">
                            <div className="absolute top-[-50%] left-[-20%] w-[70vw] h-[70vw] bg-brand-600/30 dark:bg-brand-500/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 blob"></div>
                            <div className="absolute top-[-20%] right-[-20%] w-[60vw] h-[60vw] bg-indigo-500/30 dark:bg-indigo-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 blob animation-delay-2000"></div>
                            <div className="absolute bottom-[-40%] left-[20%] w-[70vw] h-[70vw] bg-accent-500/30 dark:bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-70 blob animation-delay-4000"></div>
                            {/* Texture Overlay */}
                            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                            {/* Glassmorphic Gradient Cover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                        </div>

                        <div className="relative z-10 flex flex-col items-center justify-center">
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-400 tracking-tighter mb-4 text-center">
                                Join the <span className="text-brand-600 dark:text-brand-400">Buyora</span> Club
                            </h2>
                            <p className="max-w-2xl mx-auto text-base text-gray-700 dark:text-gray-300 font-medium mb-8 relative z-10 leading-relaxed">
                                Subscribe to receive early VIP access to new sophisticated collections, exclusive discounts, and style inspiration.
                            </p>

                            <form
                                className="w-full max-w-lg mx-auto relative group/form"
                                onSubmit={e => {
                                    e.preventDefault();
                                    // Extreme Premium Celebration using Canvas Confetti as requested
                                    confetti({
                                        particleCount: 150,
                                        spread: 70,
                                        origin: { y: 0.6 },
                                        colors: ['#8b5cf6', '#3b82f6', '#ec4899', '#ffffff'],
                                        zIndex: 9999
                                    });

                                    toast.success("You’re now part of the Buyora Club");
                                    (e.target as HTMLFormElement).reset();
                                }}
                            >
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 blur-xl opacity-20 group-hover/form:opacity-40 transition-opacity duration-700"></div>
                                <div className="relative flex flex-col sm:flex-row gap-3 p-1.5 rounded-[2rem] sm:rounded-full bg-white/60 dark:bg-white/80 backdrop-blur-xl border border-white/80 dark:border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(255,255,255,0.05)]">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-grow px-6 py-4 rounded-full bg-transparent text-gray-900 dark:text-gray-900 placeholder-gray-500 dark:placeholder-gray-600 outline-hidden focus:ring-0 transition-all font-medium"
                                        required
                                    />
                                    <button type="submit" className="relative px-8 py-4 rounded-full font-bold overflow-hidden group/btn shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all duration-500 hover:scale-[1.02] active:scale-95">
                                        <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-500 dark:to-accent-600 transition-transform duration-500 group-hover/btn:scale-110"></div>
                                        {/* Premium Shimmer Sweep on Button */}
                                        <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover/btn:animate-[shimmer_2s_infinite]"></div>
                                        <span className="relative text-white tracking-wide text-sm drop-shadow-md uppercase">Subscribe Now</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
};
