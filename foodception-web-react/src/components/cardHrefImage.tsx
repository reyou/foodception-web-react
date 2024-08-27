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
    event: React.MouseEvent<HTMLAnchorElement | HTMLImageElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <img
        src={src}
        alt={alt}
        className='card-img-top'
        onClick={(event) => handleLinkClick(event, url)}
        data-guid='a2ee6365-25a2-4d7a-91dc-6b6e4899d71c'
      />
    );
  } else {
    return (
      <a href={url}>
        <img
          src={src}
          alt={alt}
          className='card-img-top'
          data-guid='b460664c-0eb3-431c-a176-f0e337457e41'
        />
      </a>
    );
  }
};

export default FoodceptionCardHrefImage;
