/**
 * API Routes for the application
 * Organized similar to C# static classes
 */
export class ApiRoutes {
    // Base routes
    private static readonly ApiBase = "";

    /**
     * Authentication related API routes
     */
    static Authentication = {
        Base: ApiRoutes.ApiBase + "/authentication",

        Status: ApiRoutes.ApiBase + "/authentication/status",
        Users: ApiRoutes.ApiBase + "/authentication/users",
        CurrentUser: ApiRoutes.ApiBase + "/authentication/users/current",
        Sessions: ApiRoutes.ApiBase + "/authentication/sessions",
        EmailVerifications: ApiRoutes.ApiBase + "/authentication/email-verifications",
        PasswordResets: ApiRoutes.ApiBase + "/authentication/password-resets",

        /**
         * Google provider routes
         */
        Google: {
            ProvidersBase: ApiRoutes.ApiBase + "/authentication/providers/google",

            Config: ApiRoutes.ApiBase + "/authentication/providers/google/config",
            Authenticate: ApiRoutes.ApiBase + "/authentication/providers/google/authenticate"
        }
    };

    /**
     * Recipe related API routes
     */
    static Recipe = {
        BASE: '/recipes',
        BY_ID: (id: string) => `/recipes/${id}`,
        SEARCH: '/recipes/search',
        FAVORITES: '/recipes/favorites'
    };

    /**
     * Ingredient related API routes
     */
    static Ingredient = {
        BASE: '/ingredients',
        BY_ID: (id: string) => `/ingredients/${id}`
    };

    static UserInterface = {
        BASE: '/ui',
        MENU: {
            BASE: `/ui/menu`,
            ITEMS: `/ui/menu/items`
        }
    }
}