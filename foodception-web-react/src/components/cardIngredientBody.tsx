import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionCardIngredientBodyProps {
  title: string;
  description: string;
  url: string;
  linkTitle: string;
  index: number;
  ingredient: any;
  checked: boolean;
  onCheckboxChange: (index: number) => void;
}

const FoodceptionCardIngredientBody: React.FC<
  FoodceptionCardIngredientBodyProps
> = ({
  title,
  description,
  url,
  linkTitle,
  index,
  ingredient,
  checked,
  onCheckboxChange
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);

  return (
    <div className='card-body' data-guid='6904dfea-b61f-4e60-8c67-c3dde6aa7acf'>
      <h5 className='card-title'>{FrontEndUtils.capitalizeText(title)}</h5>
      <div className='form-check'>
        <input
          className='form-check-input'
          type='checkbox'
          id={`ingredient-${ingredient.id}`}
          checked={checked}
          onChange={() => onCheckboxChange(index)}
        />
        <label
          className='form-check-label'
          htmlFor={`ingredient-${ingredient.id}`}
        >
          Have This
        </label>
      </div>
      <p className='card-text' data-guid='c918b681-9d93-4b75-af2f-865667a40642'>
        {description}
      </p>
      <a
        href={adjustedUrl}
        className='btn btn-primary'
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
        data-guid='4293f55b-825c-466b-952c-32614b8880ac'
        rel='noopener noreferrer'
      >
        {linkTitle}
      </a>
    </div>
  );
};

export default FoodceptionCardIngredientBody;
