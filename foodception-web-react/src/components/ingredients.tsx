import { Form } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface IngredientsProps {
  recipeIngredients: any[];
  checkedIngredients: boolean[];
  onCheckboxChange: (index: number) => void;
}

const Ingredients: React.FC<IngredientsProps> = ({
  recipeIngredients,
  checkedIngredients,
  onCheckboxChange
}) => {
  return (
    <ul
      data-guid='4e5f9c25-58d4-4951-a502-897021316d9f'
      className='list-unstyled'
    >
      {recipeIngredients.map((recipeIngredient: any, index: number) => {
        const ingredientLabel = `${FrontEndUtils.capitalizeText(
          recipeIngredient.ingredient.title
        )} - ${recipeIngredient.amount} ${recipeIngredient.unit}`;
        return (
          <li key={recipeIngredient.id} className='mb-2'>
            <Form.Check
              type='checkbox'
              id={`ingredient-${recipeIngredient.id}`}
              checked={checkedIngredients[index] || false}
              onChange={() => onCheckboxChange(index)}
              label={ingredientLabel}
              className='fs-5'
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Ingredients;
