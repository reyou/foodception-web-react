import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import { FavoritesService } from '../services/favories/favorites-service';
import { FavoriteType } from '../services/favories/favorite-type';

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
      console.error('Error updating favorite status:', error);
    } finally {
      setIsFavoriteLoading(false);
    }
  };

  const getButtonText = (): string => {
    if (isFavoriteLoading) {
      return isFavorited ? 'Removing...' : 'Adding...';
    }
    return isFavorited ? 'Favorited' : 'Favorite';
  };

  return (
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
        variant={isFavorited ? 'outline-secondary' : 'primary'}
        onClick={toggleFavorite}
        disabled={isFavoriteLoading}
      >
        {getButtonText()}
      </Button>
    </Card.Body>
  );
};

export default FoodceptionRecipeCardBody;
