import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface NoResultsProps {
  searchTerm: string;
}

const NoResults: React.FC<NoResultsProps> = ({ searchTerm }) => {
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
            <Col xs={12} md={6} lg={3} className='text-center'>
              <Button
                href='/recipe-categories'
                onClick={(event) =>
                  FrontEndUtils.handleLinkClick(
                    event,
                    FrontEndUtils.getAdjustedUrl('/recipe-categories')
                  )
                }
                variant='outline-secondary'
                size='lg'
                className='w-100 mb-3'
              >
                Categories
              </Button>
            </Col>
            <Col xs={12} md={6} lg={3} className='text-center'>
              <Button
                href='/meals'
                onClick={(event) =>
                  FrontEndUtils.handleLinkClick(
                    event,
                    FrontEndUtils.getAdjustedUrl('/meals')
                  )
                }
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
                onClick={(event) =>
                  FrontEndUtils.handleLinkClick(
                    event,
                    FrontEndUtils.getAdjustedUrl('/recipes/videos')
                  )
                }
                variant='outline-secondary'
                size='lg'
                className='w-100 mb-3'
              >
                Videos
              </Button>
            </Col>
            <Col xs={12} md={6} lg={3} className='text-center'>
              <Button
                href='/countries'
                onClick={(event) =>
                  FrontEndUtils.handleLinkClick(
                    event,
                    FrontEndUtils.getAdjustedUrl('/countries')
                  )
                }
                variant='outline-secondary'
                size='lg'
                className='w-100 mb-3'
              >
                Cuisines
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NoResults;
