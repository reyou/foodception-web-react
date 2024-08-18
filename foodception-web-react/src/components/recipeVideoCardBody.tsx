import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionRecipeVideoCardBodyProps {
  youTubeChannelVideo: any;
  onWatchClicked: () => void;
}

const FoodceptionRecipeVideoCardBody: React.FC<
  FoodceptionRecipeVideoCardBodyProps
> = ({ youTubeChannelVideo, onWatchClicked }) => {
  return (
    <div className='card-body'>
      <h5 className='card-title'>
        {FrontEndUtils.capitalizeText(youTubeChannelVideo.title)}
      </h5>
      <p className='card-text'>{youTubeChannelVideo.description}</p>
      <button className='btn btn-primary me-2' onClick={() => onWatchClicked()}>
        Watch
      </button>
      <a
        className='btn btn-primary'
        href={`https://www.youtube.com/v/${youTubeChannelVideo.videoId}`}
        target='_blank'
      >
        Watch on YouTube
      </a>
    </div>
  );
};

export default FoodceptionRecipeVideoCardBody;
