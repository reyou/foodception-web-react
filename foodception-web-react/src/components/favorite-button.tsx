import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FavoritesService } from '../services/favories/favorites-service';
import { FavoriteType } from '../services/favories/favorite-type';
import { FoodceptionUnauthorizedException } from '../exceptions/FoodceptionUnauthorizedException';
import { ErrorType, ErrorDetails } from '../types/error.types';

interface FavoriteButtonProps {
  id: string;
  initialFavorited?: boolean;
  className?: string;
  variant?: 'primary' | 'outline-secondary';
  onError?: (error: ErrorDetails) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  initialFavorited = false,
  className = '',
  variant = 'outline-secondary',
  onError
}) => {
  const [isFavorited, setIsFavorited] = useState(initialFavorited);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(false);

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
        onError?.({
          type: ErrorType.AUTH_ERROR,
          message: 'You need to log in to perform this action.'
        });
      } else {
        onError?.({
          type: ErrorType.SERVER_ERROR,
          message: 'An error occurred. Please try again later.'
        });
      }
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
    <Button
      className={className}
      variant={isFavorited ? 'primary' : variant}
      onClick={toggleFavorite}
      disabled={isFavoriteLoading}
    >
      {getButtonIcon()}
      <span>{getButtonText()}</span>
    </Button>
  );
};

export default FavoriteButton;
