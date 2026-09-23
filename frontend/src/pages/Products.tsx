import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { ProductCard } from '../components/ui/ProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { ScrollReveal } from '../components/ui/ScrollReveal';

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Local state for filters
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');

    const categories = ['Electronics', 'Clothing', 'Jewelry', 'Beauty', 'Home', 'Sports', 'Books'];

    const currentCategory = searchParams.get('category') || '';
    const currentMinPrice = searchParams.get('minPrice') || '';
    const currentMaxPrice = searchParams.get('maxPrice') || '';
    const currentSort = searchParams.get('sort') || '';

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const params: Record<string, string> = {};
                searchParams.forEach((value, key) => {
                    params[key] = value;
                });
                const res = await productService.getProducts(params);
                const fetchedProducts = res.data?.products || res.data || [];
                setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
            } catch (error) {
                console.error('Failed to fetch products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [searchParams]);

    const updateFilters = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setSearchParams({});
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        updateFilters('search', searchTerm);
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-fade-in relative z-10">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex items-center justify-between mb-4">
                <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 pb-2 leading-relaxed">{currentCategory ? currentCategory : 'Shop All'}</h1>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center text-sm font-bold text-gray-800 dark:text-gray-200 bg-white/70 dark:bg-slate-800/80 backdrop-blur-md px-5 py-2.5 rounded-full shadow-md border border-gray-100 dark:border-gray-700"
                >
                    <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </button>
            </div>

            {/* Sidebar Filters */}
            <aside className={`
        ${isFilterOpen ? 'fixed inset-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl p-6 overflow-y-auto w-full' : 'hidden'} 
        lg:block lg:w-72 lg:shrink-0 space-y-8
      `}>
                <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-xl sticky top-24 flex flex-col max-h-[calc(100vh-8rem)]">
                    {isFilterOpen && (
                        <div className="flex justify-between items-center lg:hidden mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full hover:bg-gray-200 transition-colors"><X className="w-5 h-5 text-gray-900 dark:text-gray-100" /></button>
                        </div>
                    )}

                    <form onSubmit={handleSearch} className="relative mb-8">
                        <Input
                            placeholder="Search collection..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 rounded-full bg-white dark:bg-slate-800/50 border-gray-200 dark:border-white/10 shadow-inner h-12"
                        />
                        <Search className="w-5 h-5 text-gray-400 absolute left-4 top-[14px]" />
                        <button type="submit" className="hidden" />
                    </form>

                    {/* SCROLLABLE AREA */}
                    <div className="overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0 flex flex-col pt-1 pb-2">
                        <div className="mb-8">
                            <h3 className="font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-tight flex items-center justify-between group cursor-pointer flex-shrink-0">
                                Category
                            </h3>
                            <div className="space-y-1">
                                <button
                                    onClick={() => updateFilters('category', '')}
                                    className={`block w-full text-left font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${!currentCategory ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'}`}
                                >
                                    All Categories
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => updateFilters('category', cat)}
                                        className={`block w-full text-left font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${currentCategory === cat ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-md' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800/50'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-extrabold mb-4 text-gray-900 dark:text-gray-100 tracking-tight">Price Range</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <span className="absolute left-3 top-3.5 text-gray-400 font-medium">$</span>
                                    <Input
                                        placeholder="Min"
                                        type="number"
                                        min="0"
                                        value={currentMinPrice}
                                        onChange={(e) => updateFilters('minPrice', e.target.value)}
                                        className="pl-7 rounded-xl bg-gray-50 dark:bg-slate-800/50"
                                    />
                                </div>
                                <div className="relative">
                                    <span className="absolute left-3 top-3.5 text-gray-400 font-medium">$</span>
                                    <Input
                                        placeholder="Max"
                                        type="number"
                                        min="0"
                                        value={currentMaxPrice}
                                        onChange={(e) => updateFilters('maxPrice', e.target.value)}
                                        className="pl-7 rounded-xl bg-gray-50 dark:bg-slate-800/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={clearFilters}
                            className="w-full mt-auto py-3 text-sm font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm shrink-0 mb-2"
                        >
                            <X className="w-4 h-4" /> Clear All Filters
                        </button>
                        {isFilterOpen && (
                            <button
                                onClick={() => setIsFilterOpen(false)}
                                className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center shrink-0 mb-2"
                            >
                                Show Results ({products.length})
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 pb-16">
                <div className="hidden lg:flex items-end justify-between mb-8 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-slate-100 dark:to-gray-500 pb-2 leading-relaxed">{currentCategory ? currentCategory : 'The Collection'}</h1>
                    <div className="flex items-center space-x-3 bg-white/60 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-gray-100 dark:border-white/5 shadow-sm">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sort by:</span>
                        <select
                            value={currentSort}
                            onChange={(e) => updateFilters('sort', e.target.value)}
                            className="text-sm font-bold bg-transparent text-gray-900 dark:text-white border-0 outline-hidden focus:ring-0 cursor-pointer"
                        >
                            <option value="" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Featured</option>
                            <option value="-createdAt" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Newest Output</option>
                            <option value="price" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Price: Low to High</option>
                            <option value="-price" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Price: High to Low</option>
                        </select>
                    </div>
                </div>

                {/* Mobile Sort */}
                <div className="lg:hidden mb-8">
                    <div className="bg-white/70 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm border border-gray-100 dark:border-gray-700 p-1">
                        <select
                            value={currentSort}
                            onChange={(e) => updateFilters('sort', e.target.value)}
                            className="w-full text-sm font-bold border-0 bg-transparent text-gray-900 dark:text-white focus:ring-0 p-3"
                        >
                            <option value="" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Sort: Featured</option>
                            <option value="-createdAt" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Sort: Newest Arrival</option>
                            <option value="price" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Sort: Price Low to High</option>
                            <option value="-price" className="bg-white dark:bg-slate-800 text-gray-900 dark:text-white">Sort: Price High to Low</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="animate-pulse bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-[1.5rem] h-96 border border-gray-100 dark:border-white/5"></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <ScrollReveal key={product._id} delay={(index % 6) * 100} animation="translate-y-16 opacity-0 scale-95" duration="duration-[800ms]">
                                <ProductCard product={product} />
                            </ScrollReveal>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl rounded-[2rem] border border-dashed border-gray-300 dark:border-gray-700 shadow-inner">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-slate-100 mb-3">No products found</h3>
                        <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">We couldn't find anything matching your current filters. Try an alternate category or price range.</p>
                        <button
                            onClick={clearFilters}
                            className="px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-bold hover:scale-105 hover:shadow-xl transition-all duration-300"
                        >
                            Reset All Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
