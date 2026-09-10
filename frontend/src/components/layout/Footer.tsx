import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <ShoppingBag className="w-8 h-8 mr-2 text-brand-600 dark:text-brand-400 stroke-[2.5]" />
                            <div className="text-3xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-accent-500 dark:from-brand-400 dark:to-accent-400 inline-block">
                                Buyora
                            </div>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                            Premium products for a premium lifestyle. We bring you the highest quality curated goods from around the world.
                        </p>
                        <div className="flex space-x-5 pt-2">
                            <a href="#" className="text-gray-400 hover:text-brand-600 transition-all duration-300 hover:-translate-y-1" aria-label="Facebook">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-1" aria-label="X (Twitter)">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.045 4.126H5.078z" /></svg>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-pink-500 transition-all duration-300 hover:-translate-y-1" aria-label="Instagram">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 uppercase tracking-wider text-sm">Shop</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/products?category=Electronics" className="hover:text-brand-500 transition-colors">Electronics</Link></li>
                            <li><Link to="/products?category=Clothing" className="hover:text-brand-500 transition-colors">Clothing</Link></li>
                            <li><Link to="/products?category=Jewelry" className="hover:text-brand-500 transition-colors">Jewelry</Link></li>
                            <li><Link to="/products?category=Beauty" className="hover:text-brand-500 transition-colors">Beauty</Link></li>
                            <li><Link to="/products?category=Home" className="hover:text-brand-500 transition-colors">Home & Living</Link></li>
                            <li><Link to="/products?category=Sports" className="hover:text-brand-500 transition-colors">Sports</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 uppercase tracking-wider text-sm">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li><Link to="/help" className="hover:text-brand-500 transition-colors">Help Center</Link></li>
                            <li><Link to="/track-order" className="hover:text-brand-500 transition-colors">Track Order</Link></li>
                            <li><Link to="/returns" className="hover:text-brand-500 transition-colors">Returns & Refunds</Link></li>
                            <li><Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
                            <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-900 dark:text-gray-100 font-semibold mb-4 uppercase tracking-wider text-sm">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                            <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> 123 Cairo, Egypt</li>
                            <li className="flex items-center"><Phone className="w-4 h-4 mr-2" /> +20 100 123 4567</li>
                            <li className="flex items-center"><Mail className="w-4 h-4 mr-2" /> support@buyora.com</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Buyora Premium E-commerce. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Stripe</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
