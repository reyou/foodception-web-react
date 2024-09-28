import ErrorPanel from '../../../components/error_message';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';

const RandomPicks = () => {
  const {
    data: randomRecipes,
    loading: randomRecipesLoading,
    error: randomRecipesError
  } = useFetch('/recipes/random');

  return (
    <div>
      <h2 className='text-center mt-4'>Random Picks</h2>
      <h4 className='text-center mb-4'>
        Feeling Lucky? Here Are Some Random Picks for You!
      </h4>
      <LoadingPanel visible={randomRecipesLoading}></LoadingPanel>
      {randomRecipesError && (
        <div className='text-center'>
          <ErrorPanel errorMessage={randomRecipesError}></ErrorPanel>
        </div>
      )}
      {randomRecipes && (
        <RecipeList recipes={randomRecipes.recipes}></RecipeList>
      )}
    </div>
  );
};

export default RandomPicks;
