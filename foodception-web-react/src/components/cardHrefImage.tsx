import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

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
  return (
    <a
      href={FrontEndUtils.getAdjustedUrl(url)}
      onClick={(event) =>
        FrontEndUtils.handleLinkClick(event, FrontEndUtils.getAdjustedUrl(url))
      }
    >
      <img
        data-guid='b460664c-0eb3-431c-a176-f0e337457e41'
        src={src}
        alt={alt}
        className='card-img-top'
      />
    </a>
  );
};

export default FoodceptionCardHrefImage;
