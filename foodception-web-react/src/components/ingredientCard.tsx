import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardHrefImage from './cardHrefImage';
import FoodceptionCardIngredientBody from './cardIngredientBody';

interface FoodceptionIngredientCardProps {
  title: string;
  description: string;
  url: string;
  urlTitle: string;
  imageUrl: string;
  index: number;
  ingredient: any;
  checked: boolean;
  onCheckboxChange: (index: number) => void;
}

const FoodceptionIngredientCard: React.FC<FoodceptionIngredientCardProps> = ({
  title,
  description,
  url,
  urlTitle,
  imageUrl,
  index,
  ingredient,
  checked,
  onCheckboxChange
}) => {
  return (
    <div className='card'>
      <FoodceptionCardHrefImage
        url={url}
        src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
        alt={title}
      />
      <FoodceptionCardIngredientBody
        title={title}
        description={description}
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
