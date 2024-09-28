import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import HeaderLayout from '../components/header/headerLayout';
import LoadingPanel from '../components/loading_panel';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function Recipes() {
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_e03b3faaf463460a87f0662628574d46~mv2.jpg';
  const title = <FoodceptionHeader>Recipes</FoodceptionHeader>;
  const subTitle = 'Discover Delicious Recipes from Around the World';
  const {
    data: randomRecipes,
    loading: randomRecipesLoading,
    error: randomRecipesError
  } = useFetch('/recipes/random');
  const {
    data: recipeCategories,
    loading: recipeCategoriesLoading,
    error: recipeCategoriesError
  } = useFetch('/recipe-categories/top');

  return (
    <div>
      <HeaderLayout
        backgroundImage={imageUrl}
        title={title}
        subTitle={subTitle}
      ></HeaderLayout>

      <div className='container-fluid'>
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
        <div>
          <h2 className='text-center mt-4'>Top Categories</h2>
          <h4 className='text-center mb-2'>
            Find your favorite dishes from these top-rated recipe categories
          </h4>
          <div className='text-center mb-4'>
            <a className='link-button'>See all Categories</a>
          </div>
          <LoadingPanel visible={recipeCategoriesLoading}></LoadingPanel>
          {recipeCategoriesError && (
            <div className='text-center'>
              <ErrorPanel errorMessage={recipeCategoriesError}></ErrorPanel>
            </div>
          )}
          {recipeCategories &&
            recipeCategories.recipeCategories.map((recipeCategory: any) => {
              const recipes = recipeCategory.recipeCategoryAssignments.map(
                (q: any) => q.recipe
              );
              return (
                <div key={recipeCategory.id}>
                  <div className='text-center'>
                    <h3 className='mb-4 foodceptionSubCategoryTitle'>
                      {FrontEndUtils.capitalizeText(recipeCategory.name)}
                    </h3>
                  </div>
                  <RecipeList recipes={recipes}></RecipeList>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
