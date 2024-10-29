import { Container, Row, Col } from 'react-bootstrap';

import FoodceptionHrefButton from '../components/links/hrefButton';
import RecipeCategoriesList from '../components/recipeCategoriesList';
import useFetch from '../hooks/useFetch';

import ErrorPanel from '../components/error_message';
import LoadingPanel from '../components/loading_panel';
import FoodceptionHeader from '../components/header/header';

export default function HomeRecipeCategories() {
  const { data, loading, error } = useFetch(`/recipe-categories?limit=${20}`);

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
      <Row>
        <Col>
          <FoodceptionHeader subHeader='Discover a world of flavors with our diverse collection of recipes, perfect for every occasion and dietary preference'>
            Categories
          </FoodceptionHeader>
          <RecipeCategoriesList
            recipeCategories={data.recipeCategories}
            showSelect={false}
          />
        </Col>
      </Row>

      <Row className='text-center'>
        <Col>
          <FoodceptionHrefButton url='/recipe-categories'>
            View All Categories
          </FoodceptionHrefButton>
        </Col>
      </Row>
    </Container>
  );
}
