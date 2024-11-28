// Button.stories.tsx
// docs: https://react-bootstrap.netlify.app/docs/components/buttons
import { Button } from 'react-bootstrap';
import type { Meta, StoryObj } from '@storybook/react';

// Custom component for the <a> tag
const LinkButton = ({
  className,
  href,
  target,
  rel,
  children
}: {
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  children?: React.ReactNode;
}) => (
  <a className={className} href={href} target={target} rel={rel}>
    {children}
  </a>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Links/Link',
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

// New story for the <a> tag
export const YouTubeLink: StoryObj = {
  render: (args) => <LinkButton {...args}>YouTube</LinkButton>,
  argTypes: {
    href: {
      control: 'text',
      defaultValue: 'https://www.youtube.com/results?search_query=recipe',
      description: 'URL for the link'
    },
    className: {
      control: 'text',
      defaultValue:
        'link-dark link-underline link-underline-opacity-0 link-underline-opacity-100-hover',
      description: 'CSS classes for styling'
    },
    target: {
      control: 'text',
      defaultValue: '_blank',
      description: 'Specifies where to open the link'
    },
    rel: {
      control: 'text',
      defaultValue: 'noopener noreferrer',
      description: 'Specifies relationship with the linked page'
    }
  },
  args: {
    href: 'https://www.youtube.com/results?search_query=recipe',
    className: 'link-button',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'YouTube'
  }
};
