import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ErrorPanel from '../components/error_message';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import LoadingPanel from '../components/loading_panel';
import HeaderLayout from '../components/header/headerLayout';
import { FrontEndUtils } from '../utils/FrontEndUtils';

export default function MealRecipes() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/meals/${id}/recipes`);

  if (loading) {
    return <LoadingPanel visible={loading}></LoadingPanel>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return <Container className='text-center'>No data available</Container>;
  }
  const backgroundImage = data.meal.mealImages[0].imageUrl;
  return (
    <>
      <HeaderLayout
        title={<h1>{FrontEndUtils.capitalizeText(data.meal.name)}</h1>}
        subTitle={data.meal.description}
        backgroundImage={backgroundImage}
      />
      <Container fluid>
        <RecipeList recipes={data.recipes} />
      </Container>
    </>
  );
}
