# Foodception Web React

A modern React application for managing and discovering recipes, built with TypeScript and React 18.

## Features

- 🔐 User Authentication
  - Login
  - Sign Up
  - Forgot Password
  - Password Reset
- 📱 Responsive Design with Bootstrap 5
- 🎯 Type Safety with TypeScript
- 🔄 React Router v6 for Navigation
- 📊 Error Tracking with Sentry
- 🎨 Component Library with Storybook
- 🧪 Testing with Jest and React Testing Library

## Documentation

Detailed documentation can be found in the [docs](./docs) directory:
- [Code Style and Conventions](./docs/conventions/naming-conventions.md)
- [Architecture](./docs/architecture/README.md)
- [Development Guides](./docs/guides/README.md)
- [API Documentation](./docs/api/README.md)

## Tech Stack

- React 18.3
- TypeScript 5.6
- Bootstrap 5.3
- React Router 6.28
- React Bootstrap 2.10
- Sentry for error tracking
- Storybook for component development

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/         # Custom React hooks
├── models/        # Data models and interfaces
├── pages/         # Page components
├── services/      # API and service layer
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.development` to `.env.local`
   - Update the variables as needed

4. Start the development server:
   ```bash
   npm start
   ```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run storybook` - Starts Storybook development server
- `npm run build-storybook` - Builds Storybook for deployment

## Development

- The application uses TypeScript for type safety
- Components are built using React Bootstrap
- Routing is handled by React Router v6
- State management uses React Context and hooks
- Error tracking is implemented using Sentry

## Testing

Tests are written using Jest and React Testing Library. Run the test suite with:

```bash
npm test
```

## Deployment

Deployment is handled through GitHub Actions:
- https://github.com/reyou/foodception-web-react/actions

The application is deployed to:
- Production: https://web.foodception.com
- Development: https://reyou.github.io/foodception-web-react

## Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Bootstrap Documentation](https://react-bootstrap.github.io/)
- [Create React App Documentation](https://facebook.github.io/create-react-app/docs/getting-started)