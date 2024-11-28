import { Meta, StoryObj } from '@storybook/react/*';
import FoodceptionHrefButton from '../../components/links/href_button';

const meta: Meta<typeof FoodceptionHrefButton> = {
  title: 'Components/Buttons/FoodceptionHrefButton',
  component: FoodceptionHrefButton,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content of the button'
    },
    url: {
      control: 'text',
      description: 'URL for the button'
    }
  }
};

export default meta;

type Story = StoryObj<typeof FoodceptionHrefButton>;

export const Default: Story = {
  args: {
    children: 'See Recipes',
    url: 'https://www.foodception.com/recipes'
  }
};
