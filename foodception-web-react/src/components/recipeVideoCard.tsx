import FoodceptionRecipeVideoCardBody from './recipeVideoCardBody';
import FoodceptionRecipeVideoCardImage from './recipeVideoCardImage';

interface RecipeVideoCardProps {
  recipeVideo: any;
  youTubeChannelVideo: any;
  youTubeChannelVideoImages: any[];
  youTubeChannel: any;
  onWatchClicked: () => void;
}

const RecipeVideoCard: React.FC<RecipeVideoCardProps> = ({
  recipeVideo,
  youTubeChannelVideo,
  youTubeChannelVideoImages,
  youTubeChannel,
  onWatchClicked
}) => {
  youTubeChannelVideoImages.sort((a, b) => b.width - a.width);
  const imageUrl = youTubeChannelVideoImages[0].url;
  return (
    <div className='card'>
      <FoodceptionRecipeVideoCardImage
        src={imageUrl}
        alt={youTubeChannelVideo.title}
        onWatchClicked={() => onWatchClicked()}
      />
      <FoodceptionRecipeVideoCardBody
        youTubeChannelVideo={youTubeChannelVideo}
        onWatchClicked={() => onWatchClicked()}
      ></FoodceptionRecipeVideoCardBody>
    </div>
  );
};

export default RecipeVideoCard;
