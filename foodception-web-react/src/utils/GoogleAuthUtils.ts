import { GOOGLE_CONFIG } from '../config/google.config';

export class GoogleAuthUtils {
    static generateState(): string {
        return Math.random().toString(36).substring(2, 15);
    }

    static getAuthUrl(): string {
        if (!GOOGLE_CONFIG.clientId || !GOOGLE_CONFIG.redirectUri) {
            throw new Error('Google OAuth configuration is missing. Please check your environment variables.');
        }

        const state = this.generateState();

        // Store state in sessionStorage for verification when user returns
        sessionStorage.setItem('googleOAuthState', state);

        const params = new URLSearchParams({
            client_id: GOOGLE_CONFIG.clientId,
            redirect_uri: GOOGLE_CONFIG.redirectUri,
            response_type: 'code',
            scope: GOOGLE_CONFIG.scope,
            access_type: 'offline',
            state: state,
            prompt: 'consent'
        } as Record<string, string>);

        return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
}
