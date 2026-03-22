---
title: "React Usage Guide"
date: 2026-03-20
description: "A beginner-friendly guide to React: covering setup, components, JSX, props, state, hooks, routing, and more. Written from scratch while learning on the job."
tags:
  - tech-notes
draft: false
hideTOC: false
---

> Notes written while learning React. If you're coming from zero frontend experience like me, this is for you.

---

## Table of Contents

1. [What is React?](#1-what-is-react)
2. [Setting Up Your First Project](#2-setting-up-your-first-project)
3. [Understanding JSX](#3-understanding-jsx)
4. [Components: The Building Blocks](#4-components--the-building-blocks)
5. [Props: Passing Data Between Components](#5-props--passing-data-between-components)
6. [State: Making Things Dynamic](#6-state--making-things-dynamic)
7. [Handling Events](#7-handling-events)
8. [Conditional Rendering](#8-conditional-rendering)
9. [Rendering Lists](#9-rendering-lists)
10. [Forms and User Input](#10-forms-and-user-input)
11. [Hooks: The Full Guide](#11-hooks--the-full-guide)
12. [Sharing Data with Context API](#12-sharing-data-with-context-api)
13. [Routing with React Router](#13-routing-with-react-router)
14. [Component Lifecycle Explained](#14-component-lifecycle-explained)
15. [Best Practices and Common Mistakes](#15-best-practices-and-common-mistakes)

---

## 1. What is React?

React is a **JavaScript library** built by Meta (Facebook) for building user interfaces. It helps user build websites and web apps that update and respond to user interactions without reloading the entire page.

Think of it like this: instead of building one giant HTML page, React lets you break your UI into small, reusable pieces called **components**, like Lego blocks. Build each block separately, then snap them together to create the full page.

### The core idea behind React

React follows one simple principle:

> **UI = f(state)**
> Your UI is just a function of your data (state). When the data changes, React automatically updates only the parts of the page that need to change.

Before React, updating the page meant manually finding HTML elements and changing them, which was very tedious and error-prone. React handles all of that for you.

### What React is NOT

- It's not a full framework (it only handles the UI layer)
- It doesn't come with built-in routing or global state management out of the box
- It's not HTML; it uses something called JSX (more on that below)

---

## 2. Setting Up Your First Project

### What you need first

- **Node.js** (version 18 or higher): download from nodejs.org
- A terminal (Command Prompt, Terminal, or VS Code's built-in terminal)
- A code editor: VS Code is recommended

### Creating a new React project

The easiest way to start is with **Vite**, which is faster and more modern than the older `create-react-app`:

```bash
npm create vite@latest my-app -- --template react-ts
```

This creates a project called `my-app` using React with TypeScript. Then:

```bash
cd my-app         # go into the project folder
npm install       # install all the dependencies
npm run dev       # start the development server
```

Open your browser to `http://localhost:5173` and you'll see your app running.

### What each file does

When you open the project, you'll see this structure:

```
my-app/
|--  public/              # Static files (images, fonts): just put stuff here
|--  src/
|   |--  assets/          # Images and other assets used in your code
|   |--  App.tsx          # The root component: your app starts here
|   |--  App.css          # Styles for App
|   |--  main.tsx         # The actual entry point: mounts App into the HTML
|   |--  index.css        # Global styles
|--  index.html           # The one HTML file: React fills this in
|--  package.json         # Lists your project's dependencies
|--  vite.config.ts       # Vite configuration
```

### How the app actually starts

Open `main.tsx`. It looks like this:

```tsx
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

What this does:
1. Finds the `<div id="root">` in your `index.html`
2. Takes your `App` component
3. Renders it inside that div

Everything you see on screen comes from `App.tsx` and the components it includes.

---

## 3. Understanding JSX

JSX stands for **JavaScript XML**. It lets you write HTML-looking code inside JavaScript files. This is what makes React feel familiar to people who know HTML.

```tsx
// This looks like HTML, but it's actually JSX
const element = <h1>Hello, world!</h1>;
```

Under the hood, this gets compiled into plain JavaScript:

```tsx
// What JSX actually becomes after compilation
const element = React.createElement('h1', null, 'Hello, world!');
```

You don't need to write that long version: JSX handles it for you.

### JSX rules you must know

**Rule 1: Return only one root element**

Every component must return one parent element. If you need multiple elements side by side, wrap them in a `<div>` or an empty tag called a Fragment (`<>`):

```tsx
//: This breaks: two sibling elements with no parent
return (
  <h1>Title</h1>
  <p>Paragraph</p>
);

//: Wrap in a Fragment (no extra DOM element added)
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

**Rule 2: Use `className` instead of `class`**

Because `class` is a reserved word in JavaScript, JSX uses `className`:

```tsx
//: Wrong
<div class="container">

//: Correct
<div className="container">
```

**Rule 3: Close all tags**

Unlike HTML, JSX requires every tag to be closed, including self-closing ones:

```tsx
//: Wrong
<img src="photo.jpg">
<input type="text">

//: Correct
<img src="photo.jpg" />
<input type="text" />
```

**Rule 4: Use curly braces `{}` to embed JavaScript**

To use variables or expressions inside JSX, wrap them in `{}`:

```tsx
const name = 'Kathy';
const age = 24;

return (
  <div>
    <p>My name is {name}</p>
    <p>I am {age} years old</p>
    <p>Next year I'll be {age + 1}</p>
  </div>
);
```

**Rule 5: Inline styles use a JavaScript object**

```tsx
//: Wrong: this is HTML style syntax, not JSX
<p style="color: red; font-size: 16px">

//: Correct: double curly braces: outer {} for JSX, inner {} for the object
<p style={{ color: 'red', fontSize: '16px' }}>
```

---

## 4. Components: The Building Blocks

A **component** is just a JavaScript function that returns JSX. That's it.

```tsx
function Greeting() {
  return <h1>Hello, world!</h1>;
}
```

### Rules for components

1. **Name must start with a capital letter.** `<Button />` is a component. `<button />` is a plain HTML element.
2. **Every component lives in its own file** (convention, not a rule, but good practice).
3. **One file = one default export** (usually).

### A practical example

Let's say you want a reusable card component:

```tsx
// src/components/Card.tsx

function Card() {
  return (
    <div className="card">
      <h2>Card Title</h2>
      <p>Some description here.</p>
    </div>
  );
}

export default Card;
```

Using it in `App.tsx`:

```tsx
// src/App.tsx
import Card from './components/Card';

function App() {
  return (
    <div>
      <Card />
      <Card />
      <Card />
    </div>
  );
}
```

This renders three identical cards. But how do you make each one different? That's what **Props** are for.

---

## 5. Props: Passing Data Between Components

Props (short for "properties") let you pass data **from a parent component to a child component**. They work like function arguments.

```tsx
// Child component: receives props
function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// Parent component: passes props
function App() {
  return (
    <div>
      <Card title="React Basics" description="Learn the fundamentals of React." />
      <Card title="Hooks" description="Deep dive into React Hooks." />
    </div>
  );
}
```

### Defining props with TypeScript

In TypeScript, it's best practice to define the shape of your props using an `interface`:

```tsx
interface CardProps {
  title: string;
  description: string;
  isHighlighted?: boolean; // The ? means this prop is optional
  count: number;
}

function Card({ title, description, isHighlighted = false, count }: CardProps) {
  return (
    <div style={{ background: isHighlighted ? '#fffbcc': 'white' }}>
      <h2>{title}</h2>
      <p>{description}</p>
      <span>Views: {count}</span>
    </div>
  );
}
```

### The `children` prop

`children` is a special built-in prop that lets you pass JSX elements between the opening and closing tags of your component:

```tsx
function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}

// Usage
<Container>
  <h1>This content goes inside Container</h1>
  <p>So does this paragraph.</p>
</Container>
```

### Important: props are read-only

A child component can **never modify** the props it receives. Props only flow one direction: parent: child. If you need to change data, you need **State**.

---

## 6. State: Making Things Dynamic

State is data that **belongs to a component** and can change over time. When state changes, React automatically re-renders the component to show the updated UI.

You create state using the `useState` hook:

```tsx
import { useState } from 'react';

function Counter() {
  // useState returns [currentValue, functionToUpdateIt]
  const [count, setCount] = useState(0); // 0 is the initial value

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

### How `useState` works

```tsx
const [count, setCount] = useState(0);
//    :          :             : // current value   setter fn    initial value
```

- `count`: the current value, use this to display data
- `setCount`: call this to update the value
- `useState(0)`: starts with 0

Every time `setCount` is called with a new value, React re-renders the component.

### Updating objects and arrays in state

**Never directly modify state.** React won't detect the change. Instead, always create a new copy:

```tsx
//: Wrong: directly modifying state
const [user, setUser] = useState({ name: 'Kathy', age: 24 });
user.age = 25;         // React doesn't see this change!

//: Correct: spread operator creates a new object
setUser({ ...user, age: 25 });
```

Same rule for arrays:

```tsx
const [items, setItems] = useState(['apple', 'banana']);

// Adding an item
setItems([...items, 'cherry']);

// Removing an item
setItems(items.filter(item => item !== 'banana'));

// Updating an item
setItems(items.map(item => item === 'apple' ? 'APPLE': item));
```

### Multiple pieces of state

You can call `useState` multiple times, and each one manages its own independent value:

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // ...
}
```

---

## 7. Handling Events

React uses **camelCase** for event names (not lowercase like in HTML):

| HTML | React |
|------|-------|
| `onclick` | `onClick` |
| `onchange` | `onChange` |
| `onsubmit` | `onSubmit` |
| `onkeydown` | `onKeyDown` |
| `onmouseover` | `onMouseOver` |

You pass a **function**, not a string:

```tsx
//: Wrong: this is HTML syntax, not React
<button onclick="handleClick()">

//: Correct: pass the function directly
<button onClick={handleClick}>
// or with an inline arrow function:
<button onClick={() => console.log('clicked')}>
```

### Handling different event types

```tsx
function EventExamples() {
  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // stops default browser behavior
    console.log('Button clicked!');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input value:', e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents page reload on form submit
    console.log('Form submitted!');
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input onChange={handleInputChange} placeholder="Type something..." />
      <button onClick={handleButtonClick} type="button">Click Me</button>
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

## 8. Conditional Rendering

You often want to show different things based on conditions. React gives you a few ways to do this.

### Method 1: Ternary operator (for either/or)

```tsx
function Greeting({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome back!: </p>
      ): (
        <p>Please log in to continue.</p>
      )}
    </div>
  );
}
```

### Method 2: `&&` operator (show or show nothing)

```tsx
function Notification({ hasUnread }: { hasUnread: boolean }) {
  return (
    <div>
      <h1>Inbox</h1>
      {hasUnread && <p className="badge">You have unread messages!</p>}
    </div>
  );
}
```

> **Gotcha:** Don't use `&&` with numbers. `{0 && <p>Hi</p>}` will actually render `0` on screen instead of nothing. Use `{count > 0 && <p>Hi</p>}` instead.

### Method 3: Early return (for loading/error states)

```tsx
function UserProfile({ user }: { user: User | null }) {
  if (!user) {
    return <p>Loading...</p>;
  }

  // Only reaches here if user exists
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

---

## 9. Rendering Lists

To render a list of items, use JavaScript's `.map()` method. Every item **must** have a unique `key` prop:

```tsx
const posts = [
  { id: 1, title: 'React Basics', category: 'tutorial' },
  { id: 2, title: 'Hooks Explained', category: 'tutorial' },
  { id: 3, title: 'State Management', category: 'advanced' },
];

function PostList() {
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <strong>{post.title}</strong>: {post.category}
        </li>
      ))}
    </ul>
  );
}
```

### Why does `key` matter?

The `key` prop helps React identify which items have changed, been added, or removed. This makes re-renders efficient.

**Use a unique ID as the key, not the array index:**

```tsx
//: Avoid using index as key
{items.map((item, index) => <li key={index}>{item}</li>)}

//: Use a unique identifier
{items.map(item => <li key={item.id}>{item.name}</li>)}
```

Why? If you sort, add, or remove items, the index shifts. React gets confused and can render the wrong data in the wrong place.

---

## 10. Forms and User Input

In React, you have two ways to handle form inputs.

### Controlled components (recommended)

The input's value is tied to React state. React is always in control of what's displayed:

```tsx
function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    console.log('Submitted:', { name, email });
    setError('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

Note: use `htmlFor` instead of `for` in JSX (same reason as `className`).

### Select dropdowns and checkboxes

```tsx
function Preferences() {
  const [color, setColor] = useState('blue');
  const [agreed, setAgreed] = useState(false);

  return (
    <form>
      {/* Dropdown */}
      <select value={color} onChange={e => setColor(e.target.value)}>
        <option value="blue">Blue</option>
        <option value="red">Red</option>
        <option value="green">Green</option>
      </select>

      {/* Checkbox */}
      <input
        type="checkbox"
        checked={agreed}
        onChange={e => setAgreed(e.target.checked)}
      />
      <label>I agree to the terms</label>
    </form>
  );
}
```

---

## 11. Hooks: The Full Guide

Hooks are special functions that let you "hook into" React features like state and lifecycle from inside function components. They all start with `use`.

**The golden rules of Hooks:**
1. Only call hooks at the **top level** of your component: never inside loops, conditions, or nested functions
2. Only call hooks from **React function components** or custom hooks

### `useEffect`: Running side effects

Use `useEffect` for things that happen **outside** of rendering: like fetching data from an API, setting up event listeners, or updating the document title.

```tsx
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // This runs AFTER the component renders
    fetch('https://api.example.com/posts')
      .then(res => res.json())
      .then(json => setData(json));
  }, []); //: The dependency array

  return <div>{JSON.stringify(data)}</div>;
}
```

**Understanding the dependency array:**

```tsx
useEffect(() => {
  // ...
}, []);         // Empty array: runs only once when the component mounts

useEffect(() => {
  // ...
}, [userId]);   // Runs whenever `userId` changes

useEffect(() => {
  // ...
});             // No array: runs after EVERY render (usually not what you want)
```

**Cleanup function**: runs when the component unmounts:

```tsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  // Return a cleanup function to stop the timer when component is removed
  return () => {
    clearInterval(timer);
  };
}, []);
```

### `useRef`: Accessing DOM elements directly

When you need to interact directly with a DOM element (like focusing an input or reading its size), use `useRef`:

```tsx
import { useRef } from 'react';

function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    // inputRef.current is the actual <input> DOM element
    inputRef.current?.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" placeholder="Search..." />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
```

`useRef` is also useful for storing a value that you want to persist between renders but **don't** want to trigger a re-render when it changes (unlike `useState`):

```tsx
const renderCount = useRef(0);
renderCount.current += 1;  // Incrementing this won't cause a re-render
```

### `useMemo`: Avoiding expensive recalculations

If you have a slow calculation that shouldn't re-run on every render, wrap it in `useMemo`:

```tsx
import { useMemo } from 'react';

function ProductList({ products, searchTerm }: { products: Product[]; searchTerm: string }) {
  // This filtering only re-runs when products or searchTerm changes
  const filteredProducts = useMemo(
    () => products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())),
    [products, searchTerm]
  );

  return (
    <ul>
      {filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
```

### `useCallback`: Memoizing functions

When you pass a function as a prop to a child component, React creates a new function object on every render. `useCallback` caches the function so it's only recreated when its dependencies change:

```tsx
import { useCallback, useState } from 'react';

function Parent() {
  const [count, setCount] = useState(0);

  // Without useCallback, this function is recreated every time Parent re-renders
  const handleClick = useCallback(() => {
    console.log('Clicked!');
  }, []); // Empty array = created only once

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <Child onClick={handleClick} />
    </>
  );
}
```

### Building your own custom hook

When you find yourself copying the same stateful logic across multiple components, extract it into a custom hook:

```tsx
// src/hooks/useFetch.ts
import { useState, useEffect } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Request failed');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
```

Using it anywhere in your app:

```tsx
function UserProfile() {
  const { data: user, loading, error } = useFetch<User>('/api/user/1');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <h1>{user?.name}</h1>;
}
```

---

## 12. Sharing Data with Context API

**The problem:** Imagine you have data (like the current user or theme) that many components at different levels of your app need. Passing it down as props through every level is called "prop drilling" and gets messy fast:

```
App (has user data)
 |--  Layout
      |--  Sidebar
           |--  UserMenu : needs user data
```

You'd have to pass `user` as a prop through `Layout` and `Sidebar` even though they don't use it: just to get it to `UserMenu`. Context solves this.

### Setting up Context

**Step 1: Create the context:**

```tsx
// src/context/AuthContext.tsx
import { createContext, useContext, useState } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);
```

**Step 2: Create a Provider component:**

```tsx
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
```

**Step 3: Create a custom hook for easy access:**

```tsx
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

**Step 4: Wrap your app in the Provider:**

```tsx
// main.tsx or App.tsx
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

**Step 5: Use it anywhere, no prop drilling:**

```tsx
function UserMenu() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Hello, {user?.name}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
```

---

## 13. Routing with React Router

A standard website has multiple pages. React apps are "single-page apps" (SPAs): there's only one HTML file. React Router lets you simulate multiple pages by swapping out components based on the URL.

### Installation

```bash
npm install react-router-dom
```

### Basic setup

```tsx
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />  {/* This stays visible on all pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* Catch-all 404 */}
      </Routes>
    </BrowserRouter>
  );
}
```

### Navigating between pages

Use `<Link>` instead of `<a>`: it prevents the page from fully reloading:

```tsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
```

### Dynamic routes (e.g., blog post pages)

```tsx
// Route definition
<Route path="/posts/:id" element={<PostPage />} />

// PostPage component: read the :id from the URL
import { useParams } from 'react-router-dom';

function PostPage() {
  const { id } = useParams(); // { id: '42' } if URL is /posts/42

  return <h1>Showing post #{id}</h1>;
}
```

### Navigating programmatically (e.g., after a form submit)

```tsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... do login ...
    navigate('/dashboard'); // redirect after login
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## 14. Component Lifecycle Explained

Every React component goes through a lifecycle:
1. **Mount**: the component appears on screen for the first time
2. **Update**: the component re-renders because state or props changed
3. **Unmount**: the component is removed from the screen

In modern React (function components), you control all of this with `useEffect`:

```tsx
useEffect(() => {
  //: Runs after the component mounts (appears on screen)
  console.log('Component mounted: fetch data here');

  const subscription = subscribeToSomething();

  return () => {
    //: Runs when the component unmounts (disappears from screen)
    console.log('Component unmounted: clean up here');
    subscription.unsubscribe();
  };
}, []); // Empty array = only runs on mount and unmount

useEffect(() => {
  //: Runs every time `value` changes (re-render/update)
  console.log('Value changed to:', value);
}, [value]);
```

### A practical lifecycle example

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // Start a timer when the component mounts
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Stop the timer when the component unmounts
    // (prevents memory leaks if you navigate away)
    return () => clearInterval(interval);
  }, []);

  return <p>Time elapsed: {seconds}s</p>;
}
```

---

## 15. Best Practices and Common Mistakes

### Keep components small and focused

Each component should do one thing. If a component is getting too long (over 100-150 lines), split it.

```tsx
//: One giant component doing everything
function Dashboard() {
  // 200 lines of mixed logic...
}

//: Split into focused sub-components
function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <StatsPanel />
      <RecentActivity />
    </>
  );
}
```

### Name things clearly

```tsx
//: Vague names
const [d, setD] = useState(false);
function fn() {}

//: Descriptive names
const [isMenuOpen, setIsMenuOpen] = useState(false);
function handleMenuToggle() {}
```

### Common mistakes table

| Mistake | What goes wrong | How to fix |
|---------|----------------|-----------|
| `user.name = 'new'` (direct state mutation) | UI doesn't update | `setUser({ ...user, name: 'new' })` |
| `useEffect` with missing dependencies | Stale data / infinite loop | Add all used variables to the dependency array |
| Using array index as `key` | Buggy rendering when list order changes | Use a unique `id` field |
| Calling a hook inside an `if` statement | React throws an error | Move hooks to the top level of the component |
| Forgetting `e.preventDefault()` on forms | Page reloads on submit | Always add it to `onSubmit` handlers |
| Not cleaning up in `useEffect` | Memory leaks | Return a cleanup function |

### File and folder conventions

```
src/
|--  components/     # Reusable components (Button, Card, Modal)
|--  pages/          # Page-level components (HomePage, AboutPage)
|--  hooks/          # Custom hooks (useFetch, useAuth)
|--  context/        # Context providers
|--  types/          # TypeScript type definitions
|--  utils/          # Helper functions
```

---

## Quick Reference

| Concept | What it does |
|---------|-------------|
| JSX | Write HTML-like syntax inside JavaScript |
| Component | A function that returns JSX |
| Props | Data passed from parent to child (read-only) |
| State | Data owned by a component (triggers re-renders when changed) |
| useEffect | Run code after render, or when dependencies change |
| useRef | Access DOM elements or store values without re-rendering |
| useMemo | Cache expensive calculations |
| useCallback | Cache functions passed as props |
| Context API | Share data across components without prop drilling |
| React Router | Handle page navigation in SPAs |

---

*Written while learning React on the job. Every section comes from actual confusion I ran into, so if you're confused too, you're in good company.*
