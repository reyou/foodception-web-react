import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHeader from '../components/header';
import FoodceptionImage from '../components/image';
import HttpProvider from '../providers/HttpProvider';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function RecipeDetails() {
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          `https://api.foodception.com/recipes/${id}`
        );
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, [id]);

  interface RecipeTimeInfoProps {
    totalTime: number;
    prepTime: number;
    cookTime: number;
    servingSize: number;
  }

  const RecipeTimeInfo = ({
    totalTime,
    prepTime,
    cookTime,
    servingSize
  }: RecipeTimeInfoProps) => {
    return (
      <div className='d-flex flex-wrap justify-content-center mt-3'>
        <div className='me-3'>
          <strong className='fs-5'>Total Time:</strong>{' '}
          <span className='fs-5'>{totalTime} min</span>
        </div>
        <div className='me-3'>
          <strong className='fs-5'>Prep Time:</strong>{' '}
          <span className='fs-5'>{prepTime} min</span>
        </div>
        <div className='me-3'>
          <strong className='fs-5'>Cook Time:</strong>{' '}
          <span className='fs-5'>{cookTime} min</span>
        </div>
        <div>
          <strong className='fs-5'>Serves:</strong>{' '}
          <span className='fs-5'>{servingSize}</span>
        </div>
      </div>
    );
  };

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      return <div className='text-center'>Loading...</div>;
    } else {
      const {
        recipe,
        recipeImages,
        steps,
        ingredientGroups,
        ingredientImages
      } = data;
      const recipeImage = recipeImages.find((img: any) => {
        return img.recipeId === recipe.id;
      });
      const imageUrl = FrontEndUtils.getResizedImagePath(
        recipeImage.imageUrl,
        940,
        530
      );
      return (
        <div className='container mt-4'>
          {/* Side bar */}
          <FoodceptionHeader>{recipe.title}</FoodceptionHeader>
          <RecipeTimeInfo
            totalTime={recipe.totalTime}
            prepTime={recipe.prepTime}
            cookTime={recipe.cookTime}
            servingSize={recipe.servingSize}
          />
          {/* About the Recipe */}
          <div className='text-center'>
            <h2 className='mt-3'>About the Recipe</h2>
            <p className='fs-5'>{recipe.description}</p>
            <FoodceptionImage
              src={imageUrl}
              alt={recipe.title}
            ></FoodceptionImage>
          </div>
          {/* Share Social Media Buttons */}
          {/* Ingredients */}
          <h2 className='mt-3 text-center'>Ingredients</h2>
          {/* Directions */}
          <h2 className='mt-3 text-center'>Directions</h2>
          {/* Nutritional Information */}
          {/* RelatedVideos */}
          <h2 className='mt-3 text-center'>Related Videos</h2>
          {/* RelatedRecipes */}
          <h2 className='mt-3 text-center'>Related Recipes</h2>
        </div>
      );
    }
  };
  return render();
}
