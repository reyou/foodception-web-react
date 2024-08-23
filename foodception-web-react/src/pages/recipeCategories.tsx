import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FoodceptionHeader from '../components/header';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeCategoriesList from '../components/recipeCategoriesList';
import useShowHeader from '../hooks/useShowHeader';
import HttpProvider from '../providers/HttpProvider';

export default function RecipeCategories() {
  const maxLimit = 500;
  const [data, setData] = useState<any>(null);
  const [limit, setLimit] = useState<number>(maxLimit);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();
  const showHeader = useShowHeader(true);

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
      } catch (error) {
        console.log('LogGuid: 0f04b5ca-7278-4d11-9779-0ae75d41ad61');
        console.error(error);
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [searchParams]);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div className='text-center'>Loading...</div>;
    } else {
      return (
        <div>
          {showHeader && <FoodceptionHeader>Categories</FoodceptionHeader>}
          <RecipeCategoriesList
            recipeCategories={data.recipeCategories}
            recipeCategoryImages={data.recipeCategoryImages}
          ></RecipeCategoriesList>
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
  };

  return render();
}
