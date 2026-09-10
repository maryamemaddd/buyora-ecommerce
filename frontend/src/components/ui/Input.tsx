import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = '', ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`
            block w-full rounded-lg border px-3 py-2 text-gray-900 dark:text-gray-900 bg-white dark:bg-slate-200
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black dark:focus:ring-brand-600 dark:focus:border-brand-600
            disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-900 disabled:text-gray-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-transparent'}
            ${className}
          `}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Input.displayName = 'Input';
