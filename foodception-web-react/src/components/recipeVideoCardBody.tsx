import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionLink from './links/foodception_link';

interface FoodceptionRecipeVideoCardBodyProps {
  recipeVideo: any;
  youTubeChannelVideo: any;
  onWatchClicked: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const FoodceptionRecipeVideoCardBody: React.FC<
  FoodceptionRecipeVideoCardBodyProps
> = ({ recipeVideo, youTubeChannelVideo, onWatchClicked }) => {
  const slug = FrontEndUtils.slugify(recipeVideo.recipe.title);
  const recipeVideoUrl = `/recipes/videos/${slug}/${recipeVideo.id}`;
  const recipeUrl = `/recipes/${slug}/${recipeVideo.recipe.id}`;
  return (
    <Card.Body>
      <Card.Title>
        <FoodceptionLink url={recipeVideoUrl}>
          {youTubeChannelVideo.title}
        </FoodceptionLink>
      </Card.Title>

      <div>
        <strong className='me-2'>Recipe:</strong>
        <FoodceptionLink url={recipeUrl}>
          {recipeVideo.recipe.title}
        </FoodceptionLink>
      </div>
      <div className='mb-3'>
        <strong className='me-2'>Channel:</strong>
        <a
          href={`https://www.youtube.com/channel/${youTubeChannelVideo.youtubeChannel.channelId}`}
          target='_blank'
          className='link-button'
          rel='noopener noreferrer'
        >
          {youTubeChannelVideo.youtubeChannel.channelTitle}
        </a>
      </div>

      <Card.Text>
        {FrontEndUtils.truncateText(youTubeChannelVideo.description, 150)}
      </Card.Text>

      <Button
        variant='primary'
        className='me-2 mt-2'
        onClick={(event) => onWatchClicked(event)}
      >
        Watch
      </Button>

      <Button
        variant='primary'
        className='mt-2'
        href={`https://www.youtube.com/v/${youTubeChannelVideo.videoId}`}
        target='_blank'
        rel='noreferrer'
      >
        Watch on YouTube
      </Button>
    </Card.Body>
  );
};

export default FoodceptionRecipeVideoCardBody;
