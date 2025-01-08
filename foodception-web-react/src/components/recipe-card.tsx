import React from 'react';
import { Card, Col } from 'react-bootstrap';
import FoodceptionCardHrefImage from './cardHrefImage';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionRecipeCardBody from './recipe-card-body';
import { Recipe } from '../types/recipe.types';

interface FoodceptionRecipeCardProps {
  recipe: Recipe;
}

const FoodceptionRecipeCard: React.FC<FoodceptionRecipeCardProps> = ({
  recipe
}) => {
  const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${recipe.id}`;
  const imageUrl = recipe.recipeImages[0]?.imageUrl || '';

  return (
    <Col xs={12} md={6} lg={4} xl={3} className='mb-4'>
      <Card>
        <FoodceptionCardHrefImage
          url={recipeLink}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={recipe.title}
        />
        <FoodceptionRecipeCardBody
          id={recipe.id}
          title={recipe.title}
          description={recipe.description}
          linkTitle='View Recipe'
          url={recipeLink}
        />
      </Card>
    </Col>
  );
};

export default FoodceptionRecipeCard;
