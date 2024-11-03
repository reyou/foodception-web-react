import { Recipe } from './recipe';

export interface RecipeVideo {
  id: string;
  recipeVideoProviderId: string;
  recipeVideoProviderVideoId: string;
  createdAt: string;
  updatedAt: string;
  recipeId: string;
  recipe: Recipe;
  recipeVideoProvider?: any | null;
}
