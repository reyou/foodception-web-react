import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import LoadingPanel from '../components/loading_panel';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function Meals() {
  const { data, loading, error } = useFetch('/meals');

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

  const meals = data.meals;

  return (
    <Container fluid className='mt-5'>
      {meals.map((meal: any) => {
        const recipes = meal.mealRecipes.map((q: any) => q.recipe);
        const mealLink = `/meals/${FrontEndUtils.slugify(meal.name)}/${
          meal.id
        }/recipes`;

        return (
          <div key={meal.id} className='mb-4'>
            <Row className='mb-3'>
              <Col>
                <FoodceptionHeader>
                  {FrontEndUtils.capitalizeText(meal.name)}
                </FoodceptionHeader>
              </Col>
            </Row>

            <Row className='mb-4'>
              <Col className='text-center'>
                <h5>{meal.description}</h5>
              </Col>
            </Row>

            <Row>
              <Col>
                <RecipeList recipes={recipes} />
              </Col>
            </Row>

            <Row className='text-center'>
              <Col>
                <FoodceptionHrefButton url={mealLink}>
                  View All {FrontEndUtils.capitalizeText(meal.name)} Recipes
                </FoodceptionHrefButton>
              </Col>
            </Row>
          </div>
        );
      })}
    </Container>
  );
}
