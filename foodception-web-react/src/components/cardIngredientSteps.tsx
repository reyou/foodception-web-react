import { Card } from 'react-bootstrap';

interface FoodceptionCardIngredientStepsProps {
  title: string;
  substeps: string;
}

const FoodceptionCardIngredientSteps: React.FC<
  FoodceptionCardIngredientStepsProps
> = ({ title, substeps }) => {
  const substepsArray = JSON.parse(substeps);

  return (
    <Card className='mb-4'>
      <Card.Header as='h4'>{title}</Card.Header>
      <Card.Body>
        {substepsArray.map((substep: string, index: number) => (
          <div key={index}>
            <p className='fs-5'>
              {index + 1}- {substep}
            </p>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default FoodceptionCardIngredientSteps;
