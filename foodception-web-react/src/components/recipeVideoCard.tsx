import FoodceptionCardHrefImage from './card-href-image';
import FoodceptionRecipeVideoCardBody from './recipeVideoCardBody';

interface RecipeVideoCardProps {
  recipeVideo: any;
  youTubeChannelVideo: any;
  youTubeChannelVideoImages: any[];
  youTubeChannel: any;
}

const RecipeVideoCard: React.FC<RecipeVideoCardProps> = ({
  recipeVideo,
  youTubeChannelVideo,
  youTubeChannelVideoImages,
  youTubeChannel
}) => {
  youTubeChannelVideoImages.sort((a, b) => b.width - a.width);
  const imageUrl = youTubeChannelVideoImages[0].url;
  return (
    <div className='card'>
      <FoodceptionCardHrefImage
        url={''}
        src={imageUrl}
        alt={youTubeChannelVideo.title}
      />
      <FoodceptionRecipeVideoCardBody
        youTubeChannelVideo={youTubeChannelVideo}
        linkTitle='Watch'
      ></FoodceptionRecipeVideoCardBody>
    </div>
  );
};

export default RecipeVideoCard;
