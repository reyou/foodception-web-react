import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import NoResults from './components/no_results';
import NoMoreItems from './components/no_more_items';
import SearchAutoComplete from '../../components/search_auto_complete';
import SearchStatus from '../../components/search_status';
import FoodceptionHrefButton from '../../components/links/href_button';
import SearchResults from '../../components/search/search_results';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import RandomPicks from './components/random_picks';
import { HEADER_IMAGES } from '../../constants/imageConstants';

export default function RecipesPage() {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [localData, setLocalData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const { data, loading, error } = useFetch(
    `/recipes/search?query=${searchTerm}&skip=${skip}`
  );
  useEffect(() => {
    if (data) {
      setLocalData(data);
    }
  }, [data]);

  useEffect(() => {
    if (!FrontEndUtils.isInsideIframe()) {
      const searchTerm = query.get('query')?.trim() || '';
      setSearchTerm(searchTerm);
    }
  }, [query]);

  const title = <FoodceptionHeader>Recipes</FoodceptionHeader>;
  const subTitle =
    'Browse, Search, and Discover the Perfect Dish for Any Occasion';

  const handleSearch = (_: string) => {
    setLocalData(null);
  };

  const handleSearchCleared = () => {
    setLocalData(null);
  };

  return (
    <>
      <HeaderLayout
        backgroundImage={HEADER_IMAGES.recipesPage}
        title={title}
        subTitle={subTitle}
      />

      <Container fluid>
        <LoadingPanel visible={loading} />

        {error && (
          <Container className='text-center'>
            <ErrorPanel errorMessage={error} />
          </Container>
        )}

        {
          <Container fluid className='mt-4 mb-4'>
            <Row className='justify-content-center mb-4'>
              <Col xs={12} className='text-center mb-1'>
                <h4>What Would You Like to Cook Today?</h4>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3}>
                <SearchAutoComplete
                  initialSearchTerm={searchTerm}
                  onSearch={handleSearch}
                  apiEndpoint='/recipes/autocomplete'
                />
              </Col>
            </Row>

            {searchTerm && (
              <SearchStatus
                searchTerm={searchTerm}
                onClearSearch={handleSearchCleared}
              />
            )}

            <Row className='justify-content-center mt-4'>
              {/* search results */}
              {localData && localData.results.length > 0 && (
                <Container fluid>
                  <SearchResults results={localData.results} />
                  <Pagination currentPage={page} />
                </Container>
              )}
              {/* no search results */}
              {localData &&
                localData.executed &&
                localData.results.length === 0 && (
                  <NoResults searchTerm={searchTerm} />
                )}
              {/* no more results */}
              {localData && localData.results.length === 0 && page > 1 && (
                <NoMoreItems searchTerm={searchTerm} />
              )}
              {/* initial landing page */}
              {localData &&
                !localData.executed &&
                localData.results.length === 0 &&
                searchTerm.length === 0 && (
                  <>
                    <Row className='justify-content-center mt-4'>
                      <Col xs={12} className='text-center mb-3'>
                        <FoodceptionHrefButton url='/recipes/discover'>
                          Not Sure What to Cook? Discover Exciting Recipes Here!
                        </FoodceptionHrefButton>
                      </Col>
                    </Row>
                    <Row>
                      <RandomPicks></RandomPicks>
                    </Row>
                  </>
                )}
            </Row>
          </Container>
        }
      </Container>
    </>
  );
}
