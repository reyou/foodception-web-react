import React from 'react';
import { useParams } from 'react-router-dom';
import RecipeList from '../components/recipeList';
import ErrorPanel from '../components/error_message';
import useFetch from '../hooks/useFetch';
import { Container, Row, Col } from 'react-bootstrap';
import LoadingPanel from '../components/loading_panel';
import HeaderLayout from '../components/header/headerLayout';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface RecipeCategoryDetailProps {}

const RecipeCategoryDetail: React.FC<RecipeCategoryDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/recipe-categories/${id}/recipes`);

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
  const recipeCategory = data.recipeCategory;
  const recipeCategoryImage = recipeCategory.recipeCategoryImages[0];
  return (
    <>
      <HeaderLayout
        title={<h1>{FrontEndUtils.capitalizeText(recipeCategory.name)}</h1>}
        backgroundImage={recipeCategoryImage.imageUrl}
        subTitle={recipeCategory.description}
      ></HeaderLayout>
      <Container fluid>
        <Row>
          <Col>
            <RecipeList recipes={data.recipes} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RecipeCategoryDetail;
