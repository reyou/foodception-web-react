import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';

interface RecipeListProps {
  recipes: any[];
  recipeImages: any[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, recipeImages }) => {
  return (
    <div className='row justify-content-center'>
      {recipes.map((recipe: any) => {
        let mealImage = recipeImages.find(
          (image: any) => image.recipeId === recipe.id
        );
        const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${
          recipe.id
        }`;

        return (
          <FoodceptionCard
            key={recipe.id}
            title={recipe.title}
            description={recipe.description}
            url={recipeLink}
            urlTitle='View Recipe'
            imageUrl={mealImage.imageUrl}
          ></FoodceptionCard>
        );
      })}
    </div>
  );
};

export default RecipeList;
