import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const { itemCount } = useCart();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const linkBase = "px-4 py-2 text-base font-medium transition-all duration-300 rounded-full relative group";
    const linkInactive = "text-gray-500 dark:text-gray-400 hover:!text-indigo-600 dark:hover:!text-indigo-400 hover:bg-indigo-500/10 hover:scale-105 transform inline-block";
    const linkActive = "text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-500/10 ring-2 ring-indigo-500/50 scale-105 shadow-[0_0_15px_rgba(99,102,241,0.2)]";

    const getLinkClass = (path: string) => {
        return `${linkBase} ${location.pathname === path ? linkActive : linkInactive}`;
    };

    return (
        <nav className="glass-nav sticky top-0 z-50 transition-all duration-500 border-b border-gray-200/50 dark:border-white/10 w-full bg-white/95 dark:bg-zinc-950/95 shadow-lg backdrop-blur-2xl">
            <div className="w-full h-20 px-6 sm:px-8 lg:px-10 flex justify-between items-center transition-all">
                <div className="flex items-center cursor-pointer group" onClick={() => navigate('/')}>
                    <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 mr-1.5 md:mr-2 text-brand-600 dark:text-brand-400 group-hover:-rotate-12 transition-transform duration-300 stroke-[2.5]" />
                    <span className="text-2xl md:text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400 group-hover:scale-105 transition-transform duration-300">Buyora</span>
                </div>

                <div className="hidden sm:flex sm:items-center sm:space-x-1">
                    <Link to="/" className={getLinkClass('/')}>Home</Link>
                    <Link to="/products" className={getLinkClass('/products')}>Shop</Link>

                    {/* Support Dropdown */}
                    <div className="relative group cursor-pointer z-50">
                        <span className={getLinkClass('/help').replace('hover:-translate-y-1', '')}>Support</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100]">
                            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden py-2 flex flex-col">
                                <Link to="/help" className="px-5 py-3 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors text-sm font-medium">Help Center</Link>
                                <Link to="/track-order" className="px-5 py-3 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors text-sm font-medium">Track Order</Link>
                                <Link to="/returns" className="px-5 py-3 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors text-sm font-medium">Returns & Refunds</Link>
                                <Link to="/privacy" className="px-5 py-3 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors text-sm font-medium border-t border-gray-100 dark:border-gray-800">Privacy Policy</Link>
                                <Link to="/terms" className="px-5 py-3 hover:bg-indigo-50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-200 transition-colors text-sm font-medium">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                    {isAuthenticated ? (
                        <>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className={getLinkClass('/admin')}>Dashboard</Link>
                            )}
                            <Link to="/orders" className={getLinkClass('/orders')}>Orders</Link>
                            <Link to="/profile" className={`p-2 rounded-full transition-transform hover:scale-110 ${location.pathname === '/profile' ? linkActive : linkInactive}`}>
                                <User className="h-5 w-5" />
                            </Link>
                            <button onClick={handleLogout} className="px-4 py-2 text-base font-medium transition-all duration-300 rounded-full text-gray-500 dark:text-gray-400 hover:!text-red-600 dark:hover:!text-red-400 hover:bg-red-500/10 inline-block transform hover:scale-105">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={getLinkClass('/login')}>Login</Link>
                            <Link to="/register" className="ml-4 relative group overflow-hidden px-8 py-2.5 rounded-full text-sm font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 transition-all duration-300 ring-1 ring-white/20 dark:ring-white/10">
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%,100%_100%] animate-[shimmer_2s_infinite]"></div>
                                <span className="relative z-10 drop-shadow-md tracking-wide">Register</span>
                            </Link>
                        </>
                    )}
                    <div className="w-px h-8 bg-gray-200 dark:bg-white/10 mx-3"></div>
                    <button onClick={toggleTheme} className="text-gray-500 dark:text-gray-400 hover:!text-amber-500 dark:hover:!text-amber-400 p-2.5 rounded-full transition-all hover:bg-amber-500/10 hover:scale-110 hover:rotate-12 inline-block transform" aria-label="Toggle Theme">
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <Link to="/cart" className={`p-2.5 ml-1 rounded-full relative transition-all hover:scale-110 transform inline-block text-gray-500 dark:text-gray-400 hover:!text-indigo-600 dark:hover:!text-indigo-400 hover:bg-indigo-500/10 ${location.pathname === '/cart' ? 'text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/50 bg-indigo-500/10 scale-105' : ''}`}>
                        <ShoppingCart className="h-6 w-6" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full shadow-red-500/50 shadow-md">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                </div>
                <div className="flex items-center sm:hidden">
                    <button onClick={toggleTheme} className="text-gray-600 dark:text-gray-300 p-2 rounded-full transition-colors mr-1">
                        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                    </button>
                    <Link to="/cart" className="text-gray-600 dark:text-gray-300 p-2 mr-1 rounded-full relative">
                        <ShoppingCart className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full shadow-md">
                                {itemCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 dark:text-gray-300 hover:text-brand-500 transition-colors">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="sm:hidden border border-gray-200 dark:border-white/10 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl absolute w-[95%] left-[2.5%] shadow-2xl rounded-2xl mt-4 overflow-hidden top-full z-50">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link to="/" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Home</Link>
                        <Link to="/products" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Shop</Link>

                        <div className="border-t border-gray-100 dark:border-white/10 my-2 pt-2 pb-1">
                            <span className="block px-4 py-1 text-xs font-bold text-gray-400 uppercase tracking-wider">Support</span>
                            <Link to="/help" className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">Help Center</Link>
                            <Link to="/track-order" className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">Track Order</Link>
                            <Link to="/returns" className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">Returns & Refunds</Link>
                            <Link to="/privacy" className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">Privacy Policy</Link>
                            <Link to="/terms" className="block px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800">Terms of Service</Link>
                        </div>

                        <div className="border-t border-gray-100 dark:border-white/10 my-2"></div>
                        {isAuthenticated ? (
                            <>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Dashboard</Link>
                                )}
                                <Link to="/orders" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Orders</Link>
                                <Link to="/profile" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Profile</Link>
                                <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-800">Login</Link>
                                <Link to="/register" className="block px-4 py-3 mt-1 mx-2 text-base font-bold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-xl text-center shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-lg transition-all ring-1 ring-white/20 dark:ring-white/10">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};
