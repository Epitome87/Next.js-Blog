---
title: "My HTML Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my HTML notes!"
isFeatured: true
---

# **HTML (HyperText Markup Language)**

# Semantic HTML

The following is an excellent quick reference for a list of semantic HTML elements: https://learn-the-web.algonquindesign.ca/topics/html-semantics-cheat-sheet/

The following is an excellent example of how you might use the main semantic tags on a typical website: https://webflow.com/blog/html5-semantic-elements-and-webflow-the-essential-guide

## Document Elements

### Title: `<title>`

Second most important piece of content.
Shown in the browser tab & search results.
Should be unique for every page on the site.

### Main: `<main>`

Primary content of the page.

### Section: `<section>`

A group in a series of related content pieces.

WWW3:
The `<section>` element defines a section in a document.
According to W3C's HTML documentation: "A section is a thematic grouping of content, typically with a heading."
Examples of where a `<section>` element can be used:

Chapters
Introduction
News items
Contact information

A web page could normally be split into sections for introduction, content, and contact information.

### Article: `<article>`

A piece of content that’s independent.
Could be removed from this website and still make sense.

WWW3:
The `<article>` element specifies independent, self-contained content.
An article should make sense on its own, and it should be possible to distribute it independently from the rest of the web site.

Examples of where the `<article>` element can be used:

- Forum posts
- Blog posts
- User comments
- Product cards
- Newspaper articles

### Nesting `<article>` in `<section>` or Vice Versa?

The `<article>` element specifies independent, self-contained content.
The `<section>` element defines section in a document.

Can we use the definitions to decide how to nest those elements? No, we cannot!

So, you will find HTML pages with `<section>` elements containing `<article>` elements, and `<article>` elements containing `<section>` elements.

### Header: `<header>`

When inside `<body>` it’s the website masthead.
When inside `<article>` it’s the most important information.

WWW3:
The `<header>` element represents a container for introductory content or a set of navigational links.

A `<header>` element typically contains: - one or more heading elements (`<h1>` - `<h6>`) - logo or icon - authorship information
Note: You can have several `<header>` elements in one HTML document. However, `<header>` cannot be placed within a `<footer>`, `<address>` or another `<header>` element.

### Footer: `<footer>`

When inside `<body>` it’s the website footer.
When inside `<article>` it’s the least important information.

WWW3:
The `<footer> `element defines a footer for a document or section.

A `<footer> `element typically contains:

- authorship information
- copyright information
- contact information
- sitemap
- back to top links
- related documents
- You can have several `<footer> `elements in one document.

### Nav: `<nav>`

Defines a group a navigation links.

WWW3:
Notice that NOT all links of a document should be inside a `<nav>` element. The `<nav>` element is intended only for major block of navigation links.
Browsers, such as screen readers for disabled users, can use this element to determine whether to omit the initial rendering of this content.

### Aside: `<aside>`

Secondary content not required to understand the main content.

WWW3:
The `<aside>` element defines some content aside from the content it is placed in (like a sidebar).
The `<aside>` content should be indirectly related to the surrounding content.

### Link: `<link>` CSS Link Tag

`<link href="css/main.css" rel="stylesheet">`

For linking CSS and other resources like feeds.
href is the path the file.
rel has different values for other resources.

### Examples Of Document Element Useage

```html
// Navigation Inside Header
<header>
  <nav>
    <ul>
      <li><a href="#">Stegosaurus</a></li>
      <li><a href="#">Triceratops</a></li>
      <li><a href="#">Ankylosaurus</a></li>
    </ul>
  </nav>
</header>
```

```html
// Main Content Groups
<body>
  <header>
    <nav>…</nav>
  </header>

  <main>
    <h1>Dinos-R-Us</h1>
  </main>

  <footer>
    <p>© 2063 Dinos-R-Us</p>
  </footer>
</body>
```

### Lists

### `<ul>`

An unordered list—the order of items isn’t important.
Can only have `<li>` elements as direct children.

```html
<ul>
  <li>Tyrannosaurus</li>
  <li>Spinosaurus</li>
  <li>Velociraptor</li>
</ul>
```

