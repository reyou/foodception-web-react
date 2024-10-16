import React from 'react';
import { Card, Button } from 'react-bootstrap';
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
    <Card className='h-100'>
      <FoodceptionCardHrefImage
        url={url}
        src={imageUrl}
        alt={youTubeChannelVideo.title}
      />

      <Card.Body>
        <Card.Title>
          {FrontEndUtils.capitalizeText(youTubeChannelVideo.title)}
        </Card.Title>

        {/* Restructured to avoid divs inside Card.Text */}
        <div>
          <strong className='me-2'>Recipe:</strong>
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

        <div className='mb-3'>
          <strong className='me-2'>Channel:</strong>
          <a
            href={`https://www.youtube.com/channel/${youTubeChannelVideo.youtubeChannel.channelId}`}
            target='_blank'
            className='link-button'
            rel='noopener noreferrer'
          >
            {youTubeChannelVideo.youtubeChannel.channelTitle}
          </a>
        </div>

        <Card.Text className='pt-2'>
          {youTubeChannelVideo.description}
        </Card.Text>

        <Button
          variant='primary'
          href={FrontEndUtils.getAdjustedUrl(url)}
          onClick={(event) =>
            FrontEndUtils.handleLinkClick(
              event,
              FrontEndUtils.getAdjustedUrl(url)
            )
          }
        >
          Watch Now
        </Button>
      </Card.Body>
    </Card>
  );
};

export default FoodceptionTrendingRecipeVideoCard;
