import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ErrorPanel from '../components/error_message';
import RecipeList from '../components/recipeList';
import useFetch from '../hooks/useFetch';
import LoadingPanel from '../components/loading_panel';

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

  return (
    <Container fluid>
      <RecipeList recipes={data.recipes} />
    </Container>
  );
}
