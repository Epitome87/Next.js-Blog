---
title: 'Advanced CSS And SASS - Course Notes'
date: '2022-06-05'
image: 'post1.jpg'
excerpt: 'Some of my Advanced CSS and SASS notes!'
isFeatured: false
---

# Natours - Part 2

## Responsive Web Design

### Media Queries

- Use media queries for responsive design
- Think of `max-width: 600px` as meaning: "Maximimum width at which this media query still applies"
  - Ask yourself: "Is width less than or equal to 600px? Apply this media query!"
- Think of `min-width: 600px` as meaning: "The minimum width at which this media query still applies"
  - Ask yourself: "Is width more than or equal to 600px? Apply this media query!"
- We would use max-width if we do a Desktop-first approach. We would use min-width if we do a Mobile-first approach
- When defining multiple break points, like max-width: 600px and max-width: 900px, and our phone's screen is 500px, which query is ran?
  - **Both** queries run! The one that appears last will take final precedence, but the one(s) prior will have their code ran
    - Therefore, avoid conflicting changes in each query.
    - Always put mediai queries at the end
- Above 1200px is usually the width we usually start addressing Desktop versions
- Common breakpoints: 600px, 900px, 1200px
- Pros and Cons of Mobile-First Design
  - Pros:
    - 100% optimized for the mobile experience
    - Reduces websites and apps to the absolute essentials
    - Results in smaller, faster and more efficient products
    - Prioritizes content over aesthetic design, which may be desirable
  - Cons:
    - The desktop version might feel overly empty and simplistic
    - More difficult and counterintuitive to develop
    - Less creative freedom, making it more difficult to create distinctive products
    - Clients are used to seeing a desktop version of the site as a prototype
    - Do your users even use the mobile internet? What's the purpose of your website?
- **BUT** always design with both in mind!

### Selecting Our Breakpoints: The Options

Bad Way: Simply using the width of popular devices as breakpoints!

- Problems: Optimizing for one specific device. Not future-proof (if for example iPhone changes the res on all their products)
  Good Way: Look at all the most-used device width, try to group them together logically, then pick breakpoints from there
  Perfect Way: Ignore devices all together! Simply look at the content in your design
- Begin at one size, then start increasing/decreasing screen width. Once design breaks, insert new breakpoint
- Can be extremely difficult. Hard to find the best breakpoints and not end up with too many
  Usually need one breakpoint for phones, portrait tablets, landscape tablets, and one for desktop
  Based on statcounter.com for 2016, we can group most-used devices as follows:
- Phones Only: 0px - 600px
- Tablet Portrait: 600px - 900px
- Tablet Landscape: 900px - 1200px
- Desktop: 1200px - 1800px
- Big Desktop: 1800px +
- With this "Good" grouping approach, we can note that the popular iphone devices fall into their appropriate range in each breakpoint, but they do not define the actual breakpoint -- which is good! They just happen to fit neatly in the middle (nearly)

### Media Queries w/ SASS

With vanilla CSS, one might typically put all their media queries in one giant file, and define breakpoints for each selector referenced throughout the entire project (across multiple files). Or, if working with just one CSS file, would typically put the media queries at the end of the file -- but again still lumping everything at once into the queries

**But** with SASS, this becomes trivial and easy!

- Simply write your `@media` directly inside the selector block you wish to target! You don't have to repeat selectors!
  **Better still!** We can use the power of SASS mixins to make this even more flexible:

Define various mixins such as:

```
@mixin respond-phone {
    @media (max-width: 600px) { @content }
}
@mixin respond-big-desktop {
    @media (min-width: 1800px) { @content }
}
// To use it, inside the desired selector:
@include respond-phone {
    background-color: #fff;
    // Etc
}
```

**Better still!** We can use the power of mixin arguments to create an all-in-one mixin:

```css
@mixin respond($breakpoint) {
  @if $breakpoint == phone {
    @media (max-width: 600px) {
      @content;
    }
  }

  @if $breakpoint == tab-port {
    @media (max-width: 900px) {
      @content;
    }
  }

  @if $breakpoint == tab-land {
    @media (max-width: 1200px) {
      @content;
    }
  }

  @if $breakpoint == desk-big {
    @media (min-width: 1800px) {
      @content;
    }
  }
}

// In a selector somewhere:
@include respond(tab-port) {
  background-color: #fff;
}
```

However, we do not want to use pixels in queries. Like most places, we prefer relative values. IF user changes default font size in browser, media queries will not be affected.

In media queries, ems and rems are not affected by a root font-size setting. 1rem and 1em in a media query is _always_ equal to the browser's font size (by default 16px)

We will use ems and not rems, as rems fail to work as intended in some browsers

**With the right structuring of the SASS, simply setting the font-size to the appropriate percentage at each breakpoint is enough to handle a great deal of the site's responsiveness!**

**Important!** Since media queries have no specificity, they are called in the order they are defined. So when using a series of max-width queries,
order them from the largest width to the smallest. That way a width of say, 400px, does not receive the 'phone' sizing, and then have it immediately overwritten by the tablet, then desktop, etc sizing. When using min-width, order them from smallest to largest.

A good order to write your media queries is: Base + Typography > General Layout + Grid > Page Layout > Components

### Responsive Images (In HTML)

What are responsive images?

- The goal of responsive images is to serve the **right image** to the **right screen size** and device, in order to avoid downloadingunnecessary large images on smaller screens. Send smaller images to mobile devices!

When to use responsive images? The 3 use cases:

