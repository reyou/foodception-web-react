import { useEffect, useState } from 'react';
import FoodceptionHeader from '../components/header/header';
import FoodceptionHrefButton from '../components/hrefButton';
import FoodceptionTrendingRecipeVideoCard from '../components/trendingRecipeVideoCard';
import HttpProvider from '../providers/HttpProvider';

export default function TrendingRecipeVideos() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await HttpProvider.get(
          'https://api.foodception.com/recipes/videos/trending'
        );
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const render = () => {
    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!data) {
      return <div className='text-center'>Loading...</div>;
    }

    return (
      <>
        <div className='container-fluid'>
          <FoodceptionHeader>Cooking Videos For Every Taste</FoodceptionHeader>
          <div className='row justify-content-center'>
            {data.trendingRecipeVideos.map((item: any) => (
              <div
                key={item.recipeVideo.id}
                className='col-12 col-md-6 col-lg-4 col-xl-3 mb-4'
              >
                <FoodceptionTrendingRecipeVideoCard
                  recipe={item.recipe}
                  recipeVideo={item.recipeVideo}
                  youTubeChannelVideo={item.youTubeChannelVideo}
                  youTubeChannelVideoImages={item.youTubeChannelVideoImages}
                ></FoodceptionTrendingRecipeVideoCard>
              </div>
            ))}
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
