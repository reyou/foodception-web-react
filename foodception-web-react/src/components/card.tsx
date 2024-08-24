import React from 'react';
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
    <div className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'>
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
