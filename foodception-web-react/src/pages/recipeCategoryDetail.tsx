import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeList from '../components/recipeList';
import HttpProvider from '../providers/HttpProvider';

interface RecipeCategoryDetailProps {}

const RecipeCategoryDetail: React.FC<RecipeCategoryDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          `https://api.foodception.com/recipe-categories/${id}/recipes`
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
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div className='text-center'>Loading...</div>;
    } else {
      return (
        <div>
          <div className='mb-3 text-center'>
            <FoodceptionHrefButton url='/recipe-categories'>
              &lt;&lt; Back to Recipe Categories
            </FoodceptionHrefButton>
          </div>
          <RecipeList
            recipes={data.recipes}
            recipeImages={data.recipeImages}
          ></RecipeList>
        </div>
      );
    }
  };

  return render();
};

export default RecipeCategoryDetail;
