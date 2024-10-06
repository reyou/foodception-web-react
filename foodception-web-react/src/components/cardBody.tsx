import React from 'react';
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
    <div className='card-body'>
      <h5 className='card-title'>{FrontEndUtils.capitalizeText(title)}</h5>
      <p className='card-text'>{description}</p>
      <a
        data-guid='70785352-4001-424b-9127-4aa470808626'
        href={adjustedUrl}
        onClick={(event) => FrontEndUtils.handleLinkClick(event, adjustedUrl)}
        className='btn btn-primary'
      >
        {linkTitle}
      </a>
    </div>
  );
};

export default FoodceptionCardBody;
