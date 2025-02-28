# React Fundamentals

React is a JavaScript library for building user interfaces, particularly single-page applications. Here are the core fundamentals of React:

## Components

Components are the building blocks of React applications. They are:
- **Reusable** pieces of code
- Can be **Class** or **Function** based
- Follow a **unidirectional data flow**

### Function Components (Recommended)
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## Hooks

Hooks are functions that allow you to "hook into" React state and lifecycle features:

- **useState**: Manage component state
- **useEffect**: Handle side effects
- **useContext**: Subscribe to context
- **useRef**: Reference DOM elements
- **useMemo/useCallback**: Performance optimization

Think of Hooks as special functions that let you tap into React's features, similar to plugging devices into power outlets to access electricity. Each Hook serves a specific purpose:

### useState - Managing Data
```jsx
// Real-world example: Shopping cart item count
const [cartItems, setCartItems] = useState(0);

// Real-world example: User login status
const [isLoggedIn, setIsLoggedIn] = useState(false);

// Real-world example: Form input
const [formData, setFormData] = useState({
  email: '',
  password: ''
});
```

### useEffect - Handling Side Effects
```jsx
// Real-world example: Fetching user data when component loads
useEffect(() => {
  async function fetchUserProfile() {
    const response = await fetch('/api/user/profile');
    const data = await response.json();
    setUserData(data);
  }
  fetchUserProfile();
}, []); // Empty array = run once when component mounts

// Real-world example: Update page title based on product name
useEffect(() => {
  document.title = `${productName} - Shop Now`;
  return () => {
    document.title = 'Online Store'; // Cleanup when component unmounts
  };
}, [productName]);

// Real-world example: Save draft while typing
useEffect(() => {
  const saveTimeout = setTimeout(() => {
    saveDraftToServer(postContent);
  }, 1000);
  return () => clearTimeout(saveTimeout);
}, [postContent]);
```

### useContext - Sharing Global Data
```jsx
// Real-world example: Theme switching
const ThemeContext = React.createContext();

// In parent component
function App() {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Dashboard />
    </ThemeContext.Provider>
  );
}

// In any child component
function NavBar() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}
```

### useRef - Persistent Values & DOM Access
```jsx
// Real-world example: Video player controls
function VideoPlayer() {
  const videoRef = useRef(null);
  
  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  return (
    <video ref={videoRef} src="video.mp4" />
  );
}

// Real-world example: Focus input on load
function SearchBar() {
  const inputRef = useRef(null);
  
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return <input ref={inputRef} type="search" />;
}
```

### useMemo & useCallback - Performance Optimization
```jsx
// Real-world example: Expensive calculation in e-commerce
function ProductList({ products, filter }) {
  // Memoize filtered products to prevent recalculation on every render
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.price >= filter.minPrice &&
      product.price <= filter.maxPrice &&
      product.category === filter.category
    );
  }, [products, filter]);

  // Memoize callback for child components
  const handleProductClick = useCallback((productId) => {
    analytics.trackProductView(productId);
    navigateToProduct(productId);
  }, []);

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductCard 
          key={product.id}
          product={product}
          onClick={handleProductClick}
        />
      ))}
    </div>
  );
}
```

### Custom Hooks - Reusable Logic
```jsx
// Real-world example: Window size tracking
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage in components
function ResponsiveLayout() {
  const { width } = useWindowSize();
  return (
    <div>
      {width > 768 ? <DesktopNav /> : <MobileNav />}
    </div>
  );
}
```

## Props

Props are read-only properties passed to components:
- Pass data from parent to child
- Immutable (cannot be modified by component)
- Can be any JavaScript value

## State Management

State represents data that can change over time:
- Managed with `useState` hook in function components
- Updates trigger re-renders
- Should be immutable (never modify directly)

## JSX

JSX is a syntax extension for JavaScript:
- Looks like HTML but compiles to JavaScript
- Can embed expressions using `{}`
- Must return a single root element
- Uses camelCase for attributes

## Virtual DOM

React uses a Virtual DOM for performance:
- Lightweight copy of actual DOM
- Efficiently updates only what's necessary
- Handles DOM manipulation automatically

## Best Practices

1. **Component Organization**
   - One component per file
   - Keep components small and focused
   - Use meaningful names

2. **State Management**
   - Lift state up when needed
   - Use controlled components
   - Keep state minimal

3. **Performance**
   - Use React.memo for pure components
   - Implement useCallback for functions
   - Optimize re-renders with useMemo

4. **Error Handling**
   - Use Error Boundaries
   - Implement proper error states
   - Add fallback UI

## Common Hooks Usage

```jsx
// State
const [count, setCount] = useState(0);

// Effects
useEffect(() => {
  // Run on mount
  return () => {
    // Cleanup on unmount
  };
}, []); // Empty dependency array

// Context
const value = useContext(MyContext);

// Refs
const inputRef = useRef(null);
```

## Routing

React applications typically use React Router for navigation:
- Define routes for different views
- Handle URL parameters
- Support nested routing
- Manage navigation history

## Forms

Forms in React should be:
- Controlled components
- Handle form validation
- Manage form state
- Process form submission

## Testing

React components can be tested using:
- Jest for unit testing
- React Testing Library
- Cypress for E2E testing

## Additional Resources

- [React Official Documentation](https://reactjs.org/docs/getting-started.html)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)
- [Create React App](https://create-react-app.dev/)