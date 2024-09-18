import { useState } from 'react';
import FoodceptionModal from './modal';
import RecipeVideoCard from './recipeVideoCard';

interface RecipeVideosProps {
  youtubeChannelVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({
  youtubeChannelVideos
}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [clickedElementY, setClickedElementY] = useState(0);

  const handleWatchClicked = (
    event:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.MouseEvent<HTMLImageElement, MouseEvent>,
    videoData: any
  ) => {
    const targetElement = event.target as HTMLElement;
    const yAxis = targetElement.getBoundingClientRect().top;

    setSelectedVideo(videoData);
    setShowModal(true);
    setClickedElementY(yAxis);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className='row'>
      <FoodceptionModal
        show={showModal}
        videoData={selectedVideo}
        clickedElementY={clickedElementY}
        onClose={handleCloseModal}
      />

      {youtubeChannelVideos.map((youtubeChannelVideo) => {
        return (
          <div key={youtubeChannelVideo.id} className='col-md-4 mb-3'>
            <RecipeVideoCard
              youTubeChannelVideo={youtubeChannelVideo}
              youTubeChannelVideoImages={
                youtubeChannelVideo.youtubeChannelVideoImages
              }
              youTubeChannel={youtubeChannelVideo.youtubeChannel}
              onWatchClicked={(event) =>
                handleWatchClicked(event, youtubeChannelVideo)
              }
            ></RecipeVideoCard>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeVideos;
