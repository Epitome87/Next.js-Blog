---
title: 'CSS Grid System - Course Notes'
date: '2022-05-26'
image: 'post1.jpg'
excerpt: 'Some of my CSS Grid System notes!'
isFeatured: false
---

# CSS Grid System (Short Course by Wes Bos)

## Using the Grid System

Simply type the following in a parent element (grid container):
`display: grid:`

## Grid Template Rows and Columns

The basic properties used to create rows and columns are:

`grid-template-columns` and `grid-template-rows`

You can also use teh shorthand `grid-template:` to combine rows and columns at once. Example: `grid-template: 50% 50% / 200px` will create a grid with two rows that are 50% each, and one column that is 200px wide.

## Implicit Vs Explicit Rows & Columns

When we specify that the rows / columns we want (using `grid-template-columns`, for example) we create what are called _explicit_ columns. Rows and columns that are introduced when we have more grid items than we specify sizes for are called _implicit_ rows/columns.

## Grid-Gap

The `grid-gap` property sets the space between grid items

## Grid-Auto-Rows

The `grid-auto-rows` property specifies the height to use for any extra grid items ('implicit rows'). You can specify multiple values, so the 1st row is the 1st size, the 2nd row is the 2nd specified size, etc.

## Grid-Auto-Flow

The `grid-auto-flow` property sets up how extra grid items are handled. If we set it to `row`, any extra grid items that aren't specified in `grid-template-columns` or `grid-template-rows` will extend onto a new row. If we set it to `column`, any extra grid items will be placed as columns.

`grid-auto-flow: row;` is the default

## Fractional Units

Can use percentages for sizes, but it's better to do `fr` units! These are _fractional_ units.

In the following example, the `1fr` will give the third column as much space as it can get after the two 200px columns are placed. It receives whatever room is left!

```css
display: grid;
grid-template-columns: 200px 200px 1fr;
```

This is a little similar to flex-shrink and flex-grow. If you use `1fr 2fr` the second column will take up twice as much remaining space as the 1st.

If we set this property for rows, we notice the height doesn't change -- why? By default the height of a grid item is just however high the content is (just like `display: block` elements). The default width of the element is as wide as the actual viewport. Give the container a height if you want the grid items to have their own height!

## Auto Size Keyword

