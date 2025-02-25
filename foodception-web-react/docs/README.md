# Foodception Web React Documentation

A modern React application for managing and discovering recipes, built with TypeScript and React 18. This application serves as the core business logic layer for web.foodception.com, integrated within the Wix-based www.foodception.com platform.

## System Architecture

- [System Integration](./architecture/system-integration.md) - Details about how the React app integrates with Wix and backend services
- [Deployment Architecture](./deployment/github-pages.md) - Information about GitHub Pages deployment and configuration

## Development

- [Getting Started](./guides/getting-started.md) - Setup and development guide
- [Code Style and Conventions](./conventions/naming-conventions.md) - Coding standards and naming conventions
- [Development Guides](./guides/README.md) - Best practices and guidelines

## Integration

The application is designed to work within a Wix website:
- Embedded via iframe in www.foodception.com
- Handles core business logic and API interactions
- Communicates with parent window via postMessage
- Manages authentication state with Wix platform

## Deployment

The application is deployed to:
- Production: https://web.foodception.com
- Development: https://reyou.github.io/foodception-web-react
- CI/CD: https://github.com/reyou/foodception-web-react/actions

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
└── utils/         # Utility functions including parent window communication
```

## Key Features

- 🔐 User Authentication (integrated with Wix)
- 📱 Responsive Design
- 🔄 Parent-Child Window Communication
- 📊 API Integration
- 🎨 Component Library
- 🧪 Comprehensive Testing

## Learn More

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Window.postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