- Resolution Switching: Serve up the same image for smaller screens at smaller resolutions
- Density Switching:
  - In high resolution screens, 2 physical pixels represent 1 pixel of our design
  - If we want images to look sharp on hi-res screens, we have to serve up an image with double the resolution
  - Example: Send an image to a hi-res display, and that same image at half the resolution to the desktop version
- Art Direction: Whole different image(s) depending on screen size. Either entirely new image or one where some details are added / removed

To achieve resolution/density switching, we can use the `srcset` attribute over the `src` attribute, as follows:

```html
<img srcset="logo-4x.jpg 1024w, logo-3x.jpg 768w, logo-2x.jpg 512w, logo-1x.jpg 256w" src="logo-fallback.jpg" />
```

We can also specify image density instead of widths, as follows:

```html
<img srcset="logo-4x.jpg 4x, logo-3x.jpg 3x" // etc >
```

You can also define the sizes attribute, which will define a set of media conditions (usually screen widths) and indicates what image size would be best to choose when certain media conditions are true:

```html
<img srcset="logo-480w.jpg 480w, logo-800w.jpg 800w" sizes="(max-width: 600px)  480px, 800px" src="logo-800w.jpg" />
```

Mozilla explains this well:

> A media condition ((max-width:600px)) — you'll learn more about these in the CSS topic, but for now let's just say that a media condition describes a possible state that the screen can be in. In this case, we are saying "when the viewport width is 600 pixels or less".
> A space
> The width of the slot the image will fill when the media condition is true (480px)
> Note: For the slot width, you may provide an absolute length (px, em) or a length relative to the viewport (vw), but not percentages. You may have noticed that the last slot width has no media condition (this is the default that is chosen when none of the media conditions are true). The browser ignores everything after the first matching condition, so be careful how you order the media conditions.

> So, with these attributes in place, the browser will:
> Look at its device width.
> Work out which media condition in the sizes list is the first one to be true.
> Look at the slot size given to that media query.
> Load the image referenced in the srcset list that has the same size as the slot or, if there isn't one, the first image that is bigger than the chosen slot size.
> And that's it! At this point, if a supporting browser with a viewport width of 480px loads the page, the (max-width: 600px) media condition will be true, and so the browser chooses the 480px slot. The elva-fairy-480w.jpg will be loaded, as its inherent width (480w) is closest to the slot size. The 800px picture is 128KB on disk, whereas the 480px version is only 63KB — a saving of 65KB. Now, imagine if this was a page that had many pictures on it. Using this technique could save mobile users a lot of bandwidth.

Resolution switching: Same size, different resolutions

> If you're supporting multiple display resolutions, but everyone sees your image at the same real-world size on the screen, you can allow the browser to choose an appropriate resolution image by using srcset with x-descriptors and without sizes — a somewhat easier syntax! You can find an example of what this looks like in srcset-resolutions.html (see also the source code):

````html
<img
  srcset="elva-fairy-320w.jpg, elva-fairy-480w.jpg 1.5x, elva-fairy-640w.jpg 2x"
  src="elva-fairy-640w.jpg"
  alt="Elva dressed as a fairy"
/>
```
````

> In this case, sizes is not needed — the browser works out what resolution the display is that it is being shown on, and serves the most appropriate image referenced in the srcset. So if the device accessing the page has a standard/low resolution display, with one device pixel representing each CSS pixel, the elva-fairy-320w.jpg image will be loaded (the 1x is implied, so you don't need to include it.) If the device has a high resolution of two device pixels per CSS pixel or more, the elva-fairy-640w.jpg image will be loaded. The 640px image is 93KB, whereas the 320px image is only 39KB.

### Responsive Images (In CSS )

Similar to how you make images responsive in HTML, but a little easier! Simply use a media query, and target things such as min-resolution (we can use 192dpi as a common target, as it is Apple's retina display), min-width, etc.

```css
// Load the higher-res hero image on higher density screens IF the w idth is at least 600px (at smaller than that, we don't really need high res version)
// ALso appy it if width of any screen density type is above 2000px
@media (min-resolution: 192dpi) and (min-width: 37.5em), (min-width: 125em) {
  background-image: url(../img/hero.jpg);
}
```

### Browser Support

Many times, newer CSS features are highly experimental and only work in the top modern browsers.

Very handy tool: www.caniuse.com

Graceful Degradation: Fallback to a different, adapted, more simple style on older browsers. We can handle graceful degradation with the feature queries! The syntax is `@supports`, as follows:

```css
background-color: rgba($color-black, 0.8);
// Apply a blur filter to the elements BEHIND this
-webkit-backdrop-filter: blur(10px);
backdrop-filter: blur(10px);
<!-- If our browser supports the above filter, then it was applied, and we don't want to darken the background as much as we would as when it had not applied -->
@supports (-webkit-backdrop-filter: blur(10px)) or (backdrop-filter: blur(10px)) {
    background-color: rgba($color-black, 0); }
```

**Note** Always put the prefixed version of properties first, like -webkit, -moz, etc.

We can also do `@supports not` so we don't have to rewrite our logic. Using the previous example, we don't have to needlessly specify a background-color that will later simply be negated in the `@supports` query. Instead, we only set that background-color in a `@supports not` block!

### Build Process

A common build process:

```
main.sass -> Compilation -> a. style.comp.css
b. icon-font.css -> Concatenation (of a and b) -> style.concat.css -> Prefixing -> style.prefix.css -> Compressing -> style.css
```

# Trillo Project - Master Flexbox!
