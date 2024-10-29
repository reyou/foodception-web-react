import { Container, Row, Col } from 'react-bootstrap';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import RecipeCategoriesList from '../components/recipeCategoriesList';
import useShowHeader from '../hooks/useShowHeader';
import useFetch from '../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import ErrorPanel from '../components/error_message';
import LoadingPanel from '../components/loading_panel';

export default function RecipeCategories() {
  const maxLimit = 500;
  const [searchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : maxLimit;

  const showHeader = useShowHeader(true);
  const { data, loading, error } = useFetch(
    `/recipe-categories?limit=${limit}`
  );

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
      {showHeader && (
        <>
          <FoodceptionHeader>Categories</FoodceptionHeader>
          <h4 className='text-center text-muted mb-4'>
            Choose from {data.recipeCategories.length} delicious recipe
            categories and explore flavors for every occasion
          </h4>
        </>
      )}

      <Row>
        <Col>
          <RecipeCategoriesList recipeCategories={data.recipeCategories} />
        </Col>
      </Row>

      {limit < maxLimit && (
        <Row className='text-center'>
          <Col>
            <FoodceptionHrefButton url='/recipe-categories'>
              View All Categories
            </FoodceptionHrefButton>
          </Col>
        </Row>
      )}
    </Container>
  );
}
