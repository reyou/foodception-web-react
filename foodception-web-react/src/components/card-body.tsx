import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionCardBodyProps {
  id: string;
  title: string;
  description: string;
  url: string;
  linkTitle: string;
}

const FoodceptionCardBody: React.FC<FoodceptionCardBodyProps> = ({
  id,
  title,
  description,
  url,
  linkTitle
}) => {
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(url);

  return (
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button
        className='btn btn-primary'
        href={adjustedUrl}
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
      >
        {linkTitle}
      </Button>
    </Card.Body>
  );
};

export default FoodceptionCardBody;
