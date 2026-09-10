import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { StarryBackground } from '../components/ui/StarryBackground';
import toast from 'react-hot-toast';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { name, email, password, phone } = formData;
        if (!name || !email || !password || !phone) {
            toast.error('Please fill in all fields');
            return;
        }

        setIsLoading(true);
        try {
            await register({ name, email, password, phone });
            toast.success('Registration successful');
            navigate('/');
        } catch (error: any) {
            let errorMsg = 'Failed to register';
            if (error.response?.data?.errors?.length > 0) {
                errorMsg = error.response.data.errors[0].message;
            } else if (error.response?.data?.message) {
                errorMsg = error.response.data.message;
            }
            toast.error(errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center relative overflow-hidden py-16">
            <StarryBackground />

            <div className="w-full max-w-md p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/60 dark:border-white/10 relative z-10 transform transition-transform duration-500 hover:-translate-y-1">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-purple-500 to-brand-600 dark:from-accent-400 dark:via-purple-400 dark:to-brand-400 text-center mb-8 tracking-tight drop-shadow-sm">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Full Name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                    />
                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                    />
                    <Input
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 890"
                        required
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-accent-600 via-purple-600 to-brand-600 hover:from-accent-500 hover:via-purple-500 hover:to-brand-500 border-0 shadow-lg text-white font-bold text-lg rounded-xl h-12" isLoading={isLoading}>
                        Register
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-black dark:text-white font-semibold hover:underline">
                        Sign In here
                    </Link>
                </div>
            </div>
        </div>
    );
};
