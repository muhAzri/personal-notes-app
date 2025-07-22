# Personal Notes App

A modern, feature-rich personal notes application built with React, TypeScript, and Vite. The application follows clean architecture principles with proper modularization and supports multiple languages and themes.

## Features

- ✅ **User Authentication** - Login and registration with JWT tokens
- ✅ **Notes Management** - Create, read, update, delete, and archive notes
- ✅ **Multi-language Support** - Indonesian and English localization
- ✅ **Dark/Light Theme** - Toggle between themes with persistence
- ✅ **Responsive Design** - Optimized for mobile and desktop
- ✅ **Search Functionality** - Find notes quickly
- ✅ **Statistics Dashboard** - Track your note-taking habits
- ✅ **Modern UI** - Built with Shadcn/ui components

## Architecture

This application follows **Clean Architecture** principles with proper separation of concerns:

```
src/
├── core/                    # Shared business logic and components
│   ├── application/         # Use cases, hooks, and localization
│   ├── components/          # Shared UI components
│   └── domain/             # Entities and repository interfaces
├── features/               # Feature-specific modules
│   ├── auth/              # Authentication feature
│   └── notes/             # Notes management feature
├── infrastructure/        # External concerns
│   ├── api/              # HTTP client
│   ├── di/               # Dependency injection
│   ├── repositories/     # Repository implementations
│   └── store/            # Redux state management
└── lib/                  # Utility functions
```

### Key Architectural Benefits:
- **Modular Design** - Each feature is self-contained
- **Dependency Inversion** - Core business logic doesn't depend on external frameworks
- **Testability** - Clean separation makes testing easier
- **Maintainability** - Well-organized code structure

## Tech Stack

### Frontend
- **React 18** - UI library with hooks and functional components
- **TypeScript** - Type-safe JavaScript with strict typing
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management with modern Redux
- **Shadcn/ui** - Modern, accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Modern icon library

### Development Tools
- **ESLint** - Code linting with strict TypeScript rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd personal-notes-app-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables as needed.

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at [http://localhost:5173](http://localhost:5173)

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Code Quality
```bash
npm run lint         # Run ESLint to check code quality
npm run lint:fix     # Automatically fix linting issues
npm run type-check   # Run TypeScript compiler checks
```

### Testing
```bash
npm run test         # Run unit tests
npm run test:coverage # Run tests with coverage report
```

## Project Structure

### Core Module (`src/core/`)
Contains shared business logic and components used across features.

- **`application/`** - Business logic, use cases, and application services
- **`components/`** - Reusable UI components
- **`domain/`** - Core entities and repository interfaces

### Features Module (`src/features/`)
Feature-specific code organized by business domain.

- **`auth/`** - Authentication (login, register, logout)
- **`notes/`** - Notes management (CRUD operations, archiving)

### Infrastructure Module (`src/infrastructure/`)
External concerns and technical implementations.

- **`api/`** - HTTP client configuration
- **`repositories/`** - Repository pattern implementations
- **`store/`** - Redux state management
- **`di/`** - Dependency injection container

## Key Features Explained

### Authentication System
- JWT-based authentication with automatic token refresh
- Protected routes with authentication guards
- User session persistence

### Notes Management
- Full CRUD operations for notes
- Note archiving and restoration
- Search and filtering capabilities
- Statistics and analytics

### Internationalization (i18n)
- Support for multiple languages (ID/EN)
- Dynamic language switching
- Persistent language preference

### Theme System
- Dark and light theme support
- System preference detection
- Theme persistence across sessions

### State Management
- Redux Toolkit for predictable state updates
- Feature-based state organization
- Async thunks for API operations

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing naming conventions
- Add proper return types to functions
- Use proper error handling patterns

### Component Guidelines
- Use functional components with hooks
- Implement proper prop types
- Follow the component composition pattern
- Use Shadcn/ui components when possible

### Architecture Principles
- Keep business logic in the core module
- Use dependency injection for external dependencies
- Implement repository pattern for data access
- Follow clean architecture boundaries

## Environment Variables

Create a `.env.local` file with the following variables:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_TITLE=Personal Notes App
```

## Build and Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment
The application can be deployed to any static hosting service:

- **Vercel** - Zero configuration deployment
- **Netlify** - Continuous deployment from Git
- **GitHub Pages** - Free hosting for public repositories
- **AWS S3 + CloudFront** - Scalable cloud hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding guidelines
4. Run tests and linting (`npm run lint && npm run type-check`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework