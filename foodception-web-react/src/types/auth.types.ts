export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface AuthContextType {
    authenticated: boolean;
    loading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    checkAuth: () => Promise<void>;
}
