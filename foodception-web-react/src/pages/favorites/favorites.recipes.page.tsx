import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useQuery } from '../../hooks/useQuery';
import useFetch from '../../hooks/useFetch';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import RecipeList from '../../components/recipeList';
import Pagination from '../../components/pagination';
import HeaderLayout from '../../components/header/headerLayout';
import SearchAutoComplete from '../../components/search_auto_complete';
import SearchStatus from '../../components/search_status';
import NoMoreItems from '../recipes/components/no_more_items';

const FavoriteRecipesPage: React.FC = () => {
  const query = useQuery();
  const searchTerm = query.get('query') || '';
  const page = parseInt(query.get('page') || '1');
  const limit = parseInt(query.get('limit') || '20');
  const skip = (page - 1) * limit;

  const { data, loading, error } = useFetch(
    `/favorites/recipes?query=${searchTerm}&skip=${skip}&limit=${limit}`
  );

  if (loading) {
    return <LoadingPanel visible={loading} />;
  }

  if (error) {
    return <ErrorPanel errorMessage={error} />;
  }

  if (!data) {
    return (
      <Container className='text-center mt-5'>
        <p>No favorites found</p>
      </Container>
    );
  }

  const backgroundImage = 'https://images.foodception.com/favorites/recipes/headers/bddd4542-99b6-41d2-8e5f-d0452d616d5a.png';
  return (
    <>
      <HeaderLayout
        title={<h1>My Favorite Recipes</h1>}
        subTitle="Your personal collection of favorite recipes" backgroundImage={backgroundImage}      />
      <Container fluid>
        <Row>
          <Col>
            <div className='mb-4 mt-4 text-center'>
              <h4 className='text-muted'>
                {data.totalCount}{' '}
                {data.totalCount === 1 ? 'recipe' : 'recipes'} found
              </h4>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} md={6} lg={4} xl={3}>
            <SearchAutoComplete
              initialSearchTerm={searchTerm}
              onSearch={() => {}}
              apiEndpoint="/favorites/recipes/autocomplete"
            />
          </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
          <Col xs={12} md={6} lg={4} xl={3}>
            {searchTerm && (
              <SearchStatus
                searchTerm={searchTerm}
                onClearSearch={() => {}}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            {data.recipes.length > 0 ? (
              <>
                <RecipeList recipes={data.recipes} />
                <Pagination currentPage={page} />
              </>
            ) : data.totalCount > 0 ? (
              <NoMoreItems searchTerm={searchTerm} />
            ) : (
              <div className="text-center mt-5">
                <h5 className="text-muted">No favorites found</h5>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FavoriteRecipesPage;
