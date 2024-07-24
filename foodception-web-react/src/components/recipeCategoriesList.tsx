import { FrontEndUtils } from '../utils/FrontEndUtils';
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

  const isInsideIframe = FrontEndUtils.isInsideIframe();

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
          <div key={category.id} className='foodception-card-container'>
            <div className='card'>
              <FoodceptionCardHrefImage
                href={categoryLink}
                src={FrontEndUtils.getResizedImagePath(
                  categoryImage.imageUrl,
                  400,
                  400
                )}
                alt={category.name}
              />
              <div className='card-body'>
                <h5 className='card-title'>
                  {FrontEndUtils.capitalizeText(category.name)}
                </h5>
                <p className='card-text'>{category.description}</p>
                <a
                  href={isInsideIframe ? 'javascript:void(0)' : categoryLink}
                  className='btn btn-primary'
                  onClick={(event) => handleLinkClick(event, categoryLink)}
                >
                  View Recipes
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeCategoriesList;
