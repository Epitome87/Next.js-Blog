---
title: 'JavaScript - The Advanced Concepts - Course Notes'
date: '2022-05-25'
image: 'post1.jpg'
excerpt: 'Some of my JavaScript - The Advanced Concepts notes!'
isFeatured: false
---

# JavaScript - The Advanced Concepts

`Course Started: 6/12/2022`

My journey through the "JavaScript - The Advanced Concepts" Udemy course.

## The 2 Pillars - CLosures and Prototypal Inheritance

In this section, we will learn about:

1. Closures
2. Prototypal Inheritance

First, we must understand:

- Higher Order Functions
- Functions vs Objects
- Scheme + Java

### Functions are Objects

In JavaScript, functions are objects

When we invoke a function, we get two parameters automatically: `this` and `arguments`

- arguments: array-like object, weird behaviors for looping and iteration, tend to avoid using it. Tend to use spread operator

Can call method with `call` method:

```js
function three() {
    return 3;
})

three.call();
```

Can call methods with a `function constructor`:

```js
const four = new Function('num', return num');

four(4);
```

- We will rarely see methods called this way!
- The last parameter is the code body

Since JavaScript methods are objects, we can add properties to it:

```js
function woohoo() {
  console.log('Whoohoo!');
}

woohoo.yell = 'Ahhh!';
```

- Creates **callable** object
- Under the hood, something like this is happening:

```js
const specialObj = {
    yell: 'Ahhh!',
    name: 'woohoo',
    (): console.log('Woohoo!')
}
```

### First Class Citizens

"Functions are a first class citizen in JS"

- Functions can be assigned to variables and properties:

```js
let a = function () {};
```

- Can't do this in many languages
- Functions can be passed as arguments into other functions:

```js
let a = function () {
  console.log('Function a');
};
function b(fn) {
  fn();
}
```

- Can return functions as a value from another function:

```js
function a() {
  return function b() {
    console.log('Function b');
  };
}

let d = b();
d(); // Prints "Function B"
```

Functions are data; can be passed around like first-class citizen! Anything we can do with other types, we can do with a function. This leads to **functional programming**, as JS lends itself nicely to it

### Misc Function

- Avoid initializing functions inside of loops -- allocates unnecessary in memory

```js
for (let i = 0; i < 5; i++) {
  function a() {}
}
```

- Good to have default parameters

### Higher Order Functions

A function that can take a function as an argument, or a function that returns another function

- Makes code DRYer and a lot more flexible

```js
const multiplBy(num1) {
    return function(num2) {
        return num1 * num2;
    }
}

// Can "simplify" like:
const multiplyBy = (num1) => (num2) => num1 * num2;
multiplyBy(4)(6); // Returns (4) => (6) => 4 * 6 = 24

const multiplyByTwo = multiplyBy(2);    // Sets equal to a function that will return 2 times whatever we pass when we call it
multiplyByTwo(4);   // Returns 8
multiplyByTwo(10);  // Returns 20

const multiplyByFive = multiplyBy(5);   // Sets equal to a function that will return 5 times whatever we pass when we call it
multiplyBy5(6);     // Returns 30
```

- Higher Order Functions makes code look more complicated, some may argue

### Closures

The first of the two pillars that are extremely important to understand: Closures

Due to the combination of functions being first-class citizen in JavaScript, and _lexical scope_ (JS engine knows based on where our code is written, before we run the code, what variables each function has access to), closures give us great abilities.

**Closures allow a function to access variables from an enclosing scope even after it leaves the scope in which it was declared**

```js
function a() {
  let grandpa = 'grandpa';

  return function b() {
    let father = 'father';

    return function c() {
      let son = 'son';

      return `${grandpa} > ${father} > ${son}`;
    };
  };
}
```

In the above, function a and b are higher order functions.

```js
a(); // Returns function b
a()(); // returns function c
a()()(); // runs function c
```

How did son remember what grandpa was? When we ran a() we run it, invoke it, and it's popped off the stack, right? Which means we remove the variable environment. Shouldn't let grandpa be garbage collected?

- The answer is: Closures!

Grandpa is stored in a special closure box, isn't cleaned up until the entire chain is popped. JS knows it's being referenced by a child function, and will not let its variable environment be prematurely trashed

- Note that if we had some variable in function a that was not referenced in function b or c, it would not be kept in the closure

Closures are also called _lexical scoping_

- Lexical: Where it is written, Scoping: what variable we have access to
- JS engine has links between each function before we even run our code

### Closure Exercise

```js
function callMeMaybe() {
  const callMe = 'Hi';
  setTimeout(function () {
    console.log(callMe);
  }, 4000);
}

callMeMaybe(); // Prints "Hi" after 4 seconds
```

Note that we can also re-order where the callMe variable is defined, and everything still works!

```js
function callMeMaybe() {
  setTimeout(function () {
    console.log(callMe);
  }, 4000);
  const callMe = 'Hi';
}

callMeMaybe(); // Still prints "Hi"!
```

- Doesn't matter that `const` isn't hoisted. This piece of code goes all the way into the web API world, gets put on the callback queue, the event loop pushes it back onto the stack. But by that time we already ran this function, const callMe has already been created and assigned, closure already created!

### Closures and Memory

```Left off here on 6/12/2022`

Two important main benefits of Closures:

1. Memory efficient
2. Encapsulation

Memory Efficient

```js
// Imagine this is a very heavy-duty operation
function heavyDuty(index) {
  const bigArray = new Array.(8000).fill('😊');

  return bigArray[index];
}

// bigArray is created three times
heavyDuty(688);
heavyDuty(700);
heavyDuty(750);


function heavyDuty2() {
  const bigArray = new Array.(8000).fill('😊');

  return function(index) {
    return bigArray[index];
  };
}

// We only create bigArray once...
const getHeavyDuty = heavyDuty2();
// ...and reference it with these calls
getHeavyDuty(688);
getHeavyDuty(700);
heavyDuty(750);
```

(Seems like a contrived example and reason Closures are useful -- we can just define bigArray outside of our function scope!)

Encapsulation

```js
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return '💥';
  };
  setInterval(passTime, 1000);

  return {
    launch,
    totalPeaceTime,
  };
};

const ohNo = makeNuclearButton();
ohNo.totalPeaceTime(); // Passed amount of time since button was created
ohNo.launch();
ohNo.totalPeaceTime(); // 0 seconds
```

In the above example, we decide we no longer want to expose the launch function to the public. So we remove it. And...for some reason this is the lecture's big, contrived, pointless example of the power of Closures and Encapsulation!

### Closure Exercises

```js
const array = [1, 2, 3, 4, 5];

for (var i = 0; i < array.length; i++) {
  setTimeout(function () {
    console.log('I am at index' + i);
  }, 3000);
}
```

The above code will print out "I am at index 4" for each iteration, which is probably what we weren't expecting. One way to fix this is to change var to _let_, which will create a block scope for each i in the loop. WHen we use var, it was part of the global scope, so when each setTimeout finally returned, the for-loop had already gone through everything and settled on 4 for the value of i.

Another solution is to use closures, by wrapping setTimeout in an Immediately Invoked Function Expression (IIFE):

```js
const array = [1, 2, 3, 4, 5];

for (var i = 0; i < array.length; i++) {
  (function (closureI) {
    setTimeout(function () {
      console.log('I am at index' + closureI);
    }, 3000);
  })(i);
}
```

### Closures Review

- Combination of the function and the lexical environment from which it was declared
  - Able to do this because functions are first-class citizen and lexical scope exists in JavaScript
- Allow a function to access variables from an enclosing scope or outer scope environment, even after it leaves teh scope in which it was declared
  - All that matters in JS is where the function was written
