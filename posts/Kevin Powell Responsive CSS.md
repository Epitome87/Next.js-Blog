---
title: 'Kevin Powell Responsive CSS - Course Notes'
date: '2022-05-25'
image: 'post1.jpg'
excerpt: 'Some of my Kevin Powell Responsive CSS notes!'
isFeatured: false
---

## Day 01

Layouts are responsive by default! Avoid setting the height property (if need more background -- for example -- just set bigger padding!). Default block elements have default width of 100%. Try setting width using relative units (%, em).

## Day 02

Learned about relative units. Don't use em for fonts (cascading growth-shrink effect). em on buttons is good -- keeps proportions.

## Day 03

Learned about using max-width. This is important because a good user experience limits the horizontal range needed to see text / elements. For max-width it is fine using pixel values! Probably not good idea to set min-width -- fights against responsive design.

## Day 04

Catch-up day. Short lesson on units: vh, vw, vmin, vmax. These are viewport height and viewport width. For smaller screens, can cause some spilling out of content if you do 100% vh (solve with media queries). Percentages is based on parent element, vw and vh on the viewport. Useful to pull something out of full width of its container. vmax: 80% will be based on whichever dimension is larger. Vh kinda useful for padding. Font-size in vw can be useful! _Could comprehend this better_

## Day 05

Watched Kevin's solution for Day 3's challenge. Control + Shift + P (in VS Code) and then select wrap abbreviation, then enter the tag you want to wrap your highlighted HTML with! Example, highlight a bunch of div tags, then Control + Shift + P, type "div.container" and press Enter -- they are now all wrapped inside that container div! Try to limit container classes to only a width (always percentage), a max-width (always pixel), and margin (probably 0 auto)

## Day 06

Review of first week's lessons. Also an interesting look at the differences between: 1) width: 600px; max-width: 100% and 2) width: 100%; max-width: 600px; (They're basically the same!)

## Day 07

Went over solution for Day 5's challenge. Common to always put this in every CSS file: `*, *::before, *::after { box-sizing: border-box; }` and `body { margin: 0 }`
Left and right padding is probably better controlled in a div, rather than an element itself. _Could probably comprehend that better_
Also learned about the BEM naming convention; try to use it from now on!
Try to use mostly rem for font-size. By default 1rem is 16px.
For border-radius on bottoms, it's best to match the height to get nice round corners. But it's hard to know the height, so just use a really large pixel number for nice corners!

**Why'd he do display: inline-block for button? Said he'd explain but didn't**

## Day 08

Learned some flexbox. Flex items try to shrink down to the smallest size they can possibly be. If no content in a flex item, it'll even disappear to a size of 0! Give all flex items a width of 100% if you have a small and large one that you want to be even size. Flex only affects direct children (they become the flex item). Add spacing between columns using the "gap" property -- although it's not well-supported yet. In meantime, doing a CSS selector like ".col + .col" (any col class that has an adjacent sibling of col class-- this is called a Combinator) with a margin-left value.

## Day 09

Learned more flexbox. display: flex stretches all elements to be in equal to height. This is not good for images! Wrap an image in a div tag to fix (the div stretches the full height, the image will just sit inside the div at the height it wants to be). Or use align-self: flex-start (or another value) on the image. Very useful to do this in ALL CSS files for ALL img elements: `img { max-width: 100% }` -- they'll never grow bigger than their original size, but they'll shrink as their parent does. This is especially useful if you made the img responsive by wrapping it in a div (and giving that div an align-self: flex-start) since wrapping it in a div made the img not a flex item any more.

## Day 10

Semi-break, but short optional video on diving deeper into Flexbox.

## Day 11

Using flexbox for navigation.

**TODO - what'd I learn?**

## Day 12

Getting fancy with navigation.

**TODO - what'd I learn?**

Have a fairly large project due in two days.

## Day 13 & Day 14

Breaks! But learned a tiny bit about min(), max(), and clamp(). Setting a width to min(50%, 600px) is the same as setting width to 50% and max-width to 600px. max() will do the opposite -- pick the max of the two (or more) values passed into it. Clamp takes 3 values (min, middle, max) and tries to clamp the value between those 3 arguments. This can be useful for font. It's the same as setting width, min-width, and max-width all at once!

## Day 15

Media Queries! Done with "@media () { }". Can have an optional media-type between @media and the parenthesis. Can look at widths, heights, orientation. Usually see min-width and max-width used in the (). min-width means that width OR BIGGER, max-width means that width OR SMALLER is the one that you're targeting. Can read it like: "When we hit a MIN-width of <amount>, then we do whatever is in the brackets. Using max-width is considered desktop first styling. min-width is considered mobile first. Medias only target the specific attributes: it will not overwrite other attributes. Order matters: If doing min-width, go from smallest to biggest. Try to use as few breakpoints as possible!

## Day 16

Layouts typically break around 650px. Around 960px is about when we shift to our full-blown layout (what a desktop would see). Typical breakpoints are: 600px, 900px, 1200px and 1800px for giant monitors.

## Day 17

The meta viewport tag: Use the meta tag for responsive mobile layouts! Otherwise zooming would look weird. The meta html tag is put in automatically with Emmet, so sometimes we forget to add. It's: "<meta name="viewport" content="width=device-width, initial
-scale=1.0">

## Day 21

RECAP: Websites are responsive before we write any CSS. When our layouts run into issues, we are at fault. Usually (although not always) a desktop-first approach is the culprit. Writing mobile-first CSS tends to be the easier way to approach it as well, even if you only have a desktop layout to base things off of. Doing desktop-first, in our media queries we usually just end up setting elements back to their default values anyways -- vs a mobile-first we will have less CSS outside of our queries, since we start at those default values! Add in widths and display: flex inside media query.
