interface FoodceptionCardIngredientStepsProps {
  title: string;
  substeps: string;
}

const FoodceptionCardIngredientSteps: React.FC<
  FoodceptionCardIngredientStepsProps
> = ({ title, substeps }) => {
  const substepsArray = JSON.parse(substeps);
  return (
    <div className='card mb-4'>
      <h4 className='card-header'>{title}</h4>
      <div className='card-body'>
        {substepsArray.map((substep: any, index: number) => {
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
