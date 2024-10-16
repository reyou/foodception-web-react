import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionRecipeVideoCardBodyProps {
  youTubeChannelVideo: any;
  onWatchClicked: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const FoodceptionRecipeVideoCardBody: React.FC<
  FoodceptionRecipeVideoCardBodyProps
> = ({ youTubeChannelVideo, onWatchClicked }) => {
  return (
    <Card.Body>
      <Card.Title>
        {FrontEndUtils.capitalizeText(youTubeChannelVideo.title)}
      </Card.Title>

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

      <Card.Text>{youTubeChannelVideo.description}</Card.Text>

      <Button
        variant='primary'
        className='me-2'
        onClick={(event) => onWatchClicked(event)}
      >
        Watch
      </Button>

      <Button
        variant='primary'
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
