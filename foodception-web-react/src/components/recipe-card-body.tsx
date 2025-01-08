import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import { FavoritesService } from '../services/favories/favorites-service';
import { FavoriteType } from '../services/favories/favorite-type';
import { FoodceptionUnauthorizedException } from '../exceptions/FoodceptionUnauthorizedException';
import GenericModal from './modals/generic-modal';

interface FoodceptionRecipeCardBodyProps {
  id: string;
  title: string;
  description: string;
  url: string;
  linkTitle: string;
}

const FoodceptionRecipeCardBody: React.FC<FoodceptionRecipeCardBodyProps> = ({
  id,
  title,
  description,
  url,
  linkTitle
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  const toggleFavorite = async () => {
    if (isFavoriteLoading) return;
    setIsFavoriteLoading(true);

    try {
      if (isFavorited) {
        await FavoritesService.removeFavorite(FavoriteType.Recipes, id);
      } else {
        await FavoritesService.createFavorite(FavoriteType.Recipes, id);
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
        <Card.Title>{FrontEndUtils.capitalizeText(title)}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          className='me-2 mt-2'
          data-guid='70785352-4001-424b-9127-4aa470808626'
          href={adjustedUrl}
          onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
          variant='primary'
        >
          {linkTitle}
        </Button>
        <Button
          className='me-2 mt-2'
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
