import React from 'react';

interface FoodceptionRecipeVideoCardImageProps {
  src: string;
  alt: string;
  onWatchClicked: () => void;
}

const FoodceptionRecipeVideoCardImage: React.FC<
  FoodceptionRecipeVideoCardImageProps
> = ({ src, alt, onWatchClicked }) => {
  return (
    <img
      src={src}
      alt={alt}
      className='card-img-top'
      onClick={() => onWatchClicked()}
    />
  );
};

export default FoodceptionRecipeVideoCardImage;
