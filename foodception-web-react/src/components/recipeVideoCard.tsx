import React from 'react';
import { Card } from 'react-bootstrap';
import FoodceptionRecipeVideoCardBody from './recipeVideoCardBody';
import FoodceptionRecipeVideoCardImage from './recipeVideoCardImage';

interface RecipeVideoCardProps {
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
  youTubeChannelVideo,
  youTubeChannelVideoImages,
  onWatchClicked
}) => {
  // Sort images by width in descending order and use the largest image.
  youTubeChannelVideoImages.sort((a, b) => b.width - a.width);
  const imageUrl = youTubeChannelVideoImages[0].url;

  return (
    <Card className='mb-4'>
      <FoodceptionRecipeVideoCardImage
        src={imageUrl}
        alt={youTubeChannelVideo.title}
        onWatchClicked={(event) => onWatchClicked(event)}
      />
      <FoodceptionRecipeVideoCardBody
        youTubeChannelVideo={youTubeChannelVideo}
        onWatchClicked={(event) => onWatchClicked(event)}
      />
    </Card>
  );
};

export default RecipeVideoCard;
