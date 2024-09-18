import { useParams } from 'react-router-dom';
import FoodceptionHeader from '../components/header/header';
import FoodceptionImage from '../components/image';
import IngredientGroups from '../components/ingredientGroups';
import IngredientGroupsVisual from '../components/ingredientGroupsVisual';
import RecipeTimeInfo from '../components/recipeTimeInfo';
import RecipeSteps from '../components/recipeSteps';
import RecipeVideos from '../components/recipeVideos';
import FoodceptionTabs, { TabItem } from '../components/tabs';

import { FrontEndUtils } from '../utils/FrontEndUtils';
import useFetch from '../hooks/useFetch';

export default function RecipeDetails() {
  const { id } = useParams<{ id: string }>();

  const {
    data: recipesData,
    loading: recipesLoading,
    error: recipesError
  } = useFetch(`/recipes/${id}`);
  const {
    data: recipeVideosData,
    loading: recipeVideosLoading,
    error: recipeVideosError
  } = useFetch(`/recipes/${id}/videos`);

  const render = () => {
    if (recipesError || recipeVideosError) {
      return <div>Error: {recipesError || recipeVideosError}</div>;
    } else if (recipesLoading || recipeVideosLoading) {
      return <div className='text-center'>Loading...</div>;
    } else {
      const { recipe } = recipesData;
      const recipeImage = recipe.recipeImages.find((img: any) => {
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
            ingredientGroups={recipe.ingredientGroups}
          ></IngredientGroups>
        )
      });
      tabs.push({
        title: 'Visual View',
        icon: 'image',
        content: (
          <IngredientGroupsVisual
            ingredientGroups={recipe.ingredientGroups}
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
          <RecipeSteps steps={recipe.recipeSteps}></RecipeSteps>
          {/* Nutritional Information */}
          {/* RelatedVideos */}
          <h2 className='mt-3 text-center'>Related Videos</h2>
          <RecipeVideos
            youtubeChannelVideos={recipeVideosData.youtubeChannelVideos}
          ></RecipeVideos>
          {/* RelatedRecipes */}
          <h2 className='mt-3 text-center'>Related Recipes</h2>
        </div>
      );
    }
  };
  return render();
}
