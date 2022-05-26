---
title: "My Tailwind Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my Tailwind notes!"
isFeatured: true
---

# Tailwind CSS

## Install Tailwind CSS with Create React App

Setting up Tailwind CSS in a Create React App project:

1. Create your project

   - Start by creating a new React project with Create React App v5.0+ if you don't have one already set up
   - Terminal: `npx create-react-app my-project` followed by `cd my-project`

2. Intstall Tailwind CSS

   - Install `tailwindcss` and its peer dependencies via npm, and then run the init command to generate both `tailwindow.config.js` and `postcss.config.js`.
   - Terminal: `npm install -D tailwindcss postcss autoprefixer` followed by `npx tailwindcss init -p`

3. Configure your template paths

   - Add the paths to all of your template files in your `tailwindow.config.js` file.
   - tailwind.config.js: `content: [ "./src/**/*.{js,jsx,ts,tsx}" ],`

4. Add the Tailwind directives to your CSS

   - Add the `@tailwind` directives for each of Tailwind's layers to your `./src/index.css` file.

   ```js
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Start your build process

   - Run your build process with `npm start run`.
   - `npm run start`

6. Start using Tailwind in your project
   - Start using Tailwind's utility classes to style your content!

## Padding

- `p-0`: `padding: 0;`
- `p-1`: `padding: 0.25rem;`
- `p-10`: `padding: 2.5rem;`
- `p-32`: `padding: 8rem;`

Essentially, each padding level adds another 0.25rem than the last level.

## Responsive Design

Using responsive utility variants to build adaptive user interfaces.

Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.

There are five breakpoints by default, inspired by common device resolutions:

| Breakpoint prefix | Minimum width | CSS                                |
| ----------------- | ------------- | ---------------------------------- |
| `sm`              | 640px         | `@media (min-width: 640) { ... }`  |
| `md`              | 768px         | `@media (min-width: 768) { ... }`  |
| `lg`              | 1024px        | `@media (min-width: 1024) { ... }` |
| `xl`              | 1280px        | `@media (min-width: 1280) { ... }` |
| `2xl`             | 1536px        | `@media (min-width: 1536) { ... }` |

To add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the `:` character:

```js
// WIdth of 16 by default, 32 on medium screens, and 48 on large screens
<img class="w-16 md:w-32 lg:w-48" src="...">
```

This works for **every utility class in the framework**, which means you can change literally anything at a given breakpoint -- even things like letter spacincg or cursor styles.

### Mobile First

By default, Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like `uppercase`) take effect on all screen sizes, while prefixed utilities (like `md:uppercase`) only take effect at the specified breakpoint _and above_.

**Use unprefixed utilities to target mobile, and override them at larger breakpoints!**

#### Targetting a Single Breakpoint

Tailwind's breakpoints only include a `min-width` and don't include a `max-width`, which means any utilities you add at a smaller breakpoint will also be applied at larger breakpoints.

If you'd like to apply a utility at one breakpoint only, the solution is to _undo_ that utility at larger sizes by adding another utility that counteracts it.

```js
<div class="bg-green-500 md:bg-red-500 lg:bg-green-500">
```

Notice that we **did not** have to specify a background color for the `sm` breakpoint or the `xl` breakpoint -- you only need to specify when a utility should _start_ taking effect, not when it should stop.

### Customizing Breakpoints

You can completely customize your breakpoints in your `tailwind.config.js` file!

## Dark Mode

Using Tailwind CSS to style your site in dark mode.

Now that dark mode is a first-class feature of many operating systems, it's becoming more and more common to design a dark version of your website.

To make this as easy as possible, Tailwind includes a `dark` variant that lets you style your site different when dark mode is enabled.

By default, this uses the `prefers-color-scheme` CSS media feature, but you can also build sites that support toggling dark mode manually using the **class strategy**

### Toggling Dark Mode Manually

If you want to support togglign dark mode manually instead of relying on the operating system preference, use the `class` strategy instead of the `media` strategy:

```js
// tailwind.config.js
module.exports = { darkMode: "class" };
```

Now instead of `dark:{class}` classes being applied based on `prefers-color-scheme`, they will be applied whenever `dark` class is present earlier in the HTML tree.

How you add the `dark` class to the `html` element is up to you, but a common approach is to use a bit of JS that reads a preference from somewhere (like `localStorage`) and updates the DOM accordingly.

Here’s a simple example of how you can support light mode, dark mode, as well as respecting the operating system preference:

```js
// On page load or when changing themes, best to add inline in `head` to avoid flash of unstyled content (FOUC)
if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

