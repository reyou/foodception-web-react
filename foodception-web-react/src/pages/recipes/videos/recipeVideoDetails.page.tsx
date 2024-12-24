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
import FoodceptionShareButtons from '../../../components/core/foodception_share_buttons';

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
  const recipe = recipeVideo.recipe;
  const providerVideo = data.providerVideo;
  let youTubeChannelVideoImages = providerVideo.youtubeChannelVideoImages;
  youTubeChannelVideoImages.sort((a: any, b: any) => b.width - a.width);
  const imageUrl = youTubeChannelVideoImages[0].url;
  const recipeDetailsUrl = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${recipe.id}`;
  return (
    <>
      <FoodceptionHeader>{providerVideo.title}</FoodceptionHeader>

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
            <div className='fs-5 mb-2'>
              <strong className='me-2'>Recipe:</strong>
              <FoodceptionHrefLink url={recipeDetailsUrl}>
                {recipe.title}
              </FoodceptionHrefLink>
            </div>
          </Col>
        </Row>

        <FoodceptionShareButtons
          url={FrontEndUtils.getAdjustedUrl(window.location.href)}
          hashtag={`#${FrontEndUtils.slugify(providerVideo.title)} #foodception`}
          title={`${providerVideo.title}: ${providerVideo.description}`}
          media={imageUrl}
        />
        <Row>
          <Col>
            <p className='text-center fs-5 mt-4'>{providerVideo.description}</p>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h2 className='text-center'>Related Recipes</h2>
            <RelatedRecipes recipeId={recipe.id}></RelatedRecipes>
          </Col>
        </Row>
        <Row className='mt-4'>
          <Col>
            <h2 className='text-center'>{recipeVideo.recipe.title} Videos</h2>
            <RecipeVideos recipeId={recipe.id}></RecipeVideos>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default RecipeVideoDetailsPage;
