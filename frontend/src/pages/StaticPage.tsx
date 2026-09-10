import React, { useEffect } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { Mail, ShieldCheck, HelpCircle, ArrowRight, Truck, RefreshCcw, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StaticPage = () => {
    const location = useLocation();

    // Map pathnames to content
    const pageContent: Record<string, { title: string; subtitle: string; icon: any; content: React.ReactNode }> = {
        '/help': {
            title: 'Help Center',
            subtitle: 'We are here to assist you with any questions or issues.',
            icon: HelpCircle,
            content: (
                <div className="space-y-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">1. How long does shipping take?</h4>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">For domestic orders, standard shipping typically takes 3-5 business days. Expedited shipping is available at checkout for 1-2 day delivery. International shipping times vary between 7-14 business days depending on customs processing in your respective country. Buyora processes all orders within 24 hours of purchase.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Are your products authentic?</h4>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">Absolutely. Buyora partners directly with premium brands, authorized distributors, and world-class designers to guarantee 100% authenticity on every single item we offer. We implement a rigorous quality control check before any item reaches our warehouses.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="p-6 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Will sold-out items be restocked?</h4>
                        <p className="leading-relaxed text-gray-700 dark:text-gray-300">Many of our curated collections are exclusive drops or limited runs. While some core items are restocked seasonally, limited edition pieces generally do not return once sold out. We highly recommend subscribing to the Buyora Club to receive early notifications on restocks.</p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className="mt-8 p-8 bg-brand-50/50 dark:bg-brand-900/10 backdrop-blur-xl rounded-3xl border border-brand-100 dark:border-brand-800/50 shadow-lg">
                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white flex items-center mb-4"><HelpCircle className="w-6 h-6 mr-3 text-brand-500 animate-bounce" />Still Need Help?</h3>
                        <p className="leading-relaxed text-lg mb-6 text-gray-700 dark:text-gray-300">Contact our dedicated 24/7 VIP support team. We aim to respond to all inquiries within 2 hours, regardless of your time zone.</p>
                        <div className="inline-flex items-center space-x-3 bg-white dark:bg-slate-800 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer">
                            <Mail className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                            <span className="font-bold text-gray-900 dark:text-white text-lg">support@buyora.com</span>
                        </div>
                    </motion.div>
                </div>
            )
        },
        '/track-order': {
            title: 'Track Your Order',
            subtitle: 'Follow your premium delivery every step of the way.',
            icon: Truck,
            content: (
                <div className="space-y-10 text-gray-700 dark:text-gray-300">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg leading-relaxed bg-white/40 dark:bg-slate-800/40 p-6 rounded-3xl border border-white/50 dark:border-gray-700/50 backdrop-blur-md">
                        Through our global logistics network, Buyora ensures your items arrive safely and on time. Enter your specific tracking number below to see real-time updates directly from our carrier partners (including DHL, FedEx Signature, and UPS Premier).
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row gap-4 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-[2rem] border border-white dark:border-gray-700/50 shadow-xl">
                        <input type="text" placeholder="Tracking Number (e.g., BUY-123456)" className="w-full px-6 py-4 bg-transparent focus:ring-0 outline-none text-gray-900 dark:text-white font-medium text-lg placeholder-gray-400" disabled />
                        <button className="px-10 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] flex items-center justify-center opacity-70 cursor-not-allowed flex-shrink-0">
                            Track Package <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['Processing', 'In Transit', 'Delivery'].map((stage, i) => (
                            <motion.div key={stage} whileHover={{ scale: 1.05, y: -5 }} className="relative overflow-hidden p-6 rounded-3xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-gray-100 dark:border-gray-700/50 shadow-lg group">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className={`text-4xl mb-4 block ${i === 0 ? 'animate-pulse' : i === 1 ? 'animate-[bounce_2s_infinite]' : ''}`}>{['📦', '✈️', '🛎️'][i]}</span>
                                <h5 className="font-bold text-gray-900 dark:text-white mb-2 text-xl">{stage}</h5>
                                <p className="text-sm opacity-80">{[
                                    'Orders are processed within 24 hours of confirmation.',
                                    'Real-time GPS tracking provided once the package leaves the vault.',
                                    'Signature required on all premium deliveries above $500.'
                                ][i]}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            )
        },
        '/returns': {
            title: 'Returns & Refunds',
            subtitle: 'Our hassle-free 30-day return policy.',
            icon: RefreshCcw,
            content: (
                <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-white/40 dark:bg-slate-800/40 rounded-3xl backdrop-blur-xl border border-white/50 dark:border-gray-700/50 shadow-sm">
                        At Buyora, we want you to be absolutely delighted with your purchase. If you are not completely satisfied, you may return the item within <span className="font-bold text-brand-600 dark:text-brand-400">30 days of receipt</span> for a full refund, exchange, or store credit.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center"><RefreshCcw className="w-8 h-8 mr-3 text-brand-500 animate-[spin_4s_linear_infinite]" /> Process</h3>
                        <div className="grid gap-4">
                            {[
                                { step: 1, title: 'Initiate', desc: 'Contact our support team with your order number to request a return authorization.' },
                                { step: 2, title: 'Pack', desc: 'Ensure the item is in its original condition, unworn or unused, with all premium tags and packaging intact.' },
                                { step: 3, title: 'Ship', desc: 'Attach the provided prepaid digital return label and drop it off at any authorized carrier location.' },
                                { step: 4, title: 'Refund', desc: 'Once inspected, your refund will be automatically processed to your original payment method within 3-5 business days.' }
                            ].map((s, i) => (
                                <motion.div key={s.step} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} className="flex items-start p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default">
                                    <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-900/50 text-brand-600 dark:text-brand-400 font-black text-xl mr-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">{s.step}</span>
                                    <div>
                                        <h5 className="font-bold text-gray-900 dark:text-white text-xl mb-1 group-hover:text-brand-500 transition-colors">{s.title}</h5>
                                        <p className="text-gray-600 dark:text-gray-400">{s.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="p-8 bg-red-50/50 dark:bg-red-900/20 backdrop-blur-xl rounded-3xl border border-red-200/50 dark:border-red-500/20 shadow-lg relative overflow-hidden group">
                        <div className="absolute inset-0 bg-red-500/5 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700"></div>
                        <h4 className="font-bold text-red-800 dark:text-red-400 mb-3 text-xl relative z-10 flex items-center"><ShieldCheck className="w-6 h-6 mr-2" />Exceptions</h4>
                        <p className="text-red-700/80 dark:text-red-300/80 relative z-10">Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods (such as beauty products). Please get in touch if you have questions.</p>
                    </motion.div>
                </div>
            )
        },
        '/privacy': {
            title: 'Privacy Policy',
            subtitle: 'How we handle your data.',
            icon: ShieldCheck,
            content: (
                <div className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="p-10 bg-gradient-to-br from-accent-50/80 to-brand-50/80 dark:from-accent-900/40 dark:to-brand-900/20 backdrop-blur-2xl rounded-[3rem] border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute -right-10 -top-10 text-accent-500/10 dark:text-accent-500/20">
                            <ShieldCheck className="w-64 h-64 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        </div>
                        <div className="relative z-10">
                            <ShieldCheck className="w-12 h-12 text-accent-500 mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Vault-Level Security</h3>
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-xl leading-relaxed max-w-2xl">Your data security is our absolute top priority. We utilize 256-bit AES vault-level encryption for all transactions. Buyora never stores your raw credit card information on our servers; everything is tokenized instantly.</p>
                        </div>
                    </motion.div>

                    <div className="grid gap-6">
                        {[
                            { step: '1. Information We Collect', desc: 'When you visit Buyora, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the site, we collect information about the individual premium products that you view.' },
                            { step: '2. How We Use Your Data', desc: 'We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices). Additionally, we use this Order Information to communicate with you and screen our orders for potential risk or fraud.' },
                            { step: '3. Data Sharing & Third Parties', desc: 'We absolutely do not sell your personal data to any third parties. We share your Personal Information only with trusted third parties to help us use it as described above (for instance, utilizing Stripe for heavily encrypted payment processing or DHL for logistics and tracking).' }
                        ].map((s, i) => (
                            <motion.div key={s.step} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} className="p-8 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-white/40 dark:border-gray-700/40 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all">
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{s.step}</h4>
                                <p>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        '/terms': {
            title: 'Terms of Service',
            subtitle: 'The legal terms governing your use of Buyora.',
            icon: FileText,
            content: (
                <div className="space-y-6 text-gray-700 dark:text-gray-400 leading-relaxed text-lg">
                    {[
                        { title: 'Welcome to Buyora', desc: 'By accessing or using our website, you agree to be bound by these Terms of Service. Please read these Terms carefully before accessing or using our website. If you do not agree to all the terms and conditions of this agreement, then you may not access the website.' },
                        { title: '1. Online Store Terms', desc: 'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws).' },
                        { title: '2. Products and Pricing', desc: 'All items on this site are subject to availability. Prices for our premium products are subject to change without prior notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We have made every effort to display as accurately as possible the colors and images of our products that appear at the store.' },
                        { title: '3. Limitation of Liability', desc: 'We reserve the right to refuse service to anyone for any reason at any time. In no case shall Buyora, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.' }
                    ].map((section, i) => (
                        <motion.div key={section.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-8 bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl rounded-3xl border border-t-white/50 border-r-white/50 dark:border-t-gray-700/50 dark:border-r-gray-700/50 shadow-md hover:bg-white/60 dark:hover:bg-slate-800/80 transition-colors overflow-hidden relative group">
                            <div className="absolute top-0 bottom-0 left-0 w-2 bg-brand-500 group-hover:w-full transition-all duration-500 opacity-20 -z-10"></div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{section.title}</h4>
                            <p>{section.desc}</p>
                        </motion.div>
                    ))}
                </div>
            )
        }
    };

    if (!pageContent[location.pathname]) {
        return <Navigate to="/help" replace />;
    }

    const currentData = pageContent[location.pathname];
    const Icon = currentData.icon;

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location.pathname]);

    const navLinks = [
        { path: '/help', label: 'Help Center', icon: HelpCircle },
        { path: '/track-order', label: 'Track Order', icon: Truck },
        { path: '/returns', label: 'Returns & Refunds', icon: RefreshCcw },
        { path: '/privacy', label: 'Privacy Policy', icon: ShieldCheck },
        { path: '/terms', label: 'Terms of Service', icon: FileText },
    ];

    return (
        <div className="max-w-[85rem] mx-auto px-4 py-12 md:py-24 relative overflow-hidden z-10 w-full min-h-screen">
            {/* Massive background ambient blobs */}
            <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-brand-500/10 dark:bg-brand-500/20 rounded-full blur-[100px] pointer-events-none -z-10 translate-x-1/3 -translate-y-1/3 mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-accent-500/10 dark:bg-accent-500/10 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/4 translate-y-1/4 mix-blend-screen"></div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start w-full">

                {/* Sidebar Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-[320px] flex-shrink-0 z-20"
                >
                    <div className="sticky top-28 bg-white/40 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/60 dark:border-white/10 rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)] space-y-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent dark:from-white/5 pointer-events-none"></div>
                        <h2 className="text-xs font-black uppercase tracking-widest text-brand-600 dark:text-brand-400 mb-6 ml-4 mt-2">Support Directory</h2>
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                const NavIcon = link.icon;
                                return (
                                    <Link key={link.path} to={link.path} className="block relative focus:outline-none outline-none">
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-brand-600 dark:bg-brand-500 rounded-2xl shadow-lg shadow-brand-500/30"
                                                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                            />
                                        )}
                                        <div className={`relative px-6 py-4 rounded-2xl flex items-center transition-colors duration-300 z-10 font-bold tracking-tight text-[1.05rem] cursor-pointer ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-800/50 hover:text-gray-900 dark:hover:text-white'}`}>
                                            <NavIcon className={`w-[1.125rem] h-[1.125rem] mr-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                            {link.label}
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Area */}
                <div className="w-full lg:flex-1 relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30, transition: { duration: 0.1 } }}
                            transition={{ duration: 0.4, type: 'spring', bounce: 0.2 }}
                            className="w-full flex-grow"
                        >
                            {/* Page Header */}
                            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/60 dark:border-white/10 rounded-[3rem] p-8 md:p-14 shadow-2xl relative overflow-hidden group hover:shadow-[0_0_50px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_0_50px_rgba(255,255,255,0.02)] transition-all duration-700 mb-8 sm:mb-12">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent dark:from-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                                    <div>
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                                            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-slate-400 dark:shimmer-text mb-4 drop-shadow-sm tracking-tighter"
                                        >
                                            {currentData.title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
                                            className="text-xl text-gray-500 dark:text-gray-400 mb-0 font-medium"
                                        >
                                            {currentData.subtitle}
                                        </motion.p>
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                                        className="hidden md:flex w-28 h-28 rounded-[2rem] bg-gradient-to-br from-brand-500/10 to-accent-500/10 border border-white/50 dark:border-white/10 text-brand-600 dark:text-brand-400 items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500"
                                    >
                                        <Icon className="w-14 h-14" />
                                    </motion.div>
                                </div>
                            </div>

                            {/* Page Content Render */}
                            <div className="w-full pb-20">
                                {currentData.content}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
