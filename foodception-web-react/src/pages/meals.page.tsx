import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import HeaderLayout from '../components/header/headerLayout';
import FoodceptionHrefButton from '../components/links/href_button';
import LoadingPanel from '../components/loading_panel';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import { Container, Row, Col } from 'react-bootstrap';

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
    <>
      <HeaderLayout
        title={<h1>Meals</h1>}
        backgroundImage='https://static.wixstatic.com/media/f7bd72_3873055abb3b4451988ce4c1817db868~mv2.jpg'
        subTitle='Discover a Global Culinary Journey: From Breakfast to Desserts
'
      ></HeaderLayout>
      <Container fluid>
        {meals.map((meal: any) => {
          const recipes = meal.mealRecipes.map((q: any) => q.recipe);
          const mealLink = `/meals/${FrontEndUtils.slugify(meal.name)}/${
            meal.id
          }/recipes`;

          return (
            <div key={meal.id} className='mb-4'>
              <Row className='mb-3'>
                <Col>
                  <FoodceptionHeader subHeader={meal.description}>
                    {FrontEndUtils.capitalizeText(meal.name)}
                  </FoodceptionHeader>
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
    </>
  );
}
