import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { StarryBackground } from '../components/ui/StarryBackground';
import toast from 'react-hot-toast';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error('Please enter email and password');
            return;
        }

        setIsLoading(true);
        try {
            await login({ email, password });
            toast.success('Login successful');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center relative overflow-hidden py-12">
            <StarryBackground />

            <div className="w-full max-w-md p-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-xl border border-white/60 dark:border-white/10 relative z-10 transform transition-transform duration-500 hover:-translate-y-1">
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-purple-500 to-accent-500 dark:from-brand-400 dark:via-purple-400 dark:to-accent-400 text-center mb-8 tracking-tight drop-shadow-sm">Welcome Back</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                    <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-brand-600 via-purple-600 to-accent-600 hover:from-brand-500 hover:via-purple-500 hover:to-accent-500 border-0 shadow-lg text-white font-bold text-lg rounded-xl h-12" isLoading={isLoading}>
                        Sign In
                    </Button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-black dark:text-white font-semibold hover:underline">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};
