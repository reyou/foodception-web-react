import React, { useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

interface FoodceptionModalProps {
  show: boolean;
  videoData: any;
  onClose: () => void;
}

const FoodceptionModal: React.FC<FoodceptionModalProps> = ({
  show,
  videoData,
  onClose
}) => {
  const [fadeIn, setFadeIn] = useState(false);

  // Handle the fade-in and fade-out effect
  useEffect(() => {
    if (show) {
      setFadeIn(true);
    } else {
      setFadeIn(false);
    }
  }, [show]);

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0
    }
  };

  return (
    <>
      {show && (
        <div
          className={`modal fade ${fadeIn ? 'show d-block' : ''}`}
          tabIndex={-1}
          style={{
            backgroundColor: fadeIn ? 'rgba(0,0,0,0.5)' : 'transparent'
          }}
        >
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title'>{videoData.title}</h5>
                <button
                  type='button'
                  className='btn-close'
                  onClick={onClose}
                ></button>
              </div>
              <div className='modal-body'>
                {/* https://www.npmjs.com/package/react-youtube */}
                <YouTube
                  videoId={videoData.videoId}
                  className='foodceptionYoutubeVideoPlayer'
                  iframeClassName='foodceptionYoutubeVideoPlayerIframe'
                  opts={opts}
                ></YouTube>
                <p>{videoData.description}</p>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodceptionModal;
