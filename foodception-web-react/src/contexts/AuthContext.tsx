import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';
import { AuthContextType, User } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const refreshUser = async () => {
        try {
            const userResponse = await AuthenticationUtils.getUser();
            if (userResponse) {
                setUser(userResponse.user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error) {
            setUser(null);
            setAuthenticated(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            // Implement your login logic here using AuthenticationUtils
            await AuthenticationUtils.login(email, password);
            await refreshUser();
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await AuthenticationUtils.logout();
            setUser(null);
            setAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const isAuth = await AuthenticationUtils.isAuthenticated();
                if (isAuth) {
                    await refreshUser();
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const value = {
        authenticated,
        loading,
        user,
        login,
        logout,
        refreshUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
