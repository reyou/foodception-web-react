import { useEffect, useState } from 'react';
import FoodceptionHeader from '../components/header';
import FoodceptionHrefButton from '../components/href-button';
import MealCategoriesList from '../components/mealCategoriesList';
import HttpProvider from '../providers/HttpProvider';
export default function MealCategories() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          'https://api.foodception.com/meals/categories'
        );
        setData(result);
      } catch (error: any) {
        setError('Failed to fetch data');
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div className='text-center'>Loading...</div>;
    } else {
      return (
        <div>
          <FoodceptionHeader>Meals</FoodceptionHeader>
          <MealCategoriesList
            meals={data.meals}
            mealImages={data.mealImages}
          ></MealCategoriesList>
          <div className='text-center'>
            <FoodceptionHrefButton url='/meals'>
              Browse All Meal Recipes
            </FoodceptionHrefButton>
          </div>
        </div>
      );
    }
  };

  return render();
}
