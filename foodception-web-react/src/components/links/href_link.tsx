import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface FoodceptionHrefLinkProps {
  url: string;
  children: React.ReactNode;
}

const FoodceptionHrefLink: React.FC<FoodceptionHrefLinkProps> = ({
  url,
  children
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);

  return (
    <a
      data-guid='7762e7e6-8ec9-419c-9a2a-a1ec4bdc4539'
      className='link-button'
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
      rel='noopener noreferrer'
    >
      {children}
    </a>
  );
};

export default FoodceptionHrefLink;
