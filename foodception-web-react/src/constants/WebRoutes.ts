/**
 * Frontend web route constants for the application
 * Organized similar to ApiRoutes for consistency
 */
export class WebRoutes {
    // Base routes
    private static readonly AppBase = "";

    /**
     * Home related web routes
     */
    static Home = {
        Base: WebRoutes.AppBase + "/",
    };

    /**
     * User related web routes
     */
    static User = {
        Base: WebRoutes.AppBase + "/user",

        // Auth routes
        Login: WebRoutes.AppBase + "/user/login",
        Signup: WebRoutes.AppBase + "/user/signup",
        ForgotPassword: WebRoutes.AppBase + "/user/forgot-password",

        // Profile routes
        Profile: WebRoutes.AppBase + "/user/profile",
        Settings: WebRoutes.AppBase + "/user/settings",

        // Favorites
        Favorites: {
            Base: WebRoutes.AppBase + "/user/favorites",
            Recipes: WebRoutes.AppBase + "/user/favorites/recipes"
        },

        // Google auth routes
        Google: {
            Base: WebRoutes.AppBase + "/user/auth/google",
            Login: WebRoutes.AppBase + "/user/login/google",
            Redirecting: WebRoutes.AppBase + "/user/auth/google/redirecting",
            VerifyLogin: WebRoutes.AppBase + "/user/auth/google/verify-login",
            Callback: WebRoutes.AppBase + "/user/oauth-callback/google"
        }
    };

    /**
     * Recipe related web routes
     */
    static Recipe = {
        Base: WebRoutes.AppBase + "/recipes",
        Discover: WebRoutes.AppBase + "/recipes/discover",
        Details: (slug: string, id: string) => `${WebRoutes.AppBase}/recipes/${slug}/${id}`,

        // Categories
        Categories: {
            Base: WebRoutes.AppBase + "/recipe-categories",
            Details: (slug: string, id: string) => `${WebRoutes.AppBase}/recipe-categories/${slug}/${id}`
        },

        // Videos
        Videos: {
            Base: WebRoutes.AppBase + "/recipe-videos",
            Details: (slug: string, id: string) => `${WebRoutes.AppBase}/recipe-videos/${slug}/${id}`
        }
    };

    /**
     * Meal related web routes
     */
    static Meal = {
        Base: WebRoutes.AppBase + "/meals",
        Details: (slug: string, id: string) => `${WebRoutes.AppBase}/meals/${slug}/${id}`
    };

    /**
     * Diet related web routes
     */
    static Diet = {
        Base: WebRoutes.AppBase + "/diets",
        Details: (slug: string, id: string) => `${WebRoutes.AppBase}/diets/${slug}/${id}`
    };

    /**
     * Country related web routes
     */
    static Country = {
        Base: WebRoutes.AppBase + "/countries",
        Details: (slug: string, id: string) => `${WebRoutes.AppBase}/countries/${slug}/${id}`
    };

    /**
     * Ingredient related web routes
     */
    static Ingredient = {
        Base: WebRoutes.AppBase + "/ingredients",
        Details: (slug: string, id: string) => `${WebRoutes.AppBase}/ingredients/${slug}/${id}`
    };

    /**
     * Search related web routes
     */
    static Search = {
        Base: WebRoutes.AppBase + "/search",
        Autocomplete: WebRoutes.AppBase + "/search/autocomplete"
    };

    /**
     * Legacy routes (redirects)
     */
    static Legacy = {
        Login: WebRoutes.AppBase + "/login" // Redirects to User.Login
    };
}