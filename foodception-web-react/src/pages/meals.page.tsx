import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function Meals() {
  const { data, loading, error } = useFetch('/meals');

  if (loading) {
    return <div className='text-center'>Loading...</div>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return <div className='text-center'>No data available</div>;
  }

  const meals = data.meals;

  return meals.map((meal: any) => {
    const recipes = meal.mealRecipes.map((q: any) => q.recipe);
    return (
      <div key={meal.id}>
        <FoodceptionHeader>
          {FrontEndUtils.capitalizeText(meal.name)}
        </FoodceptionHeader>
        <h5 className='text-center mb-4'>{meal.description}</h5>
        <RecipeList recipes={recipes}></RecipeList>
        <div className='text-center mb-4'>
          <FoodceptionHrefButton
            url={`/meals/${FrontEndUtils.slugify(meal.name)}/${
              meal.id
            }/recipes`}
          >
            View All {FrontEndUtils.capitalizeText(meal.name)} Recipes
          </FoodceptionHrefButton>
        </div>
      </div>
    );
  });
}
