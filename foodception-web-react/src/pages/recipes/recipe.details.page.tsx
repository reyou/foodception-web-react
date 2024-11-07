import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

import FoodceptionHeader from '../../components/header/header';
import FoodceptionImage from '../../components/image';
import IngredientGroups from '../../components/ingredientGroups';
import IngredientGroupsVisual from '../../components/ingredientGroupsVisual';
import RecipeTimeInfo from '../../components/recipeTimeInfo';
import RecipeSteps from '../../components/recipeSteps';
import RecipeVideos from '../../components/recipeVideos';
import FoodceptionTabs, { TabItem } from '../../components/tabs';

import { FrontEndUtils } from '../../utils/FrontEndUtils';
import useFetch from '../../hooks/useFetch';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import RelatedRecipes from './components/related_recipes';
import FoodceptionShareButtons from '../../components/core/foodception_share_buttons';

export default function RecipeDetails() {
  const { id } = useParams<{ id?: string }>();

  const {
    data: recipesData,
    loading: recipesLoading,
    error: recipesError
  } = useFetch(`/recipes/${id}`);

  if (!id) {
    return <p>Error: Recipe ID is missing.</p>;
  }

  const render = () => {
    if (recipesError) {
      return <ErrorPanel errorMessage={recipesError || ''}></ErrorPanel>;
    } else if (recipesLoading) {
      return <LoadingPanel visible={recipesLoading}></LoadingPanel>;
    } else {
      const { recipe } = recipesData;
      const recipeImage = recipe.recipeImages[0];
      const imageUrl = FrontEndUtils.getResizedImagePath(
        recipeImage.imageUrl,
        940,
        530
      );

      const tabs: TabItem[] = [
        {
          title: 'List View',
          icon: 'list',
          content: (
            <IngredientGroups ingredientGroups={recipe.ingredientGroups} />
          )
        },
        {
          title: 'Visual View',
          icon: 'image',
          content: (
            <IngredientGroupsVisual
              ingredientGroups={recipe.ingredientGroups}
            />
          )
        }
      ];

      return (
        <Container className='mt-4'>
          <Row>
            <Col>
              <FoodceptionHeader>{recipe.title}</FoodceptionHeader>
            </Col>
          </Row>

          <Row className='mt-3'>
            <Col>
              <RecipeTimeInfo
                totalTime={recipe.totalTime}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                servingSize={recipe.servingSize}
              />
            </Col>
          </Row>

          <Row className='text-center mt-4'>
            <Col>
              <h2>About the Recipe</h2>
              <p className='fs-5'>{recipe.description}</p>
              <FoodceptionImage src={imageUrl} alt={recipe.title} />
            </Col>
          </Row>

          {/* Share Social Media Buttons */}
          <FoodceptionShareButtons
            url={FrontEndUtils.getAdjustedUrl(window.location.href)}
            hashtag={`#${FrontEndUtils.slugify(recipe.title)} #foodception`}
            title={`${recipe.title}: ${recipe.description}`}
            media={imageUrl}
          />

          <Row className='mt-4'>
            <Col>
              <h2 className='text-center'>Ingredients</h2>
              <FoodceptionTabs>{tabs}</FoodceptionTabs>
            </Col>
          </Row>

          <Row className='mt-4'>
            <Col>
              <h2 className='text-center'>Directions</h2>
              <RecipeSteps steps={recipe.recipeSteps} />
            </Col>
          </Row>

          <Row className='mt-4'>
            <Col>
              <h2 className='text-center'>Related Videos</h2>
              <RecipeVideos recipeId={id} />
            </Col>
          </Row>

          <Row className='mt-4'>
            <Col>
              <h2 className='text-center'>Related Recipes</h2>
              <RelatedRecipes recipeId={id}></RelatedRecipes>
            </Col>
          </Row>
        </Container>
      );
    }
  };

  return render();
}
