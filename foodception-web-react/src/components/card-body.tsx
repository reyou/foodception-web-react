import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

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
    event: React.MouseEvent<HTMLAnchorElement>,
    link: string
  ) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      window.parent.postMessage({ type: 'redirect', url: link }, '*');
    }
  };

  return (
    <div className='card-body'>
      <h5 className='card-title'>{FrontEndUtils.capitalizeText(title)}</h5>
      <p className='card-text'>{description}</p>
      <a
        href={FrontEndUtils.isInsideIframe() ? 'javascript:void(0)' : url}
        className='btn btn-primary'
        onClick={(event) => handleLinkClick(event, url)}
      >
        {linkTitle}
      </a>
    </div>
  );
};

export default FoodceptionCardBody;
