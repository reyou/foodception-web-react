import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';
import FoodceptionCardHrefImage from './card-href-image';

interface RecipeCategoriesListProps {
  recipeCategories: any[];
  recipeCategoryImages: any[];
}

const RecipeCategoriesList: React.FC<RecipeCategoriesListProps> = ({
  recipeCategories,
  recipeCategoryImages
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      window.parent.postMessage({ type: 'redirect', url: link }, '*');
    }
  };

  return (
    <div className='row justify-content-center'>
      {recipeCategories.map((category: any) => {
        const categoryImage = recipeCategoryImages.find(
          (image: any) => image.recipeCategoryId === category.id
        );
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
