import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodceptionHrefButton from '../components/href-button';
import RecipeCategoriesList from '../components/recipeCategoriesList';
import HttpProvider from '../providers/HttpProvider';

export default function RecipeCategories() {
  const maxLimit = 500;
  const [data, setData] = useState<any>(null);
  const [limit, setLimit] = useState<number>(maxLimit);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const limitParam = searchParams.get('limit');
        const limit = limitParam ? parseInt(limitParam, 10) : maxLimit;
        setLimit(limit);
        const result = await HttpProvider.get(
          `https://api.foodception.com/recipe-categories?limit=${limit}`
        );
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1 className='text-center'>Categories</h1>
          <RecipeCategoriesList
            recipeCategories={data.recipeCategories}
            recipeCategoryImages={data.recipeCategoryImages}
          ></RecipeCategoriesList>
          {limit < maxLimit && (
            <div className='text-center'>
              <FoodceptionHrefButton href='/recipe-categories'>
                View All Categories
              </FoodceptionHrefButton>
            </div>
          )}
        </div>
      );
    }
  };

  return render();
}
