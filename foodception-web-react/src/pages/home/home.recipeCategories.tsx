import { Container, Row, Col } from 'react-bootstrap';

import FoodceptionHrefButton from '../../components/links/href_button';
import RecipeCategoriesList from '../../components/recipeCategoriesList';
import useFetch from '../../hooks/useFetch';

import ErrorPanel from '../../components/error_message';
import LoadingPanel from '../../components/loading_panel';
import FoodceptionHeader from '../../components/header/header';
import { useLayout } from '../../contexts/layout-context';
import { useEffect } from 'react';
import { WebRoutes } from '../../constants/WebRoutes';

export default function HomeRecipeCategories() {
  const { setShowBreadcrumb } = useLayout();
  useEffect(() => {
    setShowBreadcrumb(false);
    return () => {
      setShowBreadcrumb(true);
    };
  }, [setShowBreadcrumb]);
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

  const subHeader =
    'Discover a world of flavors with our diverse collection of recipes, perfect for every occasion and dietary preference';

  return (
    <Container fluid>
      <Row>
        <Col>
          <FoodceptionHeader subHeader={subHeader}>
            Categories
          </FoodceptionHeader>
        </Col>
      </Row>
      <Row>
        <Col>
          <RecipeCategoriesList recipeCategories={data.recipeCategories} showSelect={false} />
        </Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <FoodceptionHrefButton url={WebRoutes.Recipe.Categories.Base}>
            View All Categories
          </FoodceptionHrefButton>
        </Col>
      </Row>
    </Container>
  );
}
