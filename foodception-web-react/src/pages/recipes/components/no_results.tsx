import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface NoResultsProps {
  searchTerm: string;
}

const NoResults: React.FC<NoResultsProps> = ({ searchTerm }) => {
  // Define the list of button data
  const buttonData = [
    { label: 'Videos', href: '/recipe-videos' },
    { label: 'Categories', href: '/recipe-categories' },
    { label: 'Diets', href: '/diets' },
    { label: 'Cuisines', href: '/countries' },
    { label: 'Meals', href: '/meals' }
  ];

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
          <Row className='justify-content-center'>
            {/* Iterate over the buttonData list */}
            {buttonData.map((button, index) => (
              <Col xs={12} md={6} lg={3} className='text-center' key={index}>
                <Button
                  href={button.href}
                  onClick={(event) =>
                    FrontEndUtils.handleLinkClick(
                      event,
                      FrontEndUtils.getAdjustedUrl(button.href)
                    )
                  }
                  variant='outline-secondary'
                  size='lg'
                  className='w-100 mb-3'
                >
                  {button.label}
                </Button>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NoResults;
