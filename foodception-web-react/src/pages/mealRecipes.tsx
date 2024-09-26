import { useParams } from 'react-router-dom';
import ErrorPanel from '../components/error_message';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';

export default function MealRecipes() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/meals/${id}/recipes`);

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
      <div className='mb-3 text-center'>
        <FoodceptionHrefButton url='/meals'>
          &lt;&lt; Back to Meals
        </FoodceptionHrefButton>
      </div>
      <RecipeList recipes={data.recipes} recipeImages={[]}></RecipeList>
    </div>
  );
}
