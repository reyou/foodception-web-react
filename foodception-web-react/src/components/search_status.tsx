import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface SearchStatusProps {
  searchTerm: string;
  onClearSearch: () => void;
}

const SearchStatus: React.FC<SearchStatusProps> = ({
  searchTerm,
  onClearSearch
}) => {
  const navigate = useNavigate();

  const handleClearSearch = (event: React.MouseEvent<Element>) => {
    const recipesListUrl = window.location.pathname;

    if (FrontEndUtils.isInsideIframe()) {
      const adjustedUrl = FrontEndUtils.getAdjustedUrl(recipesListUrl);
      FrontEndUtils.handleLinkClick(event, adjustedUrl);
    } else {
      onClearSearch();
      navigate(recipesListUrl);
    }
  };

  return (
    <Container className='mt-2'>
      <Row className='justify-content-center'>
        <Col xs={12} className='text-center'>
          <p>
            Searching for "<strong>{searchTerm}</strong>",{' '}
            <Button
              variant='link'
              className='link-button underlined'
              onClick={handleClearSearch}
            >
              Clear Search
            </Button>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchStatus;
