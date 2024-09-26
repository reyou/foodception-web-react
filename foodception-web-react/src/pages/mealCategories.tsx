import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/hrefButton';
import MealCategoriesList from '../components/mealCategoriesList';
import useFetch from '../hooks/useFetch';

export default function MealCategories() {
  const { data, loading, error } = useFetch('/meals/categories');

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
      <FoodceptionHeader>Meals</FoodceptionHeader>
      <MealCategoriesList meals={data.meals}></MealCategoriesList>
      <div className='text-center'>
        <FoodceptionHrefButton url='/meals'>
          Browse All Meal Recipes
        </FoodceptionHrefButton>
      </div>
    </div>
  );
}