### `<ol>`

An ordered list—the order of the items is important.
Could be alphabetical, numerical, best to worst, etc.
Can only have `<li>` elements as direct children.

```html
<ol>
  <li>Mercury</li>
  <li>Venus</li>
  <li>Earth</li>
  <li>Mars</li>
</ol>
```

### `<li>`

A single list item.
Must be inside a `<ul>`, `<ol>` or `<menu>`.
Can have most other elements inside it.

### `<dl>`

A description list—a grouping of terms and definitions.
Words & definitions, titles & summaries, data points, etc.
Can only have `<dt>` and `<dd>` elements as direct children.

```html
<dl>
  <dt>Length</dt>
  <dd>2.3 m</dd>
  <dt>Weight</dt>
  <dd>4 tonnes</dd>
</dl>
```

### `<dt>`

Description title, the term of the item.
Must come before the `<dd>`.

### `<dd>`

Description definition, the data, or text of the item.
Can be multiple `<dd>` tags underneath one `<dt>`.

### `<menu>`

For semantically marking up a web application’s toolbar of buttons.
The `<menu>` tag also uses `<li>` tags inside—one for each toolbar button.
You may still have to remove the bullets.

```html
<menu>
  <li><button>Like</button></li>
  <li><button>Share</button></li>
  <li><button>Comment</button></li>
</menu>
```

## Text Elements

### Hyperlinks: `<a href="…">`

For making hyperlinks.

href is the path to where the link should go.

### Header 1: `<h1>`

The most important piece of content on the page.
On the homepage this should be the company’s name.
On inside pages this should be the page title.

### Headers 2 - 6: `<h2>, <h3>, <h4>, <h5>, <h6>`

Content headings, each a sub-heading of the one above.

The <h2> is a sub-heading of <h1>, <h3> a sub-heading of <h2>, etc.

### Heading Groups `<hgroup>`

Allows you to group multiple headings together and have them semantically treated as a single heading.
It’s primary purpose is for subheadings.

```html
<hgroup>
  <h1>Star Wars</h1>
  <h2>The Empire Strikes Back</h2>
</hgroup>
```

### Paragraph: `<p>`

A generic paragraph of text.

### Block Quote: `<blockquote>`

A large, stand alone quote from another source.

```html
<blockquote>
  <p>
    Dinosaurs may be extinct from the face of the planet, but they are alive and
    well in our imaginations.
  </p>
  <footer>— <cite>Steve Miller</cite></footer>
</blockquote>
```

### Citation: `<cite>`

A citation for another source, often used with quotations.
A person’s name, a URL, a book, a movie title, etc.

### Quotation: `<q>`

A small quotation embedded within other content.

### Emphasis: `<em>`

A string of emphasized, slightly more important text.
Screen readers will change their voice for this text.

### Strong: `<strong>`

A string of highly emphasized, much more important text.
Screen readers will change their voice for this text.

### `<ins datetime="…">`

Content that was inserted after the document was published.
datetime defines when it was added.

### `<del datetime="…">`

Content that was deleted after the document was published.
datetime defines when it was removed.

### `<abbr title="…">`

An acronym or abbreviation, like “HTML”, “CSS”, etc.
title contains the expanded version, like “Hypertext Markup Language”.

```html
<abbr title="Star Trek: The Wrath of Khan">ST:TWOK</abbr>
```

### `<dfn>`

A definition of a term on the page.
Should only be used once of the term.

### `<mark>`

Used to highlight a piece of text for reference.
The keywords in a search results page, the current navigation item.

### `<i>`

Defines technical term, a ship name, a book title, a thought, sarcasm, another language.

_Other languages_

`<i lang="fr">Bonjour</i>`

### `<b>`

Defines a keyword, like product name in a review, a lead sentence in a paragraph.

### `<s>`

Content that’s no longer relevant to the document.
Consider if the `<del>` element is better suited first.

### `<u>`

Labels the text as having a non-textual annotation.
A misspelled word, a Chinese proper name, etc.

### `<small>`

Represents side comments and fine print.

### `<address>`

Contact information, email, tel, postal address, etc.

