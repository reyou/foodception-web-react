import React from 'react';

interface RecipeTimeInfoProps {
  totalTime: number;
  prepTime: number;
  cookTime: number;
  servingSize: number;
}

const RecipeTimeInfo: React.FC<RecipeTimeInfoProps> = ({
  totalTime,
  prepTime,
  cookTime,
  servingSize
}) => {
  return (
    <div className='d-flex flex-wrap justify-content-center mt-3'>
      <div className='me-3'>
        <strong className='fs-5'>Total Time:</strong>{' '}
        <span className='fs-5'>{totalTime} min</span>
      </div>
      <div className='me-3'>
        <strong className='fs-5'>Prep Time:</strong>{' '}
        <span className='fs-5'>{prepTime} min</span>
      </div>
      <div className='me-3'>
        <strong className='fs-5'>Cook Time:</strong>{' '}
        <span className='fs-5'>{cookTime} min</span>
      </div>
      <div>
        <strong className='fs-5'>Serves:</strong>{' '}
        <span className='fs-5'>{servingSize}</span>
      </div>
    </div>
  );
};

export default RecipeTimeInfo;
