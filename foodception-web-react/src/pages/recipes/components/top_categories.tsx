import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

const TopCategories = () => {
  const {
    data: recipeCategories,
    loading: recipeCategoriesLoading,
    error: recipeCategoriesError
  } = useFetch('/recipe-categories/top');

  return (
    <div>
      <h2 className='text-center mt-4'>Top Categories</h2>
      <h4 className='text-center mb-2'>
        Find your favorite dishes from these top-rated recipe categories
      </h4>
      <div className='text-center mb-4'>
        <FoodceptionHrefLink url={'/recipe-categories'}>
          See all Categories
        </FoodceptionHrefLink>
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
  );
};

export default TopCategories;
