import RecipeList from '../../../components/recipeList';

interface RelatedRecipesProps {
  recipeWithRelatedEntities: any;
}

const RelatedRecipes: React.FC<RelatedRecipesProps> = ({
  recipeWithRelatedEntities
}) => {
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
  relatedRecipes = relatedRecipes
    .concat(dietRecipes)
    .concat(recipeCategoryAssignments)
    .concat(mealRecipes)
    .concat(countryRecipes);

  return (
    <>
      <RecipeList recipes={relatedRecipes}></RecipeList>
    </>
  );
};

export default RelatedRecipes;
