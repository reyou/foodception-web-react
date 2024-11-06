import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import LoadingPanel from '../../../components/loading_panel';
import ErrorPanel from '../../../components/error_message';
import { Col, Container, Row } from 'react-bootstrap';
import FoodceptionHeader from '../../../components/header/header';
import YouTube from 'react-youtube';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import FoodceptionHrefLink from '../../../components/links/href_link';
import RelatedRecipes from '../components/related_recipes';
import RecipeVideos from '../../../components/recipeVideos';

const RecipeVideoDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch(`/recipes/videos/${id}`);

  if (loading) {
    return <LoadingPanel visible={true}></LoadingPanel>;
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

  const recipeVideo = data.recipeVideo;
  const providerVideo = data.providerVideo;
  const recipeDetailsUrl = `/recipes/${FrontEndUtils.slugify(recipeVideo.recipe.title)}/${recipeVideo.recipe.id}`;
  return (
    <>
      <FoodceptionHeader>{providerVideo.title}</FoodceptionHeader>
      <p className='text-center fs-5'>{providerVideo.description}</p>
      <Container>
        <YouTube
          videoId={providerVideo.videoId}
          className='foodceptionYoutubeVideoPlayer'
          iframeClassName='foodceptionYoutubeVideoPlayerIframe'
          opts={{
            height: '480',
            width: '100%',
            playerVars: { autoplay: 0 }
          }}
        />
        <Row>
          <Col>
            <strong className='me-2'>Recipe:</strong>
            <FoodceptionHrefLink url={recipeDetailsUrl}>
              {recipeVideo.recipe.title}
            </FoodceptionHrefLink>
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <h2 className='text-center'>Related Recipes</h2>
            <RelatedRecipes recipeId={recipeVideo.recipe.id}></RelatedRecipes>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h2 className='text-center'>{recipeVideo.recipe.title} Videos</h2>
            <RecipeVideos recipeId={recipeVideo.recipe.id}></RecipeVideos>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RecipeVideoDetailsPage;
