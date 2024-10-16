import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';
import { Container, Row } from 'react-bootstrap';

interface RecipeCategoriesListProps {
  recipeCategories: any[];
}

const RecipeCategoriesList: React.FC<RecipeCategoriesListProps> = ({
  recipeCategories
}) => {
  return (
    <Container fluid>
      <Row className='justify-content-center'>
        {recipeCategories.map((category: any) => {
          const categoryImage = category.recipeCategoryImages[0];
          const categoryLink = `/recipe-categories/${FrontEndUtils.slugify(
            category.name
          )}/${category.id}`;

          return (
            <FoodceptionCard
              key={category.id}
              title={category.name}
              description={category.description}
              url={categoryLink}
              urlTitle='View Recipes'
              imageUrl={categoryImage.imageUrl}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default RecipeCategoriesList;
