import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionCardBodyProps {
  title: string;
  description: string;
  url: string;
  linkTitle: string;
}

const FoodceptionCardBody: React.FC<FoodceptionCardBodyProps> = ({
  title,
  description,
  url,
  linkTitle
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);

  return (
    <Card.Body>
      <Card.Title>{FrontEndUtils.capitalizeText(title)}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button
        data-guid='70785352-4001-424b-9127-4aa470808626'
        href={adjustedUrl}
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
        variant='primary'
      >
        {linkTitle}
      </Button>
    </Card.Body>
  );
};

export default FoodceptionCardBody;
