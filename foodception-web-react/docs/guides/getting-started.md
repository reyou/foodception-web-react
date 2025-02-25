# Getting Started

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn

## Installation

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

## Development Environment

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
