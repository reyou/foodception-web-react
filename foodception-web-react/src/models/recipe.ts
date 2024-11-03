// Represents the `Recipe` object within `recipe_video.ts`
export interface Recipe {
  id: string;
  title: string;
  description: string;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servingSize: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  originalTitle?: string | null;
  recipeImages: any[]; // Define a more specific type if you have structure for recipe images
  recipeVideos?: any | null; // Define specific type if available
  recipeIngredients?: any | null; // Define specific type if available
  recipeSteps: any[]; // Define a more specific type if you have structure for recipe steps
  ingredientGroups: any[]; // Define a more specific type if you have structure for ingredient groups
  relatedRecipes?: any | null; // Define specific type if available
  dietRecipes?: any | null; // Define specific type if available
  recipeCategoryAssignments?: any | null; // Define specific type if available
  mealRecipes?: any | null; // Define specific type if available
  countryRecipes?: any | null; // Define specific type if available
}
