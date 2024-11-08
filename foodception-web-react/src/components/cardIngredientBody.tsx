import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionLink from './links/foodception_link';

interface FoodceptionCardIngredientBodyProps {
  recipeIngredient: any;
  url: string;
  linkTitle: string;
  index: number;
  checked: boolean;
  onCheckboxChange: (index: number) => void;
}

const FoodceptionCardIngredientBody: React.FC<
  FoodceptionCardIngredientBodyProps
> = ({
  recipeIngredient,
  url,
  linkTitle,
  index,
  checked,
  onCheckboxChange
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);
  const ingredientAmount = `${recipeIngredient.amount} ${recipeIngredient.unit}`;
  return (
    <Card.Body data-guid='6904dfea-b61f-4e60-8c67-c3dde6aa7acf'>
      <Card.Title>
        <FoodceptionLink url={adjustedUrl}>
          {FrontEndUtils.capitalizeText(recipeIngredient.ingredient.title)}
        </FoodceptionLink>
      </Card.Title>
      <div className='mb-2'>{ingredientAmount}</div>
      <Form.Group
        controlId={`ingredient-${recipeIngredient.ingredient.id}`}
        className='mb-3'
      >
        <Form.Check
          type='checkbox'
          label='Have This'
          checked={checked}
          onChange={() => onCheckboxChange(index)}
        />
      </Form.Group>

      <Card.Text data-guid='c918b681-9d93-4b75-af2f-865667a40642'>
        {recipeIngredient.ingredient.description}
      </Card.Text>

      <Button
        href={adjustedUrl}
        variant='primary'
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
        data-guid='4293f55b-825c-466b-952c-32614b8880ac'
        rel='noopener noreferrer'
      >
        {linkTitle}
      </Button>
    </Card.Body>
  );
};

export default FoodceptionCardIngredientBody;
