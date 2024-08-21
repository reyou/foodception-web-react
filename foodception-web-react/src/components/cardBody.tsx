import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface FoodceptionCardBodyProps {
  title: string;
  description: string;
  url: string;
  linkTitle: string;
}

const FoodceptionCardBody: React.FC<FoodceptionCardBodyProps> = ({
  title,
  description,
  url,
  linkTitle
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };

  return (
    <div className='card-body'>
      <h5 className='card-title'>{FrontEndUtils.capitalizeText(title)}</h5>
      <p className='card-text'>{description}</p>
      {FrontEndUtils.isInsideIframe() ? (
        <button
          className='btn btn-primary'
          onClick={(event) => handleLinkClick(event, url)}
        >
          {linkTitle}
        </button>
      ) : (
        <a href={url} className='btn btn-primary'>
          {linkTitle}
        </a>
      )}
    </div>
  );
};

export default FoodceptionCardBody;