- JavaScript really popularized this idea, now adopted to Python and Ruby
  - C# and C++ even adding it

### Prototypal Inheritance

The second important pillar in JavaScript: Prototypal Inheritance

- Inheritance: Object getting access to the properties and methods of another object
- Array and Functions get access to the properties and methods of the Object in JS

`array.__proto__` let's us go up the prototype chain and see all the methods and properties that all Array objects get inherited

- Array was created from the Array constructor doing `const ourArray = []`

`array.__proto__.__proto__` will make us go up even higher on the prototype chain, up into the base Object

- Base Object: Object that everything in JS gets created from
  - Methods like toString

```js
function a() {}

a.__proto__; // f() { [native code] } -- This is our base function, where all functions are created from
a.__proto__.__proto__; // Base object, where all Objects (which a function is) are created from
a.__proto__.__proto__.__proto__; // null -- it's the end of the chain!
```

Most languages use classical inheritance. So JavaScript is unique in this sense
Even though JS does have a **class** keyword, it's just syntactical sugar for prototypal inheritance

### Prototypal Inheritance 2

```js
let dragon = {
  name: 'Matthew',
  fire: true,
  fight() {
    return 5;
  },
  sign() {
    if (this.fire) return `I am ${this.name}, the breather of fire!`;
    else return `I am ${this.name}!`;
  },
};

dragon.sign();
dragon.fight();

let lizard = {
  name: 'Caitlin',
  fire:
  fight() {
    return 1;
  },
};

const singLizard = dragon.sing.bind(lizard);

console.log(singLizard(())); // I am Caitlin
```

In the above, we are inheriting methods, in a way. But we can do this much easier and on a larger scale with prototypal inheritance:

```js
lizard.__proto__ = dragon;
lizard.fire; // true, from the dragon object
lizard.fight(); // 1 (the lizard's power)
lizard.sing(); // I am Caitlin, the breather of fire!
dragon.isPrototypeOf(lizard); // Returns true! isProtoTypeOf is a base Object method
// We can also think of this method as asking: Does lizard inherit from dragon?
```

Here, we inherited all the properties and methods of the dragon, and overwrite some properties (name and fight) in lizard.

JavaScript sees lizard doesn't have a sing event, keeps going up the prototype chain to look for it.

### Prototypal Inheritance 3

```js
lizard__proto__ = dragon;

for (let prop in lizard) {
  console.log(prop);
}
// name, fight, fire, sing

// Only get the properties Lizard has, that aren't copied from its prototype (dragon)
for (let prop in lizard) {
  if (lizard.hasOwnProperty(prop)) {
    console.log(prop);
  }
}
// name, fight
```

But how come I haven't really seen `.__proto__` before? It's a good concept to learn, but:

- Shouldn't use it!
- Bad for performance
- Different, better ways to inherit
- Never manually assign and create these prototype chains!

Good for:

- Objects can share prototypes, means can share properties that are pointing to the same place in memory -- more efficient
  - Each lizard can share the same instance of the sing method, for example
  - Example: hasOwnProperty function only lives in one location in memory, not once for each and every object

### Prototypal Inheritance 4

```js
const obj = { name: 'Matthew' };
obj.hasOwnProperty('name'); // true
obj.hasOwnProperty('hasOwnProperty'); // false

// But what about a function?
function a() {}
a.hasOwnProperty('call'); // false
a.hasOwnProperty('bind'); // false
a.hasOwnProperty('apply'); // false
a.hasOwnProperty('name'); // true
```

Remember that functions have the code body itself, an optional `name` property (name of the function), and properties, three of which are provided for us: `.call()`, `.apply()`, and `.bind()`. But these three properties are not the Function's own properties -- they're inherited from up the prototype chain, from the base function!

```js
function multiplyBy5(num) {
  return num * 5;
}

multiplyBy5.__proto__; // f() (base function)
```

`__proto__` links to `prototype: {}`

Revisiting our diagram from earlier, we can actually say that multiplyBy5 has:

- Callable code
- Name (optional)
- Properties
- prototype: {}
- `__proto__`
  - Pointer to up the chain -- points to `Function.prototype` in most cases
  - Links to the prototype object property of the parent (this is where call, apply, and bind live)
    - `__prototype__ `lives inside this prototype object property!

So, `Object.prototype` is the base object, and its an object which has a `__proto__` that points to null, as this is the top of the prototype chain.

```js
const array = [];
array.hasOwnProperty('map'); // False
array.__proto__.hasOwnProperty('map'); // True
```

In the above, `array.__proto__` points to the parent, `Array.prototype`

### Prototypal Inheritance 5

