import { useEffect, useRef, useState } from 'react';
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
import React from 'react';

interface RecipeVideosProps {
  youtubeChannelVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({
  youtubeChannelVideos
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const focusRef = useRef<HTMLDivElement>(null);

  const handleWatchClicked = (index: number) => {
    setSelectedVideoIndex((prev) => (prev === index ? null : index));
  };

  const handleCloseVideo = () => {
    setSelectedVideoIndex(null);
  };

  useEffect(() => {
    if (selectedVideoIndex !== null && focusRef.current) {
      focusRef.current.focus();
      focusRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedVideoIndex]);

  return (
    <Container fluid className='py-4'>
      <Row className='gy-4'>
        {youtubeChannelVideos.map((video, index) => (
          <React.Fragment key={video.id || `video-fragment-${index}`}>
            <div className='col-md-4 mb-3'>
              <RecipeVideoCard
                youTubeChannelVideo={video}
                youTubeChannelVideoImages={video.youtubeChannelVideoImages}
                youTubeChannel={video.youtubeChannel}
                onWatchClicked={() => handleWatchClicked(index)}
              />
            </div>

            {selectedVideoIndex === index && (
              <Row
                data-guid='16bbd38f-bb3e-45b6-96ba-66b64467e6ec'
                className='justify-content-center mt-3 mb-4'
                key={`video-row-${index}`}
              >
                <Col xs={12} className='mt-3'>
                  <Card className='w-100'>
                    <Card.Header className='d-flex justify-content-between align-items-center'>
                      <strong className='me-auto'>{video.title}</strong>
                      <CloseButton onClick={handleCloseVideo} />
                    </Card.Header>

                    <Card.Body>
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
                      {/* Hidden focusable div */}
                      <div
                        ref={focusRef}
                        tabIndex={-1}
                        style={{ outline: 'none' }}
                      />
                      <Button variant='secondary' onClick={handleCloseVideo}>
                        Close
                      </Button>
                    </Card.Footer>
                  </Card>
                </Col>
              </Row>
            )}
          </React.Fragment>
        ))}
      </Row>
    </Container>
  );
};

export default RecipeVideos;
