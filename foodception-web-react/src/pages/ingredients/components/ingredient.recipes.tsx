import { Col, Container, Row } from 'react-bootstrap';
import ErrorPanel from '../../../components/error_message';
import LoadingPanel from '../../../components/loading_panel';
import useFetch from '../../../hooks/useFetch';
import RecipeList from '../../../components/recipeList';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';

interface IngredientRecipesProps {
  ingredientId: string;
}

const IngredientRecipes: React.FC<IngredientRecipesProps> = ({
  ingredientId
}) => {
  const { data, loading, error } = useFetch(
    `/ingredients/${ingredientId}/recipes`
  );

  if (loading) {
    return <LoadingPanel visible={loading} />;
  }

  if (error) {
    return <ErrorPanel errorMessage={error} />;
  }

  if (!data) {
    return <div className='text-center'>No data available</div>;
  }

  const ingredient = data.ingredient;
  const recipes = data.recipes;

  return (
    <Container>
      <Row>
        <Col>
          <h2 className='text-center mb-3'>
            Recipes with {FrontEndUtils.capitalizeText(ingredient.title)}
          </h2>
          <RecipeList recipes={recipes}></RecipeList>
        </Col>
      </Row>
    </Container>
  );
};

export default IngredientRecipes;