So, if we should never use `__proto__` (in fact it is named as such so we don't accidentally use it), how can we create our own prototypes?

```js
let human = {
  mortal: true,
};

let socrates = Object.create(human);
socrates.age = 45;
socrates.mortal; // Still true!
human.isPrototypeOf(socrates); // True!
```

In the above, socrates inherits from human.

### Prototypal Inheritance 6

(Rather complicated lesson -- revisit!)

**Only functions have the prototype property**

```js
typeof Object; // "Function"
typeof {}; // "Object"
```

When we do something like const obj = {}, underneath the hood JS uses the Object constructor, which is a function

Key takeaway:
Every function has a prototype property, and it references to an object used to attach properties that will be inherited by objects further down the prototype chain. The last object in the chain is the built-in Object.prototype, the base object.

```js
const obj = {};
obj.prototype; // Undefined -- it's not a function

const arr = [];
arr.prototype; // Undefined -- not a function

'some string'.prototype; // Undefined -- not a function!

String.prototype; // Defined! It has a lot of methods from the String constructor that are inherited
```

Even though "some string".prototype is Undefined, JS will convert "some string" to a String object and look up the prototype chain for these methods, so we can perform methods such as charAt on this string.

### Prototypal Inheritance Exercise

Exercise #1: Extend the functionality of the Date object to have new method .lastYear(), which shows you last year 'YYYY' format. I.e new Date('1900-10-10').lastYear() returns "1899"

Exercise #2: Modify the .map method to print a map emoji at the end of each item. I.e [1, 2, 3].map() will return [1🗺, 2🗺, 3🗺];

Solution #1:

```js
Date.prototype.lastYear = function () {
  // this refers to the date object, which has getFullYear
  return this.getFullYear() - 1;
};

new Date('1988-10-10').lastYear(); // Returns  1987

// Remember, if we used an arrow function above "this" would be lexically scoped
// We want this to be determined at run-time, when we actually call it
```

Solution #2:

```js
Array.prototype.map = function () {
  let arr = [];

  for (let i = 0; i < this.length; i++) {
    arr.push(this[i] + '🗺');
  }

  return arr;
};
```

Although these were exercises, you should never really modify existing built-in functions!

Much like we observed earlier, we can observe here that we never really use or see things like `Array.prototype = ` any more. Well, this way of doing inheritance is outdated! There's newer, cleaner ways to do it using the `class` keyword, which we'll explore in the next section.

### Section Review

With Closures and Prototypes covered, we can now learn how to use programming paradigms to improve our coding abilities.

The developer of JavaScript originally based it off the Scheme and Java languages. In Java, classes and classical inheritance was very important. This idea of object oriented programming where objects were the key to building programs. In Scheme, functions were the key to building programs. Because of that JavaScript gives us a multi-paradigm language. Can't say JS is object-oriented language or a functional language -- it's both, and we can use the language however we want!

` Section Completed 6/13/2022`

## Object-Oriented Programming

### Section Overview

Object-Oriented Programming (OOP) is a programming paradigm. Allow us to organize code in a way that is easy to reason about.

- Clear + understandable
- Easy to extend
- Easy to maintain
- Memory efficient
- Keeps our code DRY

### Object Oriented Programming and Functional Programming

Data and behavior, the two main aspects of a program

OOP says bring together data and behavior in a single location called an Object
Functional programming says data and behavior are distinctly different, should be kept separate for clarity

In JS, it's not one paradigm vs the other. We can make use of both to our advantage!

The reason we learned about Closures and Prototypes is because they are the stepping stones for functional programming and OOP, respectively.

### OOP Introduction

We will learn about:

- `this` keyword
- `new` keyword
- Prototype
- ES6 Classes
- Java
- Inheritance
- Object.create()
- Private vs Public
- 4 Principles of OOP

### OOP - Factory Functions

```js
const elf = {
  name: 'Matthew",
  weapon: "Bow",
  attack() {
    return "Attack with " + elf.weapon;
  }
}

elf.attack();  // Attack with Bow

const elf2 = {
  name: 'Caitlin",
  weapon: "Sword",
  attack() {
    return "Attack with " + elf.weapon;
  }
}

elf2.attack();  // Attack with Sword
```

In the above, we have to copy and paste the same code over and over, despite a lot of it being re-usable in other Elf objects.

Step two of OOP in JS is to utilize factory functions:

```js
function createElf(name, weapon) {
  return {
    name,
    weapon,
    attack() {
      return 'Attack with ' + weapon;
    },
  };
}

const matthew = createElf('Matthew', 'Bow');
const caitlin = createElf('Caitlin', 'Bow');
```

The above is a **factory function** -- it allows us to easily create Elf objects

There's still an issue though! Even though the attack method is the same for all Elf objects, it is being stored in memory for each Elf object.

### OOP - Object.create()

To share the same functionality on multiple objects, we can do this manually:

```js
const elfFunctionsStore = {
  attack() {
    return 'Attack with ' + this.weapon;
  },
};

function createElf(name, weapon) {
  return { name, weapon };
}

const matthew = createElf('Matthew', 'Bow');
matthew.attack = elfFunctions.attack;
matthew.attack(); // Works as expected!
```

The above solution works, but it's a little more tedious than it needs to be. We can use `Object.create()` to clean this process up:

```js
const ElfFunctionsStore = {
  attack() {
    return 'Attack with ' + this.weapon;
  },
};

function createElf(name, weapon) {
  let newElf = Object.create(elfFunctionsStore);
  newElf.name = name;
  newElf.weapon = weapon;
  return newElf;
}

const matthew = createElf('Matthew', 'Bow');
matthew.attack = elfFunctions.attack;
matthew.attack(); // Works as expected!
```

We created a link between the elfFunctionsStore and our elf with Object.create via prototypal inheritance.
This works, but it is not the standard in the JavaScript community. This method isn't necessary OOP, yet!

### OOP - Constructor Functions

Before we had Object.create, we had a different means (which was even truer to OOP). We had **constructor functions**

```js
// Constructor Functions
function elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

const matt = new elf('Matt', 'Stones');
const cait = new elf('Cait', 'Sword');
```

Note we aren't returning anything in the elf function. Also note the `new` keyword.
New keyword automatically returns the object for us, creates the elf constructor.
Any function invoked using the `new` keyword is called a **constructor function**
Should start with a capital letter, to let programmers know you need to call the function using the `new` keyword (not mandatory, just good practice)

```js
const Elf1 = new Function('name', 'weapon', `this.name = name; this.weapon = weapon`);

const matt = new Elf1('Matt', 'Dagger');
```

When we use the `new` keyword, `this` no longer points to Window object like it usually does -- it points to the object that's being created. We can this in action:

```js
// Constructor Functions
function elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

const matt = new elf('Matt', 'Stones'); // Cannot read property "name"
```

We also now have access to the `prototype` property:

```js
Elf.prototype.attack = function() { return 'attack with ' + this.weapon });

const matt = new Elf("Matt", "Stones");
matt.attack();  // This works! Even though matt doesn't have it, his prototype up the chain does
```

Can use constructor functions instead of Object.create to create this function that creates a new object, returns a new object, and also modifies what `this` means. We also have this prototype property, so even though matt doesn't have its own attack method, it goes up the prototype chain and finds it there -- in the same location in memory for all elfs.

Remember, if we define these functions as arrow functions, the `this` keyword is lexically scoped, and will be treated as if the global Object were calling it (which is not what we want).

Basically:

- Regular function: Dynamically scoped -- doesn't matter where it's written, just whoever calls it
- Arrow function: Lexically scoped -- only matters where it's written

### More Constructor Functions

- With a constructor function, we **must** use the `this` keyword to add properties to an object.

```js
function Elf(name, weapon) {
  this.name = name; // Fine
  damage = 5; // This will not get saved as part of the object!
}
```

Remember, `__proto__` is a pointer to the `prototype` property on the parent being inherited from. So when we say

```js
const matt = new Elf('Matthew', 'Stones');
matt.__proto__; // Points to Elf.prototype

Elf.prototype.attack = function () {
  return 'Attack with ' + this.weapon;
};
```

Since Elf.prototype is being given an attack function, and since the elf we created via new Elf has its **proto** point to that function, our matt elf has access to it as well!

- Remember, every function we create has this `prototype` object, but only constructor functions actually have use for it.

- Functions inside of methods have the word `this` attached to the global window object:

```js
Elf.prototype.build = function () {
  function building() {
    return this.name + ' builds a house';
  }

  building();
};
```

Can solve with `.bind(this)`:

```js
Elf.prototype.build = function () {
  function building() {
    return this.name + ' builds a house';
  }

  building().bind(this);
};
```

Or, even better, have a reference to what `this` is:

```js
Elf.prototype.build = function () {
  function building() {
    const self = this;
    return self.name + ' builds a house';
  }
};
```

This code still has problems! Prototyping isn't very understandable, hard to read, ugly! Not many people like this style of coding OOP. OOP is all about the idea of **classes** -- where is that idea in what we've been covering above? Object.create() was added in order to avoid the headache of the above, but is less object-oriented, because `this` and `new` are very much OOP inspired. If we want to get closer to OOP, Object.create is less object-oriented. So how can we improve this? In the next lecture, we'll finally get to true (or as close as we can get in JS) OOP!

### Funny Thing about JavaScript

`Progressed to here by 6/14/2022's end`

```js
let a = new Number();
typeof a; // 'object'

let b = 5;
typeof b; // 'number'

a === b; // false
a == b; // true, these types get coerced

b.toString(); // Works! Internally, JS constructs the Number methods onto number primitives
```

Besides `null` and `undefined`, everything is an object -- everything has constructor functions!

### OOP - ES6 Classes

We're finally here, the point where JavaScript finally reaches a more true sense of OOP: The introduction of `class`

```js
// ES6 Class
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return `attack with ${this.weapon}`;
  }
}

// INSTANTIATING a class
const matthew = new Elf('Matthew', 'Sword');
```

We now have one location that holds everything related to an Elf. One change inside this Elf class affects all **Instances** of the Elf class.

Why not put attack in the constructor? The constructor is ran when we use the `new` keyword. But attack is shared by all instances of the class. If we move attack to the constructor, that will take up memory space for each instance.

**Instance**: When we create an object using the `new` keyword, we create an instance of an object.

```js
matthew instanceof Elf; // true
```

So we finally have true OOP, right? Well, under the hood we are actually still using prototypal inheritance. This is the closest JavaScript will get to classes, but it's still syntactical sugar for prototypal inheritance (`pseudo-classical inheritance`). Historically, the JS creator could not have the language resemble the use of OOP in Java, for marketing purposes.

### Object.create vs Class

Some programmers love classes, some hate them. Some people call using Object.create _pure prototypal inheritance_ -- the pure way of doing it. However, most newer codebases use class over Object.create.

### this - 4 Ways

1. New Binding - assign this to an object we instantiate

```js
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('Matthew', 35);
```

2. Implicit Binding -- the context of this is implied. We create an object, and the this keyword in it refers to the object itself

```js
const person2 = {
  name: "Matthew",
  age: 35,
  hi() {
    console.log(`Hi ${this.name});
  }
}
```

3. Explicit Binding -- we dictate what the this keyword should refer to. Usually through bind, call, or apply.

```js
const person3 = {
  name: 'Matthew',
  age: 35,
  hi: function () {
    console.log('Hi' + this.setTimeout);
  }.bind(window),
};
```

4. Arrow functions -- lexical scoping, wherever we write the function, that's what this binds to

```js
const person4 = {
  name: 'Matthew',
  age: 35,
  hi: function () {
    let inner = () => {
      console.log('Hi' + this.name); // If we didn't use arrow function, this.name would be window object
    };

    return inner();
  },
};
```

### Inheritance

```js
const matthew = new Elf('Matthew');
const caitlin = { ...matthew };

