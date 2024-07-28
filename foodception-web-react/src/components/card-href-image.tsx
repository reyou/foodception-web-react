import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface FoodceptionCardHrefImageProps {
  url: string;
  src: string;
  alt: string;
}

const FoodceptionCardHrefImage: React.FC<FoodceptionCardHrefImageProps> = ({
  url,
  src,
  alt
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <a href={url}>
        <img src={src} alt={alt} className='card-img-top' />
      </a>
    );
  } else {
    return (
      <button
        className='btn-no-style'
        onClick={(event) => handleLinkClick(event, url)}
      >
        <img src={src} alt={alt} className='card-img-top' />
      </button>
    );
  }
};

export default FoodceptionCardHrefImage;
