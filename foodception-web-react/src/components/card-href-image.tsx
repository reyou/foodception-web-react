import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface FoodceptionCardHrefImageProps {
  href: string;
  src: string;
  alt: string;
}

const FoodceptionCardHrefImage: React.FC<FoodceptionCardHrefImageProps> = ({
  href,
  src,
  alt
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: href });
  };

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <button onClick={handleLinkClick} className='btn-no-style'>
        <img src={src} alt={alt} className='card-img-top' />
      </button>
    );
  } else {
    return (
      <a href={href}>
        <img src={src} alt={alt} className='card-img-top' />
      </a>
    );
  }
};

export default FoodceptionCardHrefImage;