// matthew and caitlin have same property / values
caitlin.__proto__; // Empty object {}
matthew.__proto__; // Elf {}
matthew === caitlin; // false -- not referencing same place in memory, lost prototypal inheritance chain
caitlin.attack(); // Nope, not defined!
```

In the above, we do clone the matthew Elf, but caitlin no longer has Elf as the base class. Caitlin cannot even access the attack method. To remedy this, we can use inheritance:

```js
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return `Attack with ${this.weapon}`;
  }
}

class Elf extends Character {
  constructor(name, weapon, type) {
    super(name, weapon);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  makeFort() {
    return `Strongest fort in the world created!`;
  }
}

const fiona = new Elf('Fiona', 'Sword'); // Works, has a name and weapon
const dolby = new Elf('Dolby', 'Cloth', 'house');
dolby.makeFort(); // Nope! This is a Ogre-exclusive method

const shrek = new Ogre('Shrek', 'Club', 'green'); // Works, has a name and weapon from Character
shrek.makeFort(); // Works!
```

This is called sub-classing -- we have a base (or super) and a sub (or child) class that inherits properties and methods.
Note we had to call `super` in order to successfully create a sub-class. It must be called inside of the constructor. It calls the parent constructor, which in our case will create name and weapon (and thus must receive those as arguments).

When we use `extend` we are basically setting the `__proto__` to point to the parent. Any time the child uses a property or method it does not have defined, we look up the prototype chain to the parent and see if the parent has it defined.

We don't need to call super, unless we want to set any new property in the child class using the this keyword. Because we call super, which runs the constructor, we now have an instance of the parent, and can now use this properly.

Using the old way, we would have to give an Ogre its makeFort method by doing:

```js
Ogre.prototype.makeFort = function() { ..etc };
```

But the use of `class` does this for us.

```js
Ogre.isPrototypeOf(shrek); // false -- Ogre is a constructor function
Ogre.prototype.isPrototypeOf(shrek); // true -- prototype is the object that contains all the props and methods we have available

Character.prototype.isPrototypeOf(Ogre); // false
Character.prototype.isPrototypeOf(Ogre.prototype); // true
```

All this prototype stuff is confusing. We can use the `instanceof` keyword instead:

```js
dolby instanceof Elf; // true
dolby instanceof Ogre; // false
dolby instanceof Character; // Also true!
```

Remember, in JS, classes are just objects inheriting from classes. In other languages like Java and C++, objects are actually copied, and not as memory efficient as JS, which references objects.

### Public vs Private

JS doesn't really have public and private classes (as of ES6). We would usually add an underscore to the start of a method to indicate that it's a "private" method that other developers should not call. But that doesn't prevent the method from being called!

A proposal for private state started in July 2016, and didn't become a reality until after September of 2018.

(This course is outdated, and true public and private fields do now exist!):

```js
class ClassWithPrivateField {
  #privateField;
}

class ClassWithPrivateMethod {
  #privateMethod() {
    return 'hello world';
  }
}

class ClassWithPrivateStaticField {
  static #PRIVATE_STATIC_FIELD;
}

class ClassWithPrivateStaticMethod {
  static #privateStaticMethod() {
    return 'hello world';
  }
}
```

```js
class ClassWithPrivateField {
  #privateField;

  constructor() {
    this.#privateField = 42;
    delete this.#privateField;   // Syntax error
    this.#undeclaredField = 444; // Syntax error
  }
}

const instance = new ClassWithPrivateField()
instance.#privateField === 42;   // Syntax error
```

- Note we use the `#` symbol to denote a private field. These properties and methods marked as private can only be accessed inside of the class

More recently, we can also declare variables that we don't have to pass through the constructor or assign using the `this` keyword:

```js
class Character {
  strength = 10; //  This is allowed now!
  #defense = 10; // This is allowed now, and it's also private!

  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return `Attack with ${this.strength} damage!`;
  }

  defend() {
    return `Defended with ${this.#defense} defense`;
  }
}
```

Note that when we access these non-constructor variables, we still need to use the `this` keyword.

Also note how `static` properties and methods are now allowed! Properties and methods marked as _static_ belong to the entire class -- not just an instance of an object.

### OOP in React.js

You can see in popular libraries like React the use of classes. This is especially apparently in a class-based React component, which `extends React.Component`, giving us access to base functionality.

### 4 Pillars of OOP

1. Encapsulation

- Unlike procedural programming, functions modifying data, no real structure, OOP puts things in an object, organizes things into units that model real world things. Objects interact with each other using properties and methods.

2. Abstraction

- Hiding the complexity from the user. Creating simpler interfaces. You instantiate the class, I'll take care of the rest. Here are the properties and methods you can use -- I'll handle the calculations behind the scenes. We see the methods and properties and understand what the class can do.

3. Inheritance

- Classes can inherit from other classes, avoid re-writing code, share methods to save memory space.

4. Polymorphism

- _Many forms_. Ability to call the same method on different objects and each object responding in different ways. Process objects differently depending on their data type or class. Method overriding (changing behavior of a method). Method overloading (adding extra parameters). Re-use functionality of a super class, but adapt to our needs in the child class.

- Method overriding example:

```js
class Ogre extends Character {
  attack() {
    return `attack with roar!`;
  }
}

class Elf extends Character {
  attack(cry) {
    return `attack with ${cry}`;
  }
}

dolby.attack('Weee!'); // Attack with weee!
shrek.attack('Weee!'); // attack with roar!
```

- Method overloading example:

```js
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }

  attack() {
    return `Attack with ${this.weapon}`;
  }
}
class Ogre {
  // Method overriding -- we change the behavior of the default Character attack
  attack() {
    super.attack();
    return `And then attack with a ROAR!!!`;
  }
}

class Elf {
  // Method overloading -- we change the argument signature of the attack method to accept new inputs, which can affect the output
  attack(cry) {
    return `Attack with ${cry}`;
  }
}
```

### Reviewing OOP

Quite a heavy section on OOP! Just a recap in this lecture.

`Section Completed on 6/15/2022`

## Functional Programming

In this section, we will cover Functional Programming concepts such as:

- Curry
- Partial Application
- Pure Functions
- Referential Transparency
- Compose
- Pipe

As well as:

- Composition vs Inheritance
- Functional Programming vs Object Oriented Programming

### Functional Programming Introduction

Separate data and functions. Emphasis on simplicity where data and functions are concerned. No concept of classes or methods that belong to objects. Functions operate on well-defined data structures, rather than belonging to them. Same goals as OOP: clear, easy to extend, easy to maintain, memory efficient, DRY.

**Pure Functions** are the main pillar of functional programming.

- Separation between data and behavior
- All objects created are **immutable** -- once created, cannot be changed
- Avoid shared state
- A lot of restraints

### Functional Programming Exercise

My attempt at an exercise, which will be re-visited after exploring functional programming further.

```js
const user = {
  name: 'Matthew',
  active: true,
  cart: [],
  purchases: [],
};

