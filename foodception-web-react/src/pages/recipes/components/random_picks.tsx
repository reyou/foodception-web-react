import { Container, Row, Col } from 'react-bootstrap';
import ErrorPanel from '../../../components/error_message';
import FoodceptionHrefLink from '../../../components/links/href_link';
import LoadingPanel from '../../../components/loading_panel';
import RecipeList from '../../../components/recipeList';
import useFetch from '../../../hooks/useFetch';

const RandomPicks = () => {
  const { data, loading, error } = useFetch('/recipes/random');

  return (
    <Container fluid className='mt-4'>
      <Row>
        <Col className='text-center'>
          <h2>Random Picks</h2>
          <h4>Feeling Lucky? Here Are Some Random Picks for You!</h4>
          <div className='mb-4'>
            <FoodceptionHrefLink url={`/recipes/list`}>
              See all recipes
            </FoodceptionHrefLink>
          </div>
        </Col>
      </Row>

      <LoadingPanel visible={loading} />

      {error && (
        <Row>
          <Col className='text-center'>
            <ErrorPanel errorMessage={error} />
          </Col>
        </Row>
      )}

      {data && (
        <Row>
          <Col>
            <RecipeList recipes={data.recipes} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default RandomPicks;