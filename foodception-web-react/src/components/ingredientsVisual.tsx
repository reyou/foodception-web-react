import FoodceptionIngredientCard from './ingredientCard';

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
          <div key={index} className='col-md-3 mb-3'>
            <FoodceptionIngredientCard
              title={ingredient.title}
              description={ingredient.description}
              url={`/ingredients/${ingredient.id}`}
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
