import React from 'react';
import { useParams } from 'react-router-dom';
import FoodceptionHrefButton from '../components/links/hrefButton';
import RecipeList from '../components/recipeList';
import ErrorPanel from '../components/error_message';
import useFetch from '../hooks/useFetch';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import LoadingPanel from '../components/loading_panel';

interface RecipeCategoryDetailProps {}

const RecipeCategoryDetail: React.FC<RecipeCategoryDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/recipe-categories/${id}/recipes`);

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

  return (
    <Container fluid>
      <Row className='mb-3'>
        <Col className='text-center'>
          <FoodceptionHrefButton url='/recipe-categories'>
            &lt;&lt; Back to Recipe Categories
          </FoodceptionHrefButton>
        </Col>
      </Row>

      <Row>
        <Col>
          <RecipeList recipes={data.recipes} />
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeCategoryDetail;
