import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FavoritesService } from '../services/favories/favorites-service';
import { FavoriteType } from '../services/favories/favorite-type';
import { FoodceptionUnauthorizedException } from '../exceptions/FoodceptionUnauthorizedException';
import GenericModal from './modals/generic-modal';

interface FavoriteButtonProps {
  id: string;
  initialFavorited?: boolean;
  className?: string;
  variant?: 'primary' | 'outline-secondary';
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  initialFavorited = false,
  className = '',
  variant = 'outline-secondary'
}) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
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
      <Button
        className={className}
        variant={isFavorited ? 'primary' : variant}
        onClick={toggleFavorite}
        disabled={isFavoriteLoading}
      >
        {getButtonIcon()}
        <span>{getButtonText()}</span>
      </Button>
      <GenericModal
        show={showModal}
        onHide={() => setShowModal(false)}
        title='Error'
        body={modalContent}
      />
    </>
  );
};

export default FavoriteButton;