```html
<address>
  Jet Propulsion Laboratory
  <br />4800 Oak Grove Drive <br />Pasadena, California <br />91109
</address>
```

Text edits

```html
<p>
  Launchpad 39A owned by <del datetime="2014-04-14">NASA</del>
  <ins datetime="2014-04-14">SpaceX</ins>
</p>
```

## Images & Media

### Image `<img>`

Embeds an image that’s important to the content.

`<img src="…" alt="…">`
src is a path to the image file.
alt describes the image if it cannot be seen.

### Picture `<picture>`

Responsive image insertion—allows developers to provide different images for different contexts.

### Source `<source>`

Must be inside `<picture>`, `<video>` or `<audio>` to define the different versions of content.

For example, in video it gives paths to the MP4 and WEBM formats.

### Figure `<figure>`

Embeds annotated images, illustrations, photos, code, etc.

Could be moved out of place and would still make sense.

### Figure Caption `<figcaption>`

For adding a caption/annotation to the `<figure>`.

Must be inside a `<figure>` element—cannot stand alone.

### Video `<video poster="…" autoplay loop muted controls>`

For embedding movies into a website.

poster is the path to an image that’s displayed before the video plays.
autoplay will hint the video to start automatically.
loop triggers whether the video should repeat or not.
muted can be added to not play sound by default.
controls shows or hides the browser’s player buttons.

### Audio `<audio autoplay loop muted controls>`

For embedding sounds into a website.

autoplay will hint the audio to start automatically.
loop triggers whether the audio should repeat or not.
muted can be added to not play sound by default.
controls shows or hides the browser’s player buttons.

### Track `<track>`

Used to pair captions, chapters, etc. with `<video>` elements.

### Examples:

_Basic images_
`<img src="images/dino.jpg" alt="An beautiful, long-necked Brontosaurus">`

_Figures & captions_
Use only if there’s a caption.

```html
<figure>
  <img src="images/dino-small.jpg" alt="" />
  <figcaption>So many dinosaurs I can’t even count!</figcaption>
</figure>
```

_Responsive images_
See Responsive & retina images for details: https://learn-the-web.algonquindesign.ca/topics/responsive-retina-images/

```html
<picture>
  <source media="(min-width: 60em)" srcset="images/dino-wide.jpg" />
  <source media="(min-width: 38em)" srcset="images/dino-rectangle.jpg" />
  <img src="images/dino-small.jpg" alt="All the dinosaurs!" />
</picture>
```

### Data & code

### Subscript `<sub>`

Defines text as being subscript.

### Superscript `<sup>`

Defines text as being superscript.

### Variable `<var>`

Represents a variable in math or programming.

### Time `<time datetime="…">`

Marks some text as a time or date.

datetime defines the machine readable version.

### Data `<data value="…">`

Marks elements as being a numerical piece of information.

value provides the machine readable version.

### Meter `<meter value="…" min="…" max="…">`

Represents a single number in a range of numbers.

value is the current number.
min is the minimum number.
max is the maximum number.

### Progress `<progress value="…" min="…" max="…">`

Represents the current position in a series of steps.

value is the current position.

min is the minimum position.

max is the maximum position.

`<code>`

Defines a piece of text as a code sample.

`<pre>`

A piece of text that has a specific formatting, where tabs, whitespaces, etc. should be maintained.

`<kbd>`

Something a user should type into their computer.

`<samp>`

Something a user should see output from a computer.

Time

Apollo 11 landed on the moon `<time datetime="1969-07-20T20:18">July 20, 1969</time>`
Data

Argentinosaurus weighted approximately `<data value="90">90 tonnes</data>`
Maths

`E = mc<sup>2</sup>`

## Meaningless Tags -- Avoid When Possible!

### Division `<div>`

Inherits meaning from its children.
Divides content into logical groups, when no other tag is better suited.
Has restrictions on what elements it can be inside.

### Span `<span>`

Inherits meaning from its children.

## Be Careful

### Break `<br>`

Creates a line break that’s significant to the content.
Useful in poems and addresses where the division of lines is important.

**Do not use to create space in a design—use margins and padding.**