// Whenever the user explicitly chooses light mode
localStorage.theme = "light";

// Whenever the user explicitly chooses dark mode
localStorage.theme = "dark";

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem("theme");
```

## Reusing Styles

Managing duplication and creating reusable abstractions

Tailwind encourages a _utility-first_ workflow, where designs are implemented using only low-level utility classes. This is a powerful way to avoid premature abstraction and the pain points that come with it.

But as a project grows, you'll inevitably find yourself repeating common utility combinations to recreate the same design in many different places. Here we discuss different strategies for reusing styles in your project, as well as best practices for when to employ each one.

### Using Editor and Language Features

A lot of the time duplication like this isn’t even a real problem because it’s all together in one place, or doesn’t even actually exist because you’re iterating over an array of items and only writing the markup once.

If the styles you need to reuse only need to be reused within a single file, multi-cursor editing and loops are the simplest way to manage any duplication.

#### Multi-Cursor Editing

When duplication is localized to a group of elements in a single file, the easiest way to deal with it to use multi-cursor editing to quickly select and edit the class list for each element at once.

#### Loops

A lot of the time a design element that shows up more than once in the rendered page is only actually authored once because the actual markup is rendered in a loop.

Try to use loops or `map()` when possible, even setting some markup elements to be stored in an array.

#### Extracting Components and Partials

If you need to reuse some styles across multiple files, the best strategy is to create a component if you’re using a front-end framework like React, Svelte, or Vue, or a template partial if you’re using a templating language like Blade, ERB, Twig, or Nunjucks.

#### Compared to CSS Abstractions

Unless a component is a single HTML element, the information needed to define it can’t be captured in CSS alone. For anything even remotely complex, the HTML structure is just as important as the CSS.

**Don't rely on CSS classes to extract complex components**
**Create a template partial or JavaScript component**

#### Extracting Classes with @apply

To make our HTML easier to read when using Tailwind CSS (if using the npm version with SASS), we can use the `@apply` mixin to move our classes from HTML to a CSS file:

```js
// CSS file
.card {
    @apply bg-white p-4 rounded-t shadow-2xl;
}
```

This will apply all those TailwindC SS properties to the HTML with the class of "card".

#### Avoiding Premature Abstraction

Whatever you do, don’t use @apply just to make things look “cleaner”. Yes, HTML templates littered with Tailwind classes are kind of ugly. Making changes in a project that has tons of custom CSS is worse.

If you start using @apply for everything, you are basically just writing CSS again and throwing away all of the workflow and maintainability advantages Tailwind gives you, for example:

- **You have to think up class names all the time** — nothing will slow you down or drain your energy like coming up with a class name for something that doesn’t deserve to be named.
- **You have to jump between multiple files to make changes** — which is a way bigger workflow killer than you’d think before co-locating everything together.
- **Changing styles is scarier** — CSS is global, are you _sure_ you can change the min-width value in that class without breaking something in another part of the site?
- **Your CSS bundle will be bigger** — oof.

If you’re going to use @apply, use it for very small, highly reusable things like buttons and form controls — and even then only if you’re not using a framework like React where a component would be a better choice.

## Adding Custom Styles

Tailwind has been designed from the ground up to be extensible and customizable, so that no matter what you’re building you never feel like you’re fighting the framework.

### Customizing your theme

If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations to the theme section of your tailwind.config.js file.

### Using Arbitrary Values

While you can usually build the bulk of a well-crafted design using a constrained set of design tokens, once in a while you need to break out of those constraints to get things pixel-perfect.

When you find yourself really needing something like top: 117px to get a background image in just the right spot, use Tailwind’s square bracket notation to generate a class on the fly with any arbitrary value:

```js
<div class="top-[117px]">
```

This works for everything in the framework, including things like background colors, font sizes, pseudo-element content, and more:

```js
<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
```

### Arbitrary Properties

If you ever need to use a CSS property that Tailwind doesn’t include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

```js
<div class="[mask-type:luminance]">
```

This can be useful for things like CSS variables as well, especially when they need to change under different conditions:

```js
<div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
```

### Handling Whitespace

When an arbitrary value needs to contain a space, use an underscore (\_) instead and Tailwind will automatically convert it to a space at build-time:

```js
<div class="grid grid-cols-[1fr_500px_2fr]">
```

In the rare case that you actually need to use an underscore but it’s ambiguous because a space is valid as well, escape the underscore with a backslash and Tailwind won’t convert it to a space.

### Resolving Ambiguities

Many utilities in Tailwind share a common namespace but map to different CSS properties. For example text-lg and text-black both share the text- namespace, but one is for font-size and the other is for color.

When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

```js
<!-- Will generate a font-size utility -->
<div class="text-[22px]">...</div>

