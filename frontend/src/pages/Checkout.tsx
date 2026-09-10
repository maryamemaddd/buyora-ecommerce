import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { orderService } from '../services/orderService';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

// Load Stripe outside of component
const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder';
const stripePromise = loadStripe(stripeKey);

const CheckoutForm = ({ shippingAddress, onSuccess }: { shippingAddress: any; onSuccess: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        let orderId = '';

        try {
            // 1. Create order in our backend
            const orderRes = await orderService.createOrder({
                shippingAddress,
                paymentMethod: 'stripe'
            });
            orderId = orderRes.data?._id || orderRes._id;

            // 2. Confirm Stripe Payment
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/orders/${orderId}`, // fallback
                },
                redirect: 'if_required'
            });

            if (error) {
                toast.error(error.message || 'Payment failed');
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // 3. Mark as paid in our backend
                await orderService.payOrder(orderId, {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                    updateTime: (new Date()).toISOString(),
                    emailAddress: paymentIntent.receipt_email || ''
                });
                toast.success('Payment successful!');
                onSuccess();
            }
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Error processing payment');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button type="submit" disabled={!stripe || loading} isLoading={loading} className="w-full h-12 text-lg">
                Pay Now
            </Button>
        </form>
    );
};

export const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [shippingAddress, setShippingAddress] = useState({
        street: '',
        city: '',
        country: '',
        postalCode: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('stripe');

    const [clientSecret, setClientSecret] = useState('');
    const [isProcessingCash, setIsProcessingCash] = useState(false);

    const tax = cartTotal * 0.10;
    const shipping = cartTotal > 100 ? 0 : 10;
    const total = cartTotal > 0 ? cartTotal + tax + shipping : 0;

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress(prev => ({ ...prev, [name]: value }));
    };

    const handleNextStep = async () => {
        if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.country || !shippingAddress.postalCode) {
            toast.error('Please fill in all shipping fields');
            return;
        }

        if (paymentMethod === 'stripe') {
            try {
                const res = await orderService.createPaymentIntent();
                setClientSecret(res.clientSecret || res.data?.clientSecret);
                setStep(2);
            } catch (error) {
                toast.error('Failed to initialize payment gateway');
            }
        } else {
            setStep(2); // Cash on delivery goes directly to confirmation step 2
        }
    };

    const handleCashOrder = async () => {
        setIsProcessingCash(true);
        try {
            const orderRes = await orderService.createOrder({
                shippingAddress,
                paymentMethod: 'cash'
            });
            toast.success('Order placed successfully (Cash on Delivery)');
            await clearCart();
            const orderId = orderRes.data?._id || orderRes._id;
            navigate(`/orders/${orderId}`);
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setIsProcessingCash(false);
        }
    };

    const handlePaymentSuccess = async () => {
        await clearCart();
        navigate('/orders'); // redirect to orders area
    };

    return (
        <div className="max-w-7xl mx-auto py-8">
            <div className="flex flex-col lg:flex-row gap-10 relative z-10">

                {/* Forms Area */}
                <div className="flex-1 bg-white/60 dark:bg-slate-900/60 backdrop-blur-2xl p-8 rounded-[2rem] border border-gray-200/50 dark:border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent dark:from-white/5 opacity-50 z-0 pointer-events-none"></div>
                    <div className="relative z-10">
                        {/* Progress Indicator */}
                        <div className="flex items-center mb-8">
                            <div className={`text-sm font-extrabold tracking-wide uppercase ${step === 1 ? 'text-gray-900 dark:text-white border-b-2 border-brand-500 pb-1' : 'text-gray-400 dark:text-gray-600'}`}>1. Shipping</div>
                            <div className="w-12 border-t border-gray-300 dark:border-gray-700 mx-4"></div>
                            <div className={`text-sm font-extrabold tracking-wide uppercase ${step === 2 ? 'text-gray-900 dark:text-white border-b-2 border-brand-500 pb-1' : 'text-gray-400 dark:text-gray-600'}`}>2. Payment</div>
                        </div>

                        {step === 1 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Shipping Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Input label="Street Address" name="street" value={shippingAddress.street} onChange={handleShippingChange} required />
                                    </div>
                                    <Input label="City" name="city" value={shippingAddress.city} onChange={handleShippingChange} required />
                                    <Input label="Postal Code" name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingChange} required />
                                    <div className="md:col-span-2">
                                        <Input label="Country" name="country" value={shippingAddress.country} onChange={handleShippingChange} required />
                                    </div>
                                </div>

                                <div className="mt-8 border-t border-gray-200/50 dark:border-white/10 pt-8">
                                    <h3 className="text-xl font-extrabold mb-4 text-gray-900 dark:text-white tracking-tight">Select Payment Method</h3>
                                    <div className="flex flex-col sm:flex-row items-center gap-4">
                                        <label className={`flex items-center cursor-pointer p-4 border rounded-xl flex-1 w-full transition-all duration-300 shadow-sm ${paymentMethod === 'stripe' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-white/10 hover:border-brand-400 dark:hover:border-brand-500/50 bg-white dark:bg-gray-800/50'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="stripe"
                                                checked={paymentMethod === 'stripe'}
                                                onChange={() => setPaymentMethod('stripe')}
                                                className="w-5 h-5 text-brand-600 focus:ring-brand-500 accent-brand-600"
                                            />
                                            <span className="ml-4 font-bold text-gray-900 dark:text-white">Credit Card (Stripe)</span>
                                        </label>
                                        <label className={`flex items-center cursor-pointer p-4 border rounded-xl flex-1 w-full transition-all duration-300 shadow-sm ${paymentMethod === 'cash' ? 'border-brand-500 bg-brand-50 dark:bg-brand-900/20' : 'border-gray-200 dark:border-white/10 hover:border-brand-400 dark:hover:border-brand-500/50 bg-white dark:bg-gray-800/50'}`}>
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cash"
                                                checked={paymentMethod === 'cash'}
                                                onChange={() => setPaymentMethod('cash')}
                                                className="w-5 h-5 text-brand-600 focus:ring-brand-500 accent-brand-600"
                                            />
                                            <span className="ml-4 font-bold text-gray-900 dark:text-white">Cash on Delivery</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <Button className="w-full text-lg font-bold h-14 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all group" onClick={handleNextStep}>
                                        Continue to Payment <ArrowRight className="inline ml-2 -mt-1 w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Complete Payment</h2>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors mb-4 flex items-center"
                                >
                                    &larr; Back to Shipping
                                </button>

                                {paymentMethod === 'stripe' ? (
                                    <>
                                        {clientSecret ? (
                                            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                                                <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'night' } }}> {/* Added basic theme integration */}
                                                    <CheckoutForm shippingAddress={shippingAddress} onSuccess={handlePaymentSuccess} />
                                                </Elements>
                                            </div>
                                        ) : (
                                            <div className="flex justify-center py-10">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand-500"></div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div className="text-center bg-gray-50 dark:bg-slate-800/80 rounded-[2rem] p-10 border border-dashed border-gray-300 dark:border-gray-600">
                                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                            <ArrowRight className="w-8 h-8 text-green-600 dark:text-green-400 -rotate-45" />
                                        </div>
                                        <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">Cash on Delivery</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium max-w-sm mx-auto">Pay for this order with cash directly to the courier when it arrives at your door.</p>
                                        <Button
                                            size="lg"
                                            onClick={handleCashOrder}
                                            isLoading={isProcessingCash}
                                            className="w-full h-14 rounded-full font-bold shadow-xl"
                                        >
                                            Place Order Now
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dynamic Order Summary Sidebar */}
                <div className="lg:w-96 shrink-0 relative z-10">
                    <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl rounded-[2rem] p-8 border border-gray-200/50 dark:border-white/5 shadow-2xl lg:sticky lg:top-28">
                        <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 pr-2 tracking-tight">Order Summary</h2>
                        <ul className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                            {cartItems.map((item, idx) => (
                                <li key={idx} className="flex justify-between items-start text-sm">
                                    <span className="text-gray-700 dark:text-gray-300 line-clamp-2 flex-1 pr-4 font-medium leading-relaxed">
                                        <span className="font-bold text-brand-600 dark:text-brand-400 mr-1">{item.quantity}×</span> {item.name}
                                    </span>
                                    <span className="font-bold text-gray-900 dark:text-white shrink-0 mt-0.5">${(item.quantity * item.price).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="space-y-4 pt-6 border-t border-gray-200/60 dark:border-gray-700/60 text-sm font-medium">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span className="text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Shipping estimate</span>
                                <span className="text-gray-900 dark:text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Tax (10%)</span>
                                <span className="text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl tracking-tight font-extrabold text-gray-900 dark:text-white pt-4 border-t border-gray-200/60 dark:border-gray-700/60">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
