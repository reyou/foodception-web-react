interface FoodceptionCardIngredientStepsProps {
  title: string;
  substeps: any[];
}

const FoodceptionCardIngredientSteps: React.FC<
  FoodceptionCardIngredientStepsProps
> = ({ title, substeps }) => {
  return (
    <div className='card mb-4'>
      <h4 className='card-header'>{title}</h4>
      <div className='card-body'>
        {substeps.map((substep: any, index: number) => {
          return (
            <div key={index}>
              <p className='fs-5'>
                {index + 1}- {substep}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodceptionCardIngredientSteps;
