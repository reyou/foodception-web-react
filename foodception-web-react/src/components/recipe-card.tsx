import React from 'react';
import { Card, Col } from 'react-bootstrap';
import FoodceptionCardHrefImage from './cardHrefImage';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionRecipeCardBody from './recipe-card-body';
import { Recipe } from '../types/recipe.types';
import { ErrorDetails } from '../types/error.types';

interface FoodceptionRecipeCardProps {
  recipe: Recipe;
  onError?: (error: ErrorDetails) => void;
}

const FoodceptionRecipeCard: React.FC<FoodceptionRecipeCardProps> = ({
  recipe,
  onError
}) => {
  const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${recipe.id}`;
  const imageUrl = recipe.recipeImages[0]?.imageUrl || '';

  return (
    <Col xs={12} md={6} lg={4} xl={2} className='mb-4'>
      <Card>
        <FoodceptionCardHrefImage
          url={recipeLink}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={recipe.title}
        />
        <FoodceptionRecipeCardBody recipe={recipe} onError={onError} />
      </Card>
    </Col>
  );
};

export default FoodceptionRecipeCard;
