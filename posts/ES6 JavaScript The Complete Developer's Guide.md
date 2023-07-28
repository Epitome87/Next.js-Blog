---
title: 'ES6 JavaScript - Course Notes'
date: '2022-06-04'
image: 'post1.jpg'
excerpt: 'Some of my ES6 JavaScript notes!'
isFeatured: false
---

# ES6 JavaScript - The Complete Developer's Guide

These are just some of my notes while breezing through Stephen Grider's Udemy course at 2x speed! I'm rather confident with JavaScript, other than it's rather-sloppy use of traditional Classes. This course is just a quick refresher to keep my JS sharp as I explore other topics.

`Course Started: 6/03/2022`

## ES6 vs ES2015

ES is short for ECMAScript

- It is a standard -- a description of a scripting language
- JavaScript is an implementation of that standard
- ES6 is a new version of JS
- ES5.1 was around 2011 -- this is the version you probably learned
- ES6 (or ES2015) is the newest version (well, was!)
- Starting with ES6 we start seeing the year syntax, i.e. ES2015

ES6 has to be implemented by the browser in order to properly to run. We run it through Babel to convert it down to ES5, which we generally assume all browsers will safely support:
ES6 Code -> Babel -> ES5 Code

Nearly all of ES6 features can be categorized as:

1. New ideas
2. Syntactic sugar

## Array Helper Methods

Because of their popularity in lodash and other utility libraries, these helper methods were released in ES6:

- forEach
- filter
- find
- every
- some
- reduce

Understanding and mastering these will help you as a developer greatly!

Hopefully these will replace your reliance on for loops!

Also note that most of the helpers do not _mutate_ the arrays they work upon! Mutating an array is rarely what we want to do. Rather, we tend to just create new arrays that are subsets of the one being worked upon, so we can continue to use and reference the original array in the future.

### The forEach Helper

But why not just write _for_ loops?

- Many elements that are prone to typos
- Order of arguments
- Have to remember the current element is colors[i]

```js
const colors = ['red', 'blue', 'green'];

for (let i = 0; i < colors.length; i++) {
  console.log(colors[i]);
}

function print(color) {
  console.log(color);
}

// Using forEach instead -- with a function
colors.forEach(print);

// Using with an anonymous function
colors.forEach(function (color) {
  console.log(color);
});

// Using arrow function
colors.forEach((color) => {
  console.log(color);
});

// We can shorten it if the logic is only one
colors.forEach((color) => console.log(color));
```

**Iterator Function**

- The function we pass into `forEach` (or any of the Array helper methods, really)

For every element in the array, we run the logic in the iterator function

Example of summing all numbers in an array:

```js
// Sum all numbers in an array
const numbers = [1, 3, 5, 7, 9];
let sum = 0;

numbers.forEach((number) => {
  sum += number;
});
```

Later we will shorten this using the reduce method!

Almost every other helper can be re-implemented using the forEach method

### The Map Helper

