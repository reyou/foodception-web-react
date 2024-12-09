import { useEffect, useState } from 'react';
import { useQuery } from '../../hooks/useQuery';
import useFetch from '../../hooks/useFetch';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import FoodceptionCard from '../../components/card';
import Pagination from '../../components/pagination';
import SearchStatus from '../../components/search_status';
import NoResults from '../recipes/components/no_results';
import SearchAutoComplete from '../../components/search_auto_complete';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import RandomPicks from '../recipes/components/random_picks';
import TopCategories from '../recipes/components/top_categories';
import TopCountries from '../recipes/components/top_countries';
import TopDiets from '../recipes/components/top_diets';
import NoMoreItems from '../recipes/components/no_more_items';

export function SearchPage() {
  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query')?.trim() || ''
  );

  const page: number = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [localData, setLocalData] = useState<any>(null);

  const { data, loading, error } = useFetch(
    `/search?query=${searchTerm}&skip=${skip}`
  );

  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    // trigger new search if not in iframe
    // otherwise it will be handled on page load
    if (!FrontEndUtils.isInsideIframe()) {
      const searchTerm = query.get('query')?.trim() || '';
      setSearchTerm(searchTerm);
    }
  }, [query]);

  const handleSearchCleared = () => {
    setLocalData(null);
  };

  const handleSearch = (_: string) => {
    setLocalData(null);
  };

  return (
    <>
      <Container fluid className='mt-4'>
        <Row className='justify-content-center'>
          <h2 className='text-center'>Search in Foodception</h2>
          <Col xs={12} md={6} lg={4} xl={3}>
            <SearchAutoComplete
              initialSearchTerm={searchTerm}
              onSearch={handleSearch}
              apiEndpoint='/search/autocomplete'
              baseUrl='/search'
            />
          </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
          <Col xs={12} md={6} lg={4} xl={3}>
            {searchTerm && (
              <>
                <SearchStatus
                  searchTerm={searchTerm}
                  onClearSearch={handleSearchCleared}
                />
              </>
            )}
          </Col>
        </Row>
      </Container>
      <LoadingPanel visible={loading && searchTerm.length > 0} />
      {error && (
        <Container className='text-center'>
          <ErrorPanel errorMessage={error} />
        </Container>
      )}
      {/* search results */}
      {localData && localData.results.length > 0 && (
        <>
          <Container fluid>
            <Row className='justify-content-center'>
              {localData.results.map((result: any) => {
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
      {/* no search results */}
      {localData && localData.executed && localData.results.length === 0 && (
        <>
          <NoResults searchTerm={searchTerm} />
        </>
      )}
      {/* initial landing page */}
      {localData &&
        !localData.executed &&
        localData.results.length === 0 &&
        searchTerm.length === 0 && (
          <>
            <Container fluid>
              <h5 className='text-center'>Not Sure What to Search For?</h5>
              <p className='text-center'>
                Don't worry, we've got you covered! Let us inspire you with some
                delicious ideas! Explore our handpicked random recipes, top
                categories, and global cuisines below.
              </p>
            </Container>
            <Container fluid className='mt-4'>
              <RandomPicks />
              <TopCategories />
              <TopCountries />
              <TopDiets />
            </Container>
          </>
        )}
      {/* no more results */}
      {localData && localData.results.length === 0 && page > 1 && (
        <>
          <NoMoreItems searchTerm={searchTerm} />
        </>
      )}
    </>
  );
}
