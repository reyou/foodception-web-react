// Button.stories.tsx
// docs: https://react-bootstrap.netlify.app/docs/components/buttons
import { Button } from 'react-bootstrap';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Components/Links',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['link']
    },
    className: {
      control: 'text'
    }
  },

  args: {
    className: 'link-dark',
    variant: 'link'
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'link',
    className:
      'link-dark link-underline link-underline-opacity-0 link-underline-opacity-100-hover',
    children: 'This is a dark href link',
    href: '#'
  }
};

export const Underlined: Story = {
  args: {
    variant: 'link',

    children: 'This is a dark href link',
    href: '#'
  }
};
