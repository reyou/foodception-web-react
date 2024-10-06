import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface FoodceptionHrefButtonProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionHrefButton: React.FC<FoodceptionHrefButtonProps> = ({
  url,
  children
}) => {
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
