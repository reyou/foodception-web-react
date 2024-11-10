import { Col, Container, Row } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import HeaderLayout from '../../components/header/headerLayout';
import LoadingPanel from '../../components/loading_panel';
import useFetch from '../../hooks/useFetch';
import { useSearchParams } from 'react-router-dom';
import DietList from '../../components/diets/dietList';
import { useLayout } from '../../contexts/layout-context';
import { useEffect } from 'react';

export default function Diets() {
  const maxLimit = 500;
  const [searchParams] = useSearchParams();
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : maxLimit;
  const { data, loading, error } = useFetch(`/diets?limit=${limit}`);
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

  const diets = data.diets;

  return (
    <>
      <HeaderLayout
        title={<h1>Diets</h1>}
        backgroundImage='https://static.wixstatic.com/media/f7bd72_00b174ae0dfa4c99bebf234616ea2d7d~mv2.png'
        subTitle='Discover recipes tailored to fit your dietary needs and preferences. From gluten-free to high-protein, explore delicious options that support your health goals and lifestyle'
      ></HeaderLayout>
      <h4 className='text-center text-muted mb-3 mt-4'>
        Discover {diets.length} unique diet-friendly recipe categories that
        cater to your health goals and dietary preferences
      </h4>
      <Row>
        <Col>
          <DietList diets={diets} />
        </Col>
      </Row>
    </>
  );
}
