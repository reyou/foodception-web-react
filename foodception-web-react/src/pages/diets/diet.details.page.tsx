import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import LoadingPanel from '../../components/loading_panel';
import ErrorPanel from '../../components/error_message';
import { Col, Container, Row } from 'react-bootstrap';
import RecipeList from '../../components/recipeList';
import HeaderLayout from '../../components/header/headerLayout';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import { useLayout } from '../../contexts/layout-context';
import { useEffect } from 'react';

interface DietDetailProps {}

const DietDetail: React.FC<DietDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/diets/${id}/recipes`);
  const { setHasHeader } = useLayout();
  useEffect(() => {
    setHasHeader(true);
    return () => {
      setHasHeader(false);
    };
  }, [setHasHeader]);
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
  const dietImage = diet.dietImages[0];
  return (
    <>
      <HeaderLayout
        title={<h1>{FrontEndUtils.capitalizeText(diet.name)}</h1>}
        backgroundImage={dietImage.imageUrl}
        subTitle={diet.description}
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

export default DietDetail;
