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
    <ul className='list-unstyled'>
      {ingredients.map((ingredient: any, index: number) => (
        <li key={ingredient.id} className='mb-2'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='checkbox'
              id={`ingredient-${ingredient.id}`}
              checked={checkedIngredients[index] || false}
              onChange={() => onCheckboxChange(index)}
            />
            <label
              className='form-check-label fs-5'
              htmlFor={`ingredient-${ingredient.id}`}
            >
              {FrontEndUtils.capitalizeText(ingredient.title)}
            </label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Ingredients;
