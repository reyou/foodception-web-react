import React from 'react';
import { Container, Row } from 'react-bootstrap';
import FoodceptionRecipeCard from './recipe-card';
import { Recipe } from '../types/recipe.types';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <Container fluid>
      <Row className='justify-content-center'>
        {recipes.map((recipe) => (
          <FoodceptionRecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Row>
    </Container>
  );
};

export default RecipeList;
