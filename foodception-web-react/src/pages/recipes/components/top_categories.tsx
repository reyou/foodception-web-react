import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

const TopCategories = () => {
  const { data, loading, error } = useFetch('/recipe-categories/top');

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
      <LoadingPanel visible={loading}></LoadingPanel>
      {error && (
        <div className='text-center'>
          <ErrorPanel errorMessage={error}></ErrorPanel>
        </div>
      )}
      {data &&
        data.recipeCategories.map((recipeCategory: any) => {
          const recipes = recipeCategory.recipeCategoryAssignments.map(
            (q: any) => q.recipe
          );
          return (
            <div key={recipeCategory.id}>
              <div className='text-center'>
                <h3 className='foodceptionSubCategoryTitle'>
                  <FoodceptionHrefLink
                    url={`recipe-categories/${FrontEndUtils.slugify(
                      recipeCategory.name
                    )}/${recipeCategory.id}`}
                  >
                    {FrontEndUtils.capitalizeText(recipeCategory.name)}
                  </FoodceptionHrefLink>
                </h3>
                <p className='mb-4'>{recipeCategory.description}</p>
              </div>
              <RecipeList recipes={recipes}></RecipeList>
            </div>
          );
        })}
    </div>
  );
};

export default TopCategories;
