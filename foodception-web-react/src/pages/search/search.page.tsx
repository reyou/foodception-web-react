import { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import useFetch from '../../hooks/useFetch';
import { Container, Row } from 'react-bootstrap';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import FoodceptionCard from '../../components/card';
import Pagination from '../../components/pagination';

export function SearchPage() {
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const page: number = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const { data, loading, error } = useFetch(
    `/search?query=${searchTerm}&skip=${skip}`
  );
  useEffect(() => {
    setSearchTerm(query.get('query') || '');
  }, [query]);
  return (
    <>
      <Container fluid></Container>
      <LoadingPanel visible={loading} />
      {error && (
        <Container className='text-center'>
          <ErrorPanel errorMessage={error} />
        </Container>
      )}
      {data && (
        <>
          <Container fluid className='text-center mt-4 mb-4'>
            <h4>Search Results for "{searchTerm}"</h4>
          </Container>
          <Container fluid>
            <Row className='justify-content-center'>
              {data.results.map((result: any) => {
                return (
                  <FoodceptionCard
                    key={result.id}
                    title={result.title}
                    description={result.description}
                    url={result.url}
                    urlTitle='View Details'
                    imageUrl={result.imageSrc}
                  />
                );
              })}
            </Row>
            <Pagination currentPage={page} />
          </Container>
        </>
      )}
    </>
  );
}
