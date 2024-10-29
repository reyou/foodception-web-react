import type { Meta, StoryObj } from '@storybook/react';
import FoodceptionSelect from '../components/core/foodception_select';

const meta: Meta<typeof FoodceptionSelect> = {
  component: FoodceptionSelect,
  title: 'Components/Select'
};

export default meta;

type Story = StoryObj<typeof FoodceptionSelect>;

export const Empty: Story = {
  args: {
    options: [],
    onChange: (value: string) => console.log(value)
  }
};

export const Default: Story = {
  args: {
    options: [
      { value: 'chocolate', label: 'Chocolate' },
      { value: 'strawberry', label: 'Strawberry' },
      { value: 'vanilla', label: 'Vanilla' }
    ],
    onChange: (value: string) => console.log(value)
  }
};

export const WithIcons: Story = {
  args: {
    options: [
      { value: 'chocolate', label: 'Chocolate', icon: '/icons/chocolate.png' },
      {
        value: 'strawberry',
        label: 'Strawberry',
        icon: '/icons/strawberry.png'
      },
      { value: 'vanilla', label: 'Vanilla', icon: '/icons/vanilla.png' }
    ],
    onChange: (value: string) => console.log(value)
  }
};
