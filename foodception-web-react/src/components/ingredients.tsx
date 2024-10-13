import { Form } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface IngredientsProps {
  ingredients: any[];
  checkedIngredients: boolean[];
  onCheckboxChange: (index: number) => void;
}

const Ingredients: React.FC<IngredientsProps> = ({
  ingredients,
  checkedIngredients,
  onCheckboxChange
}) => {
  return (
    <ul
      data-guid='4e5f9c25-58d4-4951-a502-897021316d9f'
      className='list-unstyled'
    >
      {ingredients.map((ingredient: any, index: number) => (
        <li key={ingredient.id} className='mb-2'>
          <Form.Check
            type='checkbox'
            id={`ingredient-${ingredient.id}`}
            checked={checkedIngredients[index] || false}
            onChange={() => onCheckboxChange(index)}
            label={FrontEndUtils.capitalizeText(ingredient.ingredient.title)}
            className='fs-5'
          />
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
