import React from 'react';
import { Card } from 'react-bootstrap';

interface FoodceptionRecipeVideoCardImageProps {
  src: string;
  alt: string;
  onWatchClicked: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
}

const FoodceptionRecipeVideoCardImage: React.FC<
  FoodceptionRecipeVideoCardImageProps
> = ({ src, alt, onWatchClicked }) => {
  return (
    <Card.Img
      src={src}
      alt={alt}
      className='card-img-top'
      onClick={(event) => onWatchClicked(event)}
      style={{ cursor: 'pointer' }}
    />
  );
};

export default FoodceptionRecipeVideoCardImage;
