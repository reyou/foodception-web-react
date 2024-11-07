import { Row, Col } from 'react-bootstrap';
import FoodceptionCardIngredientSteps from './cardIngredientSteps';

interface RecipeStepsProps {
  steps: any[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  const stepCount = steps.length;

  const getColSize = (size: string) => {
    if (stepCount === 1) {
      return 12;
    }
    if (stepCount === 2) {
      return 6;
    }
    // 3 or more steps
    if (size === 'md') {
      return 6;
    }
    if (size === 'lg') {
      return 4;
    }
  };

  return (
    <Row className='gy-4'>
      {steps.map((step) => (
        <Col
          xs={12}
          md={getColSize('md')}
          lg={getColSize('lg')}
          key={step.stepNumber}
        >
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
