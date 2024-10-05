import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
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
      <h4 className='text-center'>
        Feeling Lucky? Here Are Some Random Picks for You!
      </h4>
      <div className='text-center mb-4'>
        <FoodceptionHrefLink url={`/recipes/list`}>
          See all recipes
        </FoodceptionHrefLink>
      </div>
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
