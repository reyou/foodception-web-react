import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';

import FoodceptionHeader from '../../../components/header/header';
import FoodceptionImage from '../../../components/image';
import IngredientGroups from '../../../components/ingredientGroups';
import IngredientGroupsVisual from '../../../components/ingredientGroupsVisual';
import RecipeTimeInfo from '../../../components/recipeTimeInfo';
import RecipeSteps from '../../../components/recipeSteps';
import RecipeVideos from '../../../components/recipeVideos';
import FoodceptionTabs, { TabItem } from '../../../components/tabs';
import FavoriteButton from '../../../components/favorite-button';
import GenericModal from '../../../components/modals/generic-modal';
import { ErrorType, ErrorDetails } from '../../../types/error.types';

import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import useFetch from '../../../hooks/useFetch';
import LoadingPanel from '../../../components/loading_panel';
import ErrorPanel from '../../../components/error_message';
import RelatedRecipes from './../components/related_recipes';
import FoodceptionShareButtons from '../../../components/core/foodception_share_buttons';

export default function RecipeDetails() {
  const { id } = useParams<{ id?: string }>();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);

  const { data, loading, error } = useFetch(`/recipes/${id}`);

  const handleError = (error: ErrorDetails) => {
    setErrorDetails(error);
    setShowErrorModal(true);
  };



  if (!id) {
    return <p>Error: Recipe ID is missing.</p>;
  }

  const render = () => {
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    } else if (loading) {
      return <LoadingPanel visible={loading}></LoadingPanel>;
    } else {
      const { recipe } = data;
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
        <>
          <Container className='mt-4'>
            <Row>
              <Col>
                <FoodceptionHeader>{recipe.title}</FoodceptionHeader>
              </Col>
            </Row>
            <Row>
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
            <Row className='text-center mt-4'>
              <Col>
                <FavoriteButton
                  id={recipe.id}
                  initialFavorited={recipe.isFavorited}
                  variant='primary'
                  onError={handleError}
                />
              </Col>
            </Row>
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
          <GenericModal
            show={showErrorModal}
            onHide={() => setShowErrorModal(false)}
            title={errorDetails?.type === ErrorType.AUTH_ERROR ? 'Login Required' : 'Error'}
            body={errorDetails?.message}
          />
        </>
      );
    }
  };

  return render();
}
