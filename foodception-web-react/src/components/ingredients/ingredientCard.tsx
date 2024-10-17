import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
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
    <Col xs={12} md={6} lg={4} xl={3} className='mb-4'>
      <Card>
        <FoodceptionCardHrefImage
          url={url}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={ingredient.title}
          badge={`${ingredient.recipeCount} ${
            ingredient.recipeCount === 1 ? 'Recipe' : 'Recipes'
          }`}
          badgeUrl={recipesUrl}
        />
        <Card.Body>
          <Card.Title>
            {FrontEndUtils.capitalizeText(ingredient.title)}
          </Card.Title>
          <Card.Text>{ingredient.description}</Card.Text>
          <Button
            variant='primary'
            className='me-2'
            href={FrontEndUtils.getAdjustedUrl(url)}
            onClick={(event) => FrontEndUtils.handleLinkClick(event, url)}
          >
            View Ingredient
          </Button>
          <Button
            variant='primary'
            href={FrontEndUtils.getAdjustedUrl(recipesUrl)}
            onClick={(event) =>
              FrontEndUtils.handleLinkClick(event, recipesUrl)
            }
          >
            View Recipes
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default IngredientCard;
