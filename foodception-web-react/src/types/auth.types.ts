export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface GoogleLoginResponse {
    message: string;
    userId: string;
    token: string;
}

export interface AuthContextType {
    authenticated: boolean;
    loading: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    loginWithGoogle: (code: string) => Promise<GoogleLoginResponse>;
    logout: () => Promise<void>;
}
