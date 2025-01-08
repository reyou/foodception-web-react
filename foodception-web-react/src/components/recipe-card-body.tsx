import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Recipe } from '../types/recipe.types';
import { FavoritesService } from '../services/favories/favorites-service';
import { FavoriteType } from '../services/favories/favorite-type';
import { FoodceptionUnauthorizedException } from '../exceptions/FoodceptionUnauthorizedException';
import GenericModal from './modals/generic-modal';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionRecipeCardBodyProps {
  recipe: Recipe;
  linkTitle?: string;
}

const FoodceptionRecipeCardBody: React.FC<FoodceptionRecipeCardBodyProps> = ({
  recipe,
  linkTitle = 'View Recipe'
}) => {
  const [isFavorited, setIsFavorited] = useState(recipe.isFavorited || false);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${recipe.id}`;

  const toggleFavorite = async () => {
    if (isFavoriteLoading) return;
    setIsFavoriteLoading(true);

    try {
      if (isFavorited) {
        await FavoritesService.removeFavorite(FavoriteType.Recipes, recipe.id);
      } else {
        await FavoritesService.createFavorite(FavoriteType.Recipes, recipe.id);
      }
      setIsFavorited((prev) => !prev);
    } catch (error) {
      if (error instanceof FoodceptionUnauthorizedException) {
        setModalContent('You need to log in to perform this action.');
      } else {
        setModalContent('An error occurred. Please try again later.');
      }
      setShowModal(true);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const getButtonText = (): string => {
    if (isFavoriteLoading) {
      return isFavorited ? 'Unfavoriting...' : 'Favoriting...';
    }
    return isFavorited ? 'Favorited' : 'Favorite';
  };

  const getButtonIcon = () => {
    if (isFavoriteLoading) {
      return <i className="bi bi-arrow-repeat spinner me-1"></i>;
    }
    return <i className={`bi ${isFavorited ? 'bi-heart-fill' : 'bi-heart'} me-1`}></i>;
  };

  return (
    <>
      <Card.Body>
        <Card.Title>{FrontEndUtils.capitalizeText(recipe.title)}</Card.Title>
        <Card.Text>{recipe.description}</Card.Text>
        <Link to={recipeLink} className='btn btn-primary me-2'>
          {linkTitle}
        </Link>
        <Button
          variant={isFavorited ? 'primary' : 'outline-secondary'}
          onClick={toggleFavorite}
          disabled={isFavoriteLoading}
        >
          {getButtonIcon()}
          <span>{getButtonText()}</span>
        </Button>
      </Card.Body>
      <GenericModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title='Error'
        body={modalContent}
      />
    </>
  );
};

export default FoodceptionRecipeCardBody;
