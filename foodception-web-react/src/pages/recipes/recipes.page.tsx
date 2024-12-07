import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import Pagination from '../../components/pagination';
import RecipeList from '../../components/recipeList';
import useFetch from '../../hooks/useFetch';
import { useQuery } from '../../hooks/useQuery';
import NoResults from './components/no_results';
import NoMoreItems from './components/no_more_items';
import SearchAutoComplete from '../../components/search_auto_complete';
import SearchStatus from '../../components/search_status';
import FoodceptionHrefButton from '../../components/links/href_button';

export default function RecipesPage() {
  const query = useQuery();

  const page = parseInt(query.get('page') || '1');
  const skip = (page - 1) * 20;
  const [searchTerm, setSearchTerm] = useState<string>(
    query.get('query') || ''
  );
  const { data, loading, error } = useFetch(
    `/recipes?query=${searchTerm}&skip=${skip}`
  );
  const imageUrl =
    'https://static.wixstatic.com/media/f7bd72_650d5b64dadb4b59905f686016e31b1b~mv2.png';
  const title = <FoodceptionHeader>Recipe Directory</FoodceptionHeader>;
  const subTitle =
    'Browse, Search, and Discover the Perfect Dish for Any Occasion';

  const handleSearch = (term: string) => {
    if (term !== searchTerm) {
      setSearchTerm(term);
    }
  };

  const handleSearchCleared = () => {
    setSearchTerm('');
  };

  return (
    <>
      <HeaderLayout
        backgroundImage={imageUrl}
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

        {data && (
          <>
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
                <Col xs={12} className='text-center mb-3'>
                  <FoodceptionHrefButton url='/recipes/discover'>
                    Not Sure What to Cook? Discover Exciting Recipes Here!
                  </FoodceptionHrefButton>
                </Col>
              </Row>
              <Row className='justify-content-center mt-4'>
                {data.recipes.length === 0 && page > 1 ? (
                  <NoMoreItems searchTerm={searchTerm} />
                ) : data.recipes.length === 0 ? (
                  <NoResults searchTerm={searchTerm} />
                ) : (
                  <>
                    <RecipeList recipes={data.recipes} />
                    <Pagination currentPage={page} />
                  </>
                )}
              </Row>
            </Container>
          </>
        )}
      </Container>
    </>
  );
}
