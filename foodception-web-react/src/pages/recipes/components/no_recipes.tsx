import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface NoRecipesProps {
  searchTerm: string;
}

const NoRecipes: React.FC<NoRecipesProps> = ({ searchTerm }) => {
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6} className='text-center'>
          <h4 className='mb-3'>
            No results found for "<strong>{searchTerm}</strong>"
          </h4>
          <p className='mb-4'>
            Try searching for something else, or explore these popular
            categories:
          </p>
        </Col>
      </Row>

      {/* Popular Categories - side by side */}
      <Row className='justify-content-center'>
        <Col xs={12} md={6} lg={3} className='text-center'>
          <Button
            href='/recipe-categories'
            variant='outline-secondary'
            size='lg'
            className='w-100 mb-3'
          >
            Recipe Categories
          </Button>
        </Col>
        <Col xs={12} md={6} lg={3} className='text-center'>
          <Button
            href='/meals'
            variant='outline-secondary'
            size='lg'
            className='w-100 mb-3'
          >
            Meals
          </Button>
        </Col>
        <Col xs={12} md={6} lg={3} className='text-center'>
          <Button
            href='/recipes/videos'
            variant='outline-secondary'
            size='lg'
            className='w-100 mb-3'
          >
            Recipe Videos
          </Button>
        </Col>
        <Col xs={12} md={6} lg={3} className='text-center'>
          <Button
            href='/countries'
            variant='outline-secondary'
            size='lg'
            className='w-100 mb-3'
          >
            Global Cuisines
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NoRecipes;
