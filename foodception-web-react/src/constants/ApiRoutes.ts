/**
 * API Routes for the application
 * Organized similar to C# static classes
 */
export class ApiRoutes {
    // Base routes
    private static readonly ApiBase = "";

    /**
     * Home related API routes
     */
    static Home = {
        Base: ApiRoutes.ApiBase,
        ApiInfo: ApiRoutes.ApiBase
    };

    /**
     * Authentication related API routes
     */
    static Authentication = {
        Base: ApiRoutes.ApiBase + "/authentication",

        Status: ApiRoutes.ApiBase + "/authentication/status",
        Users: ApiRoutes.ApiBase + "/authentication/users",
        Current: ApiRoutes.ApiBase + "/authentication/users/current",
        Sessions: ApiRoutes.ApiBase + "/authentication/sessions",
        EmailVerifications: ApiRoutes.ApiBase + "/authentication/email-verifications",
        PasswordResets: ApiRoutes.ApiBase + "/authentication/password-resets",

        /**
         * Google provider routes
         */
        Google: {
            ProvidersBase: ApiRoutes.ApiBase + "/authentication/providers/google",

            Config: ApiRoutes.ApiBase + "/authentication/providers/google/config",
            Login: ApiRoutes.ApiBase + "/authentication/providers/google/authenticate"
        }
    };

    /**
     * SEO related API routes
     */
    static Seo = {
        Base: ApiRoutes.ApiBase + "/seo",
        Recipe: (id: string) => `${ApiRoutes.ApiBase}/seo/recipes/${id}`,
        Ingredient: (id: string) => `${ApiRoutes.ApiBase}/seo/ingredients/${id}`,
        Video: (id: string) => `${ApiRoutes.ApiBase}/seo/videos/${id}`,
        Country: (id: string) => `${ApiRoutes.ApiBase}/seo/countries/${id}`,
        Diet: (id: string) => `${ApiRoutes.ApiBase}/seo/diets/${id}`,
        RecipeCategory: (id: string) => `${ApiRoutes.ApiBase}/seo/recipe-categories/${id}`,
        RecipeCategories: ApiRoutes.ApiBase + "/seo/recipe-categories",
        RecipeVideos: ApiRoutes.ApiBase + "/seo/recipe-videos",
        RecipeVideo: (id: string) => `${ApiRoutes.ApiBase}/seo/recipe-videos/${id}`,
        Recommended: ApiRoutes.ApiBase + "/seo/recipes/recommended",
        Random: ApiRoutes.ApiBase + "/seo/recipes/random",
        Countries: ApiRoutes.ApiBase + "/seo/countries",
        Diets: ApiRoutes.ApiBase + "/seo/diets",
        Search: ApiRoutes.ApiBase + "/seo/recipes/search"
    };

    /**
     * Recipe related API routes
     */
    static Recipes = {
        List: ApiRoutes.ApiBase + "/recipes",
        Get: (id: string) => `${ApiRoutes.ApiBase}/recipes/${id}`,
        Related: (id: string) => `${ApiRoutes.ApiBase}/recipes/${id}/related`,
        Recommended: ApiRoutes.ApiBase + "/recipes/recommended",
        Random: ApiRoutes.ApiBase + "/recipes/random",
        Top: ApiRoutes.ApiBase + "/recipes/top",
        Featured: ApiRoutes.ApiBase + "/recipes/featured",
        Search: ApiRoutes.ApiBase + "/recipes/search",
        Suggestions: ApiRoutes.ApiBase + "/recipes/suggestions"
    };

    /**
     * Ingredient related API routes
     */
    static Ingredients = {
        List: ApiRoutes.ApiBase + "/ingredients",
        Get: (id: string) => `${ApiRoutes.ApiBase}/ingredients/${id}`,
        Search: ApiRoutes.ApiBase + "/ingredients/search",
        Suggestions: ApiRoutes.ApiBase + "/ingredients/suggestions"
    };

    /**
     * IngredientRecipes related API routes
     */
    static IngredientRecipes = {
        List: (id: string) => `${ApiRoutes.ApiBase}/ingredients/${id}/recipes`
    };

    /**
     * Countries related API routes
     */
    static Countries = {
        List: ApiRoutes.ApiBase + "/countries",
        Get: (id: string) => `${ApiRoutes.ApiBase}/countries/${id}`,
        Top: ApiRoutes.ApiBase + "/countries/top",
        Featured: ApiRoutes.ApiBase + "/countries/featured"
    };

