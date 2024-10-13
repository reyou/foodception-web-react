import { Row, Col } from 'react-bootstrap';
import FoodceptionIngredientCard from './recipeIngredientCard';

interface IngredientsVisualProps {
  recipeIngredients: any[];
  checkedIngredients: boolean[];
  onCheckboxChange: (index: number) => void;
}

const IngredientsVisual: React.FC<IngredientsVisualProps> = ({
  recipeIngredients,
  checkedIngredients,
  onCheckboxChange
}) => {
  return (
    <Row>
      {recipeIngredients.map((recipeIngredient, index) => {
        const checked = checkedIngredients[index] || false;
        return (
          <Col
            key={index}
            md={3}
            className='mb-3'
            data-guid='3949f5c3-cb19-460b-ba5f-576d3ea593c1'
          >
            <FoodceptionIngredientCard
              urlTitle='Details'
              imageUrl={
                recipeIngredient.ingredient.ingredientImages[0].imageUrl
              }
              index={index}
              recipeIngredient={recipeIngredient}
              checked={checked}
              onCheckboxChange={onCheckboxChange}
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default IngredientsVisual;
