import { createContext, useContext } from 'react';
import { AuthContextType } from '../types/auth.types';

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
