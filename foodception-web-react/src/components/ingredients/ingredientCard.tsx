import { FrontEndUtils } from '../../utils/FrontEndUtils';
import ParentWindowUtils from '../../utils/ParentWindowUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';

interface IngredientCardProps {
  ingredient: any;
  ingredientImage: any;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  ingredientImage
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };
  const imageUrl =
    ingredientImage?.imageUrl ||
    'https://static.wixstatic.com/media/f7bd72_c181cc79c3804725af9894a4245e292b~mv2.jpg';
  const url = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }`;
  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'>
      <div className='card'>
        <FoodceptionCardHrefImage
          url={url}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={ingredient.title}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            {FrontEndUtils.capitalizeText(ingredient.title)}
          </h5>
          <p className='card-text'>{ingredient.description}</p>
          {FrontEndUtils.isInsideIframe() ? (
            <button
              className='btn btn-primary'
              onClick={(event) => handleLinkClick(event, url)}
            >
              View Ingredient
            </button>
          ) : (
            <a href={url} className='btn btn-primary'>
              View Ingredient
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
