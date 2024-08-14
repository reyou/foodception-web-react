import { useEffect, useState } from 'react';
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
      initialCheckedState[group.id] = group.ingredients.map(() => false);
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
    <div className='container'>
      <div className='row'>
        {ingredientGroups.map((group) => {
          const isGroupChecked = checkedIngredients[group.id]?.every(
            (checked) => checked
          );

          return (
            <div className='col-md-3' key={group.id}>
              <div className='p-2 h-100'>
                <h3>{group.title}</h3>
                <div className='form-check mb-2'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id={`groupCheckAll-${group.id}`}
                    checked={isGroupChecked || false}
                    onChange={(e) =>
                      handleGroupCheckAllChange(group.id, e.target.checked)
                    }
                  />
                  <label
                    className='form-check-label'
                    htmlFor={`groupCheckAll-${group.id}`}
                  >
                    [Check All]
                  </label>
                </div>
                <Ingredients
                  ingredients={group.ingredients}
                  checkedIngredients={checkedIngredients[group.id] || []}
                  onCheckboxChange={(ingredientIndex: number) =>
                    handleCheckboxChange(group.id, ingredientIndex)
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IngredientGroups;
