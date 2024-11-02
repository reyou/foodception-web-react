import { Row, Col } from 'react-bootstrap';
import FoodceptionCardIngredientSteps from './cardIngredientSteps';

interface RecipeStepsProps {
  steps: any[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <Row className='gy-4'>
      {steps.map((step) => (
        <Col xs={12} md={6} lg={4} key={step.stepNumber}>
          <FoodceptionCardIngredientSteps
            title={step.title}
            substeps={step.substeps}
          />
        </Col>
      ))}
    </Row>
  );
};

export default RecipeSteps;
