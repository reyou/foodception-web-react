import React, { ReactNode, useState, useEffect } from 'react';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';
import { AuthContextType, GoogleLoginResponse, User } from '../types/auth.types';
import { AuthContext } from '../contexts/AuthContext';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Start with loading true
    const [user, setUser] = useState<User | null>(null);

    // Check authentication once when the app loads
    useEffect(() => {
        const initializeAuth = async () => {
            await checkAuth();
        };

        initializeAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            await AuthenticationUtils.login(email, password);
            await refreshUser();
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async (code: string): Promise<GoogleLoginResponse> => {
        setLoading(true);
        try {
            const response: GoogleLoginResponse = await AuthenticationUtils.loginWithGoogle(code);
            AuthenticationUtils.setAuthToken(response.token);
            await refreshUser();
            return response;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await AuthenticationUtils.logout();
            setUser(null);
            setAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const refreshUser = async () => {
        setLoading(true);
        try {
            const user = await AuthenticationUtils.getUser();
            if (user) {
                setUser(user);
                setAuthenticated(true);
            } else {
                setUser(null);
                setAuthenticated(false);
            }
        } catch (error) {
            console.error('Error refreshing user:', error);
            setUser(null);
            setAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    const checkAuth = async (): Promise<boolean> => {
        setLoading(true);
        let isAuthenticated = false;

        try {
            // First check if we have a token before making API calls
            if (!AuthenticationUtils.hasAuthToken()) {
                // No token, so we're definitely not authenticated
                setAuthenticated(false);
                setUser(null);
                return false;
            }

            // We have a token, now verify if it's valid with the server
            const isAuth = await AuthenticationUtils.isAuthenticated();
            if (isAuth) {
                await refreshUser();
                setAuthenticated(true);
                isAuthenticated = true;
            } else {
                // Token exists but is invalid
                setAuthenticated(false);
                setUser(null);
                // Clean up the invalid token
                AuthenticationUtils.logout();
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            setAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }

        return isAuthenticated;
    };

    const value = {
        authenticated,
        loading,
        user,
        login,
        loginWithGoogle,
        logout,
        refreshUser,
    } as AuthContextType;

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
