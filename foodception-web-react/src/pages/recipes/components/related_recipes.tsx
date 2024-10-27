import RecipeList from '../../../components/recipeList';

interface RelatedRecipesProps {
  recipeWithRelatedEntities: any;
}

const RelatedRecipes: React.FC<RelatedRecipesProps> = ({
  recipeWithRelatedEntities
}) => {
  // Map and concatenate all related recipes lists
  let relatedRecipes = recipeWithRelatedEntities.relatedRecipes.map(
    (q: any) => q.recipe
  );
  const dietRecipes = recipeWithRelatedEntities.dietRecipes.map(
    (q: any) => q.recipe
  );
  const recipeCategoryAssignments =
    recipeWithRelatedEntities.recipeCategoryAssignments.map(
      (q: any) => q.recipe
    );
  const mealRecipes = recipeWithRelatedEntities.mealRecipes.map(
    (q: any) => q.recipe
  );
  const countryRecipes = recipeWithRelatedEntities.countryRecipes.map(
    (q: any) => q.recipe
  );

  // Combine all recipes into a single array
  relatedRecipes = relatedRecipes
    .concat(dietRecipes)
    .concat(recipeCategoryAssignments)
    .concat(mealRecipes)
    .concat(countryRecipes);

  // Filter out duplicates based on the `id` of each recipe
  const uniqueRelatedRecipes = relatedRecipes.filter(
    (recipe: any, index: any, self: any) =>
      index === self.findIndex((r: any) => r.id === recipe.id)
  );

  return (
    <>
      <RecipeList recipes={uniqueRelatedRecipes}></RecipeList>
    </>
  );
};

export default RelatedRecipes;
