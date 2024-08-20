import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';
import FoodceptionCardHrefImage from './card-href-image';

interface FoodceptionTrendingRecipeVideoCardProps {
  recipe: any;
  recipeVideo: any;
  youTubeChannelVideo: any;
  youTubeChannelVideoImages: any[];
}

const FoodceptionTrendingRecipeVideoCard: React.FC<
  FoodceptionTrendingRecipeVideoCardProps
> = ({
  recipe,
  recipeVideo,
  youTubeChannelVideo,
  youTubeChannelVideoImages
}) => {
  youTubeChannelVideoImages.sort((a, b) => b.width - a.width);
  const imageUrl = youTubeChannelVideoImages[0].url;
  const slug = FrontEndUtils.slugify(recipe.title);
  const url = `/recipes/${slug}/videos/${recipeVideo.id}`;
  const recipeUrl = `/recipes/${slug}/${recipe.id}`;
  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    url: string
  ) => {
    event.preventDefault();
    ParentWindowUtils.postMessage({ type: 'redirect', url: url });
  };
  return (
    <div className='card'>
      <FoodceptionCardHrefImage
        url={url}
        src={imageUrl}
        alt={youTubeChannelVideo.title}
      />
      <div className='card-body'>
        <h5 className='card-title'>
          {FrontEndUtils.capitalizeText(youTubeChannelVideo.title)}
        </h5>
        <p className='card-text'>
          <b className='me-2'>Recipe:</b>
          {FrontEndUtils.isInsideIframe() ? (
            <button
              className='link-button'
              onClick={(event) => handleLinkClick(event, recipeUrl)}
            >
              {recipe.title}
            </button>
          ) : (
            <a
              className='link-dark link-underline link-underline-opacity-0 link-underline-opacity-100-hover'
              href={recipeUrl}
            >
              {recipe.title}
            </a>
          )}
        </p>
        <p className='card-text'>{youTubeChannelVideo.description}</p>
        {FrontEndUtils.isInsideIframe() ? (
          <button
            className='btn btn-primary'
            onClick={(event) => handleLinkClick(event, url)}
          >
            Watch Now
          </button>
        ) : (
          <a href={url} className='btn btn-primary'>
            Watch Now
          </a>
        )}
      </div>
    </div>
  );
};

export default FoodceptionTrendingRecipeVideoCard;
