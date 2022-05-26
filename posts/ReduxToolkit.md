---
title: "My Redux Toolkit Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my Redux Toolkit notes!"
isFeatured: true
---

# Redux Toolkit

## Purpose

The **Redux Toolkit** package is intended to be the standard way to write Redux logic. It was originally created to help address three common concerns about Redux:

- "Configuring a Redux store is too complicated"
- "I have to add a lot of packages to get Redux to do anything useful"
- "Redux requires too much boilerplate code"

It contains some useful utilties that will the user simplify their application code and provides some tools that abstract over the setup process and handle the most common use cases.

Redux Toolkit also includes a powerful data fetching and caching capability that is called **RTK Query**. It's included in the package as a separate set of entry points. It's optional, but can eliminate the need to hand-write data fetching logic.

## Installation

The recommended way to starte new apps with React and Redux is by using the **official Redux+JS template** or **Redux+TS template** for Create React App, which takes advantage of Redux Toolkit and React Redux's integration with React components:

```
# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript
```

Install the base _react-redux_ library as well as react toolkit:

`npm install @reduxjs/toolkit react-redux`

## What's Included

Redux Toolkit includes these APIs:

- `configureStore()`: Wraps `createStore()` (from Redux) to provide simplified configuration options and good defaults. It can autoamtically combined your slice reducers, adds whatever Redux middleware you supply, includes `redux-thunk` by default, and enables use of the Redux DevTools Extension.
- `createReducer()`: Lets you supply a lookup table of action types to case r educer functions, rather than writing switch statements. In addition, it automatically uses the **immer** library to let you write simpler immutable updates with normal mutative code, like `state.todos[3].completed = true`.
- `createAction()`: Generates an action creator function for the given action type string. The function itself has `toString()` defined, so that it can be used in place of the type constant.
- `createSlice()`: Accepts an object of reducer functions, a slice name, and an initial state value, and automatically generates a slice reducer with corresponding action creators and action types.
- `createAsyncThunk`: Accepts an action type string and a function that returns a promise, and generates a thunk that dispatches `pending/fulfilled/rejected` action types based on that promise
- `createEntityAdapter`: Generates a set of reusable reducers and selectors to manage normalized data in the store
- `createSelector` _utility_ from the **Reselect** library, re-exported for ease of use

## RTK Query

**RTK Query** is provided as an optional addon within the `@reduxjs/toolkit` package. It is purpose-built to solve the use case of data fetching and caching, supplying a compact, but powerful toolset to define an API interface layer for your app. It is intended to simplify common cases for loading data in a web application, eliminating the need to hand-write data fetching & catching logic yourself.

RTK Query is built on top of the Redux Toolkit core for its implementation, using Redux internally for its architecture. Although knowledge of Redux and RTK are not required to use RTK Query, you should explore all the additional global store management capabilities they provide, as well as installing the **Redux DevTools browser Extension**, which works flawlessly with RTK Query to traverse and replay a timeline of your request & cache behavior.

RTK Query is included within the installation of the core Redux Toolkit package. It is available via either of the two entry points below:

```js
import { createApi } from "@reduxjs/toolkit/query";

/* React-specific entry point that automatically generates hooks corresponding to the defined endpoints */
import { createApi } from "@reduxjs/toolkit/query/react";
```

### RTK Query - What's Included

RTK Query includes these APIs:

- `createApi()`: The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb.
- `fetchBaseQuery()`: A small wrapper around fetch that aims to simplify requests. Intended as the recommended baseQuery to be used in createApi for the majority of users.
- `<ApiProvider />`: Can be used as a Provider if you do not already have a Redux store.
- `setupListeners()`: A utility used to enable refetchOnMount and refetchOnReconnect behaviors.

## Using Redux Toolkit

## Create a Redux Store

```js
// app/store.js
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {},
});
```

This creates a Redux Store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.

## Provide the Redux Store to React

Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we jsut created, put a `<Provider>` around your `<App>`, and pa ss the store as a prop:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux'

ReactDOM.render(
    <Provider store={store}>>
        <App />
    </Provider>,
    document.getElementById('root');
)
```

## Create a Redux Slice State

Add a new file named `src/features/counter/counterSlice.js`. In that file, import the `createSlice` API from Redux Toolkit.

Creating a _slice_ requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export teh generated Redux actio ncreatorse and the reducer funciton for the whole slice.

Redux requires that _we write all state updates immutably, by making copies of data and updating the copies_. However, Redux Toolkit's `createSlice` and `createReducer` APIs use _Immer_ inside to allow us to _write "mutating" update logic that becomes correct immutable updates_.

```js
// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creatores are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

## Add Slice Reducers to the Store

Next, we need to import the reducer function from the counter slice and add it to our store. By defining a field inside the _reducer_ parameter, we tell the store to use this slice reducer function to handle all updates to that state.

```js
// app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

## Use Redux State and Actions in React Components

Now we can use the React-Redux hooks to let React components interact with the Redux store. We can read data from the store with `useSelector`, and dispatch actions using `useDispatch`. Create a `src/features/counter/Counter.js` file with a `<Counter>` component inside, then import that component into `App.js` and render it inside of `<App>`.

```js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <button onClick={() => dispatch(incrementByAmount(10))}>
        Increment by 10
      </button>
      <span>{count}</span>
    </div>
  );
}
```

Now, any time you click the "Increment" and "Decrement" buttons:

- The corresponding Redux action will be dispatched to the store
- The counter slice reducer will see the actions and update its state
- The <Counter> component will see the new state value from the store and re-render itself with the new data

## Summary

- **Create a Redux store with `configureStore`**
  - `configureStore` accepts a `reducer` function as a named argument
  - `configureStore` automatically sets up the store with good default settings
- **Provide the Redux store to the React application components**
  - Put a React-Redux `<Provider>` component around your `<App />`
  - Pass the Redux store as `<Provider store={store}>`
- **Create a Redux "slice" reducer with `createSlice`**
  - Call `createSlice` with a string name, an initial state, and named reducer functions
  - Reducer functions may "mutate" the state using Immer
  - Export the generated slice reducer and action creators
- **Use the React-Redux `useSelector`/`useDispatch` hooks in React components**
  - Read data from the store with the `useSelector` hook
  - Get the `dispatch` function with the `useDispatch` hook, and dispatch actions as needed
