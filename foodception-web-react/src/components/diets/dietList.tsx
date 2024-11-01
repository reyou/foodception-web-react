import { useState } from 'react';
import { FrontEndUtils } from '../../utils/FrontEndUtils';
import { Col, Container, Row } from 'react-bootstrap';
import FoodceptionSelect from '../core/foodception_select';
import FoodceptionCard from '../card';

interface DietListProps {
  diets: any[];
  showSelect?: boolean;
}

interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

const DietList: React.FC<DietListProps> = ({ diets, showSelect = true }) => {
  const [selectedDiet, setSelectedDiet] = useState<OptionType | null>(null);

  const options: OptionType[] = diets.map((diet) => ({
    value: diet.id,
    label: FrontEndUtils.capitalizeText(diet.name),
    icon: FrontEndUtils.getResizedImagePath(
      diet.dietImages[0]?.imageUrl,
      30,
      30
    )
  }));

  const handleDietChange = (value: string) => {
    const selectedOption =
      options.find((option) => option.value === value) || null;
    setSelectedDiet(selectedOption);
  };

  const filteredDiets = selectedDiet
    ? diets.filter((diet) => diet.id === selectedDiet.value)
    : diets;

  return (
    <Container fluid>
      {showSelect && (
        <Row className='justify-content-center mb-4'>
          <Col xs={12} md={6} lg={4} xl={3}>
            <FoodceptionSelect
              options={options}
              onChange={handleDietChange}
              placeholder='Select a diet...'
            />
          </Col>
        </Row>
      )}
      <Row className='justify-content-center'>
        {filteredDiets.map((diet: any) => {
          const dietImage = diet.dietImages[0];
          const dietLink = `/diets/${FrontEndUtils.slugify(
            diet.name
          )}/${diet.id}`;

          return (
            <FoodceptionCard
              key={diet.id}
              title={diet.name}
              description={diet.description}
              url={dietLink}
              urlTitle='View Recipes'
              imageUrl={dietImage.imageUrl}
            />
          );
        })}
      </Row>
    </Container>
  );
};

export default DietList;
