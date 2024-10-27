import React from 'react';
import { Alert } from 'react-bootstrap';

interface NoRelatedRecipesProps {
  recipeTitle: string;
}

const NoRelatedRecipes: React.FC<NoRelatedRecipesProps> = ({ recipeTitle }) => {
  return (
    <div className='text-center'>
      <Alert variant='secondary'>
        No related recipes are available at the moment, but we're always adding
        new dishes. Please check back soon!
        <br />
        In the meantime, you can explore similar recipes on{' '}
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

export default NoRelatedRecipes;
