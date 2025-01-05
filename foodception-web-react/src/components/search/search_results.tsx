import React from 'react';
import { Container, Row } from 'react-bootstrap';
import FoodceptionCard from '../card';

interface SearchResultsProps {
  results: Array<{
    id: string;
    title: string;
    description: string;
    url: string;
    imageSrc?: string;
  }>;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return null; // Return nothing if no results are available
  }

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        {results.map((result) => (
          <FoodceptionCard
            key={result.id}
            id={result.id}
            title={result.title}
            description={result.description}
            url={result.url}
            urlTitle='View Details'
            imageUrl={result.imageSrc!}
          />
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
