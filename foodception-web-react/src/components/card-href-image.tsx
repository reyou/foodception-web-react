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
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      ParentWindowUtils.postMessage({ type: 'redirect', url: href });
    }
  };

  return (
    <a
      href={FrontEndUtils.isInsideIframe() ? 'javascript:void(0)' : href}
      onClick={handleLinkClick}
    >
      <img src={src} alt={alt} className='card-img-top' />
    </a>
  );
};

export default FoodceptionCardHrefImage;
