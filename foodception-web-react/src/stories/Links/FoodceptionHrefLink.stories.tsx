import { Meta, StoryObj } from '@storybook/react/*';
import FoodceptionHrefLink from '../../components/links/href_link';

const meta: Meta<typeof FoodceptionHrefLink> = {
  title: 'Components/Links/FoodceptionHrefLink',
  component: FoodceptionHrefLink,
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content of the link'
    },
    url: {
      control: 'text',
      description: 'URL for the link'
    }
  }
};

export default meta;

type Story = StoryObj<typeof FoodceptionHrefLink>;

export const Primary: Story = {
  args: {
    children: 'This is a dark href link',
    url: '#'
  }
};
