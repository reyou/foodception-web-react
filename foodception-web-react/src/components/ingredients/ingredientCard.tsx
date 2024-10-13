import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';

interface IngredientCardProps {
  ingredient: any;
  ingredientImage: any;
}

const IngredientCard: React.FC<IngredientCardProps> = ({
  ingredient,
  ingredientImage
}) => {
  const imageUrl =
    ingredientImage?.imageUrl ||
    'https://static.wixstatic.com/media/f7bd72_c181cc79c3804725af9894a4245e292b~mv2.jpg';
  const url = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }`;
  const recipesUrl = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }/recipes`;
  return (
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'>
      <div className='card'>
        <FoodceptionCardHrefImage
          url={url}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={ingredient.title}
          badge={`${ingredient.recipeCount} Recipes`}
          badgeUrl={recipesUrl}
        />
        <div className='card-body'>
          <h5 className='card-title'>
            {FrontEndUtils.capitalizeText(ingredient.title)}
          </h5>
          <p className='card-text'>{ingredient.description}</p>
          <>
            <a
              data-guid='f05a78f6-77be-44d4-bf58-22229bc5ea55'
              href={FrontEndUtils.getAdjustedUrl(url)}
              onClick={(event) => FrontEndUtils.handleLinkClick(event, url)}
              className='btn btn-primary me-2'
            >
              View Ingredient
            </a>
            <a
              data-guid='4e85011d-890b-4a52-ab68-8ae298577b5b'
              href={FrontEndUtils.getAdjustedUrl(recipesUrl)}
              onClick={(event) =>
                FrontEndUtils.handleLinkClick(event, recipesUrl)
              }
              className='btn btn-primary'
            >
              View Recipes
            </a>
          </>
        </div>
      </div>
    </div>
  );
};

export default IngredientCard;
