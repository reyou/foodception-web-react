import React from 'react';

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
    <img
      src={src}
      alt={alt}
      className='card-img-top'
      onClick={(event) => onWatchClicked(event)}
    />
  );
};

export default FoodceptionRecipeVideoCardImage;
