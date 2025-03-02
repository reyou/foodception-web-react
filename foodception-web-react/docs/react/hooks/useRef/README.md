# useRef Hook in React

`useRef` is a React Hook that provides a way to persist values between renders without causing re-renders when the value changes.

## Key Features

1. **Persists Between Renders**: Unlike state variables, changing a ref value doesn't trigger a re-render
2. **Mutable**: The `.current` property can be modified directly
3. **Synchronous Access**: Can be read/written immediately

## Common Use Cases

### 1. Storing Previous Values
```typescript
const prevValue = useRef(initialValue);

useEffect(() => {
    prevValue.current = currentValue;
}, [currentValue]);
```

### 2. DOM Element References
```typescript
const inputRef = useRef<HTMLInputElement>(null);

// Later in JSX
<input ref={inputRef} />

// Access the DOM element
inputRef.current?.focus();
```

### 3. Avoiding Unnecessary Re-renders
Example from our AuthenticatedView component:
```typescript
const hasCheckedAuth = useRef(false);

useEffect(() => {
    if (!hasCheckedAuth.current) {
        hasCheckedAuth.current = true;
        checkAuth();
    }
}, [checkAuth]);
```

### 4. Instance Variables
```typescript
const intervalId = useRef<number>();

useEffect(() => {
    intervalId.current = setInterval(() => {
        // Do something
    }, 1000);

    return () => clearInterval(intervalId.current);
}, []);
```

## Best Practices

1. **Don't Overuse**: Use state for values that should trigger re-renders
2. **TypeScript Usage**: Always specify the type parameter
   ```typescript
   const myRef = useRef<string | null>(null);
   ```
3. **Initialization**: Initialize with a meaningful value when possible
4. **Cleanup**: Clear refs in cleanup functions if they hold resources

## When Not to Use useRef

### 1. Reactive Values (Use useState Instead)
Reactive values are values that should trigger UI updates when they change. Here's the key difference:

```typescript
// With useRef - UI won't update when value changes
const countRef = useRef(0);
const incrementRef = () => {
    countRef.current += 1;
    // 🚫 Component won't re-render, UI won't show new value
    console.log(countRef.current); // Value changes but UI doesn't update
};

// With useState - UI updates automatically
const [count, setCount] = useState(0);
const increment = () => {
    setCount(prev => prev + 1);
    // ✅ Component re-renders, UI shows new value
};
```

Example from our login form:
```typescript
// Good: Using useState because we want UI to update
const [error, setError] = useState<string | null>(null);
const handleSubmit = async () => {
    try {
        await login(email, password);
    } catch (err) {
        setError('Invalid credentials'); // UI updates to show error
    }
};

// Bad: Using useRef would hide the error from users
const errorRef = useRef<string | null>(null);
const handleSubmit = async () => {
    try {
        await login(email, password);
    } catch (err) {
        errorRef.current = 'Invalid credentials'; // 🚫 UI won't show error
    }
};
```

Choose `useState` when:
- The value needs to be displayed in the UI
- Changes to the value should trigger re-renders
- Other components or effects need to react to the value changing

Choose `useRef` when:
- The value is only needed for internal logic
- Changes shouldn't trigger re-renders
- You need to access/modify the value in event handlers or effects

### 2. For values that should trigger UI updates
See explanation above about reactive values.

### 3. For derived data that can be calculated from props or state
Use regular variables or memoization instead:

```typescript
// 🚫 Don't use useRef for derived data
const fullNameRef = useRef(`${firstName} ${lastName}`);
useEffect(() => {
    fullNameRef.current = `${firstName} ${lastName}`;
}, [firstName, lastName]);

// ✅ Use regular variable or useMemo
const fullName = `${firstName} ${lastName}`;
// or
const fullName = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName]);
```

## Real-World Example

Here's how we use it in our authentication flow to prevent infinite loops:

```typescript
function AuthenticatedView({ authenticatedView, unauthenticatedView }: Props) {
    const hasCheckedAuth = useRef(false);
    const { checkAuth } = useAuth();

    useEffect(() => {
        if (!hasCheckedAuth.current) {
            hasCheckedAuth.current = true;
            checkAuth();
        }
    }, [checkAuth]);

    // Rest of the component...
}
```

This pattern ensures we only check authentication once when the component mounts, regardless of how many times it re-renders.
