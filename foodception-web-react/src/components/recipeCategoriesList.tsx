import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';

interface RecipeCategoriesListProps {
  recipeCategories: any[];
}

const RecipeCategoriesList: React.FC<RecipeCategoriesListProps> = ({
  recipeCategories
}) => {
  return (
    <div className='row justify-content-center'>
      {recipeCategories.map((category: any) => {
        const categoryImage = category.recipeCategoryImages[0];
        const categoryLink = `/recipe-categories/${FrontEndUtils.slugify(
          category.name
        )}/${category.id}`;

        return (
          <FoodceptionCard
            key={category.id}
            title={category.name}
            description={category.description}
            url={categoryLink}
            urlTitle='View Recipes'
            imageUrl={categoryImage.imageUrl}
          ></FoodceptionCard>
        );
      })}
    </div>
  );
};

export default RecipeCategoriesList;