<!-- Will generate a color utility -->
<div class="text-[#bada55]">...</div>
```

Sometimes it really is ambiguous though, for example when using CSS variables.

In these situations, you can “hint” the underlying type to Tailwind by adding a CSS data type before the value:

```js
<!-- Will generate a font-size utility -->
<div class="text-[length:var(--my-var)]">...</div>

<!-- Will generate a color utility -->
<div class="text-[color:var(--my-var)]">...</div>
```

### Using CSS and @layer

When you need to add truly custom CSS rules to a Tailwind project, the easiest approach is to just add the custom CSS to your stylesheet.

For more power, you can also use the @layer directive to add styles to Tailwind’s base, components, and utilities layers:

```js
// main.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .my-custom-style {
    /* ... */
  }
}
```

The @layer directive helps you control declaration order by automatically relocating your styles to the corresponding @tailwind directive, and also enables features like modifiers and tree-shaking for your own custom CSS.

#### Why Use Layers?

In CSS, the order of the rules in your stylesheet decides which declaration wins when two selectors have the same specificity.

To manage this, Tailwind organizes the styles it generates into three different “layers” — a concept popularized by ITCSS.

The base layer is for things like reset rules or default styles applied to plain HTML elements.
The components layer is for class-based styles that you want to be able to override with utilities.
The utilities layer is for small, single-purpose classes that should always take precedence over any other styles.
Being explicit about this makes it easier to understand how your styles will interact with each other, and using the @layer directive lets you control the final declaration order while still organizing your actual code in whatever way you like.

### Adding Base Styles

If you just want to set some defaults for the page (like the text color, background color, or font family), the easiest option is just adding some classes to the html or body elements:

```html
<!DOCTYPE html>
<html lang="en" class="text-gray-900 bg-gray-100 font-serif">
  <!-- ... -->
</html>
```

If you want to add your own default base styles for specific HTML elements, use the @layer directive to add those styles to Tailwind’s base layer:

```js
@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  /* ... */
```

Use the theme function or @apply directive when adding custom base styles if you want to refer to any of the values defined in your theme.

### Adding Component Classes

Use the components layer for any more complicated classes you want to add to your project that you’d still like to be able to override with utility classes.

Traditionally these would be classes like card, btn, badge — that kind of thing.

```js
@layer components {
  .card {
    background-color: theme('colors.white');
    border-radius: theme('borderRadius.lg');
    padding: theme('spacing.6');
    box-shadow: theme('boxShadow.xl');
  }
  /* ... */
}
```

By defining component classes in the components layer, you can still use utility classes to override them when necessary:

```js
// Will look like a card, but with square corners
<div class="card rounded-none">
```

Using Tailwind you probably don’t need these types of classes as often as you think. Read our guide on Reusing Styles for our recommendations.

The components layer is also a good place to put custom styles for any third-party components you’re using:

```js
@layer components {
  .select2-dropdown {
    @apply rounded-b-lg shadow-md;
  }
  .select2-search {
    @apply border border-gray-300 rounded;
  }
  .select2-results__group {
    @apply text-lg font-bold text-gray-900;
  }
  /* ... */
}
```

Use the theme function or @apply directive when adding custom component styles if you want to refer to any of the values defined in your theme.

### Adding Custom Utilities

Add any of your own custom utility classes to Tailwind’s utilities layer:

```js
@layer utilities {
  .content-auto {
    content-visibility: auto;
  }
}
```

This can be useful when there’s a CSS feature you’d like to use in your project that Tailwind doesn’t include utilities for out of the box.

### Using Modifiers with Custom CSS

Any custom styles you add to Tailwind with @layer will automatically support Tailwind’s modifier syntax for handling things like hover states, responsive breakpoints, dark mode, and more:

```js
<div class="lg:dark:content-auto">
```

### Removing Unused Custom CSS

Any custom styles you add to the base, components, or utilities layers will only be included in your compiled CSS if those styles are actually used in your HTML!

If you want to add some custom CSS that should always be included, add it to your stylesheet without using the @layer directive:

```js
@tailwind base;
@tailwind components;

/* This will always be included in your compiled CSS */
.card {
  /* ... */
}

