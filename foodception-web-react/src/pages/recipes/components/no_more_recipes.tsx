import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface NoMoreRecipesProps {
  searchTerm: string;
}

const NoMoreRecipes: React.FC<NoMoreRecipesProps> = ({ searchTerm }) => {
  const pageRoot = FrontEndUtils.getPageRoot().toString();
  const firstPageUrl = new URL(pageRoot);
  firstPageUrl.searchParams.set('query', searchTerm);
  firstPageUrl.searchParams.set('page', '1');
  const adjustedUrl = FrontEndUtils.getAdjustedUrl(firstPageUrl.toString());

  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <Col xs={12} md={8} lg={6} className='text-center'>
          <h4 className='mb-3'>
            No more results found for "<strong>{searchTerm}</strong>"
          </h4>
          <p className='mb-4'>
            <a
              onClick={(event) =>
                FrontEndUtils.handleLinkClick(event, adjustedUrl)
              }
              href={adjustedUrl}
              className='text-secondary fw-bold'
            >
              Click here
            </a>{' '}
            to go back to the first page of results, or{' '}
            <a
              onClick={(event) =>
                FrontEndUtils.handleLinkClick(
                  event,
                  FrontEndUtils.getAdjustedUrl(pageRoot)
                )
              }
              href={FrontEndUtils.getAdjustedUrl(pageRoot)}
              className='text-secondary fw-bold'
            >
              start a new search
            </a>
            .
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NoMoreRecipes;
