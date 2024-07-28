import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardBody from './card-body';
import FoodceptionCardHrefImage from './card-href-image';

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
    <div className='foodception-card-container'>
      <div className='card'>
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
        ></FoodceptionCardBody>
      </div>
    </div>
  );
};

export default FoodceptionCard;
