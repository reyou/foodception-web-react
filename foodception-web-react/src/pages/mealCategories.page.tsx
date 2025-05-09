import { Col, Container, Row } from 'react-bootstrap';
import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/href_button';
import LoadingPanel from '../components/loading_panel';
import MealCategoriesList from '../components/mealCategoriesList';
import useFetch from '../hooks/useFetch';
import { useLayout } from '../contexts/layout-context';
import { useEffect } from 'react';
import { ApiRoutes } from '../constants/ApiRoutes';

export default function MealCategories() {
  const { setShowBreadcrumb } = useLayout();
  useEffect(() => {
    setShowBreadcrumb(false);
    return () => {
      setShowBreadcrumb(true);
    };
  }, [setShowBreadcrumb]);
  const { data, loading, error } = useFetch(ApiRoutes.Meals.List);

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
          <FoodceptionHeader subHeader='From sunrise to sunset, explore a delicious array of meal ideas crafted to satisfy every craving and suit any time of day'>
            Meals
          </FoodceptionHeader>
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
