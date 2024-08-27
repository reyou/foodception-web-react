import FoodceptionIngredientCard from './recipeIngredientCard';

interface IngredientsVisualProps {
  ingredients: any[];
  ingredientImages: any[];
  checkedIngredients: boolean[];
  onCheckboxChange: (index: number) => void;
}

const IngredientsVisual: React.FC<IngredientsVisualProps> = ({
  ingredients,
  ingredientImages,
  checkedIngredients,
  onCheckboxChange
}) => {
  return (
    <div className='row'>
      {ingredients.map((ingredient, index) => {
        const checked = checkedIngredients[index] || false;
        const ingredientImage = ingredientImages.find(
          (q) => q.ingredientId === ingredient.id
        );
        return (
          <div
            key={index}
            className='col-md-3 mb-3'
            data-guid='3949f5c3-cb19-460b-ba5f-576d3ea593c1'
          >
            <FoodceptionIngredientCard
              urlTitle='Details'
              imageUrl={ingredientImage.imageUrl}
              index={index}
              ingredient={ingredient}
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
