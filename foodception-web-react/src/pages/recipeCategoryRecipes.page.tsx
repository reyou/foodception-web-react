import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/recipeList';
import ErrorPanel from '../components/error_message';
import useFetch from '../hooks/useFetch';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingPanel from '../components/loading_panel';
import HeaderLayout from '../components/header/headerLayout';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import Pagination from '../components/pagination';
import { useQuery } from '../hooks/useQuery';
import SearchAutoComplete from '../components/search_auto_complete';
import SearchStatus from '../components/search_status';

const RecipeCategoryRecipesPage: React.FC = () => {
  const query = useQuery();
  const { id } = useParams<{ id: string }>();
  const searchTerm = query.get('query') || '';
  const page = parseInt(query.get('page') || '1');
  const limit = parseInt(query.get('limit') || '20');
  const skip = (page - 1) * limit;
  const { data, loading, error } = useFetch(`/recipe-categories/${id}/recipes?query=${searchTerm}&skip=${skip}&limit=${limit}`);
  if (loading) {
    return <LoadingPanel visible={loading}></LoadingPanel>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return (
      <Container className='text-center mt-5'>
        <p>No data available</p>
      </Container>
    );
  }
  const recipeCategory = data.recipeCategory;
  const recipeCategoryImage = recipeCategory.recipeCategoryImages[0];
  return (
    <>
      <HeaderLayout
        title={<h1>{FrontEndUtils.capitalizeText(recipeCategory.name)}</h1>}
        backgroundImage={recipeCategoryImage.imageUrl}
        subTitle={recipeCategory.description}
      ></HeaderLayout>
      <Container fluid>
        <Row>
          <Col>
            <div className='mb-4 mt-4 text-center'>
              <h4 className='text-muted'>
                {data.totalCount}{' '}
                <strong>
                  <em>{recipeCategory.name}</em>
                </strong>{' '}
                {data.totalCount === 1 ? 'recipe' : 'recipes'} found
              </h4>
            </div>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col xs={12} md={6} lg={4} xl={3} className='mb-4'>
            <SearchAutoComplete
              initialSearchTerm={searchTerm}
              onSearch={() => {}}
              apiEndpoint={`/recipe-categories/${id}/recipes/autocomplete`}
            />
          </Col>
        </Row>
        <Row className='justify-content-center mb-4'>
          <Col xs={12} md={6} lg={4} xl={3}>
            {searchTerm && (
              <SearchStatus
                searchTerm={searchTerm}
                onClearSearch={ () => {} }
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <RecipeList recipes={data.recipes} />
            <Pagination currentPage={page} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeCategoryRecipesPage;
