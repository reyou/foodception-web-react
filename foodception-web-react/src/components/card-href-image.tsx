import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

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
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      window.parent.postMessage({ type: 'redirect', url: href }, '*');
    }
  };

  const isInsideIframe = FrontEndUtils.isInsideIframe();

  return (
    <a
      href={isInsideIframe ? 'javascript:void(0)' : href}
      onClick={handleLinkClick}
    >
      <img src={src} alt={alt} className='card-img-top' />
    </a>
  );
};

export default FoodceptionCardHrefImage;
