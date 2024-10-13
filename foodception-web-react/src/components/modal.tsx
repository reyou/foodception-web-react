import React, { useState, useEffect, useRef } from 'react';
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
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle fade-in effect and position adjustment
  useEffect(() => {
    if (show) {
      setFadeIn(true);

      // Apply custom positioning only if inside an iframe
      if (FrontEndUtils.isInsideIframe()) {
        adjustModalPosition();
      } else {
        // Reset to default modal position when not in iframe
        setModalStyle({});
      }
    } else {
      setFadeIn(false);
    }
  }, [show, clickedElementY]);

  // Adjust modal position if inside an iframe
  const adjustModalPosition = () => {
    const modalHeight = modalRef.current?.offsetHeight || 0;
    const windowHeight = window.innerHeight;

    // Ensure the modal stays within the viewport
    const topPosition = Math.max(
      10,
      Math.min(
        clickedElementY - modalHeight / 2,
        windowHeight - modalHeight - 10
      )
    );

    setModalStyle({ top: `${topPosition}px`, border: '2px solid transparent' });
  };

  const opts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 0
    }
  };

  if (!show || !videoData) return null;

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered={!FrontEndUtils.isInsideIframe()} // Use centered only when not in iframe
      size='lg'
      className={`fade ${fadeIn ? 'show' : ''}`}
      style={{
        backgroundColor: fadeIn ? 'rgba(0,0,0,0.5)' : 'transparent',
        ...modalStyle
      }}
      onEntered={
        FrontEndUtils.isInsideIframe() ? adjustModalPosition : undefined
      } // Adjust position only if in iframe
      ref={modalRef}
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
