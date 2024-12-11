import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderLayout from '../../components/header/headerLayout';
import Pagination from '../../components/pagination';
import {
  backgroundImages,
  subtitles
} from '../../constants/ingredients.constants';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import TypeUtils from '../../utils/TypeUtils';
import StorageUtils from '../../utils/StorageUtils';
import DateUtils from '../../utils/DateUtils';
import ErrorPanel from '../../components/error_message';
import SearchAutoComplete from '../../components/search_auto_complete';
import SearchStatus from '../../components/search_status';
import NoMoreItems from '../recipes/components/no_more_items';
import NoResults from '../recipes/components/no_results';
import LoadingPanel from '../../components/loading_panel';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import SearchResults from '../../components/search/search_results';
import FoodceptionHrefButton from '../../components/links/href_button';

function IngredientsPage() {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [localData, setLocalData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const { data, loading, error } = useFetch(
    `/ingredients/search?query=${searchTerm}&skip=${skip}`
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

  const handleSearch = (_: string) => {
    setLocalData(null);
  };

  const handleSearchCleared = () => {
    setLocalData(null);
  };

  let subtitle = StorageUtils.getItemWithExpiry('subtitle');
  let backgroundImage = StorageUtils.getItemWithExpiry('backgroundImage');

  if (!subtitle) {
    subtitle = TypeUtils.getRandomFromArray(subtitles);
    StorageUtils.setItemWithExpiry('subtitle', subtitle, DateUtils.oneWeekInMs);
  }

  if (!backgroundImage) {
    backgroundImage = TypeUtils.getRandomFromArray(backgroundImages);
    StorageUtils.setItemWithExpiry(
      'backgroundImage',
      backgroundImage,
      DateUtils.oneWeekInMs
    );
  }

  return (
    <Container fluid>
      <HeaderLayout
        title={<h1>Ingredients</h1>}
        subTitle={subtitle}
        backgroundImage={backgroundImage}
      />

      <>
        <LoadingPanel visible={loading} />
        {error && (
          <Container className='text-center'>
            <ErrorPanel errorMessage={error} />
          </Container>
        )}
        <Container fluid className='mt-4 mb-4'>
          <Row className='justify-content-center mb-4'>
            <Col xs={12} className='text-center mb-1'>
              <h4>Browse, Search, and Explore Essential Ingredients</h4>
            </Col>
            <Col xs={12} md={6} lg={4} xl={3}>
              <SearchAutoComplete
                initialSearchTerm={searchTerm}
                onSearch={handleSearch}
                apiEndpoint='/ingredients/autocomplete'
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
                </>
              )}
          </Row>
        </Container>
      </>
    </Container>
  );
}

export default IngredientsPage;