// Implement a Cart feature:
// 1. Add items to cart
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart
// Bonuses:
// Accept refunds
// Track user history

function addItem(item) {
  user.cart.push(item); // Not bothering checking for duplicates
}

function buyItem(itemToBuy) {
  user.cart.filter((item) => item.id !== itemToBuy.id);
  user.purchases.push(itemToBuy);
}

function emptyCart() {
  user.cart = [];
}
```

### Pure Functions

**Pure Functions**

- Always has to return same output given same input
- Cannot modify anything outside of itself -- **no side effects**

```js
const array = [1, 2, 3];

// This function has side effects! Mutates something that lives outside of it (the input array)
function pop(arr) {
  arr.pop();
}

pop(array);
```

```js
// Also modifies outside data -- has side effects
function mutateArray(arr) {
  arr.forEach((item) => arr.push(1));
}
```

To achieve the same results, but have no side effects, we can create new arrays:

```js
const array = [1, 2, 3];

// Pure function -- returns new array, doesn't mutate input arr array
function pop(arr) {
  // const newArray = arr; // No! This will also change the input arr array -- as objects are passed by reference
  const newArray = [].concat(arr);
  newArray.pop();

  return newArray;
}

const poppedArray = pop(array); // array is unchanged, poppedArray is [1, 2];
```

Now we know what to expect, that our outside data will not be modified by any function calls.

```js
// Tricky case -- this is NOT a pure function!
function someFunction() {
  console.log('Hi');
}
```

Calling console.log is windows-specific, we are using the browser to log something, affects outside world (logs something to output of browser). So it is not a pure function!

**Input should always result in the same output**

**Referential Transparency**

- In functional programming, referential transparency is generally defined as the fact that an expression, in a program, may be replaced by its value (or anything having the same value) without changing the result of the program.

```js
add(a,  b) {
  return a + b
}

mult(a,  b) {
  return a * b;
}

let x = add(2, mult(3, 4));

// In this example, the mult method is referentially transparent because any call to it may be replaced with the corresponding return value. This may be observed by replacing mult(3, 4) with 12:

let x = add(2, 12)

// In the same way, add(2, 12) may be replaced with the corresponding return value, 14:

let x = 14;
```

### Can Everything Be Pure?

We can't really have programs without side effects! The idea is to just organize code to minimize side effects. We know which parts of our code are pure and which have side effects, and thus where to look for related bugs. Organize code in a way to isolate side effects (db calls, API calls, input/output) to a certain location, predictable and easier to debug.

We want programs that are built with a bunch of very small, very reusable, very predictable pure functions.

Ingredients of a "perfect" function:

- Should do **1 task** only
- Should have a return statement
- Should be pure
- No shared state with other functions
- Immutable state -- can modify state within our functions, but always return a new copy of inputs -- never modify global state
- Composable
- Predictable

### Idempotent

**Idempotence**, in programming and mathematics, is a property of some operations such that no matter how many times you execute them, you achieve the same result. In programming, idempotence can be a property of many different code elements, including functions, methods, requests and statements.

```js
function notGood() {
  return Math.random();
}
```

Given the same inputs, we expect the same outputs. In the above function, this does not hold true. It is not _idempotent_

Deleting a user from a database should be indempotent. API calls, given the same parameters, should give the same results.

### Imperative vs Declarative

**Imperative** - tells the machine what to do and how to do it
**Declarative** - tells the machine what to do and what should happen. Doesn't tell the computer _how_ to do things

Humans are more declarative, computers are more imperative.

"Pass the jug of water" - declarative
"Walk there, pick up jug with right hand, walk back to me, extend hand toward me, release the jug into my hand" - imperative

Machine code is _very_ imperative. Put the variable in this memory space, take it out here, modify it here, etc.

A for loop is pretty imperative. We can make it more declarative with:

```js
array.forEach(item => console.log(item);
```

We skip telling the computer how to iterate (increment by 1, go until the end, etc), we just declare what we want.

Declarative code is eventually compiled down to imperative code.

### Immutability

Immutability means not changing the data or state. Instead, make copies of the state and return a new state every time.

```js
const obj = { name: 'Matthew' };

// Pure function
function clone(obj) {
  return { ...obj };
}

// Mutating data / state
obj.name = 'Caitlin';

// Doing so without mutation:
function updateName(obj, name) {
  const updatedObj = clone(obj);
  updatedObj.name = name;

  return updatedObj;
}

const updatedObject = updateName(obj, 'Caitlin'); // Obj isn't mutated, new updatedObject contains updated data
```

This doesn't seem very memory efficient! Just copying things every time we want to make a single change?! **Structural sharing** -- we don't actually copy _everything_, under the hood only the changes that were made to the state will be copied. With this concept, and the fact that modern memory is fairly cheap and large, avoiding mutability isn't a bad thing.

### Higher Order Functions and Closures

Remember, Higher Order Functions (HOF) is a function that either takes one or more functions as arguments, or returns a function as a result (often called a **callback**):

```js
// HOF
const hof = () => () => 5;

hof(); // Contains a function
hof()(); // 5

const anotherHof = (fn) => fn(5);

hof(function a(x) {
  return x;
});
```

Like objects, closures are a mechanism for containing state. We create a closure whenever a function accesses a variable outside of the immediate function scope -- that is, the scope of the parent.

```js
const closure = function () {
  let count = 0;

  return function increment() {
    count++;
    return count;
  };
};

const incrementFn = closure(); // Function: increment;
incrementFn(); // Count: 1
incrementFn(); // Count: 2
```

Even though initial closure function was called, the increment function remembers the variable count declared in its parent scope.

But wait, don't closures make a function impure? Yes, if we modify the closed-over variable. If we use closures as means to get data rather than mutate it, we're still following good functional programming paradigm concepts. An example:

```js
function counter() {
  let _counter = 0;
  // return an object with several functions that allow you
  // to modify the private _counter variable
  return {
    add: function (increment) {
      _counter += increment;
    },
    retrieve: function () {
      return 'The counter is currently at: ' + _counter;
    },
  };
}

// error if we try to access the private variable like below
// _counter;

// usage of our counter function
let c = counter();
c.add(5);
c.add(9);

// now we can access the private variable in the following way
c.retrieve(); // => The counter is currently at: 14
```

This also lets us create private variables through the use of closures!

### Currying

In mathematics and computer science, **currying** is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

```js
const multiply = (a, b) => a * b;
multiply(3, 4); // 12

// Using Currying
const curriedMultiply = (a) => (b) => a * b;

// Without fancy shorthand:
const curriedMultiply = (a) => {
  return (b) => {
    return a * b;
  };
};

const result = curriedMultiply(3)(4);
// Or:
const result = curriedMultiply(3);
const finalResult = result(4);
```

Why is currying useful? Can create multiple utility functions, saves on memory:

```js
const curriedMultiplyBy5 = curriedMultiply(5);

// Can re-use this function, and it will still remember that it is storing 5 as "a"
curriedMultiplyBy5(4); // 20
```

### Partial Application

Often confused with currying. Similar, yet different! **Partial Application** is a way to partially apply a function. Process of producing a function with a smaller number of parameters. Taking a function, applying _some_ of its arguments, so it remembers those parameters, uses closures to later on be called with the rest of the arguments. An example, now using 3 parameters in our multiply function:

```js
const multiply = (a, b, c) => a * b * c;

// Curried version
const curriedMultiply = (a) => (b) => (c) => a * b * c;

curriedMultiply(3)(4)(10); // 120

// Partial application version
const partialMultiplyBy3 = multiply.bind(null, 3);
partialMultiplyBy3(4, 10); // 120
```

With partial application, on the _second call_ of the function, we expect _all remaining_ arguments. Currying expects _one_ argument at a time.

Okay, but what's the practical application of this? Apparently we will see soon enough!

### MCI - Memoization

`Caching`: A way to store values to use later on.

`Memoization`: Specific form of caching. Caches the return value of a function based on its parameters. If parameter doesn't change, the result should not need to be recalculated after initial calculation.

```js
function addTo80(n) {
  return n + 80;
}

addTo80(5); // 85;
addTo80(5); // 85, but calculation is ran again
addTo80(5); // 85, but calculation is ran again
```

In the above, we are running the same calculation for the same input each and every time. Imagine this were long, complicated calculation. To re-calculate each time when given an input we have already calculated for would be a waste. This is where caching / memoization comes in!

```js
let cache = {};

function memoizedAddTo80(n) {
  // does property exist in object, similar to if (cache.n)
  if (n in cache) {
    return cache[n];
  }

  cache[n] = n + 80;

  return cache[n];
}

memoizeAddTo80(5); // Returns 85 after calculating, Cache is now: { 5: 85 };
memoizeAddTo80(5); // Returns 85 without having to calculate, as it found "5" in the cache object
```

### MCI - Memoization 2

Ideally, it's good practice to have the cache live inside of the function that uses it, not inside the global scope. But we can't just simply move the cache object inside the function and change nothing else. Consider:

```js
function memoizedAddTo80(n) {
  let cache = {};

  // does property exist in object, similar to if (cache.n)
  if (n in cache) {
    return cache[n];
  }

  cache[n] = n + 80;

  return cache[n];
}

memoizeAddTo80(5); // Returns 85 after calculating, Cache is now: { 5: 85 };
memoizeAddTo80(5); // Returns 85 without having to calculate, as it found "5" in the cache object
```

But now, every time we run this, the cache object is being reset every time we call memoizedAddTo80. So we can use closures to get around this:

```js
function memoizedAddTo80() {
  let cache = {};

  return function (n) {
    // does property exist in object, similar to if (cache.n)
    if (n in cache) {
      return cache[n];
    }

    cache[n] = n + 80;

    return cache[n];
  };
}

const memoized = memoizedAddTo80();

memoized(5); // Returns 85 after calculating, Cache is now: { 5: 85 };
memoized(5); // Returns 85 without having to calculate, as it found "5" in the cache object
memoized(10); // Returns 90 after calculating, cache is now: { 5: 85, 10: 90 }
```

### Compose and Pipe

Compose and Pipe are among the most powerful concepts in functional programming in JavaScript. However, they can be difficult to understand.

`Compose` (composition) is the idea that any sort of data transformation that we do should be obvious. In algebra, function composition allows you to apply one function to the output of another function. For example, g(f(x)) in algebra. Or in JavaScript, we might say: `const compose = (g, f) => x => g(f(x))`

Let's say we want to have a function that does two things

```js
// Our own compose function -- not one built for us
const compose = (f, g) => (data) => f(g(data));

multiplyBy3 = (num) => num * 3;
makePositive = (num) => Math.abs(num);

const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);

