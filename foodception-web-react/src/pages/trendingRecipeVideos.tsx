import ErrorPanel from '../components/error_message';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/links/hrefButton';
import FoodceptionTrendingRecipeVideoCard from '../components/trendingRecipeVideoCard';
import useFetch from '../hooks/useFetch';

export default function TrendingRecipeVideos() {
  const { data, loading, error } = useFetch(`/recipes/videos/trending`);

  const render = () => {
    if (error) {
      return <ErrorPanel errorMessage={error}></ErrorPanel>;
    }

    if (loading) {
      return <div className='text-center'>Loading...</div>;
    }

    return (
      <>
        <div className='container-fluid'>
          <FoodceptionHeader>Cooking Videos For Every Taste</FoodceptionHeader>
          <div className='row justify-content-center'>
            {data.trendingRecipeVideos.map((trendingRecipeVideo: any) => {
              const recipeVideo = data.recipeVideos.find(
                (q: any) =>
                  q.recipeVideoProviderVideoId === trendingRecipeVideo.id
              );

              return (
                <div
                  key={trendingRecipeVideo.id}
                  className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'
                >
                  <FoodceptionTrendingRecipeVideoCard
                    recipeVideo={recipeVideo}
                    youTubeChannelVideo={trendingRecipeVideo}
                  ></FoodceptionTrendingRecipeVideoCard>
                </div>
              );
            })}
          </div>
          <div className='text-center mt-2'>
            <FoodceptionHrefButton url={'/recipes/videos'}>
              See All Videos
            </FoodceptionHrefButton>
          </div>
        </div>
      </>
    );
  };

  return render();
}
