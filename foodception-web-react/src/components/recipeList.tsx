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
        let recipeImage;
        if (recipe.recipeImages && recipe.recipeImages.length > 0) {
          recipeImage = recipe.recipeImages[0];
        } else {
          recipeImage = recipeImages.find(
            (image: any) => image.recipeId === recipe.id
          );
        }

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
            imageUrl={recipeImage.imageUrl}
          ></FoodceptionCard>
        );
      })}
    </div>
  );
};

export default RecipeList;
