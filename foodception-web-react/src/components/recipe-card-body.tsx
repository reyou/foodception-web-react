import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Recipe } from '../types/recipe.types';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FavoriteButton from './favorite-button';

interface FoodceptionRecipeCardBodyProps {
  recipe: Recipe;
  linkTitle?: string;
}

const FoodceptionRecipeCardBody: React.FC<FoodceptionRecipeCardBodyProps> = ({
  recipe,
  linkTitle = 'View Recipe'
}) => {
  const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${recipe.id}`;
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(recipeLink);

  return (
    <Card.Body>
      <Card.Title>{FrontEndUtils.capitalizeText(recipe.title)}</Card.Title>
      <Card.Text>{recipe.description}</Card.Text>
      <Button
        className='me-2'
        href={adjustedUrl}
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
        variant='primary'
      >
        {linkTitle}
      </Button>
      <FavoriteButton
        id={recipe.id}
        initialFavorited={recipe.isFavorited}
        className='me-2'
      />
    </Card.Body>
  );
};

export default FoodceptionRecipeCardBody;
