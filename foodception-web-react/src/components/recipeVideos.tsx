import { useState } from 'react';
import FoodceptionModal from './modal';
import RecipeVideoCard from './recipeVideoCard';

interface RecipeVideosProps {
  recipeVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({ recipeVideos }) => {
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

      {recipeVideos.map((videoData) => {
        return (
          <div key={videoData.recipeVideo.id} className='col-md-4 mb-3'>
            <RecipeVideoCard
              recipeVideo={videoData.recipeVideo}
              youTubeChannelVideo={videoData.youTubeChannelVideo}
              youTubeChannelVideoImages={videoData.youTubeChannelVideoImages}
              youTubeChannel={videoData.youTubeChannel}
              onWatchClicked={(event) =>
                handleWatchClicked(event, videoData.youTubeChannelVideo)
              }
            ></RecipeVideoCard>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeVideos;