multiplyBy3AndAbsolute(-50); // 150
```

`compose()` isn't actually available in JavaScript itself. But it's such a common concept, that many third-party libraries provide it. One of the more well-known is _Ramda_

Here, we composed multiple functions together! We can select and assemble in various combinations.

`Pipe` is essentially the same thing, but instead of going from right to left, we go from left to right. For example:

```js
const pipe = (f, g) => (data) => g(f(data));

multiplyBy3 = (num) => num * 3;
makePositive = (num) => Math.abs(num);

const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive);

multiplyBy3AndAbsolute(-50); // 150
```

Here, f gets run first (multiplyBy3) and then g gets ran over that result (makePositive).

```js
fn1(fn2(fn3(50)));

// Using compose
compose(fn1, fn2, fn3)(50);
pipe(fn3, fn2, fn1)(50);
```

Note in the example above, rather than running a function inside a function inside a function on the data (50), we run just the compose function, pass it those 3 functions, and call that result with the data (50).

Pipe says: Take data, apply fn3 to it, whatever comes out of that, apply fn2 to it, whatever comes out of that, apply fn1 to it.
Compose says to do fn1, then fn2, then f3. Both have the same results, so we typically see them used interchangeably.

### Arity

`Arity`: The number of arguments a function takes. _Arity of 1_, _Arity of 2_, etc.

In functional programming, good rule of thumb that the fewer number of arguments the easier it is to use it. More flexible. Can use currying, or compose and pipe. The more parameters a function has, the harder it is to compose it. When it comes to arity, there's no right or wrong -- but sticking between 1-2 parameters is a safe bet.

### Is Functional Programming the Answer to Everything?

Idea in functional programming of keeping functions small, pure, composable, immutable, allows us to have a predictable program that minimizes bugs. As long as we're able to combine all these small functions together, we can create complex programs. Works really well with distributed systems, or parallelism. But it all depends on the problem you have! Games, for example, have clear objects with state, where Object Oriented Programming might be better.

### Solution to Functional Programming Exercise

`Left off here on 6/16/2022`

```js
const user = {
  name: 'Matthew',
  active: true,
  cart: [],
  purchases: [],
};

// Implement a Cart feature:
// 1. Add items to cart
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart
// Bonuses:
// Accept refunds
// Track user history

// Let's use compose!
const compose =
  (f, g) =>
  (...args) =>
    f(g(...args));

purchaseItem(emptyCart, buyItem, applyTax, addItemToCart)(user, { name: 'laptop', price: 600 });

function purchaseItem(...fns) {
  return fns.reduce(compose);
}

function addItemToCart(user, item) {
  // Instructor's way:
  const updatedCart = user.cart.concat(item);
  return Object.assign({}, user, { cart: updatedCart });

  // Non-boomer way:
  const updatedCart = [...user.cart, item];
  return { ...user, cart: updatedCart };

  // Even shorter way:
  return { ...user, cart: [...user.cart, item] };
}

function buyItem(user) {
  return Object.assign({}, user, { purchases: user.cart });

  return { ...user, purchases: user.cart }
}

function emptyCart(user) {
  return Object.assign({}, user, cart: []);

  // Non-boomer way:
  return { ...user, cart: [] };
}

function applyTax(user) {
  const taxRate = 1.3;

  // Instructor's way:
  const updatedCart = user.cart.map(item => {
    return { name: item.name, price: item.price * taxRate });
  }
  return Object.assign({}, user, { cart: updatedCart });

  // Non-boomer way:
  const updatedCart = user.cart.map(item => {
      return { ...item, price: item.price * taxRate }
  });
  return { ...user, cart: updatedCart };
}
```

This solution works rather nicely! It's like a factory: We add the item to cart, apply tax, buy the item, and empty the cart. The only headache was creating the compose function, which we could have had a library like Lodash or Ramda take care for us.

Inadvertently, using our functional programming paradigm, we have the ability to go back and forth between time.

```js
let amazonHistory = [];

// In each of our methods:
function applyTax(user) {
  amazonHistory.push(user);
  // etc
}

function emptyCart(user) {
  amazonHistory.push(user);
  // etc
}

