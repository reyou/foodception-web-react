import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
  return (
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Link to={url} className='btn btn-primary'>
        {linkTitle}
      </Link>
    </Card.Body>
  );
};

export default FoodceptionCardBody;
