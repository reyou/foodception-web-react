import React from 'react';
import useFetch from '../hooks/useFetch';
import LoadingPanel from './loading_panel';
import ErrorPanel from './error_message';
import NoRelatedVideos from '../pages/recipes/components/no_related_videos';
import RecipeVideosList from './recipeVideosList';

interface RecipeVideosProps {
  recipeId: string;
}

const RecipeVideos: React.FC<RecipeVideosProps> = ({ recipeId }) => {
  const { data, loading, error } = useFetch(`/recipes/${recipeId}/videos`);

  if (loading) {
    return <LoadingPanel visible={true}></LoadingPanel>;
  }

  if (error) {
    return <ErrorPanel errorMessage={error}></ErrorPanel>;
  }

  if (!data) {
    return <NoRelatedVideos recipeTitle={data.recipe.title}></NoRelatedVideos>;
  }

  const providerVideos = data.providerVideos;
  const recipeVideos = data.recipeVideos;

  return (
    <RecipeVideosList
      recipeVideos={recipeVideos}
      youtubeChannelVideos={providerVideos}
    ></RecipeVideosList>
  );
};

export default RecipeVideos;
