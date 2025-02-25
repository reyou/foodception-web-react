# Naming Conventions

This document outlines the naming conventions used throughout the Foodception Web React project.

## File Naming

### Components
- Use PascalCase for component files
- Add `.component.tsx` suffix for reusable components
- Examples:
  ```
  Button.component.tsx
  UserProfile.component.tsx
  ```

### Pages
- Use camelCase for page files
- Add `.page.tsx` suffix for page components
- Examples:
  ```
  home.page.tsx
  userProfile.page.tsx
  ```

### Services
- Use camelCase for service files
- Add `.service.ts` suffix
- Examples:
  ```
  auth.service.ts
  recipe.service.ts
  ```

### Utils
- Use camelCase for utility files
- Add `.utils.ts` suffix
- Examples:
  ```
  string.utils.ts
  date.utils.ts
  ```

### Tests
- Match the name of the file being tested
- Add `.test.tsx` or `.test.ts` suffix
- Examples:
  ```
  Button.component.test.tsx
  string.utils.test.ts
  ```

## Component Naming

### Component Names
- Use PascalCase for component names
- Be descriptive and clear about the component's purpose
- Examples:
  ```typescript
  export const UserProfileCard: React.FC = () => { ... }
  export const RecipeList: React.FC<RecipeListProps> = () => { ... }
  ```

### Props Interface Names
- Add 'Props' suffix to component name
- Use PascalCase
- Examples:
  ```typescript
  interface ButtonProps { ... }
  interface UserProfileCardProps { ... }
  ```

### Context Names
- Add 'Context' suffix
- Use PascalCase
- Examples:
  ```typescript
  const AuthContext = React.createContext<AuthContextType | null>(null);
  const ThemeContext = React.createContext<ThemeContextType | null>(null);
  ```

## CSS/SCSS

### CSS Classes
- Use kebab-case for class names
- Use BEM naming convention when applicable
- Examples:
  ```css
  .user-profile { ... }
  .recipe-card__title { ... }
  .button--primary { ... }
  ```

### CSS Modules
- Use camelCase for imported class names
- Examples:
  ```typescript
  import styles from './Button.module.css';
  <div className={styles.buttonContainer}>
  ```

## TypeScript Types/Interfaces

### Types
- Use PascalCase
- Be descriptive about what the type represents
- Examples:
  ```typescript
  type User = { ... }
  type RecipeResponse = { ... }
  ```

### Interfaces
- Use PascalCase
- Start with 'I' prefix for interfaces (optional but consistent)
- Examples:
  ```typescript
  interface IUser { ... }
  interface IRecipeService { ... }
  ```

### Enums
- Use PascalCase
- Be descriptive
- Examples:
  ```typescript
  enum RecipeCategory { ... }
  enum UserRole { ... }
  ```

## Constants
- Use UPPER_SNAKE_CASE for constant values
- Use PascalCase for constant objects/arrays
- Examples:
  ```typescript
  const MAX_ITEMS_PER_PAGE = 10;
  const API_BASE_URL = 'https://api.example.com';
  
  const DefaultTheme = { ... }
  const RecipeCategories = [ ... ]
  ```

## Event Handlers
- Prefix with 'handle'
- Use camelCase
- Be descriptive about what event is being handled
- Examples:
  ```typescript
  const handleClick = () => { ... }
  const handleUserSubmit = () => { ... }
  const handleInputChange = () => { ... }
  ```

## Custom Hooks
- Prefix with 'use'
- Use camelCase
- Be descriptive about the hook's purpose
- Examples:
  ```typescript
  const useAuth = () => { ... }
  const useRecipes = () => { ... }
  const useLocalStorage = () => { ... }
  ```
