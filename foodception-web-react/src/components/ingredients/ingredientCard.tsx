import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionCardHrefImage from '../cardHrefImage';
import FoodceptionLink from '../links/foodception_link';

interface IngredientCardProps {
  ingredient: any;
}

const IngredientCard: React.FC<IngredientCardProps> = ({ ingredient }) => {
  const imageUrl = ingredient.ingredientImages[0].imageUrl;

  const url = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }`;
  const badgeUrl = `/ingredients/${FrontEndUtils.slugify(ingredient.title)}/${
    ingredient.id
  }#recipes`;

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
          badgeUrl={badgeUrl}
        />
        <Card.Body>
          <Card.Title>
            <FoodceptionLink url={url}>
              {FrontEndUtils.capitalizeText(ingredient.title)}
            </FoodceptionLink>
          </Card.Title>
          <Card.Text>{ingredient.description}</Card.Text>
          <Button
            variant='primary'
            className='me-2'
            href={FrontEndUtils.getAdjustedUrl(url)}
            onClick={(event) => FrontEndUtils.handleLinkClick(event, url)}
          >
            Details
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default IngredientCard;
