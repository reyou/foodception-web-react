import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionCardHrefImageProps {
  url: string;
  src: string;
  alt: string;
  badge?: string;
  badgeUrl?: string; // New optional URL for badge
}

const FoodceptionCardHrefImage: React.FC<FoodceptionCardHrefImageProps> = ({
  url,
  src,
  alt,
  badge,
  badgeUrl
}) => {
  return (
    <div className='position-relative'>
      <a
        href={FrontEndUtils.getAdjustedUrl(url)}
        onClick={(event) =>
          FrontEndUtils.handleLinkClick(
            event,
            FrontEndUtils.getAdjustedUrl(url)
          )
        }
      >
        <img
          data-guid='b460664c-0eb3-431c-a176-f0e337457e41'
          src={src}
          alt={alt}
          className='card-img-top'
        />
      </a>

      {badge &&
        (badgeUrl ? (
          <a
            href={FrontEndUtils.getAdjustedUrl(badgeUrl)}
            onClick={(event) =>
              FrontEndUtils.handleLinkClick(
                event,
                FrontEndUtils.getAdjustedUrl(badgeUrl)
              )
            }
            className='foodception-badge-top-right'
          >
            {badge}
          </a>
        ) : (
          <div className='foodception-badge-top-right'>{badge}</div>
        ))}
    </div>
  );
};

export default FoodceptionCardHrefImage;
