import React from 'react';
import { Alert } from 'react-bootstrap';

interface NoRelatedVideosProps {
  recipeTitle: string;
}

const NoRelatedVideos: React.FC<NoRelatedVideosProps> = ({ recipeTitle }) => {
  return (
    <div className='text-center'>
      <Alert variant='secondary'>
        No related videos are available right now, but we're always adding new
        content. Please check back soon!
        <br />
        In the meantime, you can explore related videos on In the meantime, you
        can explore related videos on{' '}
        <a
          className='link-button'
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(recipeTitle)}+recipe`}
          target='_blank'
          rel='noopener noreferrer'
        >
          YouTube
        </a>
        .
      </Alert>
    </div>
  );
};

export default NoRelatedVideos;
