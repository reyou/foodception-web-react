import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCardHrefImage from './cardHrefImage';

interface FoodceptionTrendingRecipeVideoCardProps {
  recipeVideo: any;
  youTubeChannelVideo: any;
}

const FoodceptionTrendingRecipeVideoCard: React.FC<
  FoodceptionTrendingRecipeVideoCardProps
> = ({ recipeVideo, youTubeChannelVideo }) => {
  youTubeChannelVideo.youtubeChannelVideoImages.sort(
    (a: any, b: any) => b.width - a.width
  );
  const imageUrl = youTubeChannelVideo.youtubeChannelVideoImages[0].url;
  const slug = FrontEndUtils.slugify(recipeVideo.recipe.title);
  const url = `/recipes/${slug}/videos/${recipeVideo.id}`;
  const recipeUrl = `/recipes/${slug}/${recipeVideo.recipe.id}`;

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
        <div className='card-text'>
          <div>
            <b className='me-2'>Recipe:</b>
            <a
              className='link-dark link-underline link-underline-opacity-0 link-underline-opacity-100-hover'
              href={FrontEndUtils.getAdjustedUrl(recipeUrl)}
              onClick={(event) =>
                FrontEndUtils.handleLinkClick(
                  event,
                  FrontEndUtils.getAdjustedUrl(recipeUrl)
                )
              }
            >
              {recipeVideo.recipe.title}
            </a>
          </div>
          <div>
            <b className='me-2'>Channel:</b>
            <a
              href={`https://www.youtube.com/channel/${youTubeChannelVideo.youtubeChannel.channelId}`}
              target='_blank'
              className='link-button'
              rel='noopener noreferrer'
            >
              {youTubeChannelVideo.youtubeChannel.channelTitle}
            </a>
          </div>
        </div>
        <p className='card-text pt-2'>{youTubeChannelVideo.description}</p>
        <a
          href={FrontEndUtils.getAdjustedUrl(url)}
          onClick={(event) =>
            FrontEndUtils.handleLinkClick(
              event,
              FrontEndUtils.getAdjustedUrl(url)
            )
          }
          className='btn btn-primary'
        >
          Watch Now
        </a>
      </div>
    </div>
  );
};

export default FoodceptionTrendingRecipeVideoCard;
