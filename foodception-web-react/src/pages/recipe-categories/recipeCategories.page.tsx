import { Container, Row, Col } from 'react-bootstrap';

import RecipeCategoriesList from '../../components/recipeCategoriesList';
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import ErrorPanel from '../../components/error_message';
import LoadingPanel from '../../components/loading_panel';
import HeaderLayout from '../../components/header/headerLayout';

export default function RecipeCategories() {
  const maxLimit = 500;
  const [searchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : maxLimit;

  const { data, loading, error } = useFetch(
    `/recipe-categories?limit=${limit}`
  );

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

  return (
    <>
      <HeaderLayout
        title={<h1>Categories</h1>}
        subTitle={
          'Discover a world of flavors with our diverse collection of recipes, perfect for every occasion and dietary preference'
        }
        backgroundImage={
          'https://static.wixstatic.com/media/f7bd72_3fc9de0df6d6496ca4b40847c3f93d27~mv2.webp'
        }
      />
      <Container fluid>
        <h4 className='text-center text-muted mb-3 mt-4'>
          Choose from {data.recipeCategories.length} delicious recipe categories
          and explore flavors for every occasion
        </h4>
        <Row>
          <Col>
            <RecipeCategoriesList recipeCategories={data.recipeCategories} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
