import React from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';
import { Container, Row } from 'react-bootstrap';

interface RecipeListProps {
  recipes: any[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <Container fluid>
      <Row className='justify-content-center'>
        {recipes.map((recipe: any) => {
          const recipeImage = recipe.recipeImages[0];
          const recipeLink = `/recipes/${FrontEndUtils.slugify(recipe.title)}/${
            recipe.id
          }`;

          return (
            <FoodceptionCard
              key={recipe.id}
              title={recipe.title}
              description={recipe.description}
              url={recipeLink}
              urlTitle='View Recipe'
              imageUrl={recipeImage.imageUrl}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default RecipeList;
