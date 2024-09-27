import React from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHrefButton from '../components/hrefButton';
import RecipeList from '../components/recipeList';
import ErrorPanel from '../components/error_message';
import useFetch from '../hooks/useFetch';

interface RecipeCategoryDetailProps {}

const RecipeCategoryDetail: React.FC<RecipeCategoryDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/recipe-categories/${id}/recipes`);

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
        <FoodceptionHrefButton url='/recipe-categories'>
          &lt;&lt; Back to Recipe Categories
        </FoodceptionHrefButton>
      </div>
      <RecipeList recipes={data.recipes} recipeImages={[]} />
    </div>
  );
};

export default RecipeCategoryDetail;