@tailwind utilities;
```

Make sure to put your custom styles where they need to go to get the precedence behavior you want. In the example above, we’ve added the .card class before @tailwind utilities to make sure utilities can still override it.

### Using Multiple CSS Files

If you are writing a lot of CSS and organizing it into multiple files, make sure those files are combined into a single stylesheet before processing them with Tailwind, or you’ll see errors about using @layer without the corresponding @tailwind directive.

The easiest way to do this is using the postcss-import plugin:

```js
// postcss.config.js
module.exports = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### Layers and Per-Component CSS

Component frameworks like Vue and Svelte support adding per-component styles within a <style> block that lives in each component file.

While you can use features like @apply and theme inside component styles like this, the @layer directive will not work and you’ll see an error about @layer being used without a matching @tailwind directive:

**Don't use `@layer` in component styles!**

This is because under-the-hood, frameworks like Vue and Svelte are processing every single <style> block independently, and running your PostCSS plugin chain against each one in isolation.

That means if you have 10 components that each have a <style> block, Tailwind is being run 10 separate times, and each run has zero knowledge about the other runs. Because of this, Tailwind can’t take the styles you define in a @layer and move them to the corresponding @tailwind directive, because as far as Tailwind can tell there is no @tailwind directive to move it to.

One solution to this is to simply not use @layer inside your component styles:
\*\*Add your styles without using `@layer`!

You lose the ability to control the precedence of your styles, but unfortunately that’s totally out of our control because of how these tools work.

Our recommendation is that you just don’t use component styles like this at all and instead use Tailwind the way it’s intended to be used — as a single global stylesheet where you use the classes directly in your HTML:

**Use Tailwind's utilities instead of component styles!**

## Functions & Directives

A reference for the custom functions and directives Tailwind exposes to your CSS

### Directives

Directives are custom Tailwind-specific at-rules you can use in your CSS that offer special functionality for Tailwind CSS projects.

#### @tailwind

Use the @tailwind directive to insert Tailwind’s base, components, utilities and variants styles into your CSS.

```js
/**
 * This injects Tailwind's base styles and any base styles registered by
 * plugins.
 */
@tailwind base;

/**
 * This injects Tailwind's component classes and any component classes
 * registered by plugins.
 */
@tailwind components;

/**
 * This injects Tailwind's utility classes and any utility classes registered
 * by plugins.
 */
@tailwind utilities;

/**
 * Use this directive to control where Tailwind injects the hover, focus,
 * responsive, dark mode, and other variants of each class.
 *
 * If omitted, Tailwind will append these classes to the very end of
 * your stylesheet by default.
 */
@tailwind variants;
```

#### @layer

Use the @layer directive to tell Tailwind which “bucket” a set of custom styles belong to. Valid layers are base, components, and utilities.

Tailwind will automatically move any CSS within a @layer directive to the same place as the corresponding @tailwind rule, so you don’t have to worry about authoring your CSS in a specific order to avoid specificity issues.

Any custom CSS added to a layer will only be included in the final build if that CSS is actually used in your HTML, just like all of the classes built in to Tailwind by default.

Wrapping any custom CSS in a @layer directive also makes it possible to use modifiers with those rules, like hover: and focus: or responsive modifiers like md: and lg:.

#### @apply

Use @apply to inline any existing utility classes into your own custom CSS.

This is useful when you need to write custom CSS (like to override the styles in a third-party library) but still want to work with your design tokens and use the same syntax you’re used to using in your HTML.

Any rules inlined with @apply will have !important removed by default to avoid specificity issues:

```js
/* Input */
.foo {
  color: blue !important;
}

.bar {
  @apply foo;
}

/* Output */
.foo {
  color: blue !important;
}

.bar {
  color: blue;
}
```

If you’d like to @apply an existing class and make it !important, simply add !important to the end of the declaration:

```js
/* Input */
.btn {
  @apply font-bold py-2 px-4 rounded !important;
}

/* Output */
.btn {
  font-weight: 700 !important;
  padding-top: .5rem !important;
  padding-bottom: .5rem !important;
  padding-right: 1rem !important;
  padding-left: 1rem !important;
  border-radius: .25rem !important;
}
```

Note that if you’re using Sass/SCSS, you’ll need to use Sass’ interpolation feature to get this to work:

```js
.btn {
  @apply font-bold py-2 px-4 rounded #{!important};
}
```

### Functions

Tailwind adds a few custom functions you can use in your CSS to access Tailwind-specific values. These functions are evaluated at build-time, and are replaced by static values in your final CSS.

#### theme()

