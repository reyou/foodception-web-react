import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

const TopDiets = () => {
  const { data, loading, error } = useFetch('/diets/top');

  return (
    <div>
      <h2 className='text-center mt-4'>Explore Diet-Friendly Recipes</h2>
      <h4 className='text-center mb-2'>
        Discover a variety of delicious recipes tailored to your dietary
        preferences! Whether you're gluten-free, vegan, or following keto, we’ve
        got something for everyone.
      </h4>
      <div className='text-center mb-4'>
        <FoodceptionHrefLink url={'/diets'}>See all Diets</FoodceptionHrefLink>
      </div>
      <LoadingPanel visible={loading}></LoadingPanel>
      {error && (
        <div className='text-center'>
          <ErrorPanel errorMessage={error}></ErrorPanel>
        </div>
      )}
      {data &&
        data.diets.map((diet: any) => {
          const recipes = diet.dietRecipes.map((q: any) => q.recipe);
          return (
            <div key={diet.id}>
              <div className='text-center'>
                <h3 className='foodceptionSubCategoryTitle'>
                  <FoodceptionHrefLink
                    url={`diets/${FrontEndUtils.slugify(diet.name)}/${diet.id}`}
                  >
                    {FrontEndUtils.capitalizeText(diet.name)}
                  </FoodceptionHrefLink>
                </h3>
                <p className='mb-4'>{diet.description}</p>
              </div>
              <RecipeList recipes={recipes}></RecipeList>
            </div>
          );
        })}
    </div>
  );
};

export default TopDiets;
