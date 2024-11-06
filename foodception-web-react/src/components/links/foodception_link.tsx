import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface FoodceptionLinkProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionLink: React.FC<FoodceptionLinkProps> = ({ url, children }) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);

  return (
    <a
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
      data-guid='02c19f79-bcd7-4604-8c43-efa53ce4e807'
      className='link-button'
    >
      {children}
    </a>
  );
};

export default FoodceptionLink;