// etc with rest of functions

console.log(amazonHistory); // Shows us user object through time! Can observe when user did certain actions
```

### Reviewing Functional Programming

FP really good at doing 1-to-1 data transformations -- we have a piece of data and functions acting upon it.
JS really promotes FP by making it easy to assign functions to variables, pass them to other functions, return functions from functions, compose and pipe functions, and immutable concepts like primitives types or using map or concat or Object.assign, cloning objects with spread operators, etc.
As many pure functions as possible. As little mutation as possible.

`Section Completed 6/17/2022`

## Object Oriented Programming vs Functional Programming

Before we can discuss OOP vs. FP, let's talk about composition vs inheritance first.

### Composition vs Inheritance

`Inheritance`: A superclass that is extended to a child class. Using class / extends keyword.
`Composition`: Smaller pieces to create something bigger. Using a compose function, for example.

Although either programming paradigm can use the concepts of inheritance and composition, FP lends itself more to composition while OOP lends itself more on inheritance. The goal here is to just understand some of the drawbacks with each.

When we talk about inheritance, we structure our code around _what it is_. What is this class? Elf is going to have these properties and methods, Character is going to have these properties and methods. Structuring code this way could have some issues:

1. Tight Coupling Problem

- Let's consider we now need to update our game, and Character now needs a sleep method. Leads to **tight coupling** -- the coupling between child and parent is very tight. We add a sleep method to Character, which could have rippling effect to all sub-classes. We change parent class, might break child class! Changing things in one place and it having a rippling effect in other places _may_ be a benefit (DRY), but it may cause a lot of unintended behavior.

2. Fragile Base Class Problem

- Tight coupling leads to fragile base class problem. Because base class changes all sub-classes, the base class can be very fragile, break code.

3. Hierarchy Problem

- A child may inherit methods it doesn't really need.
- Structuring program in way that inheritance makes sense, may become difficult

When we talk about composition, we focus and structure our code around _what it has_ / _what it does to data_ -- what the abilities are. Let's approach our Character / Elf example from a composition approach, and let's say we want our Elf to have an Attack method:

```js
function getAttack(character) {
  return Object.assign({}, character, { attackFn: () => {} });
}

function Elf(name, weapon, type) {
  let elf = {
    name,
    weapon,
    type,
  };

  return getAttack(elf);
}

// Psuedo-code, but you get the idea!
Elf = attack() + sleep();
Ogre = attack() + makeFOrt() + sleep();
```

We turned our structure from "this is what the Elf is" to "this is what the Elf does". We compose small pieces of functionality to describe our Elf. State is not really created internally; we accept a state and return it. Elf internally creates an Elf, spits out a new Elf object with the functionality (attack) that we need.

### OOP vs. FP 1

OOP and FP are both paradigms -- writing code compliant with a specific set of rules. Organizing code into units, OOP. Avoiding side effects, pure functions, FP. An object is a box containing info and op refering to the same concepts in OOP. Info is called attributes or state, the operations that can happen on the state are known as methods. In FP, code is a combination of functions, data is immutable. A function in FP cannot change the outside world. Output value depends on input.

In FP, functions are first-class citizens. In OOP, objects are first-class citizen.

OOP pillars: Abstraction, encapsulations, inheritance, polymorphism
FP pillars: pure functions, composing functions to act on that data

Although some languages prefer one paradigm over the other, JavaScript allows you to do both!

### OOP vs FP 2

FP:

- Many operations on fixed data
- Stateless - we don't modify state (immutable)
- Functions are pure - no side effects, don't impact code outside the function. Can run code in parallel on multiple processors
- More declarative - what we want to be doing
- Good if you have few things that require a lot of operations (little functions applied to it)
- Says: data and behavior are distinctly different things and should be kept separate

OOP:

- Few operations on common data
- Very stateful - we modify state
- Side effects. Methods manipulate internal state
- More imperative - how we want it to be done
- Good if you have many things (characters in a game) with few operations
- Says: bring together the data and behavior in a single location (object / class)

React uses the idea of a component class that extends from a base component. But it also supports FP ideas -- stateless function-based components, for example, receive inputs (props) and return predictable HTML outputs.

## Asynchronous JavaScript

In this section, we will explore:

- Web APIs
- Async/Await
- Callbacks
- Microtask Queue (Job Queue)
- Task Queue (Callback Queue)
- Promises
- Event Loop
- Error Handling

`Async`: Functions we can execute later. An operation that may not finish instantly. "Hey, go find this out for me, and when you're done come back to me with that information"

JavaScript is single-threaded
The web browser / Node.js allows us to use async code, so we can interact with things outside the world of JS.

### How JavaScript Works

What is a program?

- Allocate memory
- Parse and execute scripts, read/run commands

JavaScript Engine

- Reads the JS that we write, changes into machine executable instructions for the browser
- Consists of the **Memory Heap** and the **Call Stack**
- Memory allocation happens on memory heap
- Call Stack where code is read and executed, where you are in the program

```js
const num = 1; // Allocated memory

// Call Stack
console.log('1');
console.log('2');
console.log('3');
```

Limited amount of memory. Memory Leaks happen when we have unused memory laying around, fills up the memory heap. "Global variables are bad" because we fill up memory heap if we don't clean up after ourselves.

In the above example, JS comes across the first console.log line, it gets put in the call stack, JS engine pushes it onto the call stack, runs the command, pops it from the call stack after it gets run, then moves onto the next console.log.

```js
const one = () => {
  const two = () => {
    console.log('Hello');
  };

  two();
};

one();
```

In the above code, our call stack is more like: We push the one() function onto the call stack, it runs, we encounter two(), push it on top of the call stack, run the two() function, push its console.log code onto the top of the call stack. Now that there's nothing else inside, after console.log is ran, it gets popped from the call stack, then two() gets popped, and finally one().

`JavaScript is a single-threaded language that can be non-blocking` = only one Call Stack, can only do one thing at a time. Synchronous programming, each line is executed line by line, one at a time, waiting for the previous call to finish.

When a call stack _overflows_ we get a **Stack Overflow** -- call stack runs out of space. Can happen quite easily:

```js
// Recursion
function foo() {
  foo();
}

foo();
```

The function above never finishes, so it never gets popped from the call stack -- only pushed over and over.

So what if we run into a line of code that takes quite a while to finish? We have to wait that time until the next line is executed. This would make our site just hang -- the user wouldn't be able to really do anything during this time. So we need something _non-blocking_ to get around this, right? This is where _asynchronous_ comes to the rescue.

```js
console.log('1');
// Async function, provided by the browser's web api
setTimeout(() => {
  console.log('2');
}, 2000);
console.log('3');

// Output: 1 -> 3 -> 2 (after 2 seconds)
```

It looks as if we skipped logging "2", what happened? Async programming did!

JavaScript Run-Time Environment
JS needs a JS run-time environment. It's part of the browser, and includes web API (DOM, AJAX, setTimeout, etc), callback queue (onClick, onLoad, onDone), and event loop.

```js
console.log('1');
setTimeout(() => {
  console.log('2');
}, 0);
console.log('3');

// Call Stack
// Web API
// Callback Queue
// Event Loop
```

Event loop checks if the call stack is empty. If it's empty, it will check if there's anything in the callback queue. If there is (such as when the duration of a setTimeout call has finished), we move from the callback queue to the call stack, then remove the callback after its logic is ran.

Note in the above code, even though we tell setTimeout to wait 0 seconds, the result is still "1" then "3" then "2", as it still has to go through the process: Entered into the web APIs, then callback queue, then event loop, all while the call stack has moved onto console.log("3").

**So, "JavaScript is a single-threaded language that can be non-blocking": It has one call stack, does one thing at a time, in order to not block the single thread, it can be async with callback functions, which get run in the background through the callback queue and event loop bringing it back into the call stack.**

### Promises

### ES9 (ES2018)

Some new features in this version of ECMAScript.

**Spread Operator**

```js
const animals = {
  tiger: 23,
  lion: 5,
  monkey: 2,
  bird: 40,
};

