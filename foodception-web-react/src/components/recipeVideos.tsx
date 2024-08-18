import { useState } from 'react';
import FoodceptionModal from './modal';
import RecipeVideoCard from './recipeVideoCard';

interface RecipeVideosProps {
  recipeVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({ recipeVideos }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleWatchClicked = (videoData: any) => {
    setSelectedVideo(videoData);
    setShowModal(true);
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
              onWatchClicked={() =>
                handleWatchClicked(videoData.youTubeChannelVideo)
              }
            ></RecipeVideoCard>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeVideos;
