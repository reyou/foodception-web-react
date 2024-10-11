import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface NoRecipesProps {
  searchTerm: string;
  noMoreResults?: boolean;
}

const NoRecipes: React.FC<NoRecipesProps> = ({
  searchTerm,
  noMoreResults = false
}) => {
  const pageRoot = new URL(window.location.pathname, window.location.origin);
  const pageUrl = new URL(window.location.pathname, window.location.origin);
  pageUrl.searchParams.set('query', searchTerm);
  const firstPageUrl = pageUrl;
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(firstPageUrl.toString());
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6} className='text-center'>
          {!noMoreResults ? (
            <>
              <h4 className='mb-3'>
                No results found for "<strong>{searchTerm}</strong>"
              </h4>
              <p className='mb-4'>
                Try searching for something else, or explore these popular
                categories:
              </p>
            </>
          ) : (
            <>
              <h4 className='mb-3'>
                No more results found for "<strong>{searchTerm}</strong>"
              </h4>
              <p className='mb-4'>
                <Button
                  variant='link'
                  onClick={(event) =>
                    FrontEndUtils.handleLinkClick(event, adjustedUrl)
                  }
                  href={adjustedUrl}
                  className='text-secondary'
                  style={{ padding: 0 }}
                >
                  Click here
                </Button>{' '}
                to go back to the first page of results, or{' '}
                <Button
                  variant='link'
                  onClick={(event) =>
                    FrontEndUtils.handleLinkClick(event, pageRoot.toString())
                  }
                  href={FrontEndUtils.getAdjustedUrl(pageRoot.toString())}
                  className='text-secondary'
                  style={{ padding: 0 }}
                >
                  start a new search
                </Button>
                .
              </p>
            </>
          )}

          {!noMoreResults && (
            <Row className='justify-content-center'>
              <Col xs={12} md={6} lg={3} className='text-center'>
                <Button
                  href='/recipe-categories'
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
                  Videos
                </Button>
              </Col>
              <Col xs={12} md={6} lg={3} className='text-center'>
                <Button
                  href='/countries'
                  variant='outline-secondary'
                  size='lg'
                  className='w-100 mb-3'
                >
                  Cuisines
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default NoRecipes;
