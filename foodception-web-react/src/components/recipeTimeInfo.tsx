import React from 'react';
import { Row, Col } from 'react-bootstrap';

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
    <Row className='justify-content-center'>
      <Col xs='auto' className='me-3'>
        <strong className='fs-5'>Total Time:</strong>{' '}
        <span className='fs-5'>{totalTime} min</span>
      </Col>
      <Col xs='auto' className='me-3'>
        <strong className='fs-5'>Prep Time:</strong>{' '}
        <span className='fs-5'>{prepTime} min</span>
      </Col>
      <Col xs='auto' className='me-3'>
        <strong className='fs-5'>Cook Time:</strong>{' '}
        <span className='fs-5'>{cookTime} min</span>
      </Col>
      <Col xs='auto'>
        <strong className='fs-5'>Serves:</strong>{' '}
        <span className='fs-5'>{servingSize}</span>
      </Col>
    </Row>
  );
};

export default RecipeTimeInfo;
