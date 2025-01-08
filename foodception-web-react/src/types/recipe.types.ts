export interface Recipe {
  id: string;
  title: string;
  description: string;
  recipeImages: Array<{
    imageUrl: string;
  }>;
}
