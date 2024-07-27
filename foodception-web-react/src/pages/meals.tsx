import { useEffect, useState } from 'react';
import RecipeList from '../components/recipeList';
import HttpProvider from '../providers/HttpProvider';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function Meals() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          'https://api.foodception.com/meals'
        );
        setData(result);
      } catch (error: any) {
        setError('Failed to fetch data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const renderMeals = (meals: any[], mealRecipesList: any[]) => {
    return meals.map((meal: any) => {
      const mealRecipes = mealRecipesList.find((q) => q.mealId === meal.id);
      return (
        <div key={meal.id}>
          <h1 className='text-center'>
            {FrontEndUtils.capitalizeText(meal.name)}
          </h1>
          <h5 className='text-center mb-4'>{meal.description}</h5>
          <RecipeList
            recipes={mealRecipes.recipes}
            recipeImages={mealRecipes.recipeImages}
          ></RecipeList>
        </div>
      );
    });
  };

  const render = () => {
    return (
      <div className='container-fluid'>
        {data ? (
          <>{renderMeals(data.meals, data.mealRecipes)}</>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <p className='text-center'>Loading...</p>
        )}
      </div>
    );
  };

  return render();
}