`auto` adjusts to the max size of the content of the largest grid item. For example, if "Matt" is written in one grid item column and the item below it has the content of "Matthew is Cool!", the entire column would take on the width of the second grid item if set to `auto`. Only _that_ column set to `auto` will be that size -- the other columns will be whatever size you specify (and if `auto` they'll be their own max size!)

## Repeat Function

`repeat(numTimes, [sizesToRepeat])`

Example:

```css
grid-template-columns: repeat(4, 1fr 2fr);
```

The output will be 8 columns, alternating between 1fr and 2fr (think 1 units wide and 2 units wide)

## Sizing Grid Items

The above were all properties of the grid itself. Now let's talk about the Grid Items and their properties!

If you manually set the width of a grid item, the entire column turns that width!

Use spans for sizing: `grid-column: span 2` for example. This will make a grid item take up 2 columns. This will size the grid item without making the rest of the column resize with it.

If you do `grid-column: span 3` and the current row only has room for 2 columns, this grid item will start anew on the next row and leave the last 2 in teh above row empty.

If span more than we have available, it will force the grid to that new size!

## Placing Grid Items

`grid-column` is actually shorthand for two values: `grid-column-start` and `grid-column-end`

So instead of doing `grid-column: span 3` you can do `grid-column-start: 1` and `grid-column-start-4` (will span _3_ spaces, from 1st track to 4th)

Tracks are 1-indexed, not 0 like in most programming languages!

Can also do shorthand: `grid-column: 1 / 3;` (start / stop)
Can also do: `grid-colum: span 2 / 5` (this means span 2, ending at 5)
Cal also do: `grid-column: 1 / span` (this means start at 1, and span 2)
Can also do: `grid-column: 1 / -1` (this means start at 1, and span _all the way across_ -- useful if you don't know how many spaces you have!) - `grid-column 1 / -2` will end it 1 unit from the end. -3 will end it 2 units from the end, etc.
Can do the same for rows with: `grid-row: 3 / 8` etc.
**NOTE** You must have some `grid-template-columns` or `grid-template-rows` defined to do their corresponding `grid-column` and `grid-row` properties with negative ending values.
**ALSO NOTE** that negative ending values will bring you to the end of the _explicit_ grid, not the overall grid! Especially obvious when doing this with rows.

You can also use the shorthand `grid-area: <grid-row-start> / <grid-column-start> / <grid-row-end> / <grid-column-end>`

## Auto-Fit, Auto-Fill & Minmax

Very useful properties that will probably be used a lot!

`grid-template-columns: repeat(auto-fit, 150px)` This will let it figure out how many columns there should be depending on the content. When you resize the window, the grid gives more or less columns!

`grid-template-columns: repeat(auto-fill, 150px)` (When you don't have enough items to fill up the entire width of a grid). When you use this, the grid is chopped up into as many spaces as it can, leaving empty grid spaces no the end. This is useful if you want to shove an individual item to the very end of the grid.

Basically, auto-fit ends the grid where appropriate, while auto-fill extends it.

Using Auto-Fit and Auto-Fill with Minmax is very powerful!

Problem:
` grid-template-columns: repeat(auto-fill, 100px)` is used, but your text content is spilling out of one of the grid item boundaries!

Solution? Instead of manually figuring out how wide are columns should be, we can replace the size with `minmax`:
`grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))`

This means that at a minimum, our columns will be 150px. And at a maximum, they will be the entire width of the grid.

Using `minmax()` is when auto-fit and auto-fill really show their differences. `auto-fit` with `minmax` will give the columns as much space as possible! And with this combination, when you shrink the browser the columns will wrap onto the next row when appropriate, like flex-wrap.

Another useful property is `fit-content()`. Scenario:
`grid-template-columns: auto 150px 150px 150px`

You have the above column setup, but you don't how big the 1st column gets when it takes up the remaining space. Using fit-content, you can give it a clamp value (max width, or max height depending on if row or column):

`grid-template-columns: fit-content(100px) 150px 150px 150px`

This is basically just setting it to have a max size of 100px, instead of giving it as much room as it needs. Now the extra space of the grid remains unused, rather than consumed by the 1st grid column.

## Grid Template Areas!

You can define exactly where you want each grid item to be placed with the following:

```css
grid-template-areas:
  'sidebar-1 content sidebar-2'
  'sidebar-1 content sidebar-2'
  'footer footer footer';
```

This will give a a sidebar that is 2 rows tall and 1 column wide, a content area that is the same size, and another sidebar that is the same size. And finally, the entire bottom row is a footer!

You can use a `.` if you don't want to define a space, as follows:

```css
grid-template-areas: 'sidebar-1 content . ';
```

For defining areas to work, you must also label the name of the area in an individual grid item, as follows:

```css
.footer {
  grid-area: footer;
}

.item1 {
  grid-area: sidebar-1;
}
```

And now the grid-template-area knows what the footer is! This is useful especially in media queries, where you can simply redefine the template area at different screen sizes!

You can also do:

```css
grid-template-areas:
  '💩💩💩💩🍔🍔🍔🍔 '
  '💩💩💩💩🍔🍔🍔🍔 '
  '💩💩💩💩🍔🍔🍔🍔 '
  '💩💩💩💩🍔🍔🍔🍔 ';
```

And then:

```css
.item {
  grid-column: 💩-start / 🍔-end;
}
```

Therefore, you don't always have to use line numbers -- you can use names you created in your areas!

## Naming Lines in CSS Grid

Instead of using the track numbers to define where to start and end a line, you can use names. You assign these names in brackets when defining the template:

```css
.container {
  display: grid;
  grid-template-columns: [site-left] 1fr [content-start] 500px [content-end] 1fr [site-right];
  grid-template-rows: [content-top] repeat(10, auto) content-bottom;
}

.item3 {
  grid-column: content-start;
  grid-row: content-top / content-bottom;
}
```

You can name a track multiple things, like follows:

```css
.container {
  grid-template-columns: [sidebar-start site-left] 1fr (...etc from previous example);
}
```

Now we can refer to this line as either "sidebar-start" or "site-left", depending on whichever we feel is more intuitive given a given context.

## Grid-Auto-Flow Dense Block Fitting

Instead of specifying `grid-auto-flow: row` or `grid-auto-flow: column` to describe where to place auto-placed grid items, we can use a third option:

`grid-auto-flow: dense`

From MDN:

> **dense**
> "dense" packing algorithm attempts to fill in holes earlier in the grid, if smaller items come up later. This may cause items to appear out-of-order, when doing so would fill in holes left by larger items.
> If it is omitted, a "sparse" algorithm is used, where the placement algorithm only ever moves "forward" in the grid when placing items, never backtracking to fill holes. This ensures that all of the auto-placed items appear "in order", even if this leaves holes that could have been filled by later items.

The _dense_ value is very powerful if order does not matter! CSS will place items that have been told exactly where to go first, and densely compact other items where possible.

## Alignment + Centering

Even if you don't need a grid-type layout, using it is pretty useful for quick centering!

There are 6 properties that help align in Grid:

- `justify-items:`
- `align-items:`
- `justify-content:`
- `align-content:`
- `align-self:`
- `justify-self:`

Justify is along the x (row) axis
Align is along the y (column) axis
Unlike Flexbox, this doesn't ever change (depending on flex-direction)

`justify-items` is set to `stretch` by default. This stretches the content across their appropriate column.
Setting this to `center` (or other values) makes the items take up only as much space as they actually need, while still being placed in their appropriate column.
`start` and `end` are other appropriate values.
`flex-start` and `flex-end` also work -- but ideally you should use the above two to show context.

`align-items` relies on rows having height. It has all the same possible values as `justify-items` and works similiar, just in the y-axis.

`place-items` is the CSS shorthand which can handle the justify and align at same time! The first value is for align, the second value is for justify. If there is no 2nd value, the first one is used for both align and justify. Use the following to quickly horizontally and vertically align all grid items:
`place-items: center center;`

`justify-content` and `align-content` deal with aligning the grid spaces themselves when they do not consume the entire area of the grid. This occurs when the grid container is wider than the grid needs to be (can happen when `fr` or percentages aren't used for sizing)
`justify-content: start` is the default. As with flexbox, you can also specify `space-around`, `space-between` and `space-evently`
`align-content: stretch` is the default. Again, this relies on the grid container having a provided height. Fixed heights on grids are not very common, though!

Lastly, `align-self` and `justify-self` is used in the grid item itself, and used to override the container's settings.

Quickly centering is ideal in Grid, because it provides align-self and justify-self. Flexbox only proivdes align-self, not justify-self (is this still true as of 2021?).

## Re-Ordering Grid Items

`order:` property allows us to change the ordering. Default value is 0. Higher values are placed later.
Changing the order will goof up your screen reader ordering and your mouse select ordering (won't let you highlight multiple elements at once if they are out of order)

## Flexbox Vs. Grid (Some Examples)

One big benefit of Flexbox over Grid is that they can be positioned (like flex-grow and flex-shrink), whereas only the grid-gap property in Grid can be transitioned (is this still true in 2021?).

Downside for Flexbox is nothing similar to grid-gap for margins!

Pros for Grid: More consistent across browsers. Good for scaling from single axis to 2D axis.

### Axis-Flipping

Flexbox's ability to reverse a row and column is something you can't easily do in Gridbox. But you can replicate a swap from `flex-direction: row` to `flex-direction: column` (and vice versa) by doing:

```css
display: grid;
grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));

// The important part: Swap to a single column, so the grid is forced to put everything in one rows!
grid-template-columns: 1fr;
```

### Controls On The Right

To achieve what flexbox could do by having two divs (one with, say, a title on the left, and another div with multiple icons in it) and doing justify-content: space-betwen, we can..Simply do `grid-auto-flow: column` to stack icons (or etc) on the right of a defined 1-column grid.

### Flex On Item

(Refer to the sample in Lesson 21 folder of Wes Bos's Grid course, sample called flex-on-item). Note here that flexbox is simpler and more flexible for doing a scenario where there are 3 icons that need their min content width, followed by a scrollbar icon we wish to take up as much space as it can, followed by 2 more min width icons. The solution to make the scrollbar always consume as much space that remains is hard to do unless we know the number of left and right icons around it. If we change the amount of icons, we must redefine our column template!

### Perfectly Centered

Do-able both in Grid and Flexbox, basically just as easy! Just align-items and justify-items center in Flexbox. In Grid, instead of align-items we need to use align-content, as we want the container's overall content to be vertically centered together, not just each individual grid item's content centered.

### Self-Control

Only do-able in Grid! In Flexbox, we cannot really put 4 flex items at the all 4 corners of its container. In Grid, we can! We simply set the appropriate align-self and justify-self to start or end, and viola!

### Stacked Layout

Only do-able in Flexbox! Grid has columns that are too rigid (rows cannot be different sizes). So we cannot do a layout similar to space-around of Flexbox in Grid.

### Variable Widths Each Row

Grid cannot do! Columns must be perfectly aligned in Grid. Flexbox is much better for this.

## Summary

When the content shapes the layout, use flexbox. - Example: We want the amount of text inside a flex item to dictate the shape of it, rather than predefine its shape.
When the layout shapes the content, use CSS Grid. - Example: In the same example as the Flexbox one, the text item will have its size pre-dictated by the fact it is a grid (so it won't grow freely in width if we predefine our columns, for example). We end up with more of a square shape when we just wanted our text to freely expand horizontally as much as it needs to.
