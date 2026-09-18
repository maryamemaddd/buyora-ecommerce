import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { TopBanner } from './TopBanner';

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-500 relative overflow-clip bg-slate-50 dark:bg-[#020617] isolate">
            {/* Animated Background Orbs for Light Mode */}
            <div className="block dark:hidden fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-[120px] blob"></div>
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-sky-200/40 rounded-full blur-[120px] blob animation-delay-2000"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[700px] h-[700px] bg-indigo-200/30 rounded-full blur-[140px] blob animation-delay-4000"></div>
            </div>

            {/* Minimalist Ambient Glow for Dark Mode (No colors, just subtle light) */}
            <div className="hidden dark:block fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] blob"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[150px] blob animation-delay-4000"></div>
            </div>

            <div className="flex flex-col min-h-screen w-full font-sans antialiased">
                <TopBanner />
                <Navbar />
                <main className="flex-grow w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fade-in">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};
