import React from 'react';

export const TopBanner = () => {
    // Array of promo items to repeat seamlessly
    const promos = [
        <div key="1" className="flex items-center gap-3 mx-8">
            <span className="text-lg">🎁</span>
            <span>Free Shipping on orders over <span className="text-amber-400 font-bold">$100</span></span>
        </div>,
        <div key="2" className="flex items-center gap-3 mx-8">
            <span className="text-xl glow-star">⭐</span>
            <span>Premium 24/7 Customer Support</span>
        </div>,
        <div key="3" className="flex items-center gap-3 mx-8">
            <span className="text-lg">🔥</span>
            <span>Limited Time Offers <span className="text-pink-400 font-bold">Up to 40% OFF</span></span>
        </div>,
        <div key="4" className="flex items-center gap-3 mx-8">
            <span className="text-lg">💎</span>
            <span>Unveil Modern Elegance</span>
        </div>,
    ];

    // We render the list twice to create a perfect layout for the -50% CSS ticker transform
    return (
        <div className="w-full bg-[#050510] text-[#f8fafc] overflow-hidden py-1 border-b border-white/10 z-[100] relative drop-shadow-2xl">
            {/* The wrapper must explicitly contain the width of its contents. */}
            <div className="flex whitespace-nowrap overflow-hidden">
                <div className="animate-ticker text-xs md:text-sm font-semibold tracking-wider text-gray-200">
                    {/* First iteration */}
                    {promos}
                    {/* Second iteration for a seamless loop */}
                    {promos}
                </div>
            </div>
            {/* Super premium subtle top gradient line */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-500 to-transparent opacity-50"></div>
        </div>
    );
};
