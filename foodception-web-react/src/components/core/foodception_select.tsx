import Select, { components } from 'react-select';

interface OptionType {
  value: string;
  label: string;
  icon?: string;
}

interface FoodceptionSelectProps {
  options: OptionType[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomOption = (props: any) => (
  <components.Option {...props}>
    {props.data.icon && (
      <img
        src={props.data.icon}
        alt={props.data.label}
        style={{ width: 20, height: 20, marginRight: 8 }}
      />
    )}
    {props.data.label}
  </components.Option>
);

const FoodceptionSelect: React.FC<FoodceptionSelectProps> = ({
  options,
  onChange,
  placeholder = 'Select an option...'
}) => {
  const handleChange = (selectedOption: any) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange('');
    }
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable
      components={{ Option: CustomOption }}
    />
  );
};

export default FoodceptionSelect;
