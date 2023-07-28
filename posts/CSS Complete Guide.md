---
title: 'CSS Complete Guide - Course Notes'
date: '2022-05-26'
image: 'post1.jpg'
excerpt: 'Some of cSS Complete Guide notes!'
isFeatured: false
---

## Section 01 - Basics

- F12 opens Chrome Dev Tools in browser
- IDs can also be used to jump to elements with a "#<className>" at the end of the URL
- CSS is case insensitive
  - A class name of "sectionTitle" is treated the same as "sectiontitle" (this doesn't seem to be true now?)
  - So kabob case is good!

## Combinators

Four Combinators:

- `+` adjacent sibling
  - Elements share same parent
  - Second element comes immediately after first element
- `~` general sibling
  - Elements share same parent
  - Second element comes any time after first element
- `>` child combinator
  - Second element must be direct child of first element
- `<white space>` descendant combinator
  - Second element is a descendant of the first element

For performance, prefer direct selectors instead.

## Pseudo-Elements

- Use `::`, like: `selector::pseudo-element`. Although `:` works, it's best to use `::` for proper distinguishing of pseudo-element vs pseudo-class.
- `::after`
- `::backdrop`
- `::before`
- `::cue`
- `::cue-region`
- `::first-letter`
- `::first-line`
- `::file-selector-button`
- `::grammar-error`
- `::marker`
- `::part()`
- `::placeholder`
- `::selection`
- `::slotted()`
- `::spelling-error`
- `::target-text`

## Pseudo-Classes

Specifies a special state of the selected element.

## Margin Collapsing

If you have two _block_ elements, one on top of the other, their margins "collapse"

- Essentially, the bigger margin "wins" out, so the two elements will be the larger amount of margin away from one another, rather than the combination of both
- This is why it's preferable to use margin-top or margin-bottom, rather than specifying both
- **(Does box-sizing: border-box resolve this intended CSS behavior?)**

## Heights

If you ever want to style the height of an element relative to the height of your page, you need to create a chain where you pass the page height down. Example, you give the html a height, the body a height, then any other parent elements of the element you wish to specify the height relative to.

_(Using `vh` units get past this chain)_

### Box-Sizing

By default, padding, border is not included into the value you set for width and height. Example, you set width to 500px, and also give it 10px border and 20px padding, the actual total width will be 530px. This is behavior is determined by the `box-sizing` property, which has a default of `content-box` (the height/width we specify refers to only the size of the _content_). Typically, we prefer to set this to a value of `border-box` (the height/width we specify includes padding and border)

We change this behavior with the universal selector `*`, as relying on inheritance does not work, since some elements have conflicting box-sizing values by browser default, which override what they get via inheritance.

## Margin / Padding and Clickability

- An element receives clicks to its padding, but not margin
- Clicks to an element's margin area go to its parent

## Font and Buttons

By default, the font on your buttons will look quite a bit different than what you expect. This is because the browser is providing a lot of poorly-chosen defaults for various font properties on the button!
Instead of using browser defaults, we can override _all_ font attributes on `<button>` elements with: `font: inherit`

## Outlines

You may notice that browsers give an outline to a button in a `focus` state by default.
We can think of an outline like a border, but it is _not_ part of the box model like a border.
It is applied outside of the box, before the margin but after the border.
It is often desirable visually to disable an outline on an input / button when it has focus, but you should add some other styling in its place to make it obvious when an element has the focus state.

## Positioning

Potential values for `position: `:

1. Static (default)
2. Fixed
3. Relative
4. Absolute
5. Sticky

### Z-Index

This is not a corresponding value for the `position` property, but it does play a role.

- Default value is `auto` -- basically 0
- Higher values mean the element will be rendered in front of other elements
- Lower values mean the element will be rendered behind other elements
- For elements without a `position` specified (ones with the default of `static`) setting a `z-index` **has no effect**.
- Elements that have a `position` other than `static` will typically be rendered on top of others with a similar `z-index: auto` value
- For elements that were positioned without `static`, their order in the HTML file becomes important
  - If neither have a `z-index` specified, both are 0 -- but the one that appears later in the HTML is rendered above the other

### Stacking Context

Tied with the z-index is the concept of the _stacking context_

It's a little challenging, but dumbed down (greatly):

- Created when applying fixed / sticky or absolute / relative in combination with z-index
- Defines stacking behavior of child elements
- The z-index of a child element has nothing to do with those of its parents or non-siblings
- The z-index you give a child element is only relevant / relative to its siblings
- So if you have 2 outer elements, and one of them has 3 children, there is no z-index you can give the children elements that would suddenly render them on top of the other outer element!
- If you really need the children to be rendered on top of the other outer element, you must change the z-index of their parent to be higher than the outer element you wish to be rendered on top of
- Note that this means you will _never_ have an affect where one of the children is rendered below this non-parent outer element and another child is rendered above

### Static

The default; nothing special! No reason to ever specify it unless you are undoing the position property being previously set.

### Fixed

- With a `position: fixed;`, note that elements act as if they are _inline-block_. The left, right, top, and bottom properties you specify are relative to the _viewport_. If there is no margin on the HTML, body, or any parent element, you do not have to specify a left or top value (if your goal is to fix an element to the top left of the screen). If there is margin, however, you must explicitly type `left: 0` and `top: 0`.
- Takes the element out of the document flow
- Not affected by scrolling

### Absolute

- New position is _relative_ to the closest parent that has a `position` property specified, otherwise the HTML if there is none
  - Automatically positioned to the starting point (top-left corner) of its parent element. Specify a left, top, right, or bottom to change this
- Takes the element out of the document flow -- other elements behave as if this element does not exist
- Unlike `fixed`, positioning context isn't always the viewport -- it depends on the closest parent with a positioning property applied
- Although it looks for nearest parent with _any_ non-static `position`, we typically give our intended target parent a `position: relative` to work well with our relatively positioned child

Basically, similar to `fixed`, but they _are_ affected by scrolling

### Relative

- New position is _relative_ to its _normal position_
- Doesn't take the elements out of the document flow
- Doesn't affect other elements' positions (can't push them away if they collide)

### Sticky

- A mix of relative and fixed
- Behaves until a declared point like a relatively-positioned element. After that, it changes its behavior to that of a fixed element.
- Stops being "stuck" as soon as its parent's container ends

### Overflow

In the case that you've moved your child element outside of its parent (like when positioning one relatively to a parent, and moving it outside the parent's actual boundaries) it may be useful to not render that element. To do so, we can specify on the parent `overflow: hidden;` -- which ensures no child that spills outside the parent's boundaries are visible.

**Important**
Default behavior of CSS is that an `overflow: hidden;` on the _body_ is treated as if that property were applied to the _HTML_ element. The result is that the property **has no impact**

The solution is to specify `overflow: hidden;` in the _body_ **AND** in the _HTML_ elements.

## Background Images & Images

Here we will learn the following _background properties_:

1. `background:` (shorthand)
2. `background-image` - Set one or more background images
3. `background-color` - Set a background color
4. `background-position` - Set initial position, relative to background position layer (defined by background-origin, and applies to background-image)
5. `background-size` - Set the size of background image
6. `background-repeat` - Defines how background images are repeated
7. `background-origin` - Set background positioning area
8. `background-clip` - Define whether background extends underneath border (the only property here that also applies to background-color)
9. `background-attachment` - Sets the scrolling behavior of the background image

- You can specify both a `background-image` and `background-color` at the same time.

### Background Size

- With only one property provided, `background-size` will have the width set to the value. The height is calculated automatically based on the preserved aspect-ratio of the image.
- With two values provided, `background-size` sets the width and the height, respectively.
- If the image's native size is larger than the size specified, the image will be repeated (but this behavior can be changed, see below).
- If you specify only a width or a height, you can set the other value to `auto`, which will preserve the aspect ratio of the image while still respecting the width or height provided

  - But if you, for example, specify a 100% height, and an auto width, the image may not actually take up its full container depending on its parent container's aspect ratio
  - But note that if we have a width of 100% and a height of auto (or not specified), the image _does_ take up the full container. It does not overlap left or right, or top or bottom. The image is automatically cropped!

  Other values:

  1. `cover`

  - Essentially the same as `background-size: 100% auto`
  - Finds out which part of your container (width or height) is the important one to be aligned to your image. If your image is wider than it is tall, it finds out that it should set the width to 100% because the height will then have some excess space because the image -- like the container -- has a height that's le ss than its width.
  - Best setting if you want to ensure there is never any whitespace anywhere in your container
  - May zoom and crop to achieve this (if image is smaller than container)
    - But we can control which parts are cut / which we want to see, with `background-position`!

  2. `contain`

  - Ensures that the full image is visible in the container, and with it may come whitespace

### Background Repeat

- By default, `background-repeat` is set to a value of `repeat` -- which will fit as many copies of the image in the container as possible.
- You can specify values of `repeat-y`, `repeat-x`, or `no-repeat`.

### Background Position

`background-position`

1. Simplest form takes in just an x-offset, or an x and a y-offset
2. Can also takes in a percentage, again either just an x-percentage or an x-percentage and a y-percentage

- `background-position: 20%` means that of the _excess image_ (part that don't fit in our container), 20% of that excess will cropped at the top of the image, and the remaining 80% will be cropped from the bottom.
- `background-position: 30% 90%` would mean horizontally, 30% of the left-right cropping is from the left side (70% from the right), and 90% of the vertical cropping occurs at the top of the image, and the remaining 10% of the vertical cropping at the bottom.
- By default, these values are 50% -- cropping is taken evenly from the relevant sides

3. Can take in a pre-defined values, for both the x and y values:

- `center` value (same as writing `50% 50%`).
- `left`
- `right`
- `top`
- `bottom`
- Example: `background-position: left top;` means no cropping occurs at the top or left of the image (equal to `0% 0%`).

4. Combination of pre-defined values and percentages:

- Example: `background-position: left 10% bottom 30%;` means to the left, crop 10%, at the bottom, crop 30%.

### Background Origin

`background-origin` is a bit comparable to box-sizing, with similar values (but one extra). This property sets the background's origin: from the border start, inside the border, or inside the padding.

- `padding-box` - Here, the background is positioned relative to the padding box.
  - This is the default, and a value which is something we _can't_ assign when using the box-sizing property.
- `content-box` - The background is positioned relative to the content box.
- `border-box` - The background is positioned relative to the border box.

Basically, we ask ourselves if we want the image to be the size of our content, our content + padding, or our content + padding + margin.

### Background Clip

Similar to background-origin, `background-clip` works on sides of the images that cropped. Here, we define where the image actually should be clipped (if it needs to be).

- `border-box` means the image is clipped outside of the box model
- `padding-box` means the image is clipped after the padding, but before the margin
- `content-box` means the image is clipped where the actual content box lies (before the padding)

### Background Attachment

Rarely used properly. Defines how scrolling would behave in a container that has a background image, but is not `fixed` itself.

- `fixed` - Image not fixed to the container, but the viewport. If you scroll the entire page with the container where the image is inside, the image will stay in place
- `scroll` - Image stays in place and the content scrolls over it / above it
- `local` - Scrolls with the other content of the container

### Background Shorthand

How can we use _all_ of the previous properties, with _one_ shorthand?

- Position comes first, and is separated from the size with a `/`. Example: `background: url('img.jpg') left 20% bottom 30% / cover;`
- Since properties for `background-repeat` are unique, they will not conflict with other properties and can thus be defined anywhere in the `background: ` definition
- For `background-origin` and `background-clip`, if you only include one value (like border-box), that value will be used for _both_ origin and clip
  - If two values are specified, the first is the `background-origin` and the second is the `background-clip`
- For `background-attachment`, the possible values are unique and would not conflict with other properties, so it can be provided in any order

An example using all properties might look like: `background: url('img.jpg') 500px auto / contain background-repeat border-box content-box local, blue;`

**Important**: Also note the "blue" in the above property; this is providing blue as a solid color fallback in case the image cannot be loaded. Also note the comma before it.

**VERY IMPORTANT** As with all shorthands, other properties will be overwritten.

- Example: You set background-color previously, and now you do `background: url('img.png') center / cover;` -- you lose what was set with background-color, as it has a default value provided in the shorthand.

### Styling Images

**Important**: By default, an image will consume the height / width of their source asset, no matter what their container's sizing is. It is typically a good convention to therefore limit all `img` elements to be `max-width: 100%`. This will only work if the parent is a block or inline-block element.

That's about it for styling `<img />` tags! Unlike images done with `background-image`, we are very limited with normal images.

Therefore, if you want more complex styling on an image, use `background-image`. The downside is since a background image is not a part of your normal document flow, it doesn't have its own HTML element that clearly signals its an images -- it's worse for accessibility, and therefore truly only good for actual _background_ images.

### Gradients

`linear-gradient`

- Treated as images
- Set with background or background-image
- First argument is the direction
- Second (or more) are the colors
- Multiple color stops: `background-image: linear-gradient(to top right, red 40%, blue 70%, transparent);`

`radial-gradient`

- First argument is shape (`circle`, `ellipse`)
  - Optional: `circle at center`, `circle at top left`, `circle at 20% 50%`
  - Optional size: `circle 30px at center`, `ellipse 30px 20px at center`, `ellipse farthest-side at 20% 50%`, `ellipse closest-side at 20% 50%`, `closet-corner`, `farthest-corner`.

### Multiple Backgrounds

Can set multiple backgrounds. Obviously only makes sense if there is some form of transparency, be that images with transparent pars or gradients with transparent colors -- otherwise we see only the top-most background.

- Only one solid color can be used, and will always be the bottom-most background.

`background: linear-gradient(to top, rgba(80, 68, 18) 10% 0.6), transparent), url('img.png') left 10% 20% / cover no-repeat border-box, blue;`

- Above, linear-gradient is stacked on top of the image, since it occurs first
- Make sure to comma separate each background!

## Filters

Some available filters:

- `blur(5px)`
- `brightness(0.4)`
- `contrast(200%)`
- `drop-shadow(16px 16px 20px blue)`
- `grayscale(50%)`
- `hue-rotate(90deg)`
- `invert(75%)`
- `opacity(25%)`
- `saturate(30%)`
- `sepia(60%)`

Global values for filters:

- `inherit`, `initial`, and `unset`

You can combine filters:

- `filter: contrast(175%) brightness(5%);`

## Sizes & Units

Overview of what will be learned:

- Theory - which units can we use?
- % and the containing block
- min-max and max-width
- Understanding rem vs em
- Working with vw and vh

### Where Units Matter

Which properties are good candidates for using units?

- font-size
- padding, border, and margin
- width and height
- top, bottom, left and right

### Overview of Available Sizes & Units

How is the Size Calculated?

- Absolute Lengths (like `px`, `cm`, `mm`)
  - Mostly ignore user settings
- Viewport Lengths
  - `vh`, `vw`, `vmin`, `vmax`
  - Adjust to current viewport
- Font-Relative Lengths
  - `rem`, `em` (others, but not really used)
  - Adjust to default font size
- Percentages
  - `%`
  - How do they work?

The position property has an impact on the way percentage units behave.

3 Rules to Remember

- For `position: fixed;` elements
  - Containing block is not a parent element, but rather the **viewport**
  - So the sizing is like the positioning of a fixed element -- relative to viewport
- For `position: absolute;` elements
  - Percentage refers to the **ancestor's content + padding**
  - The ancestor used is the **closest** ancestor which is **not position static** (or viewport if no such ancestor exists)
- For `position: relative;` or `position: static;` elements
  - Percentage refers to the **ancestor's content** (doesn't include padding)
  - Containing block is the nearest ancestor that is a **block-level element**
  - **NOTE**: Setting `height: 100%;` on a child does not seem to work, why is this?
    - All ancestors needs an explicit height, not an auto-calculated one. So we typically give the _HTML_ and _body_ elements `height: 100%;` to fix this, along with all other parents

### Changing Font Size in the Root Element

If for some reason, you wish to decide the default browser font size for your site should differ from the browser's default, you can do something like:

```
html {
  font-size: 75%;
}
```

### Using Min / Max Width / Height

```
.container {
  width: 100%;
  max-width: 500px;
}
```

In the above, we stay at 100% of our parent _until_ we reach 500px, at which point we prevent the width from growing any further.

### Rem vs. Em

The `em` unit:

- `2em` would mean twice the size of the containing element's font-size
- The issue is, em units _stack_ -- that is to say, a child with 2em inside a parent with a font-size set to 3em will be the sum of the two -- 6em!
- So if the body specifies 16px, a containing div 2em, a div within that div 3em, and a div within that last div another 2.5em, the result of that inner div's font-size is: 2.5 _ 3 _ 2 \* 16px = 240px!

The `rem` unit:

- Similar to em, in that its a size relative to something
- But that _something_ is the root font-size (HTML element), so a "3rem" will mean the same thing no matter how many nesting layers deep it is

Use em Units For:

- Any sizing that should scale depending on the font-size of an element other than the root.
- Generally speaking, the only reason you’ll need to use em units is to scale an element which has non default font sizing.
- Design components like menu items, buttons, and headings may have their own explicitly stated font sizes. If you change these font sizes, you want the entire component to scale proportionately.
- Common properties this guideline will apply to are margin, padding, width, height and line-height settings, when used on elements with non default font sizing.
- I recommend that when you do employ em units, the font size of the element they’re used on should be set in rem units to preserve scalability but avoid inheritance confusion.

Summary:

- rem and em units are computed into pixel values by the browser, based on font sizes in your design.
- em units are based on the font size of the element they’re used on.
- rem units are based on the font size of the html element.
- em units can be influenced by font size inheritance from any parent element
- rem units can be influenced by font size inheritance from browser font settings.
- Use em units for sizing that should scale depending on the font size of an element other than the root.
- Use rem units for sizing that doesn’t need em units, and that should scale depending on browser font size settings.
- Use rem units unless you’re sure you need em units, including on font sizes.
- Use rem units on media queries
- Don’t use em or rem in multi column layout widths - use % instead.
- Don’t use em or rem if scaling would unavoidably cause a layout element to break.

### Viewport Units

`vh` and `vw` are for viewport height and viewport width. The amount specified represents the percentage of the viewport.

- `width: 100vw;` means the width should be 100% of the width of the viewport
- `height: 40vh;` means the height should be 40% of the height of the viewport

`vmin` and `vmax`

- `80vmin` would take 80% _of the smaller viewport dimension_, which can change as the viewport width / height are altered by the user
- `75vmax` would take 75% _of the larger viewport dimension_, which can change as the viewport width / height are altered by the user

### Choosing the Right Unit

Which Unit Should I Choose?

| Property                 | "Recommended" Unit        |
| ------------------------ | ------------------------- |
| font-size (root element) | %, nothing                |
| font-size                | rem (em => children only) |
| padding, margin, border  | rem, rem, px              |
| width, height            | % (\*see note), vh, vw    |
| top, bottom              | %                         |
| left, right              | %                         |

\* (be aware of containing block, depends on position property)

### Easily Center Elements

Use `margin: auto` for easy centering!
(Only works for block-level elements with an explicitly assigned width)

### Unit Section Summary

**Units**

- pixels (px)
- percentages (%)
- rem & em
- viewport (vh & vw) and (vmin & vmax)
- auto

**The Containing Block**

- The reference point when applying & units to an element
- Depends on the position property applied to this element
- Can be the closest ancestor or the viewport

**100% Height**

- The element itself and the ancestor use position static/relative => 100% height is not working
- Adding 100% height to all ancestors fixes this issue
- Position fixed/absolute or using viewport units as alternatives

**Min/Max-Width**

- Always use these in combination with the width property
- Set width to a relative value (e.g. %) and the min/max value to px to limit the element size
- Also available for height

**Em & Rem**

- Sizes always depend on the font-size of the root element (rem) or the element itself (em)
- Not restricted to font-size

## CSS and JavaScript

Sometimes, content needs to change _after_ the page was loaded.

In this section, we will learn:

- Manipulating styles via JavaScript
- Adding & removing CSS classes with JavaSCript

### Selecting & Manipulating Styles with JavaScript

`console.dir(domElement);` will log it in a more presentable, object-based form

We can access to elements with: `const someElement = document.querySelector(selector);` and we can then access the style property: `someElement.style`.
Note the style property, when inspected, is full of empty values -- even if we clearly specified values for those properties in our CSS. Why is this? The style we access in JavaScript through the document object show the _inline_ styles we've provided, that's why! When we add new styling via this property in JavaScript, they will thus get priority over our CSS, as is the precedence with inline styles.

### Adding an Event Listener

Eh, you know this already!

### Manipulating Element Classes

We can access and manipulate classes for DOM elements by accessing their `className` or `classList` properties in JavaSCript.

- `someElement.className = "someClass";`
  - Downside: Will overwrite any other classes provided
- `someELement.classList.add("someClass");`
  - Doesn't overwrite!

You can remove classes in a similar fashion:

- `someElement.classList.remove("someClass");`

### Property Notation Differences

- Property names in JavaScript will be camel-cased, rather than kabob-cased like in CSS.
  - For example, we access background-color in JavaScript with style.backgroundColor
- Could also do `element.style['background-color']`

### Summary

**Accessing Style Properties**

- Access CSS styles on DOM elements via the `style` property
- Access via camelCase notation (e.g. backgroundImage) or by using strings (e.g. ['background-image'])

**Add & Remove CSS Classes**

- Use className or classList
- classList is easier and more flexible, as it doesn't override
