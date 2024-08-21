import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

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
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };

  return (
    <div className='card-body'>
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
      <p className='card-text'>{description}</p>
      {FrontEndUtils.isInsideIframe() ? (
        <button
          className='btn btn-primary'
          onClick={(event) => handleLinkClick(event, url)}
        >
          {linkTitle}
        </button>
      ) : (
        <a href={url} className='btn btn-primary'>
          {linkTitle}
        </a>
      )}
    </div>
  );
};

export default FoodceptionCardIngredientBody;
