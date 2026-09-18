import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from './Button';
import { Star, ShoppingCart } from 'lucide-react';


interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart, loading } = useCart();
    const navigate = useNavigate();
    const imageUrl = product.image || product.images?.[0]?.url || 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable';

    return (
        <div
            className="group perspective-1000 w-full h-[450px] cursor-pointer"
            onClick={() => navigate(`/products/${product._id}`)}
        >
            <div className="relative w-full h-full transition-transform duration-[800ms] transform-style-3d group-hover:rotate-y-180">
                {/* --- FRONT SIDE --- */}
                <div className="absolute inset-0 backface-hidden flex flex-col rounded-[1.5rem] border border-gray-100 dark:border-white/5 bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl overflow-hidden shadow-sm mirror-effect neon-glow">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent dark:from-white/5 opacity-0 transition-opacity duration-500 z-0 pointer-events-none"></div>
                    <div className="relative overflow-hidden aspect-square flex-shrink-0 z-10 w-full">
                        <img
                            src={imageUrl}
                            alt={product.name}
                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/500x500/18181b/3f3f46?text=Image+Unavailable' }}
                            className="w-full h-full object-center object-cover scale-105 transition-transform duration-[1500ms] ease-out group-hover:scale-110"
                        />
                        {product.stock === 0 && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-md">
                                Out of Stock
                            </div>
                        )}
                        <div className="absolute top-3 left-3 flex items-center text-yellow-500 text-xs bg-white/80 dark:bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full shadow-xs">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="ml-1 font-bold">{product.rating ? Number(product.rating).toFixed(1) : 'New'}</span>
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-grow z-10 bg-white/80 dark:bg-transparent">
                        <span className="text-xs text-brand-600 dark:text-brand-400 font-bold tracking-widest uppercase mb-1">{product.category}</span>
                        <h3 className="text-sm font-bold text-gray-900 dark:text-slate-200 tracking-tight line-clamp-1 mb-auto">{product.name}</h3>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-base font-black text-gray-900 dark:text-slate-100 tracking-tighter">${Number(product.price).toFixed(2)}</span>
                            {/* Visual cue that it flips */}
                            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">Hover for details &rarr;</span>
                        </div>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-center items-center rounded-[1.5rem] border border-gray-100 dark:border-white/10 bg-white dark:bg-slate-900 backdrop-blur-xl overflow-hidden shadow-2xl p-6 text-center">
                    {/* Glowing effect inside the back card */}
                    <div className="absolute top-[-20%] right-[-20%] w-[200px] h-[200px] bg-brand-500/20 rounded-full mix-blend-screen filter blur-[50px] opacity-70"></div>

                    <h3 className="text-sm font-bold text-gray-900 dark:text-white tracking-tight mb-2">{product.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-[11px] mb-2 line-clamp-4 leading-relaxed">
                        {product.description || "Experience the pinnacle of luxury with this expertly crafted piece, designed to elevate your sophisticated lifestyle."}
                    </p>

                    <div className="text-lg font-black text-brand-600 dark:text-brand-400 tracking-tighter mb-4">
                        ${Number(product.price).toFixed(2)}
                    </div>

                    <div className="flex flex-col gap-3 w-full">
                        <Button
                            size="sm"
                            variant={product.stock > 0 ? 'primary' : 'secondary'}
                            disabled={product.stock === 0 || loading}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                addToCart(product._id);
                            }}
                            className="w-full rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-300 font-bold"
                        >
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                        </Button>
                        <Link
                            to={`/products/${product._id}`}
                            className="w-full py-2 px-3 text-sm rounded-2xl bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold transition-all duration-300 transform active:scale-95"
                            onClick={(e) => e.stopPropagation()}
                        >
                            View Full Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
