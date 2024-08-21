import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeList from '../components/recipeList';
import HttpProvider from '../providers/HttpProvider';

export default function MealRecipes() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          `https://api.foodception.com/meals/${id}/recipes`
        );
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, [id]);

  const render = () => {
    if (error) {
      return <div>{error}</div>;
    }
    if (!data) {
      return <div className='text-center'>Loading...</div>;
    }
    return (
      <div>
        <div className='mb-3 text-center'>
          <FoodceptionHrefButton url='/meals'>
            &lt;&lt; Back to Meals
          </FoodceptionHrefButton>
        </div>
        <RecipeList
          recipes={data.recipes}
          recipeImages={data.recipeImages}
        ></RecipeList>
      </div>
    );
  };

  return render();
}
