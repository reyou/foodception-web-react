import { Container } from 'react-bootstrap';
import ErrorPanel from '../../components/error_message';
import FoodceptionHeader from '../../components/header/header';
import FoodceptionHrefButton from '../../components/links/hrefButton';
import LoadingPanel from '../../components/loading_panel';

import useFetch from '../../hooks/useFetch';
import RecipeVideosList from '../../components/recipeVideosList';
import { useLayout } from '../../contexts/layout-context';
import { useEffect } from 'react';

export default function TrendingRecipeVideos() {
  const { setShowBreadcrumb } = useLayout();
  useEffect(() => {
    setShowBreadcrumb(false);
    return () => {
      setShowBreadcrumb(true);
    };
  }, [setShowBreadcrumb]);
  const { data, loading, error } = useFetch(`/recipes/videos/trending`);

  const render = () => {
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    }

    if (loading) {
      return <LoadingPanel visible={loading}></LoadingPanel>;
    }

    const providerVideos = data.providerVideos;
    const recipeVideos = data.recipeVideos;

    const subHeader = `Discover culinary inspiration from around the world with our hand-picked cooking videos. From traditional dishes to creative twists, there's a recipe to spark your taste buds and expand your kitchen skills`;
    return (
      <Container fluid className='py-4'>
        <FoodceptionHeader subHeader={subHeader}>
          Cooking Videos For Every Taste
        </FoodceptionHeader>
        <RecipeVideosList
          recipeVideos={recipeVideos}
          youtubeChannelVideos={providerVideos}
        ></RecipeVideosList>
        <div className='text-center'>
          <FoodceptionHrefButton url='/recipes/videos'>
            See All Videos
          </FoodceptionHrefButton>
        </div>
      </Container>
    );
  };

  return render();
}
