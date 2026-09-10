import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginCredentials, RegisterCredentials } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            authService.getMe()
                .then(res => {
                    if (res.success && res.data) {
                        setUser(res.data);
                    } else {
                        logout(); // Invalid token case
                    }
                })
                .catch(() => logout())
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (credentials: LoginCredentials) => {
        const res = await authService.login(credentials);
        // Assuming backend returns { success: true, token: '...', data: userDetails }
        const resToken = res.token || res.data?.token; // fallback depending on typical backend structures
        const resUser = res.data?.user || res.data;

        if (resToken) {
            localStorage.setItem('token', resToken);
            setToken(resToken);
        }
        if (resUser) {
            setUser(resUser);
        }
    };

    const register = async (credentials: RegisterCredentials) => {
        const res = await authService.register(credentials);
        const resToken = res.token || res.data?.token;
        const resUser = res.data?.user || res.data;

        if (resToken) {
            localStorage.setItem('token', resToken);
            setToken(resToken);
        }
        if (resUser) {
            setUser(resUser);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
