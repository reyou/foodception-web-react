import { Col, Container, Row } from 'react-bootstrap';
import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import LoadingPanel from '../components/loading_panel';
import MealCategoriesList from '../components/mealCategoriesList';
import useFetch from '../hooks/useFetch';

export default function MealCategories() {
  const { data, loading, error } = useFetch('/meals/categories');

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
      <Row className='text-center'>
        <Col>
          <FoodceptionHeader>Meals</FoodceptionHeader>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col>
          <MealCategoriesList meals={data.meals} />
        </Col>
      </Row>

      <Row className='text-center'>
        <Col>
          <FoodceptionHrefButton url='/meals'>
            Browse All Meal Recipes
          </FoodceptionHrefButton>
        </Col>
      </Row>
    </Container>
  );
}
