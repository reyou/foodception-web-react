import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import FoodceptionRecipeCard from './recipe-card';
import { Recipe } from '../types/recipe.types';
import { ErrorDetails } from '../types/error.types';
import GenericModal from './modals/generic-modal';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import ParentWindowUtils from '../utils/ParentWindowUtils';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState<ErrorDetails | null>(null);

  const handleError = (error: ErrorDetails) => {
    if (FrontEndUtils.isInsideIframe()) {
      ParentWindowUtils.sendError(error);
    } else {
      setErrorDetails(error);
      setShowErrorModal(true);
    }
  };

  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <>
      <Container fluid>
        <Row className='justify-content-center'>
          {recipes.map((recipe) => (
            <FoodceptionRecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onError={handleError}
            />
          ))}
        </Row>
      </Container>
      <GenericModal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        title={errorDetails?.type === 'AUTH_ERROR' ? 'Login Required' : 'Error'}
        body={errorDetails?.message}
      />
    </>
  );
};

export default RecipeList;
