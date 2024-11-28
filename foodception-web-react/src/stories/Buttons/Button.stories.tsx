// Button.stories.tsx
// docs: https://react-bootstrap.netlify.app/docs/components/buttons
import { Button } from 'react-bootstrap';
import type { Meta, StoryObj } from '@storybook/react';

// Meta for solid and outline buttons with block-level option
const meta: Meta<typeof Button> = {
  title: 'Components/Buttons/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'dark',
        'link',
        'outline-primary',
        'outline-secondary',
        'outline-success',
        'outline-warning',
        'outline-danger',
        'outline-info',
        'outline-light',
        'outline-dark'
      ]
    },
    size: {
      control: 'select',
      options: ['lg', 'sm', 'md'] // Size options for buttons
    },
    as: {
      control: 'select', // Allow rendering the button as different HTML elements
      options: ['button', 'a', 'input']
    },
    type: {
      control: 'select', // Control the 'type' attribute for buttons and input types
      options: ['button', 'submit', 'reset']
    },
    href: {
      control: 'text', // Control for 'href' when 'as' is 'a' (anchor tag)
      if: { arg: 'as', eq: 'a' } // Only show href control when 'as' is 'a'
    },
    value: {
      control: 'text', // Control for 'value' attribute when 'as' is 'input'
      if: { arg: 'as', eq: 'input' } // Only show 'value' when 'as' is 'input'
    },
    block: {
      control: 'boolean', // Control to toggle block-level button
      defaultValue: false, // Default is not block-level
      description: 'Display button as a block-level element using d-grid.'
    }
  }
};

export default meta;

type Story = StoryObj<typeof Button>;

// Utility function to wrap the button in a block-level container if needed
const BlockWrapper = (args: any) => {
  if (args.block) {
    return (
      <div className='d-grid gap-2'>
        <Button {...args}>{args.children}</Button>
      </div>
    );
  }
  return <Button {...args}>{args.children}</Button>;
};

// Stories for Button variants with block-level option

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    as: 'button',
    block: false // Default to not block-level
  },
  render: BlockWrapper
};
