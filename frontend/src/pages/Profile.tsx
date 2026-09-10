import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, ShieldCheckIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Profile = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="max-w-3xl mx-auto py-10">
            <div className="bg-white dark:bg-slate-900/40 dark:backdrop-blur-xl overflow-hidden shadow-xs rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="bg-gray-900 dark:bg-indigo-950/50 px-4 py-8 sm:px-6 flex flex-col items-center">
                    <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center p-1 mb-4 shadow-lg shadow-black/20">
                        <div className="h-full w-full bg-gray-100 dark:bg-slate-900 rounded-full flex items-center justify-center text-gray-400 dark:text-gray-300">
                            <User className="h-10 w-10" />
                        </div>
                    </div>
                    <h3 className="text-2xl leading-6 font-bold text-white">{user.name}</h3>
                    <p className="mt-1 text-sm text-gray-300 dark:text-gray-400 capitalize">{user.role}</p>
                </div>

                <div className="border-t border-gray-200 dark:border-white/10 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200 dark:divide-white/10">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                <Mail className="w-4 h-4 mr-2" /> Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 font-medium">{user.email}</dd>
                        </div>
                        {user.phone && (
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center">
                                    <Phone className="w-4 h-4 mr-2" /> Phone number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 font-medium">{user.phone}</dd>
                            </div>
                        )}
                        {user.role === 'admin' && (
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-blue-50/50 dark:bg-brand-900/20">
                                <dt className="text-sm font-medium text-blue-700 dark:text-brand-400 flex items-center">
                                    <ShieldCheckIcon className="w-4 h-4 mr-2" /> Status
                                </dt>
                                <dd className="mt-1 text-sm text-blue-900 dark:text-brand-300 sm:mt-0 sm:col-span-2 font-bold flex items-center">
                                    Administrator Privileges
                                </dd>
                            </div>
                        )}
                    </dl>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-slate-900/50 border-t border-gray-200 dark:border-white/10 flex justify-end">
                    <Button variant="danger" onClick={logout}>Sign Out</Button>
                </div>
            </div>
        </div>
    );
};
