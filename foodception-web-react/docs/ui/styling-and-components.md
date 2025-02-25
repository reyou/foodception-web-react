# UI Development Guide

## React Bootstrap Integration

We use React Bootstrap as our primary UI framework, which provides:
- Pre-built React components
- Responsive design utilities
- Bootstrap 5 styling
- Accessibility features

### Setup

```typescript
// Already included in package.json
{
  "dependencies": {
    "bootstrap": "^5.3.3",
    "react-bootstrap": "^2.10.5"
  }
}
```

### Usage

```typescript
import { Container, Row, Col, Button } from 'react-bootstrap';

const MyComponent: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary">Click Me</Button>
        </Col>
      </Row>
    </Container>
  );
};
```

### Responsive Design

Use React Bootstrap's responsive utilities:
```typescript
<Col xs={12} md={6} lg={4}>
  {/* Content will be full width on mobile, half on tablet, third on desktop */}
</Col>
```

### Custom Styling

1. **Component-specific styles**:
```typescript
import { Button } from 'react-bootstrap';
import styles from './MyComponent.module.css';

<Button className={styles.customButton}>
```

2. **Global styles**:
```css
/* src/css/custom.css */
.btn-primary {
  /* Custom primary button styles */
}
```

## Storybook Integration

We use Storybook for:
- Component development in isolation
- Visual testing
- Component documentation
- Interactive examples

### Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for deployment
npm run build-storybook
```

### Story Structure

```typescript
// src/stories/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};
```

### Best Practices

1. **Component Organization**:
```
src/
  components/
    Button/
      Button.component.tsx
      Button.module.css
      Button.stories.tsx
      Button.test.tsx
```

2. **Story Categories**:
- Components/
  - Basic/
  - Forms/
  - Layout/
  - Navigation/

3. **Documentation**:
```typescript
// Button.stories.tsx
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary button component with various states and sizes.',
      },
    },
  },
};
```

### Testing with Storybook

1. **Visual Testing**:
```typescript
// Button.stories.tsx
export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await userEvent.click(button);
  },
};
```

2. **Accessibility Testing**:
```typescript
export default {
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};
```

## Component Development Workflow

1. **Create Component**:
   - Create component file
   - Add React Bootstrap components
   - Add custom styling if needed

2. **Create Story**:
   - Create .stories.tsx file
   - Add different variants
   - Document props and usage

3. **Test in Storybook**:
   - Test responsiveness
   - Test interactions
   - Verify accessibility

4. **Integration**:
   - Import into application
   - Test in context
   - Verify responsive behavior

## Style Guide

### Bootstrap Theme Customization

```scss
// src/css/custom.scss
$theme-colors: (
  "primary": #007bff,
  "secondary": #6c757d,
  // ... custom colors
);

@import "~bootstrap/scss/bootstrap";
```

### CSS Modules

```typescript
// Component.module.css
.customStyle {
  /* Component-specific styles */
}

// Component.tsx
import styles from './Component.module.css';

<div className={styles.customStyle}>
```

### Responsive Breakpoints

Follow Bootstrap's breakpoint system:
```scss
// xs: 0
// sm: 576px
// md: 768px
// lg: 992px
// xl: 1200px
// xxl: 1400px
```

## Common Components

Document commonly used components and their standard implementations:

### Layout Components
```typescript
import { Container, Row, Col } from 'react-bootstrap';

const PageLayout: React.FC = () => (
  <Container>
    <Row>
      <Col>Content</Col>
    </Row>
  </Container>
);
```

### Form Components
```typescript
import { Form, Button } from 'react-bootstrap';

const LoginForm: React.FC = () => (
  <Form>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" />
    </Form.Group>
    <Button type="submit">Submit</Button>
  </Form>
);
```
