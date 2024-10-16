import React, { useState, useRef, useEffect } from 'react';
import YouTube from 'react-youtube';
import RecipeVideoCard from './recipeVideoCard';
import {
  Card,
  Button,
  CloseButton,
  Container,
  Row,
  Col
} from 'react-bootstrap';

interface RecipeVideosProps {
  youtubeChannelVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({
  youtubeChannelVideos
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoPanelRef = useRef<HTMLDivElement>(null);

  const handleWatchClicked = (index: number) => {
    setSelectedVideoIndex((prev) => (prev === index ? null : index));
  };

  const handleCloseVideo = () => {
    setSelectedVideoIndex(null);

    setTimeout(() => {
      if (selectedVideoIndex !== null && cardRefs.current[selectedVideoIndex]) {
        cardRefs.current[selectedVideoIndex]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }
    }, 500);
  };

  useEffect(() => {
    if (selectedVideoIndex !== null && videoPanelRef.current) {
      setTimeout(() => {
        videoPanelRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'nearest'
        });
      }, 500);
    }
  }, [selectedVideoIndex]);

  return (
    <Container fluid className='py-4'>
      <Row className='gy-4'>
        {youtubeChannelVideos.map((video, index) => (
          <React.Fragment key={video.id}>
            {/* Video card shown when it is not selected */}
            {selectedVideoIndex !== index && (
              <Col xs={12} sm={6} md={4} className='mb-3'>
                <div ref={(el) => (cardRefs.current[index] = el)}>
                  <RecipeVideoCard
                    youTubeChannelVideo={video}
                    youTubeChannelVideoImages={video.youtubeChannelVideoImages}
                    youTubeChannel={video.youtubeChannel}
                    onWatchClicked={() => handleWatchClicked(index)}
                  />
                </div>
              </Col>
            )}

            {/* Video player panel shown when a video is selected */}
            {selectedVideoIndex === index && (
              <Col xs={12}>
                <Card className='w-100'>
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    <strong className='me-auto'>{video.title}</strong>
                    <CloseButton onClick={handleCloseVideo} />
                  </Card.Header>

                  <Card.Body ref={videoPanelRef}>
                    <YouTube
                      videoId={video.videoId}
                      className='foodceptionYoutubeVideoPlayer'
                      iframeClassName='foodceptionYoutubeVideoPlayerIframe'
                      opts={{
                        height: '480',
                        width: '100%',
                        playerVars: { autoplay: 0 }
                      }}
                    />
                    <p className='mt-3'>
                      {video.description || 'No description available.'}
                    </p>
                  </Card.Body>

                  <Card.Footer className='d-flex justify-content-end'>
                    <Button variant='secondary' onClick={handleCloseVideo}>
                      Close
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            )}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeVideos;
