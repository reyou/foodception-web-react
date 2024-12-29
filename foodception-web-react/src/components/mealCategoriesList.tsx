import { Row } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';

interface MealCategoriesListProps {
  meals: any[];
}

const MealCategoriesList: React.FC<MealCategoriesListProps> = ({ meals }) => {
  return (
    <Row className='justify-content-center'>
      {meals.map((meal) => {
        const categoryLink = `/meals/${FrontEndUtils.slugify(meal.name)}/${
          meal.id
        }`;
        const categoryImage = meal.mealImages[0];

        return (
          <FoodceptionCard
            title={meal.name}
            description={meal.description}
            url={categoryLink}
            urlTitle='View Recipes'
            imageUrl={categoryImage.imageUrl}
          />
        );
      })}
    </Row>
  );
};

export default MealCategoriesList;
