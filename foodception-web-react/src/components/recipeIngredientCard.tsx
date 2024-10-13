import React from 'react';
import { Card } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardHrefImage from './cardHrefImage';
import FoodceptionCardIngredientBody from './cardIngredientBody';

interface FoodceptionIngredientCardProps {
  urlTitle: string;
  imageUrl: string;
  index: number;
  recipeIngredient: any;
  checked: boolean;
  onCheckboxChange: (index: number) => void;
}

const FoodceptionIngredientCard: React.FC<FoodceptionIngredientCardProps> = ({
  urlTitle,
  imageUrl,
  index,
  recipeIngredient,
  checked,
  onCheckboxChange
}) => {
  const url = `/ingredients/${FrontEndUtils.slugify(
    recipeIngredient.ingredient.title
  )}/${recipeIngredient.ingredient.id}`;

  return (
    <Card data-guid='f07f638d-7b54-4cfc-9014-febbebf2d9fb'>
      <FoodceptionCardHrefImage
        url={url}
        src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
        alt={recipeIngredient.ingredient.title}
      />
      <FoodceptionCardIngredientBody
        title={recipeIngredient.ingredient.title}
        description={recipeIngredient.ingredient.description}
        linkTitle={urlTitle}
        url={url}
        index={index}
        ingredient={recipeIngredient.ingredient}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
      />
    </Card>
  );
};

export default FoodceptionIngredientCard;