Use the theme() function to access your Tailwind config values using dot notation.

This can be a useful alternative to @apply when you want to reference a value from your theme configuration for only part of a declaration:

```js
.content-area {
  height: calc(100vh - theme('spacing.12'));
}
```

If you need to access a value that contains a dot (like the 2.5 value in the spacing scale), you can use square bracket notation:

```js
.content-area {
  height: calc(100vh - theme('spacing[2.5]'));
}
```

Since Tailwind uses a nested object syntax to define its default color palette, make sure to use dot notation to access the nested colors.

**Don't use the dash syntax when accessing nested color values**

Instead, **Use dot notation to access nested color values**

```js
.btn-blue {
  background-color: theme('colors.blue.500');
}
```

#### screen()

The screen function allows you to create media queries that reference your breakpoints by name instead of duplicating their values in your own CSS.

```js
@media screen(sm) { /* ... */ }
```

## Handling Hover, Focus, and Other States

Every utility class in Tailwind can be applied _conditionally_ by adding modifier to the beginning of the class name that describes the condition you want to target.

In Tailwind, rather than adding the styles for a hover state to an existing class (like with normal CSS), you add another class to the element that _only_ does something on hover.

Tailwind includes modifiers for just about everything you’ll ever need, including:

- Pseudo-classes, like :hover, :focus, :first-child, and :required
- Pseudo-elements, like ::before, ::after, ::placeholder, and ::selection
- Media queries, like responsive breakpoints, dark mode, and prefers-reduced-motion
- Attribute selectors, like [dir="rtl"] and [open]

These modifiers can even be stacked to target more specific situations, for example changing the background color in dark mode, at the medium breakpoint, on hover:

```js
<button class="dark:md:hover:bg-fuchsia-600">Save Changes</button>
```

### Pseudo-Classes: Hover, Focus, and Active

Style elements on hover, focus, and active using the `hover`, `focus`, and `active` modifiers:

```js
<button class="bg-violet-500 hover:bg-violet-400 active:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300">
```

Tailwind also includes modifiers for other interactive states like `:visited`, `:focus-within`, `:focus-visible`, and more.

### Pseudo-Class Reference

This is a comprehensive list of examples for all the pseudo-class modifiers included in Tailwind.

**hover** (:hover)

Style an element when the user hovers over it with the mouse cursor using the `hover` modifier

**focus** (:focus)

Style an element when ti has the `focus` modifier

**focus-within** (:focus-within)

Style an element when it or one of its descendants has focus using the `focus-within` modifier

**focus-visible** (:focus-visible)

Style an element when it has been focused using the keyboard using the `focus-visible` modifier

**active** (:active)

Style an element when it is being pressed using the `active` modifier

**visited** (:visited)

Style a link when it has already been visited using the `visited` modifier

**target** (:target)

Style an element if its ID matches the current URL fragment using the `target` modifier

**first** (:first-child)

Style an element if it's the first child using the `first` modifier

**last** (:last-child)

Style an element if it's the last child using the `last` modifier

**only** (:only-child)

Style an element if it's the only child using the `only` modifier

**odd** (:nth-child(odd))

Style an element if it's an oddly numbered child using the `odd` modifier

**even** (:nth-child(even))

Style an element if it's an evenly numbered child using the `even` modifier

**first-of-type** (:first-of-type)

Style an element if it's the first child of its type using the `first-of-type` modifier

**last-of-type** (:last-of-type)

**only-of-type** (:only-of-type)

**empty** (:empty)

**disabled** (:disabled)

**checked** (:checked)

**indeterminate** (:indeterminate)

Style a checkbox or radio button in an indeterminate state using the `indeterminate` modifier

**default** (:default)

Style an option, checkbox or radio button that was the default value when the page initially loaded using the `default` modifier

**required** (:required)

Style an input when it's required using the `required` modifier

**valid** (:valid)

Style an input when it's valid using the `valid` modifier

**invalid** (:invalid)

Style an input when it's invalid using the `invalid` modifier

**in-range** (:in-range)

Style an input when it's value is within a specified range limit using the `in-range` modifier

**out-of-range** (:out-of-range)

Style an input when it's value is outside of a specified range limit using the `out-of-range` modifier

**placeholder-shown** (:placeholder-shown)

Style an input when the placeholder is shown using the `placeholder-shown` modifier

**autofill** (:autofill)

Style an input when it has been autofilled by the browser using the `autofill` modifier

**read-only** (:read-only)

Style an input when it is read-only using the `read-only` modifier
