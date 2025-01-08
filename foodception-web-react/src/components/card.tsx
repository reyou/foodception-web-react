import React from 'react';
import { Card, Col } from 'react-bootstrap';
import FoodceptionCardHrefImage from './cardHrefImage';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardBody from './card-body';

interface FoodceptionCardProps {
  id: string;
  title: string;
  description: string;
  url: string;
  urlTitle: string;
  imageUrl: string;
}

const FoodceptionCard: React.FC<FoodceptionCardProps> = ({
  id,
  title,
  description,
  url,
  urlTitle,
  imageUrl
}) => {
  return (
    <Col xs={12} md={6} lg={4} xl={3} className='mb-4'>
      <Card>
        <FoodceptionCardHrefImage
          url={url}
          src={FrontEndUtils.getResizedImagePath(imageUrl, 400, 400)}
          alt={title}
        />
        <FoodceptionCardBody
          id={id}
          title={title}
          description={description}
          url={url}
          linkTitle={urlTitle}
        />
      </Card>
    </Col>
  );
};

export default FoodceptionCard;
