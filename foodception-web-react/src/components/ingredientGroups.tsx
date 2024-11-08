import { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import Ingredients from './ingredients';

interface IngredientGroupsProps {
  ingredientGroups: any[];
}

const IngredientGroups: React.FC<IngredientGroupsProps> = ({
  ingredientGroups
}) => {
  const [checkedIngredients, setCheckedIngredients] = useState<{
    [key: string]: boolean[];
  }>({});

  useEffect(() => {
    const initialCheckedState: { [key: string]: boolean[] } = {};
    ingredientGroups.forEach((group) => {
      initialCheckedState[group.id] = group.recipeIngredients.map(() => false);
    });
    setCheckedIngredients(initialCheckedState);
  }, [ingredientGroups]);

  // Handle checking/unchecking all items in a group
  const handleGroupCheckAllChange = (groupId: string, checked: boolean) => {
    setCheckedIngredients((prevState) => {
      const updatedGroup = prevState[groupId].map(() => checked);
      return {
        ...prevState,
        [groupId]: updatedGroup
      };
    });
  };

  // Handle checking/unchecking individual items
  const handleCheckboxChange = (groupId: number, ingredientIndex: number) => {
    setCheckedIngredients((prevState) => {
      const updatedGroup = prevState[groupId].map((checked, i) =>
        i === ingredientIndex ? !checked : checked
      );
      return {
        ...prevState,
        [groupId]: updatedGroup
      };
    });
  };

  return (
    <Container
      data-guid='3d186150-0d46-4c79-906e-45e347984b66'
      className='mt-4'
    >
      <Row className='gy-4'>
        {ingredientGroups.map((group) => {
          const isGroupChecked = checkedIngredients[group.id]?.every(
            (checked) => checked
          );

          return (
            <Col md={3} key={group.id}>
              <div className='p-2 h-100'>
                <h3>{group.title}</h3>
                <Form.Check className='mb-2'>
                  <Form.Check.Input
                    type='checkbox'
                    id={`groupCheckAll-${group.id}`}
                    checked={isGroupChecked || false}
                    onChange={(e) =>
                      handleGroupCheckAllChange(group.id, e.target.checked)
                    }
                  />
                  <Form.Check.Label htmlFor={`groupCheckAll-${group.id}`}>
                    <i>Have All</i>
                  </Form.Check.Label>
                </Form.Check>
                <Ingredients
                  recipeIngredients={group.recipeIngredients}
                  checkedIngredients={checkedIngredients[group.id] || []}
                  onCheckboxChange={(ingredientIndex: number) =>
                    handleCheckboxChange(group.id, ingredientIndex)
                  }
                />
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default IngredientGroups;
