import { useState } from 'react';
import { FrontEndUtils } from '../utils/FrontEndUtils';
import FoodceptionCard from './card';
import { Col, Container, Row } from 'react-bootstrap';
import FoodceptionSelect from './core/foodception_select';

interface RecipeCategoriesListProps {
  recipeCategories: any[];
}

interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

const RecipeCategoriesList: React.FC<RecipeCategoriesListProps> = ({
  recipeCategories
}) => {
  const [selectedCategory, setSelectedCategory] = useState<OptionType | null>(
    null
  );

  const options: OptionType[] = recipeCategories.map((category) => ({
    value: category.id,
    label: FrontEndUtils.capitalizeText(category.name),
    icon: FrontEndUtils.getResizedImagePath(
      category.recipeCategoryImages[0]?.imageUrl,
      30,
      30
    )
  }));

  const handleCategoryChange = (value: string) => {
    const selectedOption =
      options.find((option) => option.value === value) || null;
    setSelectedCategory(selectedOption);
  };

  const filteredCategories = selectedCategory
    ? recipeCategories.filter(
        (category) => category.id === selectedCategory.value
      )
    : recipeCategories;

  return (
    <Container fluid>
      <Row className='justify-content-center mb-4'>
        <Col xs={12} md={6} lg={4} xl={3}>
          <FoodceptionSelect
            options={options}
            onChange={handleCategoryChange}
            placeholder='Select a category...'
          />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        {filteredCategories.map((category: any) => {
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