Most widely used Array helper! (Probably due to React's popularity)

Example: Doubling each number in an array:

```js
const numbers = [1, 2, 3];
const doubledNumbers = [];

for (let i = 0; i < numbers.length; i++) {
  doubledNumbers.push(numbers[i] * 2);
}

// Using ES6 map function
const doubledNumbers = numbers.map((number) => {
  return number * 2;
});

// Using ES6 map function -- short-hand
const doubledNumbers = numbers.map((number) => number * 2);
```

- Note map returns an array, where each new element is the result of running the iterator function's logic for each element
- Note that the `return` is necessary! (Unless we are using the short-hand syntax), otherwise map thinks we are returning undefined
  - Forgetting the return is one of the more common mistakes on these various Array helpers

Example: "Pluck" (We are taking only a particular property or two off the array)

```js
const cars = [
  { model: 'Buick', price: 'CHEAP' },
  { model: 'Camaro', price: 'expensive' },
];

const prices = cars.map((car) => {
  return car.price;
});
```

- This is a very common use-case for map, called _Plucking_
  - We are "plucking" a particular property off of each object in the array
  - Very common in Angular and React

Map is extremely common, since rendering lists of data is one of the most common functionality needed on websites

- Map over a post array, render the image, author, content, etc

### Selecting Needed Data with Filter

The `filter` method runs a conditional check for each element of the array. If the condition is met, we keep include that element in the resulting array. If false, we do not include it.

Example: Filtering for a type of product:

```js
const products = [
  { name: 'Cucumber', type: 'vegetable', quantity: 0, price: 1 },
  { name: 'Banana', type: 'fruiter', quantity: 10, price: 15 },
  { name: 'Celery', type: 'vegetable', quantity: 30, price: 9 },
  { name: 'Orange', type: 'fruiter', quantity: 3, price: 5 },
];

const fruits = [];
for (let i = 0; i < products.length; i++) {
  if (products[i].type === 'fruit') {
    fruits.push(products[i]);
  }
}

// Using the filter property
const fruits = products.filter((product) => {
  return product.type === 'orange';
});

// Using the filter property
const veggies = products.filter((product) => {
  return product.type === 'vegetable';
});

// DO NOT use if-statements: It is creating extra work!
const dumb = products.filter((product) => {
  if (product.type === 'fruit') {
    return true;
  }
});

// This would return the Celery object
products.filter((product) => {
  return product.type === 'vegetable' && product.quantity > 0 && product.price < 10;
});
```

- Again, do not forget the _return statement_!
- No point using an if-statement: just return that comparison!

Typical use-cases:

- Filter a post by the associated ID

```js
const post = { id: 4, title: 'New Post' };
const comments = [
  { postId: 4, content: 'Awesome Post' },
  { postId: 3, content: 'Okay' },
  { postId: 4, content: 'Neat!' },
];

function commentsForPost(post, comments) {
  return comments.filter((comment) => {
    return comment.postId === post.id;
  });
}

// Returns all comments that belong to post with ID of 4
commentsForPost(post, comments);
```

### Querying for Records with Find

Similar to filter. Search through an array and look for a particular element -- return if found.
It iterates through each element, returning true or false if the element is found or not
If true, the element is returned, and logic ceases

- Useful if you have a collection and want to find a single record

```js
const users = [{ name: 'Jill' }, { name: 'Alex' }, { name: 'Bill' }];

let user;

// Find "Alex" in the users list
for (let i = 0; i < users.length; i++) {
  if (users[i].name === 'Alex') {
    user = users[i];
    break;
  }
}

// Using ES6 find helper
user = users.find((user) => {
  return user.name === 'Alex';
});

// Using ES6 find helper -- with short-hand
user = users.find((user) => user.name === 'Alex');
```

Drawback:

- If you have two elements that match the case, only the first one is returned

```js
function Car(model) {
  this.model = model;
}

let cars = [new Car('Buick'), new Car('Camaro'), new Car('Focus')];

cars.find(function (car) {
  return car.model === 'Focus';
});
```

```js
const posts = [
  { id: 1, title: 'New Post' },
  { id: 2, title: 'Old Post' },
];

let comment = { postId: 1, content: 'Great Post!' };

function postForComment(posts, comment) {
  return posts.find(function (post) {
    return post.id === comment.postId;
  });
}

postForComments(posts, comment);
```

### The every and some Helpers

Helpers where we are looking at an entire list and condensing it down into a single value

Example: Seeing if our computers can run a 16GB program:

```js
const computers = [
  { name: 'Apple', ram: 24 },
  { name: 'Compaq', ram: 4 },
  { name: 'Acer', ram: 32 },
];

const MIN_RAM = 16;

// Can any computer we have run our program?
let allComputersCanRunProgram = true;
let onlySomeComputersCanRunProgram = false;

for (let i = 0; i < computers.length; i++) {
  let computer = computers[i];

  if (computer.ram < MIN_RAM) {
    allComputersCanRunProgram = false;
  } else {
    onlySomeComputersCanRunProgram = true;
  }
}

// Using ES6
let allComputersCanRunProgram = computers.every((computer) => {
  return computer.ram >= MIN_RAM;
});

// Using ES6
let onlySomeComputersCanRunProgram = computers.some((computer) => {
  return computer.ram >= MIN_RAM;
});
```

- Each iteration returns a boolean value
- We can think of `every` as returning true or false on every iteration, and running an `&&` between each result. A final result of true means that every element of the array meets our condition, and thus _every_ is true
  - Essentially: "Does _every_ single element satisfy our condition?"
- We can think of `some` as: "Do _any_ elements satisfy our condition? All I need is one to be true!"
  - We can think of each element has having an `||` between the result, so only one element needs to be true for the entire result to be true.

Example use-case:

- Validating inputs on a form

```js
function Field(value) {
  this.value = value;
}

// Field is valid if its length is greater than 0
Field.prototype.validate = function () {
  return this.value.length > 0;
};

// Pretend these come from an input field!
let username = new Field('2cool');
let password = new Field('my_password');

// Check if form is valid:
username.validate() && password.validate();

// If we have other fields, this can get messy and tedious! We can make use of the every method:
const fields = [username, password, birthdate];

let formIsValid = fields.every(function (field) {
  return field.validate();
});

if (formIsValid) {
  // Allow form submit
} else {
  // Error message
}
```

### Condensing Lists with Reduce

The most flexible! Could probably re-implement every other helper with the reduce helper

Classic reduce example: Sum all numbers

```js
const numbers = [10, 20, 30];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

// With reduce helper:
numbers.reduce((sum, number) => {
  return sum + number;
}, 0);
```

- Note this time our first argument in the iterator function is a function with **two** arguments, not one
  - Each iteration, we receive the accumulated value and the current element
- Note the second argument of reduce is the _initial value_
- On first iteration, the accumulated value starts as the _initial value_
- Typical names for the first argument in the iterator function are _accumulator_, _acc_, or _previous_

```js
const primaryColors = [{ color: 'red' }, { color: 'yellow' }, { color: 'blue' }];

primaryColors.reduce((accumulator, currentColor) => {
  // It's okay to mutate here!
  previous.push(currentColor.color);

  return previous;
}, []);

// Result: [ 'red', 'yellow', 'blue' ];
```

Example: "Balanced Parenthesis" (common whiteboard question). See if each opening parenthesis has a corresponding closing one

```js
function balancedParens(string) {
  // Turn string into array
  return !string.split('').reduce(function (previous, character) {
    if (previous < 0) return previous;
    if (character === '(') return ++previous;
    if (character === ')') return --previous;

    return previous;
  }, 0);
}

balancedParens('(((('); // We expect false here
```

Algorithm explanation:

- We pass a string in, but we need an array for `reduce` to work -- so we use the `split` method to turn the string into an array
- Every time we find a '(' character, we increment our count
- Every time we find a ')' character, we decrement our count
- Since we want our function to return a boolean, we use the bang `!` operator
  - This will flip any non-zero integer to `true`, and 0 to `false`
  - So if our count is 0 (a falsey value) and we flip that with the bang, we get true -- the parens are balanced

This doesn't catch balanced parens that are in a weird order. We can resolve this with:

- Any time our counter is negative, we must have unbalanced parens! So check if previous < 0, then return the previous value -- without adding or subtracting

## Variable Declarations with const, let, and var

These are concepts that bring new features to JavaScript, and not syntactic sugar.

Starting with ES6, **never use `var`**!!!

`const` - we don't expect the value to change
`let` - we expect the values to change over time

```js
// We don't expect our name to change
const name = 'Jane';
let title = 'Software Engineer';
let hourlyWage = 40;
```

What do `const` and `let` solve? Why not just stick with `var`?

- Code more instantly legible:
  - Immediately recognize that in the code to follow, we don't expect a variable to change (with const)
  - Immediately recognize that in the code to follow, we do expect a variable to change (with let)
- var declarations are globally scoped or function scoped while let and const are block scoped.
  - We typically don't want the behavior of var!
- var declarations also hoist:

```js
// ❌ Don't do this
function foo() {
  console.log(bar); // No error, but prints undefined
  var bar = 1234;
}
// ✅ This is better
function foo() {
  console.log(bar); // ReferenceError: bar is not defined
  const bar = 1234;
}
```

**Const != immutable**

It’s very important to understand const. It doesn’t imply immutability.

A variable is like a pointer to a value (it’s a pointer for objects, it’s an assigned value for primitives). const prevents the variable to be assigned to another value. We could say it makes the pointer immutable, but it doesn’t make the value immutable too!

```js
const arr = [1, 2, 3];
arr.push(4); // this is totally fine
arr = ['foo', 'bar']; // TypeError: Assignment to constant variable.
```

So beware that arrays and objects assigned to const variables can be mutated. However numbers, booleans and strings are immutable per se, so they cannot be mutated. Not because you are using const but just because they are intrinsically immutable.

**Use a default value with the || operator**

In many scenarios the value assigned to a variable will depend on some conditions. For example it is very frequent to assign the returned value of a function to it, but maybe the function returns null or undefined and in that case you want to use a default value. In that case you will probably be tempted to use an if but then you cannot use const since you will reassign the variable value if the condition is met, and we cannot do that, and we don’t want to do that with const. But, in JavaScript there’s a nice solution to that.

```js
// ❌ Don't do this
let foo = something()
if (!foo) {
  foo = defaultValue
}
// ✅ This is better
const foo = something() || defaultValue
Beware that defaultValue will be used for any falsy value returned by something().
```

**Use the ternary operator ? :**

Sometimes you want to assign one value or another depending on a condition that is neither the first value nor the second one. You will be tempted to write an if again in this case. But you can make use of the ternary operator instead!

```js
// ❌ Don't do this
let foo
if (condition) {
  foo = valueA
} else {
  foo = valueB
}
// ✅ This is better
const foo = condition ? valueA : valueB
If the sentence is long enough I will split it into different lines:

const foo = conditionLongEnoughToSplitTheSentence
  ? valueA
  : valueB
```

**Extract functions**

But if there are multiple conditions or they are really complex or long enough, it can be a good idea to extract a function instead.

```js
// ❌ Don't do this
let foo;
if (conditionA) {
  if (conditionB && !conditionC) {
    foo = value1;
  } else if (conditionD) {
    foo = value2;
  } else {
    foo = value3;
  }
} else {
  foo = value4;
}

// ✅ This is better
const calculateFoo = () => {
  if (conditionA) {
    if (conditionB && !conditionC) {
      return value1;
    } else if (conditionD) {
      return value2;
    }
    return value3;
  }
  return value4;
};
const foo = calculateFoo();
```

**Summary**

- Don’t use var
- Use the || or ternary operators to initialize const variables that need to be calculated based on some conditions.
- Extract functions if the conditions are long or complex enough.

## Template Strings (Or Template Literals)

```js
const name = 'Matthew';
const message = 'Hello, ' + name;

// Using template literals:
const message = `Hello, ${name}`;
```

- Any valid JavaScript expression can be put inside the `${}` portion

## Arrow Functions

One of the most popular of the ES6 additions.

```js
const add = function (a, b) {
  return a + b;
};

add(1, 2);

// Using ES6 Arrow Functions
const add = (a, b) => {
  return a + b;
};
```

- Some may refer to the `=>` as _"fat arrow"_
- The old syntax is totally fine to use still!

It's not just syntactic sugar, though! (Although I would argue there's no sugar involved -- it's just as tedious and less readable!). Some other features:

- Allows for a short-hand syntax if only a single expression: `const add = (a, b) => a + b;`
  - We remove the curly braces and the return keyword
  - We have an _Implicit return_
  - Note that we cannot keep the curly braces and remove the return -- we must do both, or neither!
- If only one argument in our function, we can drop the parenthesis: `const double = number => number * 2;`
  - Only works with _one_ argument!

Arrow functions work well with the array helpers, as we can be very compact:

```
const numbers = [1, 2, 3];
numbers.map(number => 2 * number);
```

**IMPORTANT** aspect of arrow functions, and the main purpose of their use: Solving the `this` hassle:

```js
const team = {
  members: ['Jane', 'Bill'],
  teamName: 'Super Squad',
  teamSummary: function () {
    return this.members.map(function (member) {
      return `${member} is on team ${this.teamName}`;
    });
  },
};

team.teamSummary(); // Oops! Cannot read property 'teamName' of undefined
```

We are passing off a function to `map` -- and it's as if it is going into the ether (into the browser, into somewhere else in our codebase) and we have no idea where or when it will be executed. Whenever that happens, the value of `this` will be lost.

With ES5 we can solve this with the `bind` helper:

```js
teamSummary: function () {
    return this.members.map(function (member) {
      return `${member} is on team ${this.teamName}`;
    }.bind(this));
  },
```

Or:

```js
// Cache a reference to "this" outside our anon function
let self = this;
teamSummary: function () {
    return this.members.map(function (member) {
      return `${member} is on team ${self.teamName}`;
    });
  },
```

Arrow functions solve the pain around `this`! In the below example, `this` works as is expected:

```js
teamSummary: function () {
    return this.members.map((member) => {
      return `${member} is on team ${this.teamName}`;
    });
  },
```

- Arrow functions make use of _Lexical this_
  - The placement of `this` depends on how it is evaluated
  - `this` is automatically set equal to the `this` in the surrounding context:

## Enhanced Object Literals

Let's examine how we create objects in ES5:

```js
// ES5
// Returns an object to represent a book store
function createBookShop(inventory) {
  return {
    inventory: inventory,
    inventoryValue: function () {
      return this.inventory.reduce((total, book) => {
        return total + book.price;
      }, 0);
    },
    priceForTitle: function (title) {
      return this.inventory.find((book) => book.title === title).price;
    },
  };
}

const inventory = [
  { title: 'Harry Potter', price: 10 },
  { title: 'Eloquent JavaScript', price: 15 },
];

const bookShop = createBookshop(inventory);

bookShop.inventoryValue(); // 25
bookShop.priceForTitle('Harry Potter'); // 10
```

First improvement: Whenever we make reference to a key and value with the exact same name, we can condense it to just use the term once:

```js
// Before ES6
return {
  inventory: inventory,
};

// With ES6
return {
  inventory,
};
```

Second improvement: We can remove the `function` keyword and the `:` before it:

```js
// Before ES6
inventoryValue: function() { }

// With ES6
inventoryValue() { }
```

Another example, using jQuery:

```js
function saveFile(url, data) {
  $ajax({ method: 'POST', url: url, data: data });

  // With ES6:
  $ajax({ method: 'POST', url, data });

  // Best practice: Put the condensed properties first:
  $ajax({ url, data, method: 'POST' });
}

const url = 'http://fileupload.com';
const data = { color: 'red' };
```

We typically increase legibility by putting all the shortened object variables (those that don't have a key/value pair) on the left-hand side, and those with key/value pairs on the right-hand side

## Specifying Default Function Arguments

We can provide default, fallback values for functions.

Consider making an Ajax request, where the most common type of request is a "GET":

```js
function makeAjaxRequest(url, method) {
  if (!method) method = 'GET';
}

// With ES6 and default arguments:
function makeAjaxRequest(url, method = 'GET') {}

makeAjaxRequest('google.com'); // Method defaults to "GET"
makeAjaxRequest('google.com', 'POST');
```

- Note: We can pass in `null` and the default value will not override it
  - `null` essentially means we as developers _want_ the value to not exist
  - `undefined` essentially means the value does not exist, but not from our own intentions
- Manually in `undefined` instead of `null` if you wish to specify a starting unspecified value but you wish to allow default value to override it

**Use-cases of Default Arguments**

```js
function User(id) {
  this.id = id;
}

function generateId() {
  return Math.random() * 99999999;
}

function createAdminUser(user) {
  user.admin = true;
  return user;
}

// So to create an admin user, we may have to do:
createAdminUser(new User(generateId())); // Very ugly and tedious!

// We can add a default value to the user in createAdminUser:
function createAdminUser(user = new User(generateId())) { ... etc }

// Now we can create a new user from scratch:
createAdminUser();

// Or we can use an existing user object:
createAdminUser(someUser);
```

## Capturing Arguments with Rest and Spread

```js
function addNumbers(numbers) {
  return numbers.reduce((sum, number) => {
    return sum + number;
  }, 0);
}

addNumbers([1, 2, 3, 4, 5]);
```

What if we wanted to sum a bunch of numbers, but they aren't in an array? Or we want to pass in an unknown amount of arguments. Consider the following:

```js
function addNumbers(a, b, c, d, e) {
  const numbers = [a, b, c, d, e];
}

addNumbers(1, 2, 3, 4, 5);
```

That would get very tedious and hard to manage! So we can use the `rest operator`, represent with `...`:

```js
function addNumbers(...numbers) {
  return numbers.reduce((sum, number) => sum + number, 0);
}

addNumbers(1, 2, 3, 4, 5, 6, 7, 8);
```

- Okay, I accept that I have some unknown number of arguments. I'm going to capture all those and put them into a single array, called numbers

But we might ask, why don't we just have the function accept an array, and put brackets around our arguments ([1, 2, 3, etc])

**Spread Operator**

Unlike _rest_, which essentially gather together variables, `spread operator` essentially spreads / flattens them out. We use the same `...` syntax, just in a different context:

```js
const defaultColors = ['red', 'green'];
const userFavoriteColors = ['orange', 'yellow'];

// Join the two arrays into a single array
defaultColors.concat(userFavoriteColors);

// Or with the spread operator:
const unionArray = [...defaultColors, ...userFavoriteColors];
```

We can use the `concat` method, sure, but consider:

```js
const fallColors = ['fire red', 'fall orange'];

const result = ['blue', ...fallColors, ...defaultColors, 'purple', ...userFavoriteColors];
```

We can add values in between! Not something `concat` could do.

Consider an example of a shopping list validator, where we need to ensure we always get milk, regardless of whether we provide it as input:

```js
// We capture all the arguments into an items array
function validateShoppingList(...items) {
  // If milk is not found in this array, we add it to the start!
  if (items.indexOf('milk') < 0) {
    return ['milk', ...items];
  }
}

validateShoppingList('oranges', 'bread', 'eggs');
```

**Practical Use-Case**

It doesn't seem that challenging just to put our list of arguments into an array before we call a function. So what's a practical use-case?

```js
const MathLibrary = {
  calculateProduct(a, b) {
    return a * b;
  },
};
```

A few months go by, many developers are using it...but many users think the method name should be changed. But changing that could introduce breaking-changes for other users! How can we mitigate this damage?

```js
const MathLibrary = {
  calculateProduct(a, b) {
    return a * b;
  },
  multiply(a, b) {
    return a * b;
  },

  // This has duplicate logic! So:
  calculateProduct(...rest) {
    console.log('Please use the multiply method instead');
    return this.multiply(...rest);
  },
  multiply(a, b) {
    return a * b;
  },
};
```

With the above approach, we allow users to use the deprecated method signature, and without introducing duplicate logic!

## Goldmine of ES6 Destructuring

### Destructuring Objects

Another commonly-used feature of ES6. We use curly-braces to declare a new variable and have it be set equal to a property of the same name within an object: `const { name } = user;` will grab the value of user.name and set it equal to a variable called name.

```js
// ES5
const expense = {
  type: 'Business',
  amount: '$45 USD',
};

let type = expense.type;
let amount = expense.amount;

// With ES6 destructuring
let { type } = expense;
let { amount } = expense;

// Or do both at once!
let { type, amount } = expense;
```

- The name of the variable **must** be identical to the name we the property we are referencing, unless we use the `:` syntax to rename: `const { name: userName } = user;` will grab the name property from user, but store it in a variable called userName.
- If the property does not exist, the variable is simply set to undefined

```js
// ES5
let savedFile = {
  extension: 'jpg',
  name: 'userList',
  size: 14040,
};

function fileSummary(file) {
  return `The file ${file.name}.${file.extension} is of size ${file.size}`;
}

fileSummary(savedFile);

// ES6 destructuring
function fileSummary({ name, extension, size }) {
  return `The file ${name}.${extension} is of size ${size}`;
}

// We can do the same with multiple arguments:
function fileSummaryAndAuthor({ name, extension, size }, { author }) {
  // etc
}

fileSummary(savedFile, { author: 'Matthew' });
```

### Destructuring Arrays

With _array destructuring_ we can pull off individual items from the array.

```js
const companies = ['Google', 'Facebook', 'Uber'];

// ES5
const firstCompany = companies[0];
const secondCompany = companies[1];
// Etc

// ES6 array destructuring
const [firstCompany] = companies; // Returns Google, the first item
const [firstCompany, secondCompany] = companies; // firstCompany1 is Google, firstCompany2 is Facebook
const [firstCompany, firstCompany, thirdCompany, fourthCompany] = companies; // Accessing firstCompany4 throws no error, but it is of type undefined

// Combining with spread operator
const [firstCompany, ...otherCompanies] = companies; // firstCompany = "Google", otherCompanies = ["Facebook", "Uber"]
```

### Destructuring Arrays and Objects at the Same Time

An often overlooked use-case of destructuring is to combine array and object destructuring!

```js
const companies = [
  { name: 'Google', location: 'Mountain View' },
  { name: 'Facebook', location: 'Menlo Park' },
  { name: 'Uber', location: 'San Francisco' },
];

// ES5
let location = companies[0].location;

// ES6, object destructuring
let { location } = companies[0];

// ES6, object destructuring AND array destructuring
let [{ location }] = companies;
```

```js
const Google = {
  locations: ['Mountain View', 'New York', 'London'],
};

// With ES5
const firstLocation = Google.locations[0];

// With ES6
const {
  locations: [location],
} = Google;

console.log(location); // "Mountain View"

// Above, we are saying: "Look at the locations property. It's going to return an array. Take that array and pull out the first element.
```

I personally think this approach lends itself to be less readable, especially when we are pulling off a specific array element in an object. For pulling off a particular object in an array, it's not so bad.

## When to Use Destructuring?

Practical use-case for objects:

```js
function signup(username, password) {
  // Create new user logic
}

signup('Matthew', 'mypassword');

// Time goes by, and we decide we require more information for signup:
function signup(username, password, email, dateOfBirth, city) {
  // Etc
}

signup('Matthew', 'mypassword', '1/26/1987', 'myemail@example.com', 'Redlands');

// Oops! There's so many arguments, I accidentally put date of birth in wrong spot! We could avoid the headache of remembering all the arguments by using the spread operator in the function
function signup({ username, password, email, dateOfBirth, city }) {
  // Etc
}

// Call using an object -- order of properties does not matter!
const user {
  name: 'Matthew',
  password: 'mypassword',
  city: 'Redlands',
  dateOfBirth: '1/26/1987',
  email: 'myemail@example.com',
}
signup(user);
```

Practical use-case for arrays:

```js
// An API returns data in this shape
const points = [
  [4, 5],
  [10, 1],
  [0, 40],
];

// Our graphing library wants this shape:
const points = [
  { x: 4, y: 5 },
  { x: 10, y: 1 },
  { x: 0, y: 40 },
];

// Transforming data using ES5
const transformedPoints = points.map((pair) => {
  // With ES5:
  const x = pair[0];
  const y = pair[1];
  return { x, y };

  // Or a little better:
  return { x: pair[0], y: pair[1] };
});

// Transforming data using ES6
const transformedPoints = points.map(([x, y]) => {
  return { x: x, y: y };

  // And even better, using the enhanced object literal syntax
  return { x, y };
});
```

## Introduction to Classes

JavaScript doesn't really have true object inheritance. It has what is called _prototypal inheritance_ -- a concept that is rather hard to explain.

ES6's solution to prototypal inheritance is the introduction of `class`. Under the hood, we are still making use of prototypal inheritance -- `class` is just syntactical sugar.

Look at how comically ugly and tedious the pre-ES5 method of working with objects and inheritance is:

```js
// ES5 constructor function
function Car(options) {
  this.title = options.title;
}

// Methods are added to the prototype property of the constructor
Car.prototype.drive = function () {
  return 'Vroom!';
};

const car = new Car({ title: 'Focus' });
car.drive(); // "Vroom!"

// Hook up Toyota to Car
function Toyota(options) {
  Car.call(this, options);
  this.color = options.color;
}

Toyota.prototype = Object.create(Car.prototype);
Toyota.prototype.constructor = Toyota;

Toyota.prototype.honk = function () {
  return 'Beep!';
};

const toyota = new Toyota({ color: 'red', title: 'Daily Driver' });
toyota.drive(); // "Vroom!", inherited from Car
toyota.honk(); // "Beep!"
```

Whew! Now refactoring with ES6 class:

```js
class Car {
  // Handle initialization and setup -- ran when we use the "new" keyword to create an instance of this class
  constructor({ title }) {
    this.title = title;
  }

  drive() {
    return 'Vroom!';
  }
}

const car = new Car({ title: 'Toyota' });
car.drive(); // "Vroom!"

class Toyota extends Car {
  constructor(options) {
    super(options); // Car.constructor(), essentially
    this.color = options.color;
  }

  honk() {
    // super() would call Car.honk(), if it was defined
    return 'Beep!';
  }
}

const toyota = new Toyota({ color: 'red', title: 'Daily Driver' });
toyota.honk(); // "Beep!"
toyota.drive(); // "Vroom!"
```

- The call to `super` is calling the parent's constructor method, to handle its initialization
- Note we do not provide arguments in the Car definition itself -- but rather the constructor
  - I.e we do not write `class Car({ title }) {}`
- Note we do not need to separate the class methods with a comma, like we would with an object.
- Note we get a `this does not exist` error if we do not call `super`
- Typically don't do object destructuring in the argument of the constructor if it extends another class

## When to Use Classes?

When will we actually use Classes?

JavaScript community has made a huge embrace of classes! Classes have dramatically changed the way we write code. React, for example, has embraced Classes (but now has leaned away from it...). Before ES6, true object-oriented programming was hard to do in JavaScript. Going forward, perhaps it will become more popular now that creating true classes isn't such a hassle.

```js
// Before ES6
React.createClass({
  doSomething() {},
  doSomethingElse() {},
});

// ES6
class MyComponent extends Component {
  doSomething() {}
  doSomethingElse() {}
}
```

## For...Of Loops

Yet another way to iterate through collections. Iterates through arrays of data. ES6 array helpers are still preferable. But `for...of` has an interesting tie into a future concept, called _generators_, so it is worth learning.

```js
const colors = ['red', 'green', 'blue'];

for (let color of colors) {
  console.log(color);
}

// Logs red, then green, then blue
```

```js
const numbers = [1, 2, 3, 4];
let total = 0;

for (let number of numbers) {
  total += number;
}
```

A distinction of `for...of` vs `for...in`, provided by Stack Overflow:

Both for..of and for..in statements iterate over lists; the values iterated on are different though, for..in returns a list of keys on the object being iterated, whereas for..of returns a list of values of the numeric properties of the object being iterated.

Here is an example that demonstrates this distinction:

```js
let list = [4, 5, 6];

for (let i in list) {
  console.log(i); // "0", "1", "2",
}

for (let i of list) {
  console.log(i); // "4", "5", "6"
}
```

Another distinction is that for..in operates on any object; it serves as a way to inspect properties on this object. for..of on the other hand, is mainly interested in values of iterable objects. Built-in objects like Map and Set implement Symbol.iterator property allowing access to stored values.

```js
let pets = new Set(['Cat', 'Dog', 'Hamster']);
pets['species'] = 'mammals';

for (let pet in pets) {
  console.log(pet); // "species"
}

for (let pet of pets) {
  console.log(pet); // "Cat", "Dog", "Hamster"
}
```

## Introduction to Generators

The mother-load of ES6! The most brain-bending feature, by far! Not very easy to understand.

We will cover:

- What is a generator?
- What does a generator do?
- Iteration with generators
- Generator delegation
- Generators with Symbol.iterator

What is a generator?

- A function that can be entered and exited multiple times
- We can run some code, return a value, and go right back into the function at the same place we left it

The syntax required in the function definition can be either:

1. `function* numbers() {}` or
2. `function *numbers() {}`

```js
function* numbers() {
  yield;
}

const gen = numbers();
gen.next(); // { done: false }
gen.next(); // { done: true }
```

By simply introducing the `*` by the function keyword, and adding no other logic, calling our function will return `{}`

Why are we using the `yield` keyword in the function? Why are we calling `next()`, and what is its _done_ property?

- Note how if we remove the `yield` keyword, _done_ property will be instantly true upon first call of `next()`

  ### Generators with a short story

  Imagine a scenario where we are leaving our house to shop for groceries. We run across these events:

  |                                   |                                            |
  | --------------------------------- | ------------------------------------------ |
  |                                   | 1. Start walking to store                  |
  |                                   | 2. Still walking...                        |
  |                                   | 3. At the store! We're going in with money |
  |                                   | <-- money                                  |
  | 4. In the store...see you soon... |                                            |
  | groceries -->                     |                                            |
  |                                   | 5. I'm back with groceries!                |
  |                                   | 6. Heading back home                       |

```js
function* shopping() {
  // Stuff happening on the sidewalk outside the store

  // Walking down the sidewalk

  // We go into the store with cash
  const stuffFromStore = yield 'cash';

  // Back on the sidewalk, now walking back home
  return stuffFromStore;
}

// Stuff happening in the store
const gen = shopping();

gen.next(); // Okay, I'm leaving my house
// Walked into the store...
// Walking up and down the aisles...
// Purchase our groceries...
gen.next('groceries'); // Leaving the store with groceries. Transitioning from store back onto the sidewalk, now with some amount of groceries

// We re-enter our generator at our yield statement, now imagine it saying "const stuffFromStore = "groceries"
// We eventually return with stuffFromStore
```

- **Important**: Just calling `shopping()` doesn't invoke any code whatsoever!
- Not until the first time we call `gen.next()` do we start executing code inside our generator function
- The transition from sidewalk to store with some amount of cash is done with the `yield` statement
  - We are yielding a value of cash
  - We are pausing execution here
- Note our first call to gen.next() gives us `{ value: 'cash', done: false }`, and our second call gives us `{ value: 'groceries', done: true }`

Whew! Assuming we even understand what's going on...what on Earth is the use-case of all this?!

### Another Step in our Generator Story

One more example to really help us solidify our basic understanding of generators. Let's add one more step in our previous example:

```js
function* shopping() {
  const stuffFromStore = yield 'cash';

  // Walking to laundry place with some amount of laundry, walk out with clean clothes
  const cleanClothes = yield 'laundry';

  // We return home with stuff from store and clean clothes
  return [stuffFromStore, cleanClothes];
}

const gen = shopping();

gen.next(); // Enter store, run until first yield
gen.next('groceries'); // Enter store again, run from first yield to second yield
gen.next('laundry'); // Enter store again, run from 2nd yield until return statement
```

The takeaway is we can call `next()` however many times we want, assuming we have a corresponding `yield`

### The Big Reveal on ES6 Generators

Okay, so why use generators? And why was learning `for...of` so important earlier?

```js
function* colors() {
  yield 'red';
  yield 'blue';
  yield 'green';
}

const gen = colors();
gen.next(); // value: 'red', done: false
gen.next(); // value: 'blue', done: false
gen.next(); // value: 'green', done: false
gen.next(); // done: true. No value since we do not return one in the function
```

So, generators work _perfectly_ with `for...of` loops!

```js
const myColors = [];
for (let color of colors()) {
  myColors.push(color);
}
myColors; // ['red', 'green', 'blue']
```

- No need to worry about the value of _done_ or calling _next_ -- it just plain works!
- **Build up objects that can iterator through any type of data structure we can possibly imagine -- not just objects and arrays**

### A Practical Use of ES6 Generators

Let's create an object that represents an engineering team

```js
const engineeringTeam = {
  size: 3,
  department: 'Engineering',
  lead: 'Matthew',
  manager: 'Caitlin',
  grunt: 'Daniel',
};
```

Let's say we want to have the ability to iterate just through the different types of employees, and not the size or department. We can't just iterate through each property. So we can create a multi-step generator to handle this:

```js
function* TeamIterator(team) {
  yield team.lead;
  yield team.manager;
  yield team.grunt;
}
```

Now we can iterate through the employee types:

```js
const names = [];
for (let name of TeamIterator(engineeringTeam)) {
  names.push(name);
}

names; // ["Matthew", "Caitlin", "Daniel" ]
```

Our iterator can be re-used on other engineering teams, assuming they conform to having at least the lead, manager, and grunt properties we are interested in.

**So, if we have some custom object, and we want to iterate over just very particular properties, we can use the power of _generators_ and `for...of`!**

### Delegation of Generators

Rather than try to define what generator delegation is, let's explore a practical example.

Let's add a testing team to our engineer team. A testing team is its own standalone team, along with being part of our previous engineering team object.

```js
const testingTeam = {
  lead: 'Mitch',
  tester: 'Michael',
};

const engineeringTeam = {
  // New for this example
  testingTeam,
  size: 3,
  department: 'Engineering',
  lead: 'Matthew',
  manager: 'Caitlin',
  grunt: 'Daniel',
};

function* TeamIterator(team) {
  yield team.lead;
  yield team.manager;
  yield team.grunt;

  // We COULD just add the following logic to our existing iterator:
  //   yield team.testingTeam.lead;
  //   yield team.testingTeam.tester;
}

// Better approach -- create a separate generator tailored for a testing team
function* TestingTeamIterator(team) {
  yield team.lead;
  yield team.tester;
}
```

Our problem: Whenever we iterate through the engineering team, we also want to iterate through the testing team. This practice is called **generator delegation**

Let's add some more:

```js
function* TeamIterator(team) {
  yield team.lead;
  yield team.manager;
  yield team.grunt;

  const testingTeamGenerator = TestingTeamIterator(team.testingTeam);
  yield* testingTeamGenerator;
}

const names = [];
for (let name of TeamIterator(engineeringTeam)) {
  names.push(name);
}

names; // ["Matthew", "Caitlin", "Daniel", "Mitch", "Michael" ]
```

Here we introduced the generator delegation via `yield*`.

- When we use gens for iteration, we first create generator function.
- We call the testing team iterator, passing it the testingTeam
  - We want to make sure the for of loop knows it has a couple of yield statements of its own to take into account
  - That's where `yield*` comes into play: "I'm currently in a gen, but I have another gen that has a few yields that you might care about as well
    - It's a trap door of sorts; tricks the for...of loop to fall through the other iterator and go through all its yield statements

All of this is rather ugly syntax! The engineering object should probably know how to iterate over itself. The iterator functions are completely separate from the objects that represent our teams. The use of TeamIterator is rather confusing. Let's clean up the code in the next section!

### Symbol.Iterator with Generators

**Symbol Iterator** is another ES6 feature that will help us clean our code. It will help us merge our iterator into the team object.

It is a **tool that teaches objects how to respond to the for...of loop**

Let's write some code to tell the testing team how it should behave when someone tries to run a for...of loop on it:

```js
const testingTeam = {
  lead: 'Mitch',
  tester: 'Michael',
  [Symbol.iterator]: function* () {
    yield this.lead;
    yield this.tester;
  },
};
```

Now in the TeamIterator, we can replace two odd lines of code with the following, which lets the iterator know how to handle the iteration through the nested testing team:

```js
function* TeamIterator(team) {
  yield team.lead;
  yield team.manager;
  yield team.grunt;

  // No longer use these two lines
  //  const testingTeamGenerator = TestingTeamIterator(team.testingTeam);
  // yield* testingTeamGenerator;
  // Replace with this:
  yield* team.testingTeam;

  // We also now no longer need the TestingTeamIterator!
}
```

- Note `[Symbol.iterator]` is **key interpolation** -- it is not an array!

Notice how now we got rid of the separate iterator function for the testing team, and how the generator function for the testing team is part of its object logic.

Walking through our cleaned-up code:

1. We yield the engineering team's leader, manager, grunt
2. `yield*` causes the for...of loop to fall into iteration over the testing team
3. Essentially telling loop to "Do your best to iterate over testing team"
4. Loop looks at testingTeam object, looks for a key of `[Symbol.iterator]` -- if it has one, it uses the generator it is pointing at for iteration

### Complexities of Symbol.Iterator

So we used Symbol.iterator to the testingTeam, but we can also add it to the engineeringTeam to refactor our code even further. This will allow us to get rid of the TeamIterator(team) function, which is so de-coupled with the object it runs on.

```js
const engineeringTeam = {
  testingTeam,
  size: 3,
  department: 'Engineering',
  lead: 'Matthew',
  manager: 'Caitlin',
  grunt: 'Daniel',
  [Symbol.iterator]: function* () {
    yield this.lead;
    yield this.manager;
    yield this.grunt;
    yield* this.testingTeam; // Delegate to the testingTeam's iterator
  },
};

// We can remove the for...of for EngineeringIterator(engineerTeam) and replace with:
const names = [];
for (let name of engineeringTeam) {
  names.push(name);
}
```

Another run-through of the code:

- `Symbol.iterator` is a special object, job to tell a for of loop how to iterate over an object
- Looks to see if there is a defined Symbol.iterator
  - Some objects have pre-defined ones, like arrays
  - Any other custom structure needs one to be defined by ourselves
- Once for of starts walking through gen function, pauses at each yield statement. At that point the value to the right of yield will pop up as the value in the for of loop
- If yielded value is another generator function, we use the yield\* to tell the loop to also walk through any iterables in that
  - Do you have Symbol.iterator defined? If so, I'll walk through it, and yield to its values

### Generators with Recursion

Let's explore how to iterate through a tree data structure -- a fairly practical example!

Why is this practical? Well, trees are everywhere in web development. See Reddit? The comments section can be represented with a tree:

- Each comment can have children comments
- Those children comments can each have their own children comments
- Etc!

First, let's create a simple tree data structure:

```js
class Comment {
  constructor(content, children) {
    this.content = content;
    this.children = children;
  }

  // But how can we add a Symbol.iterator to a class? It doesn't have key/value pairs:
  *[Symbol.iterator]() {
    // Yield the content of this node
    yield this.content;

    // Yield to each child of this node
    for (let child of this.children) {
      yield* child;
    }
  }
}

// Create some children nodes ("comments" on a post, none have children for simplicity)
const children = [new Comment('Good comment', []), new Comment('Bad comment!', []), new Comment('Neutral comment', [])];

// Create root node (a "Post")
const tree = new Comment('Great post!', children);

for (let value of tree) {
  values.push(value);
}

value; // List of all comments in the tree
```

**Array helpers like map and forEach do not work with generators! Cannot yield from inside of an array helper or callback**

## Code Execution in JavaScript

Another challenging topic of ES6: Promises

Promises have been around in JavaScript for a while, but ES6 introduces a native implementation of them for the first time.

In JS, there is no idea of pausing execution of code.
When you execute some amount of JS, code executes line by line with no pauses
Set time out and interval defer execution of code, but no statement to pause on a line of code for some amount of time

Promises attempt to solve situations where we have an operation (typically AJAX request) that do not resolve to a value immediately -- we want to wait for them to complete before we access a piece of data

## Terminology of Promises

Three States of Promises:

1. `unresolved`: Default state. We are waiting for something to happen.
2. `resolved`: Something finished and it went okay.
3. `rejected`: Something finished and something went wrong!

For the resolved and rejected status, we can provide callbacks that run. We can use the new ES6 `then` and `catch` keywords to register the appropriate callback. Logic in the `then` runs when everything went okay. Logic in the `catch` runs when there was an error.

## Creating Promises

Vast majority of Promise use is in AJAX requests. But they don't have to be coupled with AJAX requests. Let's try creating our own Promise:

```js
const promise = new Promise(() => {});

// If we don't provide an argument to new Promise(), we get the following error:
// Resolver undefined and is not a function

// In the above promise, our status is always "pending" -- as we never do anything to determine when it rejects or resolves. It's up to us to decide when a Promise is resolved or rejected, if we are creating our own Promise
const promise = new Promise((resolve, reject) => {
  if (somethingWentWell) resolve();
  if (somethingWentWrong) reject();
});
```

Resolve and reject arguments are both functions. They are automatically provided to the inner function
Calling resolve() enters Promise into the resolve state

Whenever we create a Promise and assign it to a variable, that promise object has two properties on it: then and catch
promise.then()
promise.catch()

We register callbacks inside them:

```js
promise.catch(() => {
  console.log('Rejected!');
});

promise.then(() => {
  console.log('Finally finished!');
});
```

Can chain on multiple callbacks:

```js
// Look how nice this looks with the short-hand syntax!
promise
  .then(() => console.log('Finally finished!'))
  .then(() => console.log('I also run!!'))
  .catch(() => console.log("I'm only called upon rejection!"));
```

## Async Code with Promises

How can we use Promises to handle async code?

```js
const promise = new Promise((resolve, reject) => {
  // Simulate async network request
  setTimeout(() => resolve(), 3000);
});
```

Our status is pending for 3 seconds, then we see resolved

## Ajax Requests with Fetch

We can use the native `fetch` function to make AJAX requests.

```js
const url = 'https://jsonplaceholder.typicode.com/posts/';

fetch(url); // Returns a Promise, with a "pending" state

// We must await or .then the request
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

**Note** that `async` and `await` wasn't introduced until ECMAScript 2007. But using async/await we can simplify further:

```js
const result = await fetch(url);
const response = await result.json();
```

## Shortcoming of Fetch

It's odd to have to call `response.json()` to get an actual useful result from fetch.

Two properties on response object: `ok` and `status`
If server throws error, it will be status of 300 or above

Fetch diverges from most libraries:

```js
// Assume we provide a bad URL to the fetch function:
fetch(someBadURL)
  .then((response) => console.log(response))
  .catch((error) => console.log('BAD!', error));

// We expect a 404, and for "BAD!" to be printed...

// But nope! We get the console.log from the then case
// Thus, if server returns an error status code, we DO NOT enter the catch case
// No other library does this! Because why would they!
// Fetch only ever hits the .catch if the network request fails to be made, i.e never hits a server
```

`Course Completed: 6/04/2022`
