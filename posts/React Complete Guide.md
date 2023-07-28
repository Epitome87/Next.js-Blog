---
title: 'React Complete Guide - Course Notes'
date: '2022-05-25'
image: 'post1.jpg'
excerpt: 'Some of my React Complete Guide notes!'
isFeatured: false
---

## Table of Contents

- [Section 6](#section-6-styling-react-components)
- [Section 7](#section-7-debugging-react-apps)
- [Section 8](#section-8-practice-project)
- [Section 9](#section-9-fragments-portals-and-refs)
- [Section 10](#section-10-effects-reducers-and-context)
- [Section 11](#section-11-food-order-app)
- [Section 12](#section-12-behind-the-scenes-look-at-react-and-optimization-techniques)
- [Section 13](#section-13-class-based-components)
- [Section 14](#section-14-class-based-components)
- [Section 15](#section-15-building-custom-react-hooks)
- [Section 16](#section-16-working-with-forms-and-user-input)
- [Section 17](#section-17-practice-project-adding-http-and-forms-to-the-food-order-app)
- [Section 18](#section-18-redux-an-alternative-to-the-context-api)
- [Section 19](#section-19-advanced-redux)
- [Section 20](#section-20-building-a-multi-page-spa-w-react-router)
- [Section 21](#section-21-deploying-react-apps)
- [Section 22](#section-22-adding-authentication-to-react-apps)
- [Section 23](#section-23-a-pretty-deep-dive-introduction-to-nextjs)

## Section 6: Styling React Components

7/12/21

- Can use Inline Styles just like we would in an HTML file, as follows: `style={ {color: "red", border: "2px solid blue"}}` Note how we use the typical JSX brackets for dynamic values, as well as another bracket representing an object. This is because the style property expects an object, with the keys being styling properties and the values being the desired css value.
- Learning 3 ways to style React components: 1) Inline styles. 2) Using styled-components package. 3) Using CSS Modules.
- For Inline Styles that we need to be dynamic, we could use a ternary operator, as follows: `style={{color: isValid ? "blue" : "red"}}`
- Inline Styles have the highest CSS precedence, so we should use classes instead. Rather than the previous examples, we could create an "isValid" class, style it in a regular CSS file, and then add it dynamically to a React element like this: className={`form-control ${isValid ? "blue" : "red"}` }
- Using the styled-components package to style components to local scope
- TODO: Research tagged template literals!\*
- Styled-components are done as follows: const Button = styled.button` <paste your CSS in here, but remove the class/element names, and for psuedo-selectors do &:focus, &:hover, etc>`
- Styled-components: Add dynamic styles by passing a prop through the Component. Example: `<FormControl invalid={!isValid}>` and then in the tagged template literal: `const FormControl = styled.div margin: 0.5rem 0; & label { color: ${(props) => (props.invalid ? 'red' : 'black')}; }`
- In Styled-components, simply type media queries like you would in a CSS file, but in the tagged template literal! The only difference is we drop the selector name.
- React projects created with create-react-app support CSS Modules; probably the best method for styling components with local scope!
- Simply import CSS file with a name like: `import styles from './Button.modules.css'` rather than the typical way: `import './Button.css'`. We have to rename our .css file with ".module" at the end to signal that we are wanting CSS Module functionality.
- And to use the styles, simply do as such: `<div className={styles.formControl} </div>`. Or if your CSS styling name is not a property JS syntax (such as using a hyphen) do as follows: `<div className={styles['form-control']}</div>`. If you need to add a dynamic class name as well, use a string literal like this: `className={'${styles['form-control']} ${!isValid && styles.invalid}'}`

## Section 7: Debugging React Apps

- Use breakpoints in the browser inspector to step through areas where you want to inspect for bugs.
- React DevTools. This extension adds a Profiler and Component tab in the Inspector. Shows a useful component tree representation.

## Section 8: Practice Project

- If your custom Component has content inside its tag, you can render it out by calling {props.children} in its return Component method.
- Put a "+" in front of a string variable to force it to be compared as an Integer. Look more into this!
- _VERY IMPORTANT!_ When using array.map in JSX, do not use brackets for the callback function block. Instead use parenthesis.

## Section 9: Fragments, Portals, and Refs

- JSX limitation: Can't have adjacent root-level elements. Need to wrap in a div or other element. Can't have more than one root JSX element or store more than one root JSX element in a variable. This is because return ( React.createElement(); React.createElement())) is not valid JS.
- Solving the above by wrapping in a div is fine -- but we may end up with "div soup"! Too many unnecessary divs bloating the html. They don't had semantic meaning or structure to the page.
- One solution is to add our own Wrapper component: We create a component that simply returns props.children, and then use that Component as a wrapper div.
- BUT! We do not need to build this ourselves: React provides this for us with <React.Fragment> tags! Depending on your build set-up, you could even simply do "<> </>"
- React Portals: Lets us write components how we want, but render content somewhere else in the DOM than our JSX indicates. Useful for modals and pop-ups, which shouldn't be nested in other components.
- To utilize React Portals: Import from "react-dom" in the component script, then where you would normally insert your component tag, use ReactDOM.createPortal(<jsx code, passing appropriate props>, document.getElementById(<id of HTML location where this should be rendered at>). And in the HTML, make sure to specify a spot for the portal'd elements!
- Refs (short for reference): Allow us access to other DOM elements. Set up a connection between HTML element and JS code.
- Ref will reference real DOM objects. The ref itself is an object with a current property, which is the DOM reference.
- Only let DOM manipulate the DOM, though! Try to only read DOM data.
- If you only want to READ a value, Refs are probably more ideal than using state. For inputs especially, Refs eliminate the need to track state on every key press, and shortens the code. We reset the input fields back to empty by manipulating the DOM directly, though -- which is something we should avoid as much as possible.
- IMPORTANT: Look at our AddUser component and notice the difference between using useState and useRef when it comes to dealin with the name and age inputs.
- If access Components with ref, we call them "Uncontrolled Components": Their internal state (value reflected in them) is not controlled by React. Typically arises with Form and Input.

## Section 10: Effects, Reducers, and Context

- "Effect" (or "Side Effect"): This refers to anything else that is not React's main, direct job. React's main job is to render UI & react to user input. This other stuff could be storing data in browser storage, sending http requests to backend servers, setting and managing timers, etc.
- These "Side Effect" tasks should not go directly into the normal Component evaluation and render cycle -- especially since they might block/delay rendering (e.g http requests). So we handle them with the useEffect() Hook.
- useEffect(() => { ... }, [ dependencies ]); In this, the first param is a function that should be executed AFTER every component evaluation IF the specified dependencies changed. Your side effect code goes into this function.
- useEffect can be useful when we want data to persist even after page refresh (such as the status of a user being signed in or out). It also avoids infinite loops.
- General rule: Add, as dependencies, whatever you are using in your side effect function. Even the state-setting functions. For example, if using: const [formIsValid, setFormIsValid] = useState(false), and then we have a useEffect(() => { setFormIsValid(enteredEmail, enteredPassword) }, [setFormIsValid, enteredEmail, enteredPassword]); Those 3 things are dependencies! So not just the variables used to access a specific state (enteredPassword, enteredEmail) but also the function for updating that state (setFormIsValid).
- NEVERMIND! You CAN omit state-updating functions, because by default they are ensured by React to never change. They stay the same across all re-render cycles.
- useEffect can run when state or props change -- not just when component is first created.
- Whenever you have an action that should be executed in response to some other action -- that is a Side Effect!
- General rule: Don't need to add state updating functions to dependencies. Don't need to add "built-in" APIs or functions like fetch, localStorage, etc. Don't need to add variables or functions you might have defined OUTSIDE your components (e.g you create a new helper function in a separate file). You must add all things you use in your effect function IF those things could change b/c your component (or some parent) re-rendered. Good rule of thumb is if it's a State or Prop variable.
- Lesson 113 is a good reference for using clean up functionality. Study it more!
- Cleanup function runs before the useEffect function runs (except the first time, on mount. The cleanup function is written inside the first argument of useEffect, and returns a function that is to be executed.
- useReducer() Hook is useful for State Management! Like useState but more useful for complex states. It can be used as a replacement for useState if you need more powerful state management. Doesn't mean you should always use it -- yes it's more powerful, but sometimes the extra work involved is not worth it when useState can suffice. Useful for when state updates depend on other states.
- Using useReducer(): const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn). Note how in our example we created a reducerFn method outside of the scope of the actual Component, because the reducer function won't need any data generated inside of the component function.
- useState(): The main stage management tool. Start with it and move to useReducer if it isn't work. Great for independent pieces of state/data. Great if state updates are easy and limited to a few kinds of updates. useReducer(): Great if you need more power. Can contain more complex state updating logic, where you can move potentially complex logic out of component function body and into separate reducer function. Should be considered if you have related pieces of state/data. Helpful if you have more complex state updates.

### Context API

- React Context API: Component-wide, "behind-the-scenes" Stage Storage. Useful for dealing with large chains of Components that need to pass their props up the component tree through multiple parents (whom don't even care about that prop data -- they are simply there to receive it in order to send it off further into the component tree). Let's us directly pass data to the component that is interested without building such a long prop chain.
- "Context", "State", and "Store" are common folder conventions for where we store Context API files. To define our Context object in a Javascript file, we do:

```js
const ExampleContext = React.createContext( <initial object state> )
```

Since createContext returns a Component in a way, we use the naming convention of capital letters, like with components.

- Using Context is a 2-step process:
  1. First "Provide" the Context.
  2. Then "Listen" to it (or "Consume")! Can "listen" in 2 ways: Use Context.Consumer, or a React hook.
- When using Context.Consumer, we wrap it around the returned JSX in the Component that wishes to consume that data. And then inside the <Context.Consumer> tag we do this: { (context) => { return (the jsx) }. Using this Consumer way has ugly syntax -- so we will do the more elegant of the solutions!
- Using the useContext Hook instead of Consumer: Much simpler! Import {useContext} from React and then add this in your component: const <varName> = useContext(<TheContext>); When this component refers to data that use to be via prop (like prop.isLoggedIn) you would do this instead: varName.isLoggedIn.
- Important: If your child component directly uses the prop you pass down, it does not need to be done via Context API. There are no middle-men, so passing via props is just fine.

## Section 11: Food Order App

In this section we built a small Food Order app!

## Section 12: Behind the Scenes Look at React and Optimization Techniques

- When exporting a component, you can wrap it in a React.memo() to reduce the number of times it is re-evaluated. It will only run again when one of its props/states actually changes. However, the increased overhead required by React to compare the old / new prop values may not always be worth the reduction in re-evaluations. Best if used carefully and near the top-level of a branch of components.
- Require { useCallback } and use to allow us to store a function across component executions. Allows us to "save" a function and not re-recreate it. This allows the "===" comparison to work when wrapped in React.memo. Pass the function to useCallback as an arrow function: useCallback(() => func(), []) and an array of dependencies. Overall, this allows useMemo to function properly and avoid the "gotcha" caused by not knowing when objects / arrays / functions have not truly changed.
- React makes sure that useState() is only considered once: That is why your Component can be re-evaluated without useState() running again. React recognizes it already has a state and simply updates it -- it doesn't initialize it again.
- Since multiple state changes can be scheduled at the same time, it's recommended to use callback form of state updating (if state relies on previous state). It's safe to not use the callback form in a useEffect -- because useEffect is assured to run every time the state changes -- so you can't miss outstanding state changes. Two (or more) state updates after each other in the same block of code, React batches the state updates together into one state update!
- Require { useMemo } and use to allow us to store data. It's like useCallback, but for things that aren't functions! useMemo( , ) first param is a function for what you want to store via a return, second is dependency.

## Section 13: Class-Based Components

- Setting state in Class-based components only requires us to pass in the key-value pairs for the states we wish to update, and other state key-value pairs are kept intact. In Functional Components, however, the old state is overwritten and not merged!

- setState in Class components always requires and returns an Object.

- Instead of using Side-Effects in Functional Components using useEffect(), we must make use of the Lifecycle methods: componentDidMount(), componentDidUpdate(), componentWillUnmount(), etc.

- 1. componentDidMount() is similar to useEffect(<someMethod>, []) 2) componentDidUpdate is similar to useEffect(<someMethod>, [someValue]) and 3) componentWillUnmount is similar to useEffect() => { return () => {...}}, [])

- Do not call setState in componentDidUpdate unless some condition is met (like a state or prop change) -- it will make the update be called again in infinite loop! Note how the useEffect for Functional Components does not require us to check if the state has even changed (the dependency argument in useEffect does that for us!). We need to check if state has even changed in componentDidUpdate and if not we do not setState again in there. (Could probably avoid this conditional check if we do this in componentShouldUpdate?)

- componentWillUnmount will get called even when we just temporarily hide that component's tag from the DOM.

- useContext is a bit more difficult and less flexible to use in class components. In render method, import the context you want to use, and add <YourContext.Consumer> tags. This works in functional and class components. 2) Add static properties: "static contextType = <YourContext>". Can only do this once per component! So you cannot use multiple Contexts in one class component! And then access: this.context.yourVariableName

- Must use Class-based Components when dealing with "Error Boundaries". Hard to deal with errors in children in React otherwise. The functionality it provides is not currently possible with Functional Components!

- Error Boundary components must implement componentDidCatch() -- it is triggered when any children raises an error. It traditionally renders this.prop.children. You then wrap this Error Boundary component around any components which might throw errors that we wish to handle.

- We could keep state for "hasError" and set it true when appropriate. And then render an error page and message when an error is thrown.

## Section 14: Sending HTTP Requests (E.g. Connecting to a Database)

- Began Studying On: 8/12/21

### Module Introduction

- This section will cover
  - How Do React Apps Interact With Databases?
  - Sending HTTP Requests & Using Responses
  - Handling Errors & Loading State

### How To (Not) Connect To A Database

- Browser-Side Apps Don't Directly Talk To Databases!
  - Database credientials would be exposed in the browser!
  - Performance issues
- Instead, have a backend app (NodeJS App, PHP App, etc).
  - This backend app will communicate with the database -- securely!
  - Differnt server, users of website can never see this server's code
  - Exposs different URLs requests can be sent to

### Our Starting App & Backend

- API - Application Programming Interface
  - Clearly defined interface and rules on how to do certain tasks / achieve certain results
  - Typically talk about REST and GraphQL APIs in the context of web development

### Sending A GET Request

- Can use any typical JS solution for sending HTTP requests with React
- Axios - Makes sending HTTP requests and dealing with responses very simple
- Fetch API - Built-in mechanisms for fetcing and sending data
- Fetch use example:

  ```js
  function fetchMoviesHandler() {
    // Fetch returns a Promise that will return a response
    fetch('https://swapi.dev/api/films/')
      .then((response) => {
        // Returns a Promise
        return response.json();
      })
      .then((data) => {
        // Transform the APIs data to match our Movie.js structure
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      });
  }
  ```

### Using async / await

- Refactored fetch request, using async/await instead of Promises

```js
function fetchMoviesHandler() {
  // Fetch returns a Promise that will return a response
  fetch('https://swapi.dev/api/films/')
    .then((response) => {
      // Returns a Promise
      return response.json();
    })
    .then((data) => {
      // Transform the APIs data to match our Movie.js structure
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });

      setMovies(transformedMovies);
    });
}
```

### Handling Loading & Data States

- (Simply added some default states and loading states in this lecture)

### Handling HTTP Errors

- Errors can arise when working with requests (404 codes, etc)
- If working with Promises and "then" statements, we'd use "catch" statements to catch our errors
  - But since we are working with async/await, we can use try-catch blocks instead
- Fetch API doesn't treat error status codes as real errors
  - Axios, does generate real errors for error status codes, though!
  - In the Fetch API, the response object has an "ok" field we could check to see if the response was sucessful or not
    - The response also has a "status" field which holds the **concrete response status code**. We could also manually check that

### Using useEffect() For Requests

- **TODO: REWATCH LESSON 179 -- VERY IMPORTANT USEEFFECT AND USECALLBACK INFO I DIDN'T GRASPH**
- Most applications want to start Fetching when a certain Component loads -- not when the user presses a "Fetch" button!
  - For this, use the useEffect hook to handle such a side-effect

### Preparing The Project For The Next Steps

- Firebase - A service by Google. A Backend that comes with a database and full REST API that we can use to send requests
  - Without writing any server-side code ourselves, we can utilize a dummy backend to get and store data
  - Like with our Starwars API fetch example, we will Fetch from Firebase
    - _NOTE:_ Although it looks like we are communicating with Firebase's database, we are interacting with an API -- which behind-the-scenes works with the database

### Sending A POST Request

- **TODO: REWATCH LESSON 181 -- VERY IMPORTANT SENDING POST REQUEST FROM FIREBASE**

### Wrap Up

- React can talk to a backend, but not a database directly
- Can send GET & POST requests to backend APIs, very often REST APIs, using axios or fetch

## Section 15: Building Custom React Hooks

- Began Studying On: 8/12/21?

### What Are "Custom Hooks"?

- Just regular functions that contain stateful logic
- Outsource **stateful** logic into **re-usable functions**
- Unlike "regular functions", custom hooks can use other React hooks and React state
- Mechanism of re-using logic (like regular functions) but can use React hooks and other hooks in them

### Creating A Custom React Hook Function

- Problem - We have two Components that are similiar. We could re-use code to greatly reduce the need for repeated code. However, these Components use Hooks, which cannot be used in just any random function -- must be used in React Compnent function or Custom Hooks
- Solution: We build a custom Hook!
- Custom Hooks must have their function name start with "use"

### Using Custom Hooks

### Configuring Custom Hooks

### Onwards To A More Realistic Example

### Adjusting the Custom Hook Logic

- **TODO: SIGH! VERY CONFUSED**

### Using the Custom Hook In More Components

# Section 16: Working With Forms and User Input

## Module Introduction

This section won't teach any brand-new topics. Rather, we will work on a project that will strenghten our ability to handle forms & user input. We will be working with forms, values, validation, and state

This section will cover:

- What's Complex About Forms?
- Handling Inputs & Forms With React
- Simplifications

## What's So Complex About Forms?

- Forms and their inputs can assume a broad variety of different states
  - One or more inputs could be valid or invalid - All inputs could be valid
  - State could be unknown -- async validation to a server behind the scenes
  - Output input-specific error messages & highlight problem inputs
- Ensure form can't be submitted / saved - Allow form to be submitted / saved
- When To Validate?
  - When form is submitted?
    - Allows the user to enter a valid value before warning him
    - Avoids unnecessary warnings but maybe present feedback "too late"
  - When an input is losing focus?
    - Allows the user to enter a valid value before warning him
    - Very useful for untouched forms
    - Have to wait until input is done before giving feedback
  - On every keystroke?
    - Warns user before he has a chance of entering valid values
    - If applied only on invalid inputs, has the potential of providing more direct feedback

## Dealing With Form Submission & Getting User Input Values

- useRef or useState - which is better for form inputs? Depends on what you want to do with entered values
  - If you only need the entered value once (when form is submitted), a ref might be better
  - If you need value after every keystroke, using state is better
  - State better if you need to reset the entered input. `E.g setEnteredName("");`
    - Doing so with ref isn't ideal -- we are directly manipulating the DOM. E.g `nameInputRef.current.value = ""`

## Adding Basic Validation

- Client-side validation is not reliable; it's there to provide a good user experience

## Providing Validation Feedback

## Handling The "Was Touched" State

## React To Lost Focus

## Refactoring & Deriving States

## Managing The Overall Form Validity

## Assignment 5: Time to Practice: Forms

## Adding A Custom Input Hook

- Could refactor our input logic and have each Input be its own Component, but then managing the overall Form validity would be difficult
  -Another approach: Custom Hook!

## Re-Using The Custom Hook

## A Challenge For You!

## Applying Our Hook & Knowledge To A New Form

## Summary

-- Formik: Popular third-party library for building forms in React

## Bonus: Using useReducer()

# Section 17: Practice Project: Adding HTTP and Forms To The Food Order App

## Module Introduction

- Going to add the following to Food App in this section:
  - Adding a Checkout / Order Form
  - Submitting Orders to a Backend Server (HTTP)
  - Fetching Meals Data

## Reading Form Values

In this section, we used the `useRef` Hook to create input references on our Checkout.js form for the user's Name, Street, Postal Code, and City inputs. We declare each at the top of our Checkout Component, set it equal to "useRef()", add `ref = nameInputRef` (etc for the other inputs) in the input elements, and finally store their value in our Button-press event handler by setting a variable equal to `nameInputRef.current.value`. Here is that process:

```
import { useRef } from 'react';
import classes from './Checkout.module.css';

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
```

## Adding Form Validation

Nothing new here, just more form validation.

We define helper functions to help determine the validity of our fields:

```
const isEmpty = (value) => value.trim() === '';
const is5Chars = (value) => value.trim().length === 5;
```

We create State to keep track of all 4 form input fields (in one object State, rather than 4 separate states):

```
const [formInputsValidity, setFormInputsValidity] = useState({
  name: true,
  street: true,
  city: true,
  postalCode: true,
});
```

We create variables to test the validity of each field after ran through our helper functions:

```
// In function that's called when "Confirm" Button is pressed
const enteredName = nameInputRef.current.value;
const enteredStreet = streetInputRef.current.value;
const enteredPostalCode = postalCodeInputRef.current.value;
const enteredCity = cityInputRef.current.value;

// Validation
const enteredNameIsValid = !isEmpty(enteredName);
const enteredStreetIsValid = !isEmpty(enteredStreet);
const enteredPostalCodeIsValid = is5Chars(enteredPostalCode);
const enteredCityIsValid = !isEmpty(enteredCity);
```

We store these results in our State:

```
// Set state
setFormInputsValidity({
  name: enteredNameIsValid,
  street: enteredStreetIsValid,
  city: enteredCityIsValid,
  postalCode: enteredPostalCodeIsValid,
});
```

We test the validity of the overall form:

```
// Overall form validity
const formIsValid =
  enteredNameIsValid &&
  enteredStreetIsValid &&
  enteredCityIsValid &&
  enteredPostalCodeIsValid;

if (!formIsValid) {
  return;
}

// Form valid: Submit Cart data!
```

And we create helper strings outside our returned JSX code to determine what classes each input gets based on their validity:

```
const nameControlClasses = `${classes.control} ${
  formInputsValidity.name ? '' : classes.invalid
}`;

// Etc for 3 other inputs
```

Finally, in the returned JSX we assign those classes and display an error message if the input is not valid:

```
<div className={nameControlClasses}>
  <label htmlFor='name'>Your Name</label>
  <input type='text' id='name' ref={nameInputRef} />
  {!formInputsValidity.name && <p>Please enter a valid name</p>}
</div>
```

### Submitting & Sending Cart Data

**Always** validate incoming data on the server as well! The checkout information the user provides could be manipulated -- never trust client-side data. In our case, we'd also want to verify the prices of the products in their cart have not be manipulated, by comparing them to the prices in our database.

We want our Checkout data to be sent to the server through our Cart component. In Cart.js, we add:

```
const submitOrderHandler = (userData) => {

};
```

And in our JSX where we show our Checkout component, we pass it as an `onConfirm` prop:

```
{isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
```

And in our Checkout Component, at the buttom of the confirmHandler function after all our input validation, we call that handler, passing it in our
checkout data (so now Cart has our user's name, street, city, and postal):

```
// Form valid: Submit Cart data!
props.onConfirm({
  name: enteredName,
  street: enteredStreet,
  city: enteredCity,
  postalCode: enteredPostalCode,
});
```

We can now revisit our submitOrderHandler in our Cart.js and utilize the passed in data from Checkout's onConfirm method:

```
const submitOrderHandler = (userData) => {
  // Send our user checkout data and cart item data to the backend
  // If orders.json doesn't exist, it will be created for us
  fetch('https://react-http-b5854-default-rtdb.firebaseio.com/orders.json', {
    method: 'POST',
    body: JSON.stringify({
      user: userData,
      orderedItems: cartCtx.items,
    }),
  });
};
```

Just like that, our User data and Cart items are now entries in our Firebase "database"!

Next, we need to clear the Cart data and user data inputs when the user clicks "Confirm" and show a loading spinner followed by a success message if the Cart was submitted.

## Adding Better User Feedback

In this lecture, we set up a few new states (for when the order is being Submitted, and when that Submission is finished) in order to provide some interum modal messages about the status of the order. We show "Sending order data..." when the order is being submitted, but has not submitted yet, and "Successfully sent the order!" when the order has finished being submit. When neither of those states are occuring, we display the Checkout page as normal.

We also set up a means to clear the Cart in our CartProvider.js file. We add the following to the CartProvider Component:

```
const clearCartHandler = () => {
  dispatchCartAction({ type: 'CLEAR' });
};
```

In the cart-context.js file, we add a clearCart method to our CartContext:

```
const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
```

And back in CartProvider.js, we point our clearCartHandler method to be tied to the cartContext's clearCart method:

```
const cartContext = {
  items: cartState.items,
  totalAmount: cartState.totalAmount,
  addItem: addItemToCartHandler,
  removeItem: removeItemFromCartHandler,
  clearCart: clearCartHandler,
};
```

And finally, back in our Cart.js, upon Checkout form submission, after all validation and setting our submission states, we call the cartContext object's clearCart method!:

```
  setIsSubmitting(false);
  setDidSubmit(true);

  // Clear the Cart
  cartCtx.clearCart();
```

## Summary

And that's it for this section! We're now leveraging a backend for fetching our meals and sending our orders. We added a form with validation during Checkout.

# Section 18: Redux (An Alternative to the Context API)

`Originally Started: 11/27/2021`

## Module Introduction

- Understanding Redux
  - Managing App-Wide State with Redux
- What is Redux? Why use it?
- Redux Basics & Using Redux with React
- Redux Toolkit

## Another Look At State in React Apps

What is "Redux"?

- A state management system for cross-component or app-wide state

What is Cross-Component / App-Wide State?

- We can split state into three types:

  - Local State:
    - State that belongs to a single component
    - E.g listening to user input in an input field; toggling a "show more" details field
    - Typically managed with useState / useReducer
  - Cross-Component:
    - State that affects multiple components
    - E.g open / closed state of a modal overlay
    - Requires "prop chains" / "prop drilling", managed with useState / useReducer
    - Cumbersome, can use React Context to make more elegant
  - App-Wide State
    - State that affects the entire app (most / all components)
    - E.g user authentication status, light/dark theme
    - Can manage with useState / useReducer, and "prop chains" / "prop drilling"
    - Cumbersome, can use React Context to make more elegant

## Redux vs React Context

Why Redux if we already have React Context?

- Both Redux and React Context to help us manage cross-component and app-wide states: It gets messy and tedious passing up and down props/states! Redux makes state management simpler.
- Can use both Context and Redux in single application (mix-and-match).
- React Context can have potential disadvantages...
  - 1. Can have a complex setup -- managing this becomes difficult. Could end up with a lot of deeply-nested Context Providers. Or if you try to shove everything into one Context Provider, you end up with a large file that is responsible for far too much!
  - 2. Performance - Context is really only optimized for low frequency unlikely updates (like locale/theme)

## How Redux Works

Core Redux Concepts

- **One** Central Data (State) Store for entire application
- Components set up **Subscriptions** to the central store
  - Whenever data changes, the store notifies the components, who can then get the data they need (a slice) and use it accordingly

How do we change data in the store?

- Components **never** directly manipulate the store data!
- Use a concept called **Reducers**
  - **Reducer function** is responsible for mutating (changing) the store data
    - Note this function is _not_ React's useReducer() Hook. Reducer function is a general concept
- How do we connect components and that reducer function???
  - We _trigger_ some data change with **Actions**
  - Components _dispatch_ / _trigger_ actions, which describe what should be done
- Actions are simple JS objects which describes the operation the reducer should perform
  - Actions are forwarded to the reducer, reads that description of the desired operation, and that operation is performed by the reducer. Reducer spits out a new state to replace the existing state
- Subscribing components are notified after this state change!

## Exploring the Core Redux Concepts

The Reducer Function

- Standard JS function
- Called by redux library
- Two params: Old State + Dispatched Action
- Must return a new state object
- Should be a pure function (same inputs always produce same outputs, no side effects - no HTTP requests, fetch / write to local storage)

```js
const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return {
        counter: state.counter + 1,
      };

    default:
      return state;
  }
};

const store = redux.createStore(counterReducer);

// Will run every time its alerted of a state change
const counterSubscriber = () => {
  const latestState = store.getState();
};

store.subscribe(counterSubscriber);

setInterval(() => {
  // counterSubscriber will run every 2 seconds
  store.dispatch({ type: 'increment' });
}, 2000);
```

## Preparing a new Project

- Redux can be used in _any_ JavaScript project -- not just React!
- Doesn't know anything about React -- or care!
- To make working with Redux in React applications easier, we use a second package: **react-redux**
  - Makes connecting React apps to Redux stores and reducers versy simple. Easy to subscribe components to Redux store
  - Can install using `npm install react-redux`

## Creating a Redux Store for React

- Convention to store Redux related code in a src/store/ folder
- We basically do every step as previous, except we do not call dispatch or subscribe -- we will have the Components handle that later

## Providing the Store

- Typically done in the index.js file

```js
// Index.js
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

- Now the store is provided to App and any other child components
- They can tap into it, subscribe to it, dispatch actions, get data out of the store, etc

## How to Work with Redux State Correctly

- **Never** mutate the current state in a reducer!
- It may look like it works properly, but it can have unwanted side-effects
- Always return a brand new object where you copy any nested objects / arrays and create brand new values

## Redux Challenges & Introducing Redux Toolkit

- Potential to typo our action types
  - Could create constants, or enum-type data structures in plain JavaScript to remedy this
- The more data we manage, the bigger the state objects get. Means more copying of state when we update just a single piece of state
  - Could split reducer into multiple smaller reducers
  - Could use third party packages that allow you to automatically copy state and ensure you don't accidentally edit it
- Respecting state immutability can be challenging

To remedy all these potential issues, we can use the **Redux Toolkit** library.

- Developed by the same team as React Redux and Redux
- Extra package which makes working with Redux easier

## Adding State Slices

Installing **Redux Toolkit**

Using Create React App

- `npx create-react-app my-app --template redux` for Redux + Plain JS template
- `npx create-react-app my-app --template redux-typescript` for Redux + TypeScript template

In an Existing App

- `npm install @reduxjs/toolkit`
- `yard add @reduxjs/toolkit`

Can then uninstall Redux, as the Redux Toolkit includes it!

`Originally Completed: 11/28/2021`

# Section 19: Advanced Redux

### `Originally Started: 11/28/2021`

## Module Introduction

We'll cover more advanced Redux topics in this section, such as:

- Handling Async Tasks with Redux
- Where to Put Our Code
- The Redux DevTools

## Redux & Side Effects (and Asynchronous Code)

Important rule

- Reducer functions must be _pure_, _side-effect free_ and synchronous
  - Applies to Redux reducers and React's useReducer hook
- Input (old state + action) => Output (new state)

When we dispatch an action that requires a side-effect / async task, where should we put that code then? If it can't go in the reducer function...

- Directly inside the component (e.g useEffect(), only dispatch an action when that side-effect is done)
- Inside our own **action creators**
  - Redux has a solution that allows us to perform side-effects / async tasks as part of these action creators, without changing the reducer function

## Frontend Code vs Backend Code

Frontend code depends on backend code
Two possible approaches

- 1. Backend API does a lot of work (i.e transform data + stores data). Frontend react App sends data & receives + use response (i.e less code on the frontend, ahead of the reducer)
- 2. Backend API does very little work (i.e just stores incoming data). Frontend React App transforms data and sends data (i.e more code on the frontend, ahead of the reducer)

Approach 2 is what we're doing so far -- in our cart reducers we aren't just getting the finished cart as the payload, we are getting parts and figuring out how to add it to the cart. Makes complete sense, since we have no backend yet. But now we need a way to still do this work in the reducer, and then send that transformed data to the backend, without doing that sending inside the reducer (since it has to be pure).

## Where to Put Our Logic

Fat Reducers vs Fat Components vs Fat Actions

Where should our logic (Code) go?

Differentiate between two types of code:

- Synchronous, side-effect free code (i.e. data transformations)
  - Typically, prefer Reducers. Avoid Action Creators or Components for this type of code.
- Async code or code with side-effects
  - Prefer Action Creators or Components
  - **Never** use Reducers

So if we extract the data-transformation code (for our Cart logic) out from the Redux store reducer file its currently in, and make it part of a React component itself, we are taking a suboptimical approach!

Then how should we handle this? We need to prepare our cart data before we send it to Firebase, since we can't from inside the Reducer...

## Using useEffect with Redux

Nothing new here; use `useEffect()` to run some fetch request to our Firebase API any time the `cart` state has changed (retrieve using `useSelector()`). So every time we dispatch an event that alters the `cart` state, the `useEffect` will run, make a call to the Firebase API, and send it an object representation of the current Cart, which will be replaced in the database via a "PUT" request.

## Using an Action Creator Thunk

The second approach to having side-effects or async code in conjunction with Redux is to create our own Action Creator.

What Is a "Thunk"?

- A function that delays an action until later
- An action creator function that does _not_ return the action itself, but another function which eventually returns this action

(This section was **confusing AF** -- might want to re-watch it or invest time watching outside resources. Honestly doesn't seem like a worthwhile pattern when implementing the same approach in the Component itself was so easy)

## Getting Started with Fetching Data

## Finalizing the Fetching Logic

## Exploring the Redux DevTools

- These are extra tools which make debugging Redux and its state easier
- Install as a Chrome, Firefox, Edge, etc add-on
- Can view when actions occur, the state they change, a timeline of all actions, etc

## Summary

- Practiced more Redux
- Learned about Redux with side-effects or async code
- Can put this async / side-effect code different places, and how to do each
  - We prefer this code in Action Creators or Components, **never reducers**
  - Putting in Component was rather lean and simple
  - Putting it in custom action creators is a bit more complex, perhaps more elegant
- Learned Redux DevTools
  - Understand our Redux store and state better

`Finished Section: 11/28/2021`

# Section 20: Building a Multi-Page SPA w/ React Router

### `Originally Started: 11/29/2021`

## Module Introduction

So far we've created apps where the URL never changes. Although we build Single Page Apps with React, we want the URL to change for several reasons, including ability to Bookmark, share a particular area of the site with someone, etc.

We will build a SPA, but where React can change the URL!

- What is Client-Side "Routing"?
- Using React-Router
- Advanced Features: Dynamic & Nested Routes, and more!

## What is Routing & Why?

- When building complex user interfaces, we typically build **Single Page Applications (SPAs)**
  - Only one initial HTML request & response
  - Page (URL) changes are then handled by client-side (React) code
    - Changes the visible content without fetching a new HTML file

We can accomplish this with a very popular package... **React-Router**!

## Installing React Router

We will learn Version 5, although 6 just came out.

`npm install react-router-dom@5` or `npm install react-router-dom@latest` if we want the newest

- Note we don't install just `react-router` -- we want the DOM version, which is the version for apps that run in the browser

## Defining & Using Routes

```js
// In App (or Index)
import { BrowserRouter } from 'react-router-dom';

<BrowserRouter>
  <App />
</BrowserRouter>;

// In some component
import { Route } from 'react-router-dom';

<Route path='/home'>
  <OurComponent />
</Route>;
```

The above "OurComponent" will only render if the URL is "/home"

- Might be good to store Components that are used as Routes in a "pages" folder

## Working with Links

We can use the **Link** Component to essentially replace anchor tags

- We don't want anchor tags, because they cause a request to be made and the page will refresh

```js
// Basically just replace any anchors with <Link>
<Link to='/about'>About</Link>
```

## Using NavLinks

Often we want to highlight the active link in a navigation, or give it some special styling

To do this, we can use the **NavLink** component instead of the Link.

- Works the same
- Sets a special CSS class name on the active link
- We define this class name with the NavLink's **activeClassName** prop:

```js
<NavLink activeClassName='ourClassName' to='/about'>
  About
</NavLink>
```

## Adding Dynamic Routes with Params

For routes we cannot predict, or that use some special slug or ID, we can use **dynamic routes**

- Basically just put ":paramName" in the route

```js
<Route path="/products/:productId">
  <Product >
</Route>
```

- Now any route matching "/products/anything" will be handled here
- We use dynamic routes when we want to retrieve data that depends on the type of product we click, for example.

## Extracting Route Params

```js
import { useParams } from 'react-router-dom';

const params = useParams();

// If url is: /products/:productId/
params.productID;
```

## Using "Switch" and "exact" for Configuring Routes

When we define our routes, by default **all** routes that match our URL will be loaded.
Example: "/products/someProductId" will match "/products" **and** "/products/:productId"

- Sometimes this is desirable behavior, but most of the time it is not
- We can ensure only one route is active at once by wrapping all our Route elements in a **Switch** component

```js
import { Switch } from 'react-router-dom';

<Switch>
  <Route path='/products'>Products Stuff</Route>
  <Route path='products/:productId'>Specific Product Stuff</Route>
</Switch>;
```

The Route that is matched **first** will be the one that is rendered

- Note that a "match" in React-Router simply means the route _starts_ with what is in the URL

  - So "/" matches "/products"
    We can fix this new issue by re-ordering the Routes in a way that prevents this type of undesirable match. But this isn't always possible, and it's tedious and annoying!

- So we can use the `exact` keyword inside a Route element, to ensure the patch is an actual _match_ in the truest definition of the word
  - It now has to match the _full_ path name!

```js
<Route path="/products" exact>
```

`Originally Started: 11/30/2021`

## Working with Nested Routes

- You're not limited to defining Routes in only one place
- If put on a Component that's currently active, it will be evaluated
- Can define a Route within a Route, allowing you to build more complex interfaces
- Renders both Routes

## Redirects

```js
import { Redirect } from 'react-router-dom';

<Route path='/' exact>
  <Redirect to='/home' />
</Route>;
```

## Adding a "Not Found" Page

- Define a route with the wildcard character: `<Route path="*">`
- In that route, render your Page Not Found JSX

## Implementing Programmatic (Imperative) Navigation

If we want to programmatically send our users to a new URL, based on an action they took (that isn't simply clicking a NavLink or Link), we can do so with react-router-dom's `useHistory` hook:

```js
import { useHistory } from 'react-router-dom';

const history = useHistory();

// If we want to have the ability to go "Back" to the current URL:
history.push('/quotes');

// If we want to take the user to a new URL but disable their ability to go back to the current page:
history.replace('/quotes');
```

## Preventing Possibly Unwanted Route Transitions with the "Prompt" Component

In some situations, we want to alert the user that they are about to leave the page (if they are typing in form data, for instance). This allows the user to either Ok or Cancel the page change, so they don't lose their current place / form data if they didn't intend to. We can allow this type of functionality with the `Prompt` component:

```js
import { Prompt } from "react-router-dom";

<Prompt when={isFormFocused} message={(location) => } />
```

- Import Prompt and use it as a Component
- Set Prompt's `when` property to a true/false condition which specifies what condition must be met in order for a URL change to trigger a prompt
- Prompt's `message` property expects a function which returns a string of text we want to show to the user
  - Function stores a location object, which stores info about the page we are trying to go to
  - Allows us to include the path we are trying to go to, for instance

## Working with Query Parameters

- Query Params are _optional_ -- whereas the route params we worked with earlier are _mandatory_
- Does not impact the route-matching
- For example, adding: "?sort=ascending" to the end of a URL, which provides optional logic for sorting

```js
import { useLocation } from 'react-router-dom';

const location = useLocation();
const queryParams = new URLSearchParams(location.search);

// We can now use ".get()" and check what the value of the "search" query param is
const isSortingAscending = queryParams.get('sort') === 'asc';
```

- We import `useLocation`, so we can retrieve information about our current page
  - In particular, we get access to a `search` property, which shows our query params
- We create a built-in vanilla JavaScript object called `URLSearchParams`, passing `location.search` into it: `const queryParams = new URLSearchParams(location.search)`
  - This retrieves the current URL's query params
  - We can check the query params for a certain param's value with the `get` method: `queryParams.get("sort")` (where "sort" is the param we want to retrieve the value of)

It's also important to note that a call to `history.push("newUrlLocation")` will result in a Component's re-render.

- We use this to our advantage, by retrieving the current location's query params outside of our component's render method, and use that information to develop what we want the component to render, based on the current query params

## Getting Creative with Nested Routes

We can take advantage of the power of nested Routes by rendering content conditionally based on the current Route, rather than introducing and managing new state into our component. Take our QuoteDetail component, for example. We want the "Load Comments" button to be rendered only when the comments aren't already showing (which also corresponds to when the url is appended with "/comments"). Instead of introducing a "areCommendsLoaded" state, we can wrap the Load Comments button in a Route that precludes "/comments":

```js
return (
  <React.Fragment>
    <HighlightedQuote text={quote.text} author={quote.author} />
    <Route path={`/quotes/${params.quoteId}`} exact>
      <div className='centered'>
        <Link to={`/quotes/${params.quoteId}/comments`} className='btn--flat'>
          Load Comments
        </Link>
      </div>
    </Route>

    <Route path={`/quotes/${params.quoteId}/comments`}>
      <Comments />
    </Route>
  </React.Fragment>
);
```

## Writing More Flexible Routing Code

Rather than hard-coding our route paths everywhere, we can make use of `useLocation` and `useRouteMatch` to retrieve our current URL / path. Then, inside nested routes, we can embed that information rather than hard-coding it. This allows us to save time and code if we ever want to change a parent component's route -- we no longer have to dig into each nested route and change its path too!

We can convert our above set of nested routes to:

```js
import { useLocation, useRouteMatch } from 'react-router-dom';

return (
  <React.Fragment>
    <HighlightedQuote text={quote.text} author={quote.author} />
    <Route path={match.path} exact>
      <div className='centered'>
        <Link to={`${match.url}/comments`} className='btn--flat'>
          Load Comments
        </Link>
      </div>
    </Route>

    <Route path={`${match.path}/comments`}>
      <Comments />
    </Route>
  </React.Fragment>
);
```

We can also push an object into `history`, rather than creating long, ugly string representations of the URL we wish to navigate to:

```js
history.push({
  pathname: location.pathname,
  search: `?sort=${isSortingAscending ? 'desc' : 'asc'}`,
});
```

## Sending & Getting Quote Data via HTTP

(Not Router related!)

## Adding the "Comments" Features

(Not Router related!)

## IMPORTANT: REACT ROUTER UPDATE (TO VERSION 6)

React Router was updated! It introduces quite a few changes that we will need to keep in mind if we want to use the latest version. However, the process to upgrade old React Router code to new code is rather simple.

Installation

`npm react-router-dom@6` or `npm react-router-dom@latest`

Switch - No Longer Used

- With version 6, Switch does not exist!
- We replace Switch with `Routes`
  - `import { Routes } from "react-router-dom";`

Route Changes

- The content we want to render when a Route is matched is no longer a child of the Route component
- Instead, we pass the content we want to render to the Route's `element` property: `Route path="/welcome" element={<WelcomeComponent />}`
  - This `element` property expects JSX!
- Since Route no longer expects children, it becomes a self-closing component

Internal Logic for Path Evaluation

- In Version 5, we relied on the `exact` keyword
- In Version 6, there is **no** `exact` prop! By default, all paths are expecting an exact match
- If you want the old non-exact behavior, where only the _start_ of the path name needs to match, you add `/*` to the end of the Route's `path` property
- Version 6 now also has a better algorithm for picking the best Route to be loaded
  - Therefore, the order you define Route in is no longer important, even when using the `/*` syntax for non-exact matches

Link

- Still have Link and NavLink components
- In version 5, you could use the `activeClassName` prop on a NavLink to apply some CSS class to active links
- In version 6, this prop is removed; instead, we manually figure out if the class is active:

```js
<NavLink
  className={(navData) => {
    navData.isActive;
  }}
  to='/welcome'
>
  Welcome
</NavLink>
```

- A NavLink's className now expects a function, which gives you info about the link and current state of navigation
- The object received as a param inside this function gives you access to an `.isActive` property
- You can use the `isActive` return value to dynamically apply classes:

```js
<NavLink className=={(navData) => navData.isActive ? classes.active : "" }>
```

- More control and customization option, but a little more vorbose and tedious than version 5

Redirect

- Redirect component no longer exists!
- We use `Navigate` instead:

```js
import { Navigate } from 'react-router-dom';

<Navigate to='/welcome' />;
```

- Used like the above, this _pushes_ a navigation to this page onto the navigation stack
- If we truly want to redirect (replace current page with new page) we'd have to add the `replace` prop:

```js
<Navigate to='/welcome' replace />
```

Nested Routes

- In version 5, we didn't have to wrap all our Route definitions in a Routes (or Switch) tag.
- In version 6, we must wrap our Route components in Routes, always
  - Even if we have just one Route in a nested component, we must wrap it with `<Routes> </Routes>`
- The logic and syntax you need for nested routes also changed -- for the better!
- Example. If we have a "/welcome" route, and we have logic nested in it to where we _also_ want to render an _additional_ route at the same time for new users (at "/welcome/new-user")
  - We must ensure the parent route uses the new "/\*" syntax, to allow for non-exact matches
  - The child / nested route's `path` property is now _relative!_ So instead of the child Route's `path` being `path="/welcome/new-user"`, we change it to the following in version 6: `path="new-user"`
- Note that for Link and NavLink in nested components / routoes, the `to` paths are also relative.
- Because of the relative path change, we won't need custom path resolving logic any more! So no more use of `match.url` and `match.path` in our path/to properties

Alternate Way of Nesting Routes

Instead of defining routes in the component where we want to load that nested route content, we _can_ (but don't have to) cut the route from the component, go to the main route definition file (App in our case) and define the nested routes there -- as a child of other Route components!

```js
// App.js
<Routes>
  <Route path="/"> element={<Navigate to="/welcome" />} />
  <Route path="/welcome/*" element={<Welcome />}>
    <Route path="new-user" element={<p>Welcome, new user!</p>} />
  </Route>
</Routes>
```

- In the above example, we removed the Route for path="new-user" from a Component we have in another file, and place the logic directly with all the other main Route definitions
- Benefit of having all Route definitions in one place -- easier to see them all and understand the layout of the app
- With this syntax, we have to tell React where in the DOM to insert this nested Route's content

  - So we use the new `<Outlet />` component!

  ```js
  import { Outlet } from 'react-router-dom';

  const Welcome = () => {
    return (
      <section>
        <h1>The Welcome Page</h1>
        <Outlet />
      </section>
    );
  };
  ```

  - In the above, we are telling React that for wherever there is a nested Route in the Welcome component, we want it rendered in the location of the Outlet.

Imperative Navigation

- If we want to navigate when a certain action finishes, button was clicked, etc, in version 5 we used `useHistory` and used that object to call `push` to navigate to a new URL
- In version 6, we use the `useNavigate` hook instead!

  - Used pretty much the same way as `useHistory`. If we want to push a new location onto the history stack and go there:

  ```js
  import { useNavigate } from 'react-router-dom';

  const navigate = useNavigate();
  navigate('/welcome');
  ```

  - Or, for a redirect (replaces instead of pushes onto the history stack, disables us from revisiting previous page):

  ```js
  navigate('welcome', { replace: true });
  ```

  - We can also pass in numbers to `navigate`. Example: `navigate(-1)` means go back to previous page, `navigate(1)` means go forward one page, `navigate(-3)` means go back 3 pages, etc

Prompt Component

- In version 5, we used the `Prompt` component to ask the user to confirm if they wanted to leave a page (if on a form, for example)
- Unfortunately, version 6 currently does not have this functionality!
  - Probably will come back in the future

`Section Completed: 12/02/2021`

# Section 21: Deploying React Apps

## Module Introduction:

- This section will cover:
  - Going from development to production
  - Move React app from local machine to real server
  - Deployment Steps & Pitfalls
  - Server-side Routing vs Client-side Routing

## Deployment Steps

- Test code before you deploy
- Explore optimization opportunities for your code
  - Look into lazy loading
- Build App for Production
  - Execute a script (provided by React) that will output a production-ready bundle of our code
    - Minified, optimized code package
- Upload Production Code to Server
- Configure Server / Hosting Provider's Offering

## Adding Lazy Loading

- Lazy loading means that we load code only when that code is needed
  - Split our code into multiple bundles, each only downloaded when they are needed
  - Easy to implement if you are using routing
    - Code for a route is only needed when that route is visited
- How to use:

```js
import React from 'react';
import AllQuotes from './pages/AllQuotes';
// import NewQuote from "./pages/NewQuote";
// Instead of the above import, do:
const NewQuote = React.lazy(() => import('./pagesNewQuote'));
```

- But need to define a fallback UI for when the Component's code is being downloaded
- Solution: Suspense Component! Wrap it around the code where we use the desired Component

```js
function App() {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <NewQuote />
      </Suspense>
    </div>
  );
}
```

### Building The Code for Production

- To build for production, run the following in the command line:

```js
npm run build
```

- A "build" folder will appear, storing the code you need to store on your server
- Never change the code within the "build" folder! To so within your src folder
- "static" folder in the "build" folder stores optimized CSS and JS code

### Getting Started With Deployment (Uploading Files)

- Important: A React SPA is a "Static Website"
  - Only HTML, CSS & browser-side JavaScript
  - The "build" folder contains no code at all that needs to be executed on a server
    - (Of course, we can build our own backend instead of Firebase, but just a React app is a Static Website)
  - So we need a Static Site Host!
    - Again, we will go with Firebase for our hosting, as we did when using it for our dummy API
- Firebase:
  - Have a Firebase account
  - Run` npm install -g firebase-tools`
  - Run `firebase login` command
  - Intiate your project with the following command (in your project folder)
    - `firebase init`
  - Select "Hosting: Configure and deploy Firebase Hosting sites"
  - Select create new or use existing Firebase project
  - It will ask: What do you want to use as your public directory? Default is public
    - We want our build output! So the "build" folder
  - It will ask if we want to configure app as a single-page app?

### Exploring Routing Issues & Finishing Deployment

- When deploying a Single Page Application, it's important to udnerstand there is a diff between server side and client side routing
- React Router is a browser-side package
- Why does that matter?
- In a SPA, we want to ignore the path (part after domain) on the server, and always return the same response (files) no matter which path the user targetted
- The server needs to ignore that path. By default a server does not do that!
- With Firebase, this is easy: It asks if we want to rewrite all urls to /index.html
- Set up auto builds and deploys with Github? Nah!
- "File build/index.html already exists. Overwrite?" - No!
- Finally, run `firebase deploy` - uploads code, and gives us a URL
- If we ever want to take our site down: `firebase hosting:disable`

# Section 22: Adding Authentication to React Apps

# Section 23: A (Pretty Deep Dive) Introduction to Next.js

### `Originally Started: 11/29/2021`

## Module Introduction

- This module will teach...
  - What is NextJS? And Why?
  - File-based Routing & Page Pre-rendering
  - Data Fetching & Adding an API

## What is Next.JS?

- The React Framework for Production
- A _fullstack_ Framework for ReactJS
- Frameworks are bigger, more feature-rich than a library (which React is)
- NextJS solves common problems and makes building React apps easier
- Lots of built-in features (e.g. routing) that help you solve common problems, and clear guidance on how to use those features
- You still write React code, you still build React components and use React features (props, state, context, etc).
  - NextJS just enhances your React apps and adds more features!
- There are certain problems which you will need to solve for almost all production-ready React apps: NextJS solves those for you!

## Key Feature 1: Built-in Server-side Rendering (Improved SEO!)

- Server-side rendering: Preparing the content of the page on the server instead of the client
  - Client-side rendering of React apps has actual HTML code that is pretty empty
  - Search engine crawlers will only see the empty HTML page, not the content of your page
  - Client-side can have flickering loading as data is being retrieved before it is displayed
- Server-side can pre-render React pages on a server
- ReactJS has this feature too, but it can be tricky to setup. NextJS has it built-in and makes it simple!
- Blending client-side and server-side: Fetch data on the server and render finished pages

## Key Feature 2: Simplified Routing with File-based Routing

- In traditional React, we don't even have a "router" (illusion of multiple pages - changing what's visible on screen based on URL, w/o sending a request to a server)
  - Need React Router for this
- In NextJS, you define pages and routes with files and folders instead of code
  - This leads to less code, less work, and is highly understandable (close to typical web development)

## Key Feature 3: Build Fullstack Apps

- Easily add backend (server-side) code to your Next / React apps
- Storing data, getting data, authentication, etc, can be added to your React projects

## Creating a New Next.js Project & App

- Need Node.js!
- `npx create-next-app` command to create a NextJS app
- `cd <project-name>` and then `npm run dev` to start your development server after

## Analyzing the Created Project

- create-next-app gives us a project with "pages", "public", and "styles" folders.
- styles: Holds some style files
- public: Holds public resources page might use, like images
  - No index.html like in React app
- pages: Most important folder. Where we set up our file-based routing. The pages that make up our application are here

## Adding First Pages

- The filename under the "pages" folder will be used as a path name. E.g "news.jsx" is served to "our-domain/news"
- The index.js file is served for the root route
- Inside these files, you create typical React components (which don't have to be named after the file name, as is typically convention with pure React components)

## Adding Nested Paths & Pages (Nested Routes)

Instead of having a file like "news.js" in the "pages" folder, and thus that file is rendered when visiting "our-domain/news", we can choose a different file structure:
pages/news/index.js

- So folders you create in the "pages" folder _also_ act as path segments
- If we want nested paths, like "news/something-important", we _need_ to use this sub-folder system: pages/news/something-important.js
  - And from here, we can again choose to do another sub-folder called "something-important" and put an "index.js" in there, rather than "something-important.js" directly in the "news" folder

## Creating Dynamic Pages (with Parameters)

What if we need dynamic pages? For example, different news articles at a URL like "/news/:newsId"?

- We name the file with brackets, with the identifier inside them. So for our news example, we would have: "pages/news/[newsId].js"
  - This tells NextJS that this is a dynamic page

## Extracting Dynamic Parameter Values

Now how do we extract the concrete value entered into the URL? We use a special React hook that NextJS provides us (or its alternative for Higher Order Components and Class-based Components): `useRouter`

- We import it from NextJS's router sub-folder (which is a sub-package which exposes routing-specific functionality)
- Regular React hook -- not built into React, but a custom one by the NextJS team
- We instantiate this hook via a call like `const router = useRouter();`
  - This will give us methods for programatic navigation, and the values encoded in the URL
  - Gives us access to a `query` object, which we can then use to access a property with the identifier included in the brackets in our filename

```js
import { useRouter } from 'next/router';

const router = useRouter();
console.log(router.query.newsId);
```

- Note in the above example, console.log shows "undefined" and then whatever we typed into the URL
- useRouter runs immediately when page is first rendered - doesn't know what's in the URL yet
- Once we have that information, the component renders again logs the correct value

## Linking Between Pages

Like with pure React apps, we want to avoid linking between pages using anchor tags, as it sends a new HTML page request and causes a page refresh. We would also lose our current state.

In NextJS, we simply replace anchor tags with `Link` elements, and we even keep the href property:

```js
import Link from 'next/link';

// In render method
<ul>
  <li>
    <Link href='/nextjs-is-a-great-framework'>NextJS Is A Great Framework</Link>
  </li>
  <li>
    <Link href='/is-nextjs-a-great-framework'>
      Is NextJS A Great Framework?
    </Link>
  </li>
</ul>;
```

- `Link` component renders an anchor tag, but watches clicks on those anchor tags and if you click there is prevents browser default of sending request. Instead, loads the to-be-loaded component and changes the URL so it _looks_ like the page was changed
- Highly-interactive and reactive SPA, can manage and store state across pages. Yet if user visits this page as initial pages (by just entering this URL in), can return finished HTML page here. Search engines can see this finished page

## Onwards to a Bigger Project!

With the very core basics of file-based routing done, we will abandon this mini news article project and learn other NextJS concepts with another project.

The project will have a page where we can create "Meet Ups", which will be stored in a database. A page where we fetch and display a list of meet ups. Can visit the details page of a given meet up.

## Preparing the Project Pages

We just create some files in the pages folder here.

## Outputting a List of Meetups

More simple React stuff.

## Adding the New Meetup Form

More boring, pointless stuff that has nothing to do with NextJS.

## The "\_app.js" File & Layout Wrapper

The "\_app.js" file that is automatically created in the "pages" folder is like your _root component_

- It defines a _MyApp_ component
- Special component that acts as a root component NextJS will render
- Receives props, pulls a Component and pageProps prop from the props
  - These props are passed in automatically by NextJS
  - Component is a prop that holds the page contents that will be rendered. Different whenever we switch a page
  - pageProps are specific props our pages might be getting
- We can wrap this Component with our "Layout" component, so it applies to every page we will render
  - The alternative is we go into each individual page Component and wrap our Layout around each one -- tedious!

## Using Programmatic (Imperative) Navigation

To navigate programmatically, we can again use the `useRouter` hook from `next/router`, like we did with dynamic routes (and its `query` property):

```js
import { useRouter } from 'next/router';

const router = useRouter();

// In some event handler
router.push(`/meetups/${meetup.id}`);
```

## Adding Custom Components & CSS Modules

**Tip:** Keep your page components clean; outsource as much JSX as possible to stand-alone components, and no including CSS files

- NextJS also supports **CSS Modules**
- Name your css files with the name of the component they style, followed by ".module.css"
- Now your styles to that component will be scoped to only them. Prevents class name clashing

## How Pre-rendering Works & Which Problem We Face

- The pre-rendered page / HTML that NextJS auto-generates takes the contents found within the _first_ render cycle of a component
- So if we have a useEffect that fetches data, on first render cycle that data will be empty, and the 2nd render cycle it will have its fetched data
  - But NextJS uses the HTML of the first cycle for its pre-rendered HTML code, so search engines won't know of our content that we generated using our fetched data (lists, etc)

NextJS has solutions to this problem, though! We can pre-render a page with data that takes time to retrieve...

## Data Fetching for Static Pages

NextJS Page Pre-Rendering

Problem: Pre-rendered page has a snapshot of the Component's first render cycle as its cycle, might be missing crucial async data
Request -> /some-route -> Return pre-rendered page
Good for SEO <- Return pre-rendered page -> Hydrate with React code once loaded -> Page / App is interactive

NextJS gives us two forms of pre-rendering:

- Static Generation
- Server-side Rendering

Static Generation

- NextJS's default behavior
- Approach you should typically use
- Component pre-rendered when you _build_ the app for production (with `npm run build script`)
- Not pre-rendered on the fly on the server, but instead when you build site for production
- Does not change after deployed
  - Update data and know the pre-rendered page needs to change? Start build process again, redeploy again
- For dynamic data, export a special function from within a **Page** component file: `getStaticProps()`
- Now will call `getStaticProps` before it calls the Component function
- These props will contain the data this Page needs
- `getStaticProps` allowed to be async
- Can execute any code that would normally execute on a server
  - Any code in here never ends up on the client side, never executes on the client side
  - This code is executed during the build process -- not on server and especially not on client!
- **Must** return an object from `getStaticProps`
  - Typically contains a `props` object within it (this is what your Component's props will be)

Example:

```js
function Homepage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export function getStaticProps() {
  // Fetch data from an API (here we will pretend our predefined DUMMY_MEETUPS is fetched data)

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
```

## More on Static Site Generation (SSG)

In the above return of the props object, we can add a `revalidate` property, along with an integer (representing a number in seconds). This will cause the page to be revalidated / re-pre-generated on the server _after_ deployment

## Exploring Server-side Rendering (SSR) with `getServerSideProps`

Sometimes even a regular update (with `revalidate` is not enough) -- we may need to re-generate the page for _every_ incoming request. We want to re-generate dynamically on the server. The alternate to solve to `getStaticProps` for this scenario is `getServerSideProps`

```js
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
}
```

- This function won't run during the build process, instead always on the server after deployment
- Still returns an object with a props property
- Any code we write here will always run on the server, never the client
  - Good place to run operations that use credentials that shouldn't be exposed to users
- Can't set `revalidate` -- wouldn't make sense or be necessary
- Can work with the _context_ parameter (you can with `getStaticProps` as well)
  - Context can retrieve the request and response objects, similar to NodeJS / Express
    - Unlike with Node and Express, we don't return a response, we return the object with the props still

Which one should we use? Static or Server-Side?

- Serverside-Side
  - For when we need access to the request object or data changes multiple times every second (where even revalidate won't help)
  - Disadvantage: Wait for page to be generated on every incoming request
- GetStaticProps:
  - Faster, can be cached and re-used instead of re-generated
  - Better if we don't need access to request object and data doesn't change every few seconds

## Working with Params for SSG Data Fetching

For our MeetingDetailsPage component, we want to convert it to a Static Site Generation. But the contents of this page (information about a specific meetup -- whichever one is in the URL) rely on the URL, which we normally would make use of the `useRouter` prop from NextJS. But we need this information in our `getStaticProps` function, which cannot use React Hooks.

The solution? The `context` argument we can pass into `getStaticProps` provides access to `context.params`!

But now we'll get an error: "getStaticPaths is required for dynamic SSG pages and is missing for "/[meetupId]". What's this about?

## Preparing Paths with "getStaticPaths" & Working with Fallback Pages

`getStaticPaths` is another function NextJS understands

- Need to export in a Page component file if it's a dynamic page and we are using `getStaticProps` (not if using `getServerProps` though, or neither)
- Since the meetup pages are dynamic, NextJS needs to know for which meetup ID's it needs to pre-generate the pages for (how would it pre-generate otherwise?)
- Returns and object where we describe all the dynamic values for which the page should be pre-generated
  - Needs `paths` key (array), which has a `params` key, which is an object of all key/value pairs that might lead to our page

```js
export async function getSTaticPaths() {
  return {
    paths: {
      params: {
        meetupId: 'm1',
      },
    },
    params: {
      meetupId: 'm2',
    },
  };
}
```

- Note in the above example, we are hard-coding two sets of params. Realistically we would do this dynamically using the values returned by a database query

Running the above, we still get an error -- this time it says: "The 'fallback' key must be returned from getStaticPaths in /[meetupId]"

- The `fallback` property in `getStaticPaths` return object is a boolean representing if our paths array contains all supported parameter values or just some of them
  - If set to false, you tell NextJS the paths contains all supported meetupID values
    - If user enters something that isn't supported ("m3") would see 404 error
  - If set to true, NextJS would try to generate a page for that meetupId dynamically on the server
- Good for pre-generating _some_ of the pages for specific IDs (like most frequently visited pages) and pre-generate the missing ones dynamically when requests for them are coming in

## Introducing API Routes

Time to add a real backend with a real database! NextJS makes it easy to build a backend API using its **API Routes** feature

- Special pages which don't return HTML code, but are about accepting incoming HTTP requests with JSON data attached to them
- Allow you to build your own API endpoints as part of your NextJS project
- Served by same server as your NextJS app
- Add special "api" folder to your project's "pages" folder -- must be named _api_!
  - NextJS will pick up any files stored in there and turn those into API routes
  - Don't define React Components in these files. Instead, define functions which contain server-side code
  - Never exposed to client, only run on server
  - Functions are triggered whenever a request is sent to that route (the route determined by the file name)

Example:

```js
// File: pages/api/new-meetup
// URL: api/new-meetup
// POST /api/new-meetup

function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Expected data from our New Meetup Form
    const { title, image, address, description } = data;
  }
}

export default handler;
```

## Working with MongoDB

We will be using MongoDB, with their online Cloud MongoDB Atlas service.

We install the official MongoDB driver: `npm install mongodb`

- Makes sending queries to MongoDB easy
- Allows us to connect to our MongoDB cluster

```js
import { MongoClient } from 'mongodb';
//  URL: api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Expected data from our New Meetup Form
    const { title, image, address, description } = data;

    const client = await MongoClient.connect(
      'mongodb+srv://Matthew:Heaven87!@cluster0.1ryx5.mongodb.net/meetups?retryWrites=true&w=majority'
    );

    const db = client.db();

    const meetupsCollection = db.collection('meetups');

    const result = await meetupsCollection.insertOne({
      title,
      image,
      address,
      description,
    });

    client.close();

    // Insertion successful, chain on json
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;
```

## Sending Http Requests to Our API Routes

We can set our client-side [new-meetup] route to look like the following:

```js
import React from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

function NewMeetupPage() {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    console.log(enteredMeetupData);
    // Send request to our API route
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    router.push('/');
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}

export default NewMeetupPage;
```

## Getting Data From the Database

We could fetch our data from the database in a manner similar to how we POST-ed it:

- We could create a file in "pages/api/meetups.js" and define a handler method, which connects to our mongo client, this time sending a "GET" request. We then would go inside of our MeetupsHomepage component, inside the `getStaticProps` method and make a fetch call like: `fetch('/api/meetups')` -- but this is redundant...
- ...Since our `getStaticProps` method is only called in a server anyways, we can just directly interact with our database here, instead of doing so through a seperate api page file.

Some Notes:

- When you import something in a Page component file, and that something is only used in getServerProps and getStaticProps, that imported package won't be part of the client-side bundle
  - So we can import MongoClient, and it won't be included in the client bundle! Good for size and security

## Getting Meetup Details Data & Preparing Pages

## Adding "head" Metadata

Before we deploy our app, there's one thing we should always double-check: metadata!

- Description meta tag, which will show up on Google searches
- Page title

Setting such head elements / meta tags is relatively simple with NextJS -- we import the necessary `Head` from "next/head" and use it as a Component in our page rendering:

```js
import Head from 'next/head';

return (
  <React.Fragment>
    <Head>
      <title>My React App Title!</title>
      <meta name='description' content='My description here!' />
    </Head>
  </React.Fragment>
);
```

## Deploying Next.js Projects

Many hosting providers to use, and many different ways to configure the project. Can use environment variables to hold things like database variables.

We will use Vercel as the provider here. It is the same team that developed NextJS! This makes the deployment process extremely simple.

- We sign up to Vercel with a Git repo provider, like Github (or GitLab or BitBucket)
- We directly link our Git repo to Vercel, who will get it from that repo and deploy it for you!
- On Vercel, create new repository -- name it, give it a description, choose whether public or private
- Then push your code into it via Git (like you would push code to Github)
  - Go back to your local project, and create a code snapshot (commit): `git add .` then `git commit -m "Ready for deployment!"`
  - Then push into repo: `git remote add origin <githubLink.git>` and `git push --all`
- Link this Github (or whatever) repo to Vercel
  - Select your repo and connect to a Vercel project, name your project, select a framework preset, root directory, environment variables, etc
  - Hit Deploy!
  - Vercel will build and deploy it for you; no build commands required!

What does Vercel do for us? Notice in our package.json file we have some "scripts" values. Vercel is running `npm run build` for us. This gives us a ".next" file which contains some optimized files (like pre-generated HTML files). Then `npm start` starts your _production_ server. It should be running on the remote machine that serves as the server for your app.

A few more steps:

- Over on MongoDB Atlas site, under Network Access, we have to "Allow Access from Anywhere". This allows Vercel servers to communicate with our MongoDB database.
- (Deploy again over on Vercel if you Deployed before setting up Mongo properly)

## Using Fallback Pages & Re-deploying

With our deployed app, if the user adds their own Meetup and then tries to click on the details of that individual one, we get a 404. Why is this? Well, on our HomePage component that displays the list of meetups, in our `getPathProps` we returned an object with `fallback` set to false. Fixing this is simple.

- We set `fallback` to true or -- even better -- "blocking"
  - Tells NextJS that the list of paths we are defining is not complete -- there might be other valid pages
  - NextJS will generate these pages on demand now and cache it
  - Difference between true and blocking:
    - True immediately returns empty page, and then pull down the dynamically generated content once its done (so have to handle cases where page doesn't have data yet)
    - Blocking, user sees nothing until page is pre-generated and the finished page will be served
- Now Redeploy to Vercel:
  - New snapshot in git, add changes, push changes onto Github
- Vercel will detect this change our on main brance and building / redeploying

## Summary

- NextJS has more to offer! Ways of optimizing images, easily add authentication, user sign up / out and manage sessions
- 

# Section 24: Animating React Apps

`Originally Started: 11/28/2021`

## Module Introduction

This section will cover Animating React Apps & Components

- Adding Smooth Animations to our Apps
- CSS Animations & Why They Are Sometiems Not Enough
- Animating react Components with Extra Libraries

A demo project will be provided for us. It uses Class-based Components instead of Functional (ew!)

## Using ReactTransitionGroup

Much like in Colt Steele's React course, we are going to make use of the third party package: ReactTransitionGroup!

- Smoothly animate elements when they are added to and from the DOM
- Install: `npm install react-transition-group --save`

## Alternative Animation Packages

**React-Motion** is also a popular animation package.

- A little tougher to get started
- More physics-based animations
- Don't define durations: It tries its best to determine realistic timings

**React-Move** is also a popular choice

- Exposes two basic components
- Always work with objects describing the state of an animation
- Heavily influenced by ThreeJS transitions
- Can help build more complex animations
- Can animate groups, like bars on a graph

**React-Router-Transition**

- Easily create transitions between different routes!
- Builds up on React-Motion
- AnimatedSwitch component, which you replace your normal Router Switch with
- Does what normal Switch does, but atEnter, atLeave, atActive, className properties
- Animating Routes can be very tricky with other packages -- not-so-hard with this package!

## Wrap Up

- Animations can help guide user attention and provide a nice user experience
- React-Transition-Group gives JavaScript layer to add in order to orchestrate your CSS animations
- React-Motion if want a more CSS-independent solution. Emulates real-world physics

`Section Completed: 11/29/2021`

# Section 25 - Replacing Redux with React Hooks

### `Originally Started: 11/29/2021`

## Starting Project & Why You Would Replace Redux

- Maybe you don't want to learn Redux
- Maybe you rather stay in the React-Only world (no reliance on outside packages)
  - Smaller bundle for your app, less code shipped
- Simply want to explore how you can avoid prop-drilling but still manage state without using Redux

## Alternative: Using the Context API

## Context API Summary (and why NOT to use it instead of Redux)

Converting from Redux to the Context API was rather simple. But what is the downside of this approach?

- Context is great for _low frequency updates_, but not high frequency ones
  - Could argue that the ability to Favorite / Unfavorite is something that happens frequently
- React Context API has no way of knowing which Component that uses the Context is concerned or not
  - _Every_ Component that uses Context will be re-rendered when the Context changes, whether or not that Component uses that piece of Context
- Meant for things like Theme changes, auth, etc

Still another non-Redux alternative that addresses these shortcomings...

## Getting Started with a Custom Hook as a Store

Manage state globally with just React and JavaScript! We basically create our own store and ability to have actions, dispatch based on those actions, set listeners to watch for global state changes, etc

```js
import { useState, useEffect } from 'react';

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier) => {
    // Call the appropriate action function, which returns an updated state
    const updatedState = actions[actionIdentifier](globalState);

    // Updated Global State
    globalState = { ...globalState, ...updatedState };

    // Inform all listeners about this state update:
    for (const listener of listeners) {
      listener(globalState);
    }
  };

  useEffect(() => {
    listeners.push(setState);

    // Remove listener when unmount
    return () => {
      listeners = listeners.filter((listener) => listeners !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
    actions = { ...actions, ...userActions };
  }
};
```

## Creating a Concrete Store

```js
import { initStore } from './store';

const configureStore = () => {
  const actions = {
    TOGGLE_FAVORITE: (currentState, productId) => {
      return {
        products: currentState.map((product) => {
          return product.id === productId
            ? { ...product, isFavorite: !product.isFavorite }
            : product;
        }),
      };
    },
  };

  initStore(actions, [
    {
      id: 'p1',
      title: 'Red Scarf',
      description: 'A pretty red scarf.',
      isFavorite: false,
    },
    // Etc for other products
  ]);
};

export default configureStore;
```

Now how will we use our custom store?

## Using the Custom Store

To use the store, we:

- 1. Import the store as a named import
- 2. Call `useStore()` and set a 2-element array equal to it, where the first element is the global state and the second is a dispatch function

Examples of using custom store hook to access a piece of the global state:

```js
// Favorites.js
import { useStore } from './store';

const [state, dispatch] = useStore();

// Now have access to state, which includes a products property:
state.products; // can access this
```

Example of using our custom store hook to dispatch an action (favorite an item):

```js
// ProductItem.js
import { useStore } from './store';

const toggleFavHandler = () => {
  dispatch('TOGGLE_FAVORITE', props.id);
};
```

## Custom Hook Store Summary

We just built a custom, Redux-like store

- Variables for globalState, listeners, and actions
  - Aren't global. Only exist in our store file. Shared in entire app
  - Every file which imports from the store.js file will use the same values stored there
- That file creates our own custom useStore hook, using the variables defined outside of the hook
  - If defined inside the hook, every Component that used this hook would use its own values -- but we want shared!
- This allows us to globally manage the state, listeners, and actions
- In the useStore hook, we have our dispatch function there
  - It makes sure that whenever we call dispatch we update our global state and call our listeners (which are just setState calls, where we "abuse" the fact that when we call the state update function that useState gives us, any component which uses our custom hook will re-render)
  - We register one listener per component with the help of useEffect, unregister it when component is destroyed
- Have a way of initializing our store
  - Can call multiple times, since we don't replace our actions or global state -- we take teh current actions and global state and merge in new ones
  - This allows us to create concrete store slices (like with Redux with multiple reducers)
- We configure sthe store, set up some actions, and call that initialize store function above with those actions and the initial state of _that_ slice of the global state. Merged with global state and global actions map
- From anywhere in our project we can use that store
  - Can tap into the current global state
  - Can tap into the dispatch function to dispatch an action

This saves us from that extra dependency on Redux! (But is this worth the trouble???)

## Optimizing the Custom Hook Store

We can note that every time we Favorite / Unfavorite an item, **every** ProductItem is being re-rendered. But only the one that actually had its state changed should be re-rendered
But also not that wrapping ProductItem in a React.memo() does not fix this

- (Note: Mine is actually only rendering once? Even without React.memo, and without the update we do in our store soon)

We add an argument to our custom useStore hook, "shouldListen". We set this to true by default. Now when we register our listeners, we first check if shouldListen is true, and then and only then do we push the setState into that listener.

## Wrap Up

Really advanced section!

- You can definitely stick to Redux
  - The overhead is probably not that bad
  - All the heavy lifting done for you once you learn how to use Redux
- Context API if you have low frequency updates and want to have less dependencies
- Can create our own custom hook that has Redux-like store / action / dispatch functionality
- Can also use a third party package which essentially creates the custom hook for us: https://www.npmjs.com/package/use-global-hook
  - Less than 1kb
  - Install using `npm i use-global-hook`

`Section Completed: 11/29/2021`

# Section 26: Testing React Apps (Unit Tests)

`Originally Started: TBD`

# Section 27: React + TypeScript

### `Originally Started: 11/29/2021`

(Might be skimpy on the notes since I'm using this section as merely a refresher)

## Module Introduction

- What and Why?
- TypeScript Basics
- Combining React & TypeScript

## What & Why?

TypeScript is a "superset" to JavaScript

- Extends JavaScript
- Adds **static typing** (JS is dynamically typed)
- Does not run in browser; must be compiled to JavaScript
- Invoke comiler with `npx tsc` or `npx tsc <typescriptFilename.ts>`

## Understanding Type Alias

```js
type Person = {
  name: string,
  age: number,
};

let person: Person;
let people: Person[];
```

## Functions & Funciton Types

```js
// Return type is infered, but we write :number just to show how we could do it
function add(a: number, b: number): number {
  return a + b;
}

// Void if never returns a value
function printStuff(value: any): void {
  console.log(value);
}
```

## Diving Into Generics

```js
function insertAtBeginning(array: any[], value: any) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
const updatedArray = insertAtBeginning(demyArray, -1);
updatedArray.split(""); // Doesn't give error -- but this doesn't work on number types!

// Create Generics version
function insertAtBeginning<T>(array: T[], value: T) {
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];
// Now TypeScript understands we are specifically dealing with numbers in this case
const updatedArray = insertAtBeginning(demoArray, -1);
updatedArray.split(""): // Correcetly warns of error now!
const stringArray = insertAtBeginning(["a", "b"], "c");
```

A Closer Look At Generics
Generic Types ("Generics") can be tricky to wrap your head around.

But indeed, we are working with them all the time - one of the most prominent examples is an array.

Consider this example array:

let numbers = [1, 2, 3];
Here, the type is inferred, but if we would assign it explicitly, we could do it like this:

let numbers: number[] = [1, 2, 3];
number[] is the TypeScript notation for saying "this is an array of numbers".

But actually, number[] is just syntactic sugar!

The actual type is Array. ALL arrays are of the Array type.

BUT: Since an array type really only makes sense if we also describe the type of items in the array, Array actually is a generic type.

You could also write the above example liks this:

let numbers: Array<number> = [1, 2, 3];
Here we have the angle brackets (<>) again! But this time NOT to create our own type (as we did it in the previous lecture) but instead to tell TypeScript which actual type should be used for the "generic type placeholder" (T in the previous lecture).

Just as shown in the last lecture, TypeScript would be able to infer this as well - we rely on that when we just write:

let numbers = [1, 2, 3];
But if we want to explicitly set a type, we could do it like this:

let numbers: Array<number> = [1, 2, 3];
Of course it can be a bit annoying to write this rather long and clunky type, that's why we have this alternative (syntactic sugar) for arrays:

let numbers: number[] = [1, 2, 3];
If we take the example from the previous lecture, we could've also set the concrete type for our placeholder T explicitly:

const stringArray = insertAtBeginning<string>(['a', 'b', 'c'], 'd');
So we can not just use the angle brackets to define a generic type but also to USE a generic type and explicitly set the placeholder type that should be used - sometimes this is required if TypeScript is not able to infer the (correct) type. We'll see this later in this course section!

## Creating a React + TypeScript Project

- Can integrate TypeScript in a create-react-app project
  - Either in a pre-existing create-react-app or to a new one
- In a new create-react-app: `npx create-react-app my-ap --template typescript`
- Should use `.tsx` as file extention if using React + TypeScript
- Compiles TS to JS for us automatically, so might be a bit more sluggish after each code change
- Note the typescript dependency
  - But also `@types/jest, @types/node, @types/react-dom, @types/react`
    - Necessary for auto-completion and IDE support

## Working with Props & TypeScript

We can make use of Generic Types to let React know that our Component is a React Component, and thus has access to things like Children:

```js
const Todos: React.FC<{ items: string[] }> = (props) => {
  return (<ul>
  {props.children}
  {props.items.map(item) => <li key={item}>{item}</li>}
  </ul>
  );
};
```

- In the above, TypeScript knows we have a children and item property on props.
- React.FC is a Generic Type! So we define our data shape inside the brackets. This is as opposed to previously where we were the ones defining a function as being generic.
- Whatever we define in the angled brackets helps us merge our object type with the base object type (with the children property, etc)
  - Now it knows of our custom Props along with the default Props (children, etc)
- Now we get helpful auto-completion inside this component, and outside the Component where it is being called upon
  - E.g, errors if we didn't pass the correct props in

## Adding a Data Model

- Can add a new sub-folder (like "models") where we can define our data
  - E.g, to define what a "Todo" looks like
- Lots of ways to define our data
  - We could define with `type` keyword (TypeScript-specific)
  - We could define with `interface`
  - We could even define with `class` and instantiate

```js
// models/todo.ts
class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
```

- Note in TypeScript `class` we don't have to define attributes in a Constructor
- In TypeScript we have to define our properties and their type ahead of time, outside the Constructor

Can now use this model in a Component:

```js
import Todo from './models/todo';

function App() {
  const todos = [new Todo('Learn React'), new Todo('Learn TypeSCript')];

  return (
    <div>
      <Todos items={todos} />
    </div>
  );
}
```

- Our data definition serves as a Class to create new objects **and** a type for our Component:

```js
// Todos.tsx
const Todos: React.FC<{ items: Todo[] }> = (props) => {
  return (
    <ul>
      {props.children}
      {props.items.map(item) => <li key={item.id}>{item.text}</li>}
    </ul>
  );
};
```

## Working with refs & useRef

In TypeScript, we can add the following after a value (like inputRef.current.value):

- "?": Try to get me the value in this potentially-null value
  - E.g `const val = inputRef.current?.value`
- "!": I'm certain the value here won't be null -- so get me the actual stored value!
  - E.g `const val = inputRef.current!.value`

## Managing State & TypeScript

If we want to have state for, example, our Todo items, we have an issue: When we call useState and give it an initial value of an empty array, TypeScript infers that our value must be of type `never[]` -- an array that never has a value! But it will have a value...just not yet. To fix it, we let TypeScript know by giving `useState` some angled brackets:

```js
const [todos, setTodos] = useState<Todo[]>([]);
```

## The Context API & TypeScript

**VERY IMPORTANT** Refer back to this lesson **A LOT** until I understand it more! And **PRACTICE** using Context with TypeScript until it becomes easy

## Bonus: Exploring tsconfig.json

`target`: Controls the version of JS your code will be transformed to. "es5" good for broad browser support
`lib`: Influences which kind of types are known outside of the box. Examples: "dom" (knows types like HTMLInputElement), "dom.iterable", "esnext"
`allowJs`: Specifies that we can allow .js extension files in our projects. Mix and match JS and TS files
`strict`: True or false. True means we cannot have any use of "any" values. Explicitely set our types in places where TS can't infer. Specifies other things as well
`jsx`: Controls that JSX code is supported and which output code should be generated

Good to keep the default settings, unless you encounter a situation where you think they need changed

`Section Completed: 11/29/2021`

# Section 28: Optional: React Hooks Intro & Summary

### `Originally Started: 11/29/2021`

This section seems to be if you took the old course (which didn't teach Hooks or focus much on Functional components). It seems the information this section teaches was slowly integrated into the new course -- which is the version I took. I will breeze through this section at 2x speed as a refresher and to see if any new tidbits slip in! So probably very skimpy on notes.

## useState

- Creates something that survives re-render cycles
- With Functional components, calling useState with a value, that value replaces that entire state snapshot
- With Class components, calling setState with a value had that value _merge_ with the existing value(s) in the state. State had to be an object.
- Should update any state that relies on the old state with the alternate version that accepts a function as a parameter:

```js
useState((previousState) => previousState++);
```

## More on UseState() & State Updating

- Some complicated AF thing about closures and the event objects. Might want to re-watch. I've never encountered having to do any workarounds so far, though.

## Rules of Hooks

- Must only use hooks in functional components or custom hooks
- Must be used on root level of component (not in a nested function)
  - Can set state here, but cannot call useState here, for instance
  - Can't be in an if-statement either

## More on State Batching & State Updates

More on State Batching & State Updates
React batches state updates - see: https://github.com/facebook/react/issues/10231#issuecomment-316644950

That simply means that calling

```js
setName('Max');
setAge(30);
```

in the same synchronous (!) execution cycle (e.g. in the same function) will NOT trigger two component re-render cycles.

Instead, the component will only re-render once and both state updates will be applied simultaneously.

Not directly related, but also sometimes misunderstood, is when the new state value is available.

Consider this code:

```js
console.log(name); // prints name state, e.g. 'Manu'
setName('Max');
console.log(name); // ??? what gets printed? 'Max'?
```

You could think that accessing the name state after setName('Max'); should yield the new value (e.g. 'Max') but this is NOT the case. Keep in mind, that the new state value is only available in the next component render cycle (which gets scheduled by calling setName()).

Both concepts (batching and when new state is available) behave in the same way for both functional components with hooks as well as class-based components with this.setState()!

## useReducer

- Alternative to useState if you have a more complex state, state that relies on the previous state a lot, or multiple states work together
- Define the reducer function outside of the Component, so it's not unnecessarily re-created when Component is
  - If you have props that the reducer relies on, you can obviously put it inside the component

## useContext

- Use to avoid "prop drilling"

## useCallback & useMemo

useCallback...

- Optimizes performance
- Wrap _functions_ around `useCallback()`
  - Good for functions that we pass down as props
- Should also React.memo around the component passing the function prop

useMemo...

- Can also use the `useMemo()` hook for _values_
- Can pass a returned JSX element / Component, first example
- Can use on operations that take a while to calculate a value

Might be worth _not_ using these if trivial / small components

- Could be easier to re-render than having React check whether props / values change

# Section 29: Optional: React Summary & Core Feature Walkthrough

## 467 Styling with CSS Modules

create-react-app gives us a feature called **CSS Modules**

- Behind the scene code transformation that lets us attach CSS files to specific components
- Files must end in `.module.css`
- Import in a component like: `import classes from "./ourfile.module.css"`
- This imports an object where each property is a CSS class selector and it has style properties
- Class names are made unique per component -- avoids conflicts

## 468 Outputting Lists of Data

- React knows how to render arrays:

```js
return <div>{[<li>Item1</li>, <li>Item2</li>, <li>Item3</li>]}</div>;
```

Though we'll almost always use the Array `map()` function to do so.

```js
return (
  <div>
    {items.map((item) => {
      return <li key={someId}>item.text</li>;
    })}
  </div>
);
```
