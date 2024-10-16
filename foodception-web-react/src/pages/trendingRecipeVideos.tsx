import React from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import LoadingPanel from '../components/loading_panel';
import FoodceptionTrendingRecipeVideoCard from '../components/trendingRecipeVideoCard';
import useFetch from '../hooks/useFetch';

export default function TrendingRecipeVideos() {
  const { data, loading, error } = useFetch(`/recipes/videos/trending`);

  const render = () => {
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    }

    if (loading) {
      return <LoadingPanel visible={loading}></LoadingPanel>;
    }

    return (
      <Container fluid className='py-4'>
        <FoodceptionHeader>Cooking Videos For Every Taste</FoodceptionHeader>
        <Row className='justify-content-center'>
          {data.trendingRecipeVideos.map((trendingRecipeVideo: any) => {
            const recipeVideo = data.recipeVideos.find(
              (q: any) =>
                q.recipeVideoProviderVideoId === trendingRecipeVideo.id
            );

            return (
              <Col
                key={trendingRecipeVideo.id}
                xs={12}
                md={6}
                lg={4}
                xl={3}
                className='mb-4'
              >
                <FoodceptionTrendingRecipeVideoCard
                  recipeVideo={recipeVideo}
                  youTubeChannelVideo={trendingRecipeVideo}
                />
              </Col>
            );
          })}
        </Row>
        <div className='text-center mt-2'>
          <FoodceptionHrefButton url='/recipes/videos'>
            <Button variant='primary'>See All Videos</Button>
          </FoodceptionHrefButton>
        </div>
      </Container>
    );
  };

  return render();
}
