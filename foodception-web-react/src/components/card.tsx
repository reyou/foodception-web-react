import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardBody from './cardBody';
import FoodceptionCardHrefImage from './cardHrefImage';

interface FoodceptionCardProps {
  title: string;
  description: string;
  url: string;
  urlTitle: string;
  imageUrl: string;
}

const FoodceptionCard: React.FC<FoodceptionCardProps> = ({
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
          title={title}
          description={description}
          linkTitle={urlTitle}
          url={url}
        />
      </Card>
    </Col>
  );
};

export default FoodceptionCard;
