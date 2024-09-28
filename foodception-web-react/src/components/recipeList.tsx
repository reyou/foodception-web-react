import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';

interface RecipeListProps {
  recipes: any[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <div className='row justify-content-center'>
      {recipes.map((recipe: any) => {
        let recipeImage = recipe.recipeImages[0];
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
