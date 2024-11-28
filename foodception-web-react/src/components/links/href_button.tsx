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
      variant='outline-secondary'
      href={adjustedUrl}
      onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
      data-guid='3c10a747-c75b-4101-9657-e09a24916d44'
    >
      {children}
    </Button>
  );
};

export default FoodceptionHrefButton;
