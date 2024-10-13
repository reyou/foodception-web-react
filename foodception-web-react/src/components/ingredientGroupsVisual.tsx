import { useEffect, useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import IngredientsVisual from './ingredientsVisual';

interface IngredientGroupsVisualProps {
  ingredientGroups: any[];
}

const IngredientGroupsVisual: React.FC<IngredientGroupsVisualProps> = ({
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
    <Container>
      <Row>
        {ingredientGroups.map((group) => {
          const isGroupChecked = checkedIngredients[group.id]?.every(
            (checked) => checked
          );

          return (
            <Col
              md={12}
              key={group.id}
              data-guid='20916bd6-a969-4025-a38e-15d4291c9c1a'
              className='mb-3'
            >
              <div className='p-2 h-100'>
                <h3>{group.title}</h3>

                {/* Group Checkbox */}
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
                    Have All
                  </Form.Check.Label>
                </Form.Check>

                {/* Render IngredientsVisual if the group exists in checkedIngredients */}
                {Object.hasOwn(checkedIngredients, group.id) && (
                  <IngredientsVisual
                    recipeIngredients={group.recipeIngredients}
                    checkedIngredients={checkedIngredients[group.id]}
                    onCheckboxChange={(ingredientIndex: number) =>
                      handleCheckboxChange(group.id, ingredientIndex)
                    }
                  />
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default IngredientGroupsVisual;