const { tiger, ...rest } = animals; // Stores tiger: 23, rest: { lion: 5, monkey: 2, bird: 40 }

const array = [1, 2, 3, 4, 5];
function sum(a, b, c, d, e) {
  return a + b + c + d + e;
}
sum(...array); // Same as sum(1, 2, 3, 4, 5)

function objectSpread(p1, p2, p3) {
  console.log(p1, p2, p3);
}

const { tiger, lion, ...rest } = animals;
objectSpread(tiger, lion, ...rest); // Logs 23, 5, { monkey: 2, bird: 40 }
```

### ES9 (ES2018) - Async

**Finally**

With the keyword `finally`, we can create a block that will be called regardless of the outcome of a Promise:

```js
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
];

Promise.all(urls.map((url) => fetch(url)).then((data) => data.json()))
  .then((array) => {
    console.log(array[0], array[1], array[2]);
  })
  .catch((err) => console.log('Error!', err))
  .finally(() => console.log('I run regardless if Promise.all resolves or throws Error'));
```

**For Await Of**

Much like the for...of loop can iterate through arrays, we can iterate through an array of Promises using `for await ()`:

```js
const urls = [
  'https://jsonplaceholder.typicode.com/users',
  'https://jsonplaceholder.typicode.com/posts',
  'https://jsonplaceholder.typicode.com/albums',
];

// For Of
const loopThroughUrls = (urls) => {
  for (let url of urls) {
    console.log(url);
  }
};

// For Await Of
const getData = async function (urls) {
  const arrayOfPromises = urls.map((url) => fetch(url));

  for await (let request of arrayOfPromises) {
    const data = await request.json();
  }
};

// Equivalent to:
const getData = async function (urls) {
  try {
    const [users, posts, albums] = await Promise.all(
      urls.map(async function (url) {
        const response = await fetch(url);
        return response.json();
      })
    );

    console.log('users', users);
    console.log('posts', posts);
    console.log('albums', albums);
  } catch (err) {
    console.log('Error!', err);
  }
};
```

### Job Queue

Our JavaScript runtime diagram actually has a piecing piece! It's missing because, originally (before ES6), we didn't have this piece: The `Job Queue`.

Since Promises are rather new to JavaScript, we had to change the event loop. The event loop had what we called the Callback Queue (also called Task Queue). But with the introduction of Promises, we have a native way to handle async code using Promises (not part of Web API, but JS itself). So we needed another queue for promises: **Job Queue (Microtask Queue)**. It is similar to the Callback Queue, just a little smaller, but has a higher priority. The Event Loop will check the Job Queue before looking at the Callback Queue.

### Parallel, Sequence, and Race

Let's say we have three Promises we want to handle:

```js
const promisify = (item, delay) => {
  new Promise((resolve) => {
    setTimeout(() => resolve(item), delay);
  });
};

const a = () => promisify('a', 500);
const b = () => promisify('b', 100);
const c = () => promisify('c', 1000);
```

We can tackle them a few different ways:

1. Parallel

- Run each Promise at the same time, in parallel

```js
async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);

  // Output "a" "b" and "c" all at once
  return `Parallel is done: ${output1} ${output2} ${output3}`;
}
```

2. Sequential

- Run each Promise one at a time, waiting for the previous to succeed
- Good if one thing depends on the previous
- Works well with async/await

```js
async function sequence() {
  const output1 = await a(); // Waits to resolve, then moves to next line
  const output2 = await b(); // Waits to resolve, then moves to next line
  const output3 = await c(); // Waits to resolve, then moves to next line
  return `Sequence is done ${output1} ${output2} ${output3}`;
}
```

3. Race

- Call three things, whichever one comes back first, do that and ignore the other two

```js
async function raceExample() {
  const promises = [a(), b(), c()];
  const output = await Promise.race(promises);
  return `Race is done: ${output}`;
}

raceExample(); // Outputs "b", since that Promise resolve first (due to shortest setTimeout delay)
```

And how do they compare?

```js
parallel().then(console.log); // Outputs second
sequence().then(console.log); // Outputs last
race().then(console.log); // Outputs first
```

Note in the above example, we don't await the calls to each of the three functions. This is because we don't want to wait until one finishes before moving onto the next, which the _await_ keyword would do.

### ES2020 - allSettled()

Consider the following two Promises, what will happen when the code is ran?

```js
const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 3000));

// What is logged?
Promise.all([promiseOne, promiseTwo]).then((data) => console.log(data));
```

First the Promises are pending for 3 seconds, and then we get an error: Uncaught (in promise) undefined. Why is this? Promise.all only resolves if _all_ promises _resolve_. In order for the above code to work, we have to do a catch statement:

```js
const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 3000));

Promise.all([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((err) => console.log('Error', err));
```

Now we get Promises are pending for 3 seconds, and then a logged output of "Error". But with the new 20202 feature, we can use **.allSettled()**:

```js
const promiseOne = new Promise((resolve, reject) => setTimeout(resolve, 3000));
const promiseTwo = new Promise((resolve, reject) => setTimeout(reject, 3000));

Promise.allSettled([promiseOne, promiseTwo])
  .then((data) => console.log(data))
  .catch((err) => console.log('Error', err));
```

Now, we get Promises pending for 3 seconds, and then we output the data received -- this time an array of _both_ Promises, one with a status of "fulfilled" and another with a status of "rejected". So `Promise.allSettled()` doesn't care about the status. Unlike `Promise.all`, which short-circuits when any of the Promises are rejected or fulfilled, `Promise.allSettled()` runs all Promises regardless of whether they were rejected or not. The promise only comes back when all the promises that have been added to it are complete.

### Threads, Concurrency and Parallelism

Node has **worker threads** that help it handle multiple requests despite only having one thread.

Browser has **web workers** that work in the background for us. It is a JavaScript program running on a different thread, in parallel to our main thread. How can we create something like that? Easily:

```js
// It can read from some JavaScript file
let worker = new Worker('worker.js');

// Post a message to another thread
worker.postMessage('Hello!');

// In another thread (like main)
addEventListener('message');
```

Most of the time, you won't be directly working with Web Workers. These Web Workers communicate through these messages, but don't have access to all the browser web APIs, like Window, DOM, etc. Luckily, JavaScript takes care of that for us! For example, the `fetch` function, which is a **facade function**, since under the hood it calls the Web API and has it take care of the logic for us.

**Concurrency with Single-Core CPU**

In this scenario, only one thread would be active at any given time. Work would switch between the two threads as needed, coming back to each one at appropriate times to finish their tasks.

**Concurrency + Parallelism with Multi-Core CPU**

In this scenario, multiple threads can run in parallel.

You can't really have parallelism in JavaScript; it's not built into the language. But with Node, it is! In Node:

```js
// Spawn a new process
const { spawn } = require('child_process');

// Run this new process
spawn('git', ['stuff']);
```

`Section Completed 6/19/2022`

## Modules in JavaScript

### Overview

Modules are highly self-contained, group together with their own specific functionality. Allow us to add or remove without disrupting a system as a whole.

In this section, we will cover:

- Native ES Modules
- CommonJS
- UMD
- AMD
- IIFE

### What Is A Module

### Module Pattern

### Module Pattern - Pros and Cons

### CommonJS, AMD, UMD

### ES6 Modules
