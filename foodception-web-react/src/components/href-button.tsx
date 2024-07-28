import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface FoodceptionHrefButtonProps {
  href: string;
  children: React.ReactNode;
}

const FoodceptionHrefButton: React.FC<FoodceptionHrefButtonProps> = ({
  href,
  children
}) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: href });
  };

  if (FrontEndUtils.isInsideIframe()) {
    return (
      <button className='btn btn-primary' onClick={handleLinkClick}>
        {children}
      </button>
    );
  } else {
    return (
      <a className='btn btn-primary' href={href}>
        {children}
      </a>
    );
  }
};

export default FoodceptionHrefButton;
