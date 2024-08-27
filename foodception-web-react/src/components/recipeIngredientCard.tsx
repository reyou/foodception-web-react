import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardHrefImage from './cardHrefImage';
import FoodceptionCardIngredientBody from './cardIngredientBody';

interface FoodceptionIngredientCardProps {
  urlTitle: string;
  imageUrl: string;
  index: number;
  ingredient: any;
  checked: boolean;
  onCheckboxChange: (index: number) => void;
}

const FoodceptionIngredientCard: React.FC<FoodceptionIngredientCardProps> = ({
  urlTitle,
  imageUrl,
  index,
  ingredient,
  checked,
  onCheckboxChange
}) => {
  const url = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }`;
  return (
    <div className='card' data-guid='f07f638d-7b54-4cfc-9014-febbebf2d9fb'>
      <FoodceptionCardHrefImage
        url={url}
        src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
        alt={ingredient.title}
      />
      <FoodceptionCardIngredientBody
        title={ingredient.title}
        description={ingredient.description}
        linkTitle={urlTitle}
        url={url}
        index={index}
        ingredient={ingredient}
        checked={checked}
        onCheckboxChange={(index: number) => onCheckboxChange(index)}
      ></FoodceptionCardIngredientBody>
    </div>
  );
};

export default FoodceptionIngredientCard;
