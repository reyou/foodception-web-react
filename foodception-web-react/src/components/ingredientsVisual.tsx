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
    <div className='row'>
      {recipeIngredients.map((recipeIngredient, index) => {
        const checked = checkedIngredients[index] || false;
        return (
          <div
            key={index}
            className='col-md-3 mb-3'
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
              onCheckboxChange={(index: number) => onCheckboxChange(index)}
            ></FoodceptionIngredientCard>
          </div>
        );
      })}
    </div>
  );
};

export default IngredientsVisual;
