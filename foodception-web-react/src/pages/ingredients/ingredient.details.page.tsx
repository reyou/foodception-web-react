import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import ErrorPanel from '../../components/error_message';
import LoadingPanel from '../../components/loading_panel';
import FoodceptionHeader from '../../components/header/header';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import FoodceptionImage from '../../components/image';
import FoodceptionShareButtons from '../../components/core/foodception_share_buttons';
import parse from 'html-react-parser';
import IngredientRecipes from './components/ingredient.recipes';
import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

function IngredientDetailsPage() {
  const { id } = useParams<{ id?: string }>();
  const { hash } = useLocation();
  const recipesRef = useRef<HTMLDivElement | null>(null);

  const { data, loading, error } = useFetch(`/ingredients/${id}`);
  useEffect(() => {
    if (hash === '#recipes' && data && recipesRef.current) {
      recipesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash, data]);

  if (!id) {
    return <ErrorPanel errorMessage='No ingredient id provided' />;
  }
  if (loading) {
    return <LoadingPanel visible={loading}></LoadingPanel>;
  }
  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }
  const ingredient = data.ingredient;
  const ingredientImage = ingredient.ingredientImages[0];
  const imageUrl = FrontEndUtils.getResizedImagePath(
    ingredientImage.imageUrl,
    940,
    530
  );
  return (
    <Container className='mt-4'>
      <Row className='text-center'>
        <Col>
          <FoodceptionHeader>
            {FrontEndUtils.capitalizeText(ingredient.title)}
          </FoodceptionHeader>
          <p className='fs-5'>{ingredient.description}</p>
          {ingredient.calories && (
            <p className='fs-5'>
              <strong>
                {ingredient.calories} calories in{' '}
                {ingredient.typicalServingAmount} {ingredient.unitOfMeasure}
              </strong>
            </p>
          )}
          <FoodceptionImage src={imageUrl} alt={ingredient.title} />
        </Col>
      </Row>
      <FoodceptionShareButtons
        url={FrontEndUtils.getAdjustedUrl(window.location.href)}
        hashtag={`#${FrontEndUtils.slugify(ingredient.title)} #foodception`}
        title={`${ingredient.title}: ${ingredient.description}`}
        media={imageUrl}
      />
      <Row className='mt-4'>
        <Col className='fs-5'>{parse(ingredient.articleHtml)}</Col>
      </Row>
      <Row id='recipes' ref={recipesRef} className='mt-4'>
        <Col>
          <IngredientRecipes ingredientId={id}></IngredientRecipes>
        </Col>
      </Row>
    </Container>
  );
}

export default IngredientDetailsPage;
