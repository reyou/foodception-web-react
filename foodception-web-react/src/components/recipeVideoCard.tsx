import FoodceptionRecipeVideoCardBody from './recipeVideoCardBody';
import FoodceptionRecipeVideoCardImage from './recipeVideoCardImage';

interface RecipeVideoCardProps {
  recipeVideo: any;
  youTubeChannelVideo: any;
  youTubeChannelVideoImages: any[];
  youTubeChannel: any;
  onWatchClicked: (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => void;
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
        onWatchClicked={(event) => onWatchClicked(event)}
      />
      <FoodceptionRecipeVideoCardBody
        youTubeChannelVideo={youTubeChannelVideo}
        onWatchClicked={(event) => onWatchClicked(event)}
      ></FoodceptionRecipeVideoCardBody>
    </div>
  );
};

export default RecipeVideoCard;
