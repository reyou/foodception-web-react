import React from 'react';
import { Container } from 'react-bootstrap';

interface FoodceptionHeaderProps {
  children: React.ReactNode;
  subHeader?: string;
}

const FoodceptionHeader: React.FC<FoodceptionHeaderProps> = ({
  children,
  subHeader
}) => {
  return (
    <Container data-guid='262c5d21-1ce9-4df3-8043-bcba7df0870a'>
      <h1 className='text-center'>{children}</h1>
      {subHeader && (
        <>
          <h4 className='text-center text-muted mb-4'>{subHeader}</h4>
        </>
      )}
    </Container>
  );
};

export default FoodceptionHeader;
