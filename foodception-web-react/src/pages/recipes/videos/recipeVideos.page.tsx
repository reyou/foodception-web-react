import { useEffect, useState } from 'react';
import HeaderLayout from '../../../components/header/headerLayout';
import { useQuery } from '../../../hooks/useQuery';
import useFetch from '../../../hooks/useFetch';
import { Col, Container, Row } from 'react-bootstrap';
import LoadingPanel from '../../../components/loading_panel';
import ErrorPanel from '../../../components/error_message';
import SearchStatus from '../../../components/search_status';
import NoMoreItems from '../components/no_more_items';
import NoResults from '../components/no_results';
import Pagination from '../../../components/pagination';
import SearchAutoComplete from '../../../components/search_auto_complete';
import RecipeVideosList from '../../../components/recipeVideosList';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

export default function RecipeVideosPage() {
  const query = useQuery();
  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [localData, setLocalData] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const { data, loading, error } = useFetch(
    `/recipes/videos?query=${searchTerm}&skip=${skip}`
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

  return (
    <>
      <HeaderLayout
        title={<h1>Videos</h1>}
        subTitle={
          'Explore our collection of step-by-step recipe videos and master your favorite dishes with ease'
        }
        backgroundImage={
          'https://static.wixstatic.com/media/f7bd72_a72ef8cf752648ecbe948a4c00b7bb8b~mv2.png'
        }
      />
      <Container fluid>
        <LoadingPanel visible={loading} />
      </Container>

      {error && (
        <Container className='text-center'>
          <ErrorPanel errorMessage={error} />
        </Container>
      )}

      {
        <>
          <Container fluid className='mt-4 mb-4'>
            <Row className='justify-content-center mb-4'>
              <Col xs={12} className='text-center mb-1'>
                <h4>Watch, Learn, and Create</h4>
              </Col>
              <Col xs={12} md={6} lg={4} xl={3}>
                <SearchAutoComplete
                  initialSearchTerm={searchTerm}
                  onSearch={handleSearch}
                  apiEndpoint='/recipes/videos/autocomplete'
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
              {localData &&
              localData.recipeVideos &&
              localData.recipeVideos.length === 0 &&
              page > 1 ? (
                <NoMoreItems searchTerm={searchTerm} />
              ) : localData &&
                localData.recipeVideos &&
                localData.recipeVideos.length === 0 ? (
                <NoResults searchTerm={searchTerm} />
              ) : (
                localData &&
                localData.recipeVideos && (
                  <>
                    <RecipeVideosList
                      recipeVideos={localData.recipeVideos}
                      youtubeChannelVideos={localData.providerVideos}
                    ></RecipeVideosList>
                    <Pagination currentPage={page} />
                  </>
                )
              )}
            </Row>
          </Container>
        </>
      }
    </>
  );
}
