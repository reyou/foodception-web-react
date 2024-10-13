import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import YouTube, { YouTubeProps } from 'react-youtube';
import { FrontEndUtils } from '../utils/FrontEndUtils';

interface FoodceptionModalProps {
  show: boolean;
  videoData: any | null;
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

  // Handle fade-in and modal positioning effect
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

  // YouTube player options
  // https://developers.google.com/youtube/player_parameters
  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0
    }
  };

  // Don't render modal if videoData is missing
  if (!show || !videoData) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      size='lg'
      className={`fade ${fadeIn ? 'show' : ''}`}
      style={{
        backgroundColor: fadeIn ? 'rgba(0,0,0,0.5)' : 'transparent',
        ...modalStyle
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{videoData?.title || 'No Title Available'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <YouTube
          videoId={videoData.videoId}
          className='foodceptionYoutubeVideoPlayer'
          iframeClassName='foodceptionYoutubeVideoPlayerIframe'
          opts={opts}
        />
        <p>{videoData?.description || 'No description available.'}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FoodceptionModal;
