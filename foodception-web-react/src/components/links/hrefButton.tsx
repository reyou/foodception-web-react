import React from 'react';
import { Button } from 'react-bootstrap';
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
    <Button
      variant='primary'
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
    >
      {children}
    </Button>
  );
};

export default FoodceptionHrefButton;
