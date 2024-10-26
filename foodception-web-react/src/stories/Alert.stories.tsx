import { Alert } from 'react-bootstrap';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alerts',
  component: Alert,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'light',
        'dark'
      ]
    },
    children: {
      control: 'text',
      defaultValue: 'This is a default alert—check it out!'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is a primary alert—check it out!'
  }
};
