import { useState } from 'react';
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

// Helper function to chunk videos into rows (e.g., 3 per row)
const chunkArray = (array: any[], size: number) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

interface RecipeVideosProps {
  youtubeChannelVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({
  youtubeChannelVideos
}) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(
    null
  );

  const handleWatchClicked = (index: number) => {
    setSelectedVideoIndex((prev) => (prev === index ? null : index));
  };

  const handleCloseVideo = () => {
    setSelectedVideoIndex(null);
  };

  // Split videos into rows of 3 (or as desired)
  const rows = chunkArray(youtubeChannelVideos, 3);

  return (
    <Container fluid className='py-4'>
      {rows.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {/* Check if any video from this row is selected */}
          {row.some(
            (_, index) => selectedVideoIndex === rowIndex * 3 + index
          ) ? (
            <Row className='justify-content-center mt-3 mb-4'>
              <Col xs={12}>
                <Card className='w-100'>
                  <Card.Header className='d-flex justify-content-between align-items-center'>
                    <strong className='me-auto'>
                      {youtubeChannelVideos[selectedVideoIndex!].title}
                    </strong>
                    <CloseButton onClick={handleCloseVideo} />
                  </Card.Header>

                  <Card.Body>
                    <YouTube
                      videoId={
                        youtubeChannelVideos[selectedVideoIndex!].videoId
                      }
                      className='foodceptionYoutubeVideoPlayer'
                      iframeClassName='foodceptionYoutubeVideoPlayerIframe'
                      opts={{
                        height: '480',
                        width: '100%',
                        playerVars: { autoplay: 0 }
                      }}
                    />
                    <p className='mt-3'>
                      {youtubeChannelVideos[selectedVideoIndex!].description ||
                        'No description available.'}
                    </p>
                  </Card.Body>

                  <Card.Footer className='d-flex justify-content-end'>
                    <Button variant='secondary' onClick={handleCloseVideo}>
                      Close
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            </Row>
          ) : (
            /* Render the normal row of video cards */
            <Row className='gy-4'>
              {row.map((video, index) => (
                <Col key={video.id} xs={12} sm={6} md={4} className='mb-3'>
                  <RecipeVideoCard
                    youTubeChannelVideo={video}
                    youTubeChannelVideoImages={video.youtubeChannelVideoImages}
                    youTubeChannel={video.youtubeChannel}
                    onWatchClicked={() =>
                      handleWatchClicked(rowIndex * 3 + index)
                    }
                  />
                </Col>
              ))}
            </Row>
          )}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default RecipeVideos;