### Horizontal Rule `<hr>`

Represents a thematic break in the content.
For example, a scene change or topic change.

**Do not use to create a horizontal line—use CSS borders.**

### Button `<button>`

Represents a interactive, clickable button.
Should be used in forms and with JavaScript.

**Do not use to link to another page—use the `<a>` tag.**

### `<wbr>`

Presents an opportunity for the browser to add a line-break if necessary.
Groups strings of text, when no other tag is better suited.

## Others

### Summary `<summary>`

The `<summary>` tag defines a visible heading for the `<details>` element. The heading can be clicked to view/hide the details.

Note: The `<summary>` element should be the first child element of the `<details>` element.

### Details `<details>` (VERY COOL!)

The `<details>` tag specifies additional details that the user can open and close on demand.

The `<details>` tag is often used to create an interactive widget that the user can open and close. By default, the widget is closed. When open, it expands, and displays the content within.

Any sort of content can be put inside the `<details>` tag.

Tip: The `<summary>` tag is used in conjuction with `<details>` to specify a visible heading for the details.

```html
<details>
  <summary>Epcot Center</summary>
  <p>
    Epcot is a theme park at Walt Disney World Resort featuring exciting
    attractions, international pavilions, award-winning fireworks and seasonal
    special events.
  </p>
</details>
```

It has an `open` attribute, which you can select and style as follows:
`details[open] { // Style when the details is 'Open' }`

## Complete List of HTML Tags

