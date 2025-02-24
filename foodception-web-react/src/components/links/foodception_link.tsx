import React from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface FoodceptionLinkProps {
  url: string;
  children: React.ReactNode;
  underlined?: boolean;
}

const FoodceptionLink: React.FC<FoodceptionLinkProps> = ({
  url,
  children,
  underlined = false,
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);
  let className = 'link-button';

  if (underlined) {
    className += ' underlined';
  }

  return (
    <a
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
      data-guid='02c19f79-bcd7-4604-8c43-efa53ce4e807'
      className={className}
    >
      {children}
    </a>
  );
};

export default FoodceptionLink;
