import { Col, Container, Row } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import LoadingPanel from '../../components/loading_panel';
import useFetch from '../../hooks/useFetch';
import FoodceptionHeader from '../../components/header/header';
import FoodceptionHrefButton from '../../components/links/hrefButton';
import DietList from '../../components/diets/dietList';

export default function HomeDiets() {
  const { data, loading, error } = useFetch(`/diets?limit=${20}`);

  if (loading) {
    return <LoadingPanel visible={loading}></LoadingPanel>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return (
      <Container className='text-center mt-5'>
        <p data-guid='1a995710-318d-4107-bd74-2b8ad43d8f8b'>
          No data available
        </p>
      </Container>
    );
  }
  const subHeader =
    'Discover recipes tailored to fit your dietary needs and preferences. From gluten-free to high-protein, explore delicious options that support your health goals and lifestyle';
  return (
    <Container fluid>
      <Row>
        <Col>
          <FoodceptionHeader subHeader={subHeader}>Diets</FoodceptionHeader>
          <DietList diets={data.diets} showSelect={false} />
        </Col>
      </Row>
      <Row className='text-center'>
        <Col>
          <FoodceptionHrefButton url='/diets'>
            View All Diets
          </FoodceptionHrefButton>
        </Col>
      </Row>
    </Container>
  );
}
