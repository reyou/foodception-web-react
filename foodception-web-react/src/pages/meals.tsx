import React, { useEffect, useState } from 'react';
import HttpProvider from '../providers/HttpProvider';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function Meals() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          'https://api.foodception.com/meals'
        );
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const renderMeals = (meals: any[], mealRecipesList: any[]) => {
    return meals.map((meal: any) => {
      const mealRecipes = mealRecipesList.find((q) => q.mealId === meal.id);
      return (
        <div key={meal.id}>
          <h1 className='text-center'>
            {FrontEndUtils.capitalizeText(meal.name)}
          </h1>
          <h5 className='text-center mb-4'>{meal.description}</h5>
          <div className='row justify-content-center'>
            {renderRecipes(mealRecipes.recipes, mealRecipes.recipeImages)}
          </div>
        </div>
      );
    });
  };

  const renderRecipes = (recipes: any[], recipeImages: any[]) => {
    const handleLinkClick = (
      event: React.MouseEvent<HTMLAnchorElement>,
      link: string
    ) => {
      if (FrontEndUtils.isInsideIframe()) {
        event.preventDefault();
        window.parent.postMessage({ type: 'redirect', url: link }, '*');
      }
    };

    return recipes.map((recipe: any) => {
      let mealImage = recipeImages.find(
        (image: any) => image.recipeId === recipe.id
      );
      const recipeLink = `/meals/${recipe.id}/recipes`;
      return (
        <div className='foodception-card-container' key={recipe.id}>
          <div className='card'>
            <img
              src={mealImage.imageUrl}
              className='card-img-top'
              alt={recipe.title}
            />
            <div className='card-body'>
              <h5 className='card-title'>
                {FrontEndUtils.capitalizeText(recipe.title)}
              </h5>
              <p className='card-text'>{recipe.description}</p>
              <a
                href={FrontEndUtils.isInsideIframe() ? '#' : recipeLink}
                className='btn btn-primary'
                onClick={(event) => handleLinkClick(event, recipeLink)}
              >
                View Recipes
              </a>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className='container-fluid'>
      {data ? (
        <>{renderMeals(data.meals, data.mealRecipes)}</>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className='text-center'>Loading...</p>
      )}
    </div>
  );
}