```html
Tag	Description
<!--...-->	Defines a comment
<!DOCTYPE> 	Defines the document type
<a>	Defines a hyperlink
<abbr>	Defines an abbreviation or an acronym
<acronym>	Not supported in HTML5. Use <abbr> instead.
Defines an acronym
<address>	Defines contact information for the author/owner of a document
<applet>	Not supported in HTML5. Use <embed> or <object> instead.
Defines an embedded applet
<area>	Defines an area inside an image map
<article>	Defines an article
<aside>	Defines content aside from the page content
<audio>	Defines embedded sound content
<b>	Defines bold text
<base>	Specifies the base URL/target for all relative URLs in a document
<basefont>	Not supported in HTML5. Use CSS instead.
Specifies a default color, size, and font for all text in a document
<bdi>	Isolates a part of text that might be formatted in a different direction from other text outside it
<bdo>	Overrides the current text direction
<big>	Not supported in HTML5. Use CSS instead.
Defines big text
<blockquote>	Defines a section that is quoted from another source
<body>	Defines the document's body
<br>	Defines a single line break
<button>	Defines a clickable button
<canvas>	Used to draw graphics, on the fly, via scripting (usually JavaScript)
<caption>	Defines a table caption
<center>	Not supported in HTML5. Use CSS instead.
Defines centered text
<cite>	Defines the title of a work
<code>	Defines a piece of computer code
<col>	Specifies column properties for each column within a <colgroup> element
<colgroup>	Specifies a group of one or more columns in a table for formatting
<data>	Adds a machine-readable translation of a given content
<datalist>	Specifies a list of pre-defined options for input controls
<dd>	Defines a description/value of a term in a description list
<del>	Defines text that has been deleted from a document
<details>	Defines additional details that the user can view or hide
<dfn>	Specifies a term that is going to be defined within the content
<dialog>	Defines a dialog box or window
<dir>	Not supported in HTML5. Use <ul> instead.
Defines a directory list
<div>	Defines a section in a document
<dl>	Defines a description list
<dt>	Defines a term/name in a description list
<em>	Defines emphasized text
<embed>	Defines a container for an external application
<fieldset>	Groups related elements in a form
<figcaption>	Defines a caption for a <figure> element
<figure>	Specifies self-contained content
<font>	Not supported in HTML5. Use CSS instead.
Defines font, color, and size for text
<footer>	Defines a footer for a document or section
<form>	Defines an HTML form for user input
<frame>	Not supported in HTML5.
Defines a window (a frame) in a frameset
<frameset>	Not supported in HTML5.
Defines a set of frames
<h1> to <h6>	Defines HTML headings
<head>	Contains metadata/information for the document
<header>	Defines a header for a document or section
<hr>	Defines a thematic change in the content
<html>	Defines the root of an HTML document
<i>	Defines a part of text in an alternate voice or mood
<iframe>	Defines an inline frame
<img>	Defines an image
<input>	Defines an input control
<ins>	Defines a text that has been inserted into a document
<kbd>	Defines keyboard input
<label>	Defines a label for an <input> element
<legend>	Defines a caption for a <fieldset> element
<li>	Defines a list item
<link>	Defines the relationship between a document and an external resource (most used to link to style sheets)
<main>	Specifies the main content of a document
<map>	Defines an image map
<mark>	Defines marked/highlighted text
<meta>	Defines metadata about an HTML document
<meter>	Defines a scalar measurement within a known range (a gauge)
<nav>	Defines navigation links
<noframes>	Not supported in HTML5.
Defines an alternate content for users that do not support frames
<noscript>	Defines an alternate content for users that do not support client-side scripts
<object>	Defines a container for an external application
<ol>	Defines an ordered list
<optgroup>	Defines a group of related options in a drop-down list
<option>	Defines an option in a drop-down list
<output>	Defines the result of a calculation
<p>	Defines a paragraph
<param>	Defines a parameter for an object
<picture>	Defines a container for multiple image resources
<pre>	Defines preformatted text
<progress>	Represents the progress of a task
<q>	Defines a short quotation
<rp>	Defines what to show in browsers that do not support ruby annotations
<rt>	Defines an explanation/pronunciation of characters (for East Asian typography)
<ruby>	Defines a ruby annotation (for East Asian typography)
<s>	Defines text that is no longer correct
<samp>	Defines sample output from a computer program
<script>	Defines a client-side script
<section>	Defines a section in a document
<select>	Defines a drop-down list
<small>	Defines smaller text
<source>	Defines multiple media resources for media elements (<video> and <audio>)
<span>	Defines a section in a document
<strike>	Not supported in HTML5. Use <del> or <s> instead.
Defines strikethrough text
<strong>	Defines important text
<style>	Defines style information for a document
<sub>	Defines subscripted text
<summary>	Defines a visible heading for a <details> element
<sup>	Defines superscripted text
<svg>	Defines a container for SVG graphics
<table>	Defines a table
<tbody>	Groups the body content in a table
<td>	Defines a cell in a table
<template>	Defines a container for content that should be hidden when the page loads
<textarea>	Defines a multiline input control (text area)
<tfoot>	Groups the footer content in a table
<th>	Defines a header cell in a table
<thead>	Groups the header content in a table
<time>	Defines a specific time (or datetime)
<title>	Defines a title for the document
<tr>	Defines a row in a table
<track>	Defines text tracks for media elements (<video> and <audio>)
<tt>	Not supported in HTML5. Use CSS instead.
Defines teletype text
<u>	Defines some text that is unarticulated and styled differently from normal text
<ul>	Defines an unordered list
<var>	Defines a variable
<video>	Defines embedded video content
<wbr>	Defines a possible line-break
```

## Random Semantic HTML Notes

### Common Mistakes (information gathered from Kevin Powell's video: https://www.youtube.com/watch?v=NexL5_Vdoq8)

(Can use a paid app, Polypane, to help identify accessibility issues: https://polypane.app)

- Use Semantic HTML and come up with a logical order for headings to create something that looks like a logical table of contents when viewed in an outline
- Do not skip Heading levels (for example, going from an H2 to an H5)
- Do not have more than one H1!
- Do not use H1-H6 if the text is not actually a header / sub-header (for example, a sub-title should not be a header -- it is not a sub-section)
  - Use a paragraph, and just style it to look like a sub-title
- You can wrap H-tags and paragraph combos within a Header tag!
- You can have multiple Header tags -- one for each Section!
- If you have multiple Navigation, identify them appropriately with an `aria-label` attribute
- You can (and should) sometimes hide content if contextually a user does not need it (for example, an H2 with the text "Table of Contents", as the context already lets the user realize it's a table of contents). This way, the user doesn't visually see it, but a screen reader can still know an H2 with "Table of Contents" is there
