import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';

interface MealCategoriesListProps {
  meals: any[];
  mealImages: any[];
}

const MealCategoriesList: React.FC<MealCategoriesListProps> = ({
  meals,
  mealImages
}) => {
  return (
    <div className='row justify-content-center'>
      {meals.map((meal) => {
        const categoryLink = `/meals/${FrontEndUtils.slugify(meal.name)}/${
          meal.id
        }`;
        const categoryImage = mealImages.find(
          (image: any) => image.mealId === meal.id
        );
        return (
          <FoodceptionCard
            key={meal.id}
            title={meal.name}
            description={meal.description}
            url={categoryLink}
            urlTitle='View Recipes'
            imageUrl={categoryImage.imageUrl}
          ></FoodceptionCard>
        );
      })}
    </div>
  );
};

export default MealCategoriesList;
