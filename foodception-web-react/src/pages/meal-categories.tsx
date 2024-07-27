import { render } from '@testing-library/react';
import { useEffect, useState } from 'react';
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
          <h1 className='text-center'>Meals</h1>
          <MealCategoriesList
            meals={data.meals}
            mealImages={data.mealImages}
          ></MealCategoriesList>
        </div>
      );
    }
  };

  return render();
}
