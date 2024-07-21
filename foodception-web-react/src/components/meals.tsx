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

  const renderCards = (meals: any[], mealImages: any[]) => {
    const isInsideIframe = window.self !== window.top;
    const handleLinkClick = (
      event: React.MouseEvent<HTMLAnchorElement>,
      link: string
    ) => {
      if (isInsideIframe) {
        event.preventDefault();
        window.parent.postMessage({ type: 'redirect', url: link }, '*');
      }
    };

    return meals.map((meal: any) => {
      let mealImage = mealImages.find((image: any) => image.mealId === meal.id);
      const recipeLink = `/meals/${meal.id}/recipes`;
      return (
        <div className='foodception-card-container' key={meal.id}>
          <div className='card'>
            <img
              src={mealImage.imageUrl}
              className='card-img-top'
              alt={meal.name}
            />
            <div className='card-body'>
              <h5 className='card-title'>
                {FrontEndUtils.capitalizeText(meal.name)}
              </h5>
              <p className='card-text'>{meal.description}</p>
              <a
                href={isInsideIframe ? '#' : recipeLink}
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
        <div className='row justify-content-center'>
          {renderCards(data.meals, data.mealImages)}
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <p className='text-center'>Loading...</p>
      )}
    </div>
  );
}
