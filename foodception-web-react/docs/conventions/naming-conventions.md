# Naming Conventions

This document outlines the naming conventions used in the Foodception Web React project. While most conventions follow industry standards, some are project-specific choices made for consistency and clarity.

## Industry Standard Conventions

### Components
- Use PascalCase for component names (industry standard)
- Components must be named descriptively
- Examples:
  ```typescript
  export const UserProfile: React.FC = () => { ... }
  export const Button: React.FC<ButtonProps> = () => { ... }
  ```

### Hooks
- Prefix with 'use' (React requirement)
- Use camelCase
- Examples:
  ```typescript
  const useAuth = () => { ... }
  const useLocalStorage = () => { ... }
  ```

### Event Handlers
- Prefix with 'handle'
- Use camelCase
- Be descriptive about what event is being handled
- Examples:
  ```typescript
  const handleClick = () => { ... }
  const handleSubmit = () => { ... }
  ```

### Constants
- Use UPPER_SNAKE_CASE for primitive constants
- Use PascalCase for constant objects/arrays
- Examples:
  ```typescript
  const MAX_ITEMS = 10;
  const API_URL = 'https://api.example.com';
  
  const DefaultTheme = { ... }
  const Routes = [ ... ]
  ```

### CSS/SCSS
- Use kebab-case for class names
- Follow BEM methodology where applicable
- Examples:
  ```css
  .user-profile { ... }
  .button--primary { ... }
  .card__title { ... }
  ```

## Project-Specific Conventions

### File Naming
Our project uses specific suffixes for better organization and clarity:

```typescript
// Components
Button.component.tsx       // Our convention
Button.tsx                // Common alternative

// Pages
home.page.tsx            // Our convention
Home.tsx                 // Common alternative

// Services
auth.service.ts          // Our convention
authService.ts           // Common alternative
```

### TypeScript Interfaces
We use the 'I' prefix convention, though both styles are common in the industry:

```typescript
// Our convention
interface IUser { ... }
interface IAuthService { ... }

// Also common in industry
interface User { ... }
interface AuthService { ... }
```

### File Organization
We organize by type (components, services, etc.), though organizing by feature is also common:

```
// Our structure
src/
  components/
  services/
  pages/

// Feature-based alternative
src/
  auth/
    components/
    services/
  users/
    components/
    services/
```

## CSS Modules
When using CSS Modules, we use camelCase for imported class names:

```typescript
import styles from './Button.module.css';
<div className={styles.buttonContainer}>
```

## Testing Files
Test files should match their implementation file names:

```typescript
Button.component.tsx
Button.component.test.tsx

auth.service.ts
auth.service.test.ts
```

## Notes
- These conventions are enforced to maintain consistency across the project
- Some conventions are project-specific choices and may differ from other React projects
- ESLint and TypeScript configurations help enforce these conventions
- New team members should follow these conventions for consistency
