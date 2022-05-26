---
title: "My CSS Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my CSS notes!"
isFeatured: true
---

# CSS (Cascading Style Sheets)

## CSS Selectors

- Fun game to practice basic CSS selectors: https://flukeout.github.io/
- Concise reference guide for CSS selectors: https://www.w3schools.com/cssref/css_selectors.asp

### Basic Selectors

| Selector           | Example      | Example Description                                                              |
| ------------------ | ------------ | -------------------------------------------------------------------------------- |
| Element            | p            | Selects all `<p>` elements                                                       |
| Class (.)          | .intro       | Selects all elements with the class "intro"                                      |
| ID (#)             | #firstname   | Selects the element with the id "firstname"                                      |
| Universal (\*)     | \*           | Selects all elements                                                             |
| Compound (,)       | div, p       | Selects all `<div>` elements and all `<p>` elements                              |
| Descendent ( )     | div p        | Selects all `<p>` elements inside `<div>` elements                               |
| .class1.class2     | .first.last  | Selects all elements with both .first and .last set within its class attribute   |
| .class1 .class2    | .first .last | Selets all elements with .last that is a descendant of an element with .first    |
| child >            | div > p      | Selects all `<p>` elements where the **direct** parent is a `<div>` element      |
| adjacent sibling + | div + p      | Selets the first `<p>` element that is placed immediately after `<div>` elements |
| general sibling ~  | p ~ ul       | Selects every `<ul>` element that is preceded by a `<p>` element                 |

### Attribute Selectors

- [attribute] (Selects all elements with the specified attribute)
- [attribute = value] (Selects all elements where the specified attribute is equal to the specified value)
- [attribute ^= value] (Selects all elements where attribute's value starts with the specified value)
- [attribute $= value] (Selects all elements where the attribute's value ends with the specified value)
- [attribute *= value] (Selects all elements where teh attribute's value contains the specified value)
- [attribute ~= value] Elements that contain the term within a space seperate value
  - Example: `<p class="content red"> CSS: p[class ~= "red"] { // Targets the p element }`
- [attribute |= "string"] Elements that contain the term within a dash sperate value
  - Example: `<button class="btn-font-large"> - CSS: button[class |= "font"] { // Targts button }`

### Psuedo Classes

- Selects an element based on the unique relationship or state described in the selector. This selector is indicated by the ":" (colon) symbol, followed by the pseudo class that describes the element's state or positioning amongst other elements.

- a:link
- a:visited
- a:hover
- a:active
- p:not(X)
- p:first-child
- p:last-child
- p:only-child
- :nth-child(n)
- :nth-last-child(n)
- :first-of-type
- :last-of-type
- :only-of-type
- :nth-of-type(n)
- :nth-of-type(An + B)
- :nth-last-of-type(n)
- :nth-last-of-type(An + B)
- :empty

- a::after
- a::before
- input::placeholder (Selects input elements with the "placeholder" attribute specified)
- p::first-letter Selects the first letter of every <p> element
- p::first-line Selects the first line of every <p> element
- ::marker (Selects the markers of list items)
- ::selection (Selects the portion of an element that is selected by a user)

## Random Notes

- For hex value colors, you can simply add digits to the end to represent alpha! No need to turn it into rgba. Like every color hex value, this ranges from 00 to FF.

- To have an element that is being transformed (such as rotated) actually look 3D, we have to do a few things:

  - On the element that is being manipulated, add: `transform-style: preserve-3d;`
  - On its parent container, add: `perspective: 1000px;` (1000px seems to be a good amount, but you can change it as desired)
  - (When I had the `perspective` set on a grand-parent element, it did not work properly. Ensure its on the direct parent!)

- Try to start using `:focus-visible` instead of `:focus`! It behaves in much the same way, but doesn't have the undesirable side effect of having an element remain in a focus state after you're done clicking on it and move your mouse away from it -- which is almost never the intended effect we want on a focus.
