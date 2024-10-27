import ErrorPanel from '../../../components/error_message';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import NoRelatedRecipes from './no_related_recipes';

interface RelatedRecipesProps {
  recipeId: string;
}

const RelatedRecipes: React.FC<RelatedRecipesProps> = ({ recipeId }) => {
  const {
    data: recipeWithRelatedEntitiesData,
    loading: recipeWithRelatedEntitiesLoading,
    error: recipeWithRelatedEntitiesError
  } = useFetch(`/recipes/${recipeId}/related`);

  if (recipeWithRelatedEntitiesError)
    return (
      <ErrorPanel errorMessage={recipeWithRelatedEntitiesError}></ErrorPanel>
    );

  if (recipeWithRelatedEntitiesLoading)
    return <LoadingPanel visible={true}></LoadingPanel>;

  const recipeWithRelatedEntities =
    recipeWithRelatedEntitiesData.recipeWithRelatedEntities;

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
      {uniqueRelatedRecipes.length > 0 ? (
        <RecipeList recipes={uniqueRelatedRecipes}></RecipeList>
      ) : (
        <NoRelatedRecipes
          recipeTitle={recipeWithRelatedEntities.title}
        ></NoRelatedRecipes>
      )}
    </>
  );
};

export default RelatedRecipes;
