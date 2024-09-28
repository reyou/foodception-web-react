import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import ParentWindowUtils from '../../utils/ParentWindowUtils';

interface FoodceptionHrefLinkProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionHrefLink: React.FC<FoodceptionHrefLinkProps> = ({
  url,
  children
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <a
        className='link-button'
        href={url}
        onClick={(event) => handleLinkClick(event, url)}
      >
        {children}
      </a>
    );
  } else {
    return (
      <a className='link-button' href={url}>
        {children}
      </a>
    );
  }
};

export default FoodceptionHrefLink;
