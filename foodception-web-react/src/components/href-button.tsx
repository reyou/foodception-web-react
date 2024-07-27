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
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (FrontEndUtils.isInsideIframe()) {
      event.preventDefault();
      ParentWindowUtils.postMessage({ type: 'redirect', url: href });
    }
  };
  return (
    <div>
      <a
        className='btn btn-primary'
        href={FrontEndUtils.isInsideIframe() ? 'javascript:void(0)' : href}
        onClick={handleLinkClick}
      >
        {children}
      </a>
    </div>
  );
};

export default FoodceptionHrefButton;
