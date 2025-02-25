# Component Library

## Overview

Our component library is built using React Bootstrap and documented with Storybook. This combination provides:
- Consistent UI components
- Interactive documentation
- Visual testing environment
- Component development in isolation

## Library Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   │   ├── Button.component.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── Button.module.css
│   │   └── Card/
│   ├── layout/
│   │   ├── Header/
│   │   └── Footer/
│   └── forms/
│       ├── Input/
│       └── Select/
└── stories/
    ├── Introduction.stories.mdx
    └── assets/
```

## React Bootstrap Components

### Base Components

We extend React Bootstrap components with our custom styling:

```typescript
import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps extends React.ComponentProps<typeof BootstrapButton> {
  // Additional custom props
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  isLoading,
  children,
  ...props 
}) => (
  <BootstrapButton {...props}>
    {isLoading ? <Spinner /> : children}
  </BootstrapButton>
);
```

### Layout Components

Standard layout components using React Bootstrap's grid system:

```typescript
import { Container, Row, Col } from 'react-bootstrap';

export const PageLayout: React.FC = ({ children }) => (
  <Container fluid>
    <Row>
      <Col>{children}</Col>
    </Row>
  </Container>
);
```

### Form Components

Enhanced form components with validation:

```typescript
import { Form } from 'react-bootstrap';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  ...props
}) => (
  <Form.Group>
    <Form.Label>{label}</Form.Label>
    <Form.Control {...props} isInvalid={!!error} />
    <Form.Control.Feedback type="invalid">
      {error}
    </Form.Control.Feedback>
  </Form.Group>
);
```

## Storybook Integration

### Story Organization

We organize stories by component type:

```typescript
// Button.stories.tsx
export default {
  title: 'Components/Common/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline'],
      control: { type: 'select' }
    }
  }
} as Meta;
```

### Documentation

Each component includes:
- Props documentation
- Usage examples
- Interactive controls
- Accessibility notes

```typescript
// Button.stories.tsx
export default {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Primary button component with loading state support.',
      },
    },
  },
};
```

### Testing Stories

Include interaction tests in stories:

```typescript
export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    
    // Test click interaction
    await userEvent.click(button);
    
    // Test loading state
    await expect(button).not.toHaveAttribute('disabled');
  },
};
```

## Theme Customization

### Bootstrap Theme Override

```scss
// src/styles/theme.scss
$theme-colors: (
  "primary": #007bff,
  "secondary": #6c757d,
  "success": #28a745,
  "info": #17a2b8,
  "warning": #ffc107,
  "danger": #dc3545,
  "light": #f8f9fa,
  "dark": #343a40
);

@import "~bootstrap/scss/bootstrap";
```

### Component-Specific Styles

Use CSS Modules for component-specific styling:

```css
/* Button.module.css */
.button {
  /* Custom styles */
}

.buttonLoading {
  /* Loading state styles */
}
```

## Usage Guidelines

### Component Implementation

1. **Create Component**:
   ```typescript
   export interface ButtonProps {
     // Props definition
   }
   
   export const Button: React.FC<ButtonProps> = (props) => {
     // Implementation
   };
   ```

2. **Add Stories**:
   ```typescript
   export const Default: Story = {
     args: {
       // Default props
     }
   };
   ```

3. **Add Tests**:
   ```typescript
   describe('Button', () => {
     it('renders correctly', () => {
       // Test implementation
     });
   });
   ```

### Best Practices

1. **Component Structure**:
   - Keep components focused and single-purpose
   - Use composition over inheritance
   - Implement proper prop types and documentation

2. **Styling**:
   - Use React Bootstrap utilities when possible
   - Implement custom styles through CSS Modules
   - Follow responsive design patterns

3. **Accessibility**:
   - Include proper ARIA attributes
   - Ensure keyboard navigation
   - Test with screen readers

## Running Storybook

```bash
# Start development server
npm run storybook

# Build static version
npm run build-storybook
```

Access Storybook at `http://localhost:6006` during development.
