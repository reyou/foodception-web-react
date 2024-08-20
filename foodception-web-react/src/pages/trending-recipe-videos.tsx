import { useEffect, useState } from 'react';
import FoodceptionTrendingRecipeVideoCard from '../components/trending-recipe-video-card';
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
        console.log('LogGuid: 3d430497-cdcb-441d-bdd5-4458b9c26bf5');
        console.error(error);
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
      return <div>Loading...</div>;
    }

    return (
      <div className='row'>
        {data.trendingRecipeVideos.map((item: any) => (
          <div key={item.recipeVideo.id} className='col-3 mb-2'>
            <FoodceptionTrendingRecipeVideoCard
              recipe={item.recipe}
              recipeVideo={item.recipeVideo}
              youTubeChannelVideo={item.youTubeChannelVideo}
              youTubeChannelVideoImages={item.youTubeChannelVideoImages}
            ></FoodceptionTrendingRecipeVideoCard>
          </div>
        ))}
      </div>
    );
  };

  return render();
}
