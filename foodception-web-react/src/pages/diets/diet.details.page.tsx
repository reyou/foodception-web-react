import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import { Col, Container, Row } from 'react-bootstrap';
import FoodceptionHrefButton from '../../components/links/hrefButton';
import RecipeList from '../../components/recipeList';
import HeaderLayout from '../../components/header/headerLayout';
import { FrontEndUtils } from '../../utils/FrontEndUtils';

interface DietDetailProps {}

const DietDetail: React.FC<DietDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/diets/${id}/recipes`);

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
  const diet = data.diet;

  return (
    <>
      <HeaderLayout
        title={<h1>{FrontEndUtils.capitalizeText(diet.name)}</h1>}
        backgroundImage='https://static.wixstatic.com/media/f7bd72_00b174ae0dfa4c99bebf234616ea2d7d~mv2.png'
        subTitle={diet.description}
      ></HeaderLayout>
      <Container fluid>
        <Row className='mb-3 mt-3'>
          <Col className='text-center'>
            <FoodceptionHrefButton url='/diets'>
              &lt;&lt; Back to Diets
            </FoodceptionHrefButton>
          </Col>
        </Row>

        <Row>
          <Col>
            <RecipeList recipes={data.recipes} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DietDetail;