    /**
     * CountryRecipes related API routes
     */
    static CountryRecipes = {
        List: (id: string) => `${ApiRoutes.ApiBase}/countries/${id}/recipes`,
        Top: ApiRoutes.ApiBase + "/countries/top-recipes"
    };

    /**
     * Meals related API routes
     */
    static Meals = {
        List: ApiRoutes.ApiBase + "/meals",
        Get: (id: string) => `${ApiRoutes.ApiBase}/meals/${id}`,
        Top: ApiRoutes.ApiBase + "/meals/top"
    };

    /**
     * MealRecipes related API routes
     */
    static MealRecipes = {
        List: (id: string) => `${ApiRoutes.ApiBase}/meals/${id}/recipes`,
        Top: ApiRoutes.ApiBase + "/meals/top-recipes"
    };

    /**
     * Diets related API routes
     */
    static Diets = {
        List: ApiRoutes.ApiBase + "/diets",
        Get: (id: string) => `${ApiRoutes.ApiBase}/diets/${id}`,
        Top: ApiRoutes.ApiBase + "/diets/top"
    };

    /**
     * DietRecipes related API routes
     */
    static DietRecipes = {
        List: (id: string) => `${ApiRoutes.ApiBase}/diets/${id}/recipes`,
        Top: ApiRoutes.ApiBase + "/diets/top-recipes"
    };

    /**
     * FavoriteRecipes related API routes
     */
    static FavoriteRecipes = {
        List: ApiRoutes.ApiBase + "/favorites/recipes",
        Create: ApiRoutes.ApiBase + "/favorites/recipes",
        Delete: (id: string) => `${ApiRoutes.ApiBase}/favorites/recipes/${id}`,
        Suggestions: ApiRoutes.ApiBase + "/favorites/recipes/suggestions"
    };

    /**
     * FavoriteDiets related API routes
     */
    static FavoriteDiets = {
        List: ApiRoutes.ApiBase + "/favorites/diets",
        Create: ApiRoutes.ApiBase + "/favorites/diets",
        Delete: (id: string) => `${ApiRoutes.ApiBase}/favorites/diets/${id}`
    };

    /**
     * FavoriteRecipeCategories related API routes
     */
    static FavoriteRecipeCategories = {
        List: ApiRoutes.ApiBase + "/favorites/recipe-categories",
        Create: ApiRoutes.ApiBase + "/favorites/recipe-categories",
        Delete: (id: string) => `${ApiRoutes.ApiBase}/favorites/recipe-categories/${id}`
    };

    /**
     * RecipeCategories related API routes
     */
    static RecipeCategories = {
        List: ApiRoutes.ApiBase + "/recipe-categories",
        Get: (id: string) => `${ApiRoutes.ApiBase}/recipe-categories/${id}`
    };

    /**
     * RecipeCategoryRecipes related API routes
     */
    static RecipeCategoryRecipes = {
        List: (id: string) => `${ApiRoutes.ApiBase}/recipe-categories/${id}/recipes`,
        Top: ApiRoutes.ApiBase + "/recipe-categories/top-recipes",
        Suggestions: (id: string) => `${ApiRoutes.ApiBase}/recipe-categories/${id}/recipes/suggestions`
    };

    /**
     * RecipeVideos related API routes
     */
    static RecipeVideos = {
        List: ApiRoutes.ApiBase + "/recipes/videos",
        Create: ApiRoutes.ApiBase + "/recipes/videos",
        Get: (id: string) => `${ApiRoutes.ApiBase}/recipes/videos/${id}`,
        Update: (id: string) => `${ApiRoutes.ApiBase}/recipes/videos/${id}`,
        Delete: (id: string) => `${ApiRoutes.ApiBase}/recipes/videos/${id}`,
        Search: ApiRoutes.ApiBase + "/recipes/videos/search",
        ListByRecipe: (id: string) => `${ApiRoutes.ApiBase}/recipes/${id}/videos`,
        Trending: ApiRoutes.ApiBase + "/recipes/videos/trending",
        Suggestions: ApiRoutes.ApiBase + "/recipes/videos/suggestions"
    };

    /**
     * Search related API routes
     */
    static Search = {
        List: ApiRoutes.ApiBase + "/search",
        Suggestions: ApiRoutes.ApiBase + "/search/suggestions"
    };

    /**
     * UserInterface related API routes
     */
    static UserInterface = {
        Base: ApiRoutes.ApiBase + "/ui",
        Menu: {
            Base: ApiRoutes.ApiBase + "/ui/menu",
            Items: ApiRoutes.ApiBase + "/ui/menu/items"
        }
    };

    /**
     * Version related API routes
     */
    static Version = {
        Get: ApiRoutes.ApiBase + "/version"
    };
}