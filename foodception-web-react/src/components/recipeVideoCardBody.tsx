import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface FoodceptionRecipeVideoCardBodyProps {
  linkTitle: string;
  youTubeChannelVideo: any;
}

const FoodceptionRecipeVideoCardBody: React.FC<
  FoodceptionRecipeVideoCardBodyProps
> = ({ linkTitle, youTubeChannelVideo }) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    youTubeChannelVideo: any
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({
      type: 'redirect',
      url: youTubeChannelVideo
    });
  };

  return (
    <div className='card-body'>
      <h5 className='card-title'>
        {FrontEndUtils.capitalizeText(youTubeChannelVideo.title)}
      </h5>
      <p className='card-text'>{youTubeChannelVideo.description}</p>
      {FrontEndUtils.isInsideIframe() ? (
        <button
          className='btn btn-primary me-2'
          onClick={(event) => handleLinkClick(event, youTubeChannelVideo)}
        >
          {linkTitle}
        </button>
      ) : (
        <a href={youTubeChannelVideo} className='btn btn-primary me-2'>
          {linkTitle}
        </a>
      )}
      <button
        className='btn btn-primary'
        onClick={(event) => handleLinkClick(event, youTubeChannelVideo)}
      >
        Watch on YouTube
      </button>
    </div>
  );
};

export default FoodceptionRecipeVideoCardBody;
