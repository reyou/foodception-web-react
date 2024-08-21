import FoodceptionCardIngredientSteps from './cardIngredientSteps';

interface RecipeStepsProps {
  steps: any[];
}

const RecipeSteps: React.FC<RecipeStepsProps> = ({ steps }) => {
  return (
    <div>
      {steps.map((step) => {
        return (
          <FoodceptionCardIngredientSteps
            key={step.stepNumber}
            title={step.title}
            substeps={step.substeps}
          ></FoodceptionCardIngredientSteps>
        );
      })}
    </div>
  );
};

export default RecipeSteps;
