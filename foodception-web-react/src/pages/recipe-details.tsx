import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHeader from '../components/header';
import FoodceptionImage from '../components/image';
import IngredientGroups from '../components/ingredientGroups';
import IngredientGroupsVisual from '../components/ingredientGroupsVisual';
import RecipeTimeInfo from '../components/recipe-time-info';
import RecipeSteps from '../components/recipeSteps';
import RecipeVideos from '../components/recipeVideos';
import FoodceptionTabs, { TabItem } from '../components/tabs';
import HttpProvider from '../providers/HttpProvider';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function RecipeDetails() {
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<any>(null);
  const [recipeVideosData, setRecipeVideosData] = useState<any>(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const result = await HttpProvider.get(
          `https://api.foodception.com/recipes/${id}`
        );
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    const fetchRecipeVideos = async () => {
      try {
        const result = await HttpProvider.get(
          `https://api.foodception.com/recipes/${id}/videos`
        );
        setRecipeVideosData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchRecipeDetails();
    fetchRecipeVideos();
  }, [id]);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data || !recipeVideosData) {
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
      const tabs: TabItem[] = [];
      tabs.push({
        title: 'List View',
        icon: 'list',
        content: (
          <IngredientGroups
            ingredientGroups={ingredientGroups}
          ></IngredientGroups>
        )
      });
      tabs.push({
        title: 'Visual View',
        icon: 'image',
        content: (
          <IngredientGroupsVisual
            ingredientGroups={ingredientGroups}
            ingredientImages={ingredientImages}
          ></IngredientGroupsVisual>
        )
      });
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
          <div className='text-center'>Share Social Media Buttons</div>
          {/* Ingredients */}
          <h2 className='mt-3 text-center'>Ingredients</h2>
          <FoodceptionTabs>{tabs}</FoodceptionTabs>
          {/* Directions */}
          <h2 className='mt-3 text-center'>Directions</h2>
          <RecipeSteps steps={steps}></RecipeSteps>
          {/* Nutritional Information */}
          {/* RelatedVideos */}
          <h2 className='mt-3 text-center'>Related Videos</h2>
          <RecipeVideos
            recipeVideos={recipeVideosData.recipeVideos}
          ></RecipeVideos>
          {/* RelatedRecipes */}
          <h2 className='mt-3 text-center'>Related Recipes</h2>
        </div>
      );
    }
  };
  return render();
}
