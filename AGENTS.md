# AGENTS.md - Vinyasa Construction

## Project Overview

This is a React 19 web application built with Create React App (CRA). It displays a portfolio website for a construction company with project listings and contact information.

## Build, Lint, and Test Commands

### Development
```bash
npm start          # Start development server at http://localhost:3000
```

### Building
```bash
npm run build      # Build for production (outputs to /build folder)
```

### Testing
```bash
npm test                    # Run tests in interactive watch mode
npm test -- --watchAll=false # Run all tests once (CI mode)
npm test -- App.test.js     # Run a single test file
npm test -- --testPathPattern=App # Run tests matching pattern
```

### Linting
This project uses Create React App's built-in ESLint configuration (`react-app`). Lint errors appear in the console during development. There is no separate lint script; use the development server to check for lint errors.

### Eject (Not Recommended)
```bash
npm run eject     # One-way operation to customize build configuration
```

## Code Style Guidelines

### General Conventions
- Use functional components with React hooks (useState, useEffect, useRef)
- Use modern JavaScript (ES6+) features including arrow functions, destructuring, and async/await
- Keep components focused and modular

### Component Structure
```javascript
// 1. React imports (named imports first)
import React, { useEffect, useRef, useState } from "react";

// 2. Asset/style imports
import logo from "./assets/store/logo.png";
import "./App.css";

// 3. Component definition
function ComponentName() {
  // 4. Hooks first
  const [state, setState] = useState(initialValue);
  const ref = useRef(null);

  // 5. Effects
  useEffect(() => {
    // effect logic
    return () => cleanup();
  }, [dependencies]);

  // 6. Render
  return (
    <div>...</div>
  );
}

export default ComponentName;
```

### Naming Conventions
- **Components**: PascalCase (e.g., `App`, `ProjectCard`)
- **Functions/Variables**: camelCase (e.g., `handleClick`, `visibleCount`)
- **Files**: PascalCase for components (e.g., `App.js`), lowercase for utilities
- **CSS Classes**: kebab-case (e.g., `.project-card`, `.navbar`)
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase otherwise

### JSX/HTML Attributes
- Use `className` instead of `class`
- Use `htmlFor` instead of `for` on labels
- Use camelCase for all HTML attributes (e.g., `tabIndex`, `onClick`)
- Self-closing tags must have closing slash: `<Component />`

### React Best Practices
- Always provide dependency arrays for useEffect hooks
- Use `useCallback` for callback functions passed to child components when needed
- Use `useMemo` for expensive calculations
- Prefer composition over inheritance
- Keep state as local as possible

### Error Handling
- Use try/catch with async/await for async operations
- Always include cleanup functions in useEffect to prevent memory leaks
- Handle null/undefined states explicitly

### Imports
- Named imports first, then default imports
- Group imports: React → external libraries → internal components/utilities → styles/assets
- Use absolute imports from `src` when available

### CSS Guidelines
- Use CSS modules or separate CSS files per component
- Prefer BEM-like naming: `.block__element--modifier`
- Use CSS custom properties (variables) for theming
- Keep styles co-located with components when possible

### Testing
- Use `@testing-library/react` for component testing
- Use `@testing-library/jest-dom` for DOM assertions
- Test behavior, not implementation details
- Use descriptive test names: `test('renders project title', () => {...})`

### Accessibility
- Use semantic HTML elements (nav, section, article, etc.)
- Include alt text for images
- Use aria-* attributes when necessary
- Ensure keyboard navigation works

### File Organization
```
src/
├── components/       # Reusable React components
├── pages/           # Page-level components
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── assets/          # Images, fonts, etc.
├── styles/          # Global styles
└── App.js           # Main app component
```

## Technology Stack

- **React**: 19.2.4
- **React DOM**: 19.2.4
- **React Scripts**: 5.0.1 (Create React App)
- **Testing Library**: @testing-library/react 16.3.2
- **Build Tool**: Webpack (via react-scripts)

## Notes

- This is a JavaScript project (not TypeScript)
- The project uses the React 19 new JSX transform (automatic runtime)
- No additional linting tools are configured beyond CRA defaults
- No TypeScript or Prettier configuration exists
