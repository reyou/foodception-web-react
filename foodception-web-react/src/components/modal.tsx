import React, { useState, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionModalProps {
  show: boolean;
  videoData: any;
  clickedElementY: number;
  onClose: () => void;
}

const FoodceptionModal: React.FC<FoodceptionModalProps> = ({
  show,
  videoData,
  clickedElementY,
  onClose
}) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [modalStyle, setModalStyle] = useState<React.CSSProperties>({});

  // Handle the fade-in and fade-out effect
  useEffect(() => {
    if (show) {
      setFadeIn(true);
      if (FrontEndUtils.isInsideIframe()) {
        setTimeout(() => {
          setModalStyle({
            border: '2px solid transparent',
            top: `${clickedElementY - 400}px`
          });
        }, 0);
      }
    } else {
      setFadeIn(false);
    }
  }, [show, clickedElementY]);

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
          <div className='modal-dialog modal-lg' style={modalStyle}>
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
                />
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
