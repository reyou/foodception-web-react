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
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);
  return (
    <a
      className='btn btn-primary'
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
    >
      {children}
    </a>
  );
};

export default FoodceptionHrefButton;
