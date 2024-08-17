import RecipeVideoCard from './recipeVideoCard';

interface RecipeVideosProps {
  recipeVideos: any[];
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({ recipeVideos }) => {
  return (
    <div className='row'>
      {recipeVideos.map((videoData) => {
        return (
          <div key={videoData.recipeVideo.id} className='col-md-4 mb-3'>
            <RecipeVideoCard
              recipeVideo={videoData.recipeVideo}
              youTubeChannelVideo={videoData.youTubeChannelVideo}
              youTubeChannelVideoImages={videoData.youTubeChannelVideoImages}
              youTubeChannel={videoData.youTubeChannel}
            ></RecipeVideoCard>
          </div>
        );
      })}
    </div>
  );
};

export default RecipeVideos;
