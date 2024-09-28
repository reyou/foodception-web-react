import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import ParentWindowUtils from '../../utils/ParentWindowUtils';

interface FoodceptionHrefButtonProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionHrefButton: React.FC<FoodceptionHrefButtonProps> = ({
  url,
  children
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
      <button
        className='btn btn-primary'
        onClick={(event) => handleLinkClick(event, url)}
      >
        {children}
      </button>
    );
  } else {
    return (
      <a className='btn btn-primary' href={url}>
        {children}
      </a>
    );
  }
};

export default FoodceptionHrefButton;
