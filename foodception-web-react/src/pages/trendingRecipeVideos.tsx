import { useEffect, useState } from 'react';
import FoodceptionHeader from '../components/header';
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
      return <div className='text-center'>Loading...</div>;
    }

    return (
      <>
        <div className='container-fluid'>
          <FoodceptionHeader>Cooking Videos For Every Taste</FoodceptionHeader>
          <div className='row justify-content-center'>
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
        </div>
      </>
    );
  };

  return render();
}
