import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeCategoriesList from '../components/recipeCategoriesList';
import useShowHeader from '../hooks/useShowHeader';
import useFetch from '../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import ErrorPanel from '../components/error_message';

export default function RecipeCategories() {
  const maxLimit = 500;
  const [searchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : maxLimit;

  const showHeader = useShowHeader(true);
  const { data, loading, error } = useFetch(
    `/recipe-categories?limit=${limit}`
  );

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return <div className='text-center'>No data available</div>;
  }

  return (
    <div>
      {showHeader && <FoodceptionHeader>Categories</FoodceptionHeader>}
      <RecipeCategoriesList recipeCategories={data.recipeCategories} />
      {limit < maxLimit && (
        <div className='text-center'>
          <FoodceptionHrefButton url='/recipe-categories'>
            View All Categories
          </FoodceptionHrefButton>
        </div>
      )}
    </div>
  );
}
