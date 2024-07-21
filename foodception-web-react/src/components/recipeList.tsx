import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface RecipeListProps {
  recipes: any[];
  recipeImages: any[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes, recipeImages }) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      window.parent.postMessage({ type: 'redirect', url: link }, '*');
    }
  };

  return (
    <div className='row justify-content-center'>
      {recipes.map((recipe: any) => {
        let mealImage = recipeImages.find(
          (image: any) => image.recipeId === recipe.id
        );
        const recipeLink = `/meals/${recipe.id}/recipes`;
        return (
          <div className='foodception-card-container' key={recipe.id}>
            <div key={recipe.id} className='card'>
              <img
                src={FrontEndUtils.getResizedImagePath(
                  mealImage.imageUrl,
                  400,
                  400
                )}
                className='card-img-top'
                alt={recipe.title}
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  {FrontEndUtils.capitalizeText(recipe.title)}
                </h5>
                <p className='card-text'>{recipe.description}</p>
                <a
                  href={recipeLink}
                  className='btn btn-primary'
                  onClick={(event) => handleLinkClick(event, recipeLink)}
                >
                  View Recipes
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeList;
