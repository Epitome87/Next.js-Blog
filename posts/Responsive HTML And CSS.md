---
title: 'Responsive HTML & CSS - Course Notes'
date: '2022-05-25'
image: 'post1.jpg'
excerpt: 'Some of my Responsive HTML & CSS notes!'
isFeatured: false
---

# 05 - Web Design Rules & Framework

## Web Design 'Ingredients'

When deconstructing well-designed sites, we may observe 9 'ingredients' that help shape their quality:

1. Typography
2. Colors
3. Images / Illustrations
4. Icons
5. Shadows
6. Border-radius
7. Whitespace
8. Visual Hierarchy
9. User Experience
10. Components / Layout

We can then apply these ingredients based on the type of website personality we hope to achieve.

## Website Personalities

1. Serious / Elegant
   - For luxury and elegance, based on thin serif typefaces, golden or pastel colors, and big high-quality images
2. Minimalist / Simple
   - Focuses on the essential text content, using small or medium-sized sans-serif black text, lines, and few images and icons
3. Plain / Neutral
   - Design that gets out of the way by using neutral and small typefaces, and a very structured layout. COmmon in big corporations
4. Bold / Confident
   - Makes an impact by featuring big and bold typography, paired with confident use of big and bright colored blocks
5. Calm / Peaceful
   - For products and services that care, transmitted by calming pastel colors, soft serif headings, and matching images / illustrations
6. Startup / Upbeat
   - Widely used in startups, featuring medium sans-serif typefaces, light-grey text and backgrounds, and rounded elements
7. Playful / Fun
   - Colorful and round designs, fueled by creative elements like hand-drawn icons or illustrations, animations, and fun language

## Ingredient #1 - Typography

```
Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed
```

**Serif vs Sans-Serif**

- _Serif_
  - Serif typeface has small details ("tails") at the end of the lines
  - Creates a traditional / class look and feel
  - Conveys trust to the user
  - Good for long text
- _Sans-Serif_
  - No decorative lines
  - Modern look and feel
  - Clean and simple
  - Easier to choose for beginner designer

**USE GOOD TYPEFACE**

_Rule #1: Use only good and popular typefaces and play it safe!_

- Some good, trusted sans-serif fonts are Inter, Open Sans, Roboto, Montserrat, Work Sans, and Lato
- Some good, trusted serif fonts are Merriweather, Aleo, Playfair Display, Cormorant, Cardo, Lora

_Rule #2: It's okay to use just one typeface per page! If you want more, limit to 2 typefaces._
_Rule #3: Choose the right typeface according to your website personality_

- Choose the right personality for your website
- Decide between a serif and sans-serif typeface
- Experiment with all the "good" typefaces to see which one best fits your website's message
- You can keep trying different typefaces as you design and build the page

**USE GOOD FONT SIZES AND WEIGHTS**

_Rule #4: When choosing font-sizes, limit choices. Use a "type scale" tool or other pre-defined range_
_Rule #5: Use a font size between 16px and 32px for "normal" text_
_Rule #6: For "long text" (like a blog post), try a size of 20px or even bigger_
_Rule #7: For headlines, you can go really big (50px+) and bold (600+) depending on personality_
_Rule #8: For any text, don't use a font weight under 400 (regular)_

**CREATE A GOOD READING EXPERIENCE**

_Rule #9: Use less than 75 characters per line_
_Rule #10: For normal-sized text, use a line height between 1.5 and 2. For big text, go below 1.5_

- The smaller or longer the text, the larger the line height needs to be

_Rule #11: Decrease letter-spacing in headlines, if it looks unnatural_
_Rule #12: Experiment with all caps for short titles (like sub-headings). Make them small and bold and increase letter-spacing_
_Rule #13: Usually, don't justify text_
_Rule #14: Don't center long text blocks. Small blocks are fine_

## Ingredient #2 - Color

**CHOOSE THE RIGHT COLOR**

_Rule #1: Make the main color match your website's personality: colors convey meaning!_

- Red: Draws a lot of attention, and symbolizes power, passion, and excitement
- Orange: Less aggressive, conveys happiness, cheerfulness, and creativity
- Yellow: Joy, brightness, and intelligence
- Green: Harmony, nature, growth, and health
- Blue: Associated with peace, trustworthiness, and professionalism
- Purple: Conveys wealth, wisdom, and magic
- Pink: Represents romance, care, and affection
- Brown: Associated with nature, durability and conform
- Black: Symbolizes power, elegance and minimalism, but also grief and sorrow

_Rule #2: Use a good color tone. Don't choose a random tone or CSS named colors_

- Open Color website is a good resource
- Flat UI Colors 2 is another good resource
- Tailwind CSS -- although it's a whole CSS framework, many use it just for its beautifully-picked colors

**ESTABLISH A COLOR SYSTEM**
_Rule #3: You need at least two types of colors in your color palette: a main color and a grey color_

- Grey color is typically for text, and doesn't necessarily have to be a true gray -- can be a very dark version of another color. A dark blue is another common choice

_Rule #4: With more experience, you can add more colors: accent (secondary) colors_

- Should be some relationship between the main color and accent color, so a tool might be helpful
- Useful tools are palleton.com or coolors.com

_Rule #5: For diversity, create lighter and darker "versions" (tints and shades, respectively)_

- This is especially useful for grey colors, as we typically need text in different states or levels of emphasis
- Useful tool is Tint & Shade Generator

**WHEN AND HOW TO USE COLORS**

_Rule #6: Use your main color to **draw attention** to the most important elements on the page_

- Useful for Call-to-Action buttons
- Can be typically found in the logo as well

_Rule #7: Use colors to add interesting accents or make **entire components or sections** stand out_
_Rule #8: You can try to use your color strategically in **images and illustrations**_

**COLORS AND TYPOGRAPHY**

_Rule #9: On dark colored backgrounds, try to **use a tint of the background** (light version) for text_
_Rule #10: Text should usually not be completely black. **Lighten it up** if it looks heavy and uninviting_
_Rule #11: **Don't make text too light!** Use a tool to check contrast between text and background colors_

- Contrast ratio needs to be at least **4.5:1 for normal text** and **3:1 for large text** (18px+)

## Ingredient #3 - Images

**USE GOOD IMAGES**

_Rule #1: Different types of images: **product photos, storytelling photos, illustrations, patterns**_

- Product photos: Show the digital or physical product the website is showcasing
- Storytelling photos: Help convey the message of the website. Someone using the product, etc. Most important of the 4, perhaps
- Illustration: More abstract way of storytelling. Add personality and originality. Either 2D or 3D
- Patterns: Background of entire sections, or behind images to add interesting visual detail or creativity. Use sparingly

_Rule #2: Use images to support your website's **message and story**. So only use **relevant images**_
_Rule #3: Prefer **original images**. If not possible, use **original-looking** stock images (not generic ones)_

- Should look authentic, not over-produced and staged
- Good resources are Unsplash, Pexels, DrawKit, and unDraw

_Rule #4: Try to show **real people** to trigger user's emotions_

- Avoid fake, over-produced models!

_Rule #5: If necessary, **crop images** to fit your message_
_Rule #6: Experiment **combining** photos, illustrations and patterns_

**HANDLING TEXT ON IMAGES**
_Rule #7: Darken or brighten image (completely or partially, using a gradient)_
_Rule #8: Position text into a neutral image area_

- A little more difficult since we have to be mindful of the position of the text as the screen shrinks or grows

We can also add a text-shadow to the text, which might help.

_Rule #9: Put text in a box_

- The box can also have some transparency

**SOME TECHNICAL DETAILS**

_Rule #10: To account for **high-resolution screens,** make image dimensions **2x as big** as their displayed size_

- **Scale factor**: Actual pixels the screen contains / Pixels represented on screen
- On high-res screens, scale factor is **2x** or even **3x**, on "normal" screens it's just **1x** (1 physical pixel = 1 design pixel)
- I.e if we want to display an image in a 300x300 area, the actual image should be 600x600 pixels

_Rule #11: **Compress images** for a lower file size and better performance_

- Helpful tool is Squoosh

_Rule #12: When using multiple images side-by-side, make sure they have the **exact same dimensions**_

## Ingredient #4 - Icons

**USE GOOD ICONS**
_Rule #1: Use a **good icon pack,** there are tons of free and paid icon packs_

- Some good resources are Phosphor icons, Ionicons, Hero Icons, Icons8
- Even regular emojis can work

_Rule #2: Use only one icon pack. **Don't mix** icons from different icon packs_
_Rule #3: Use **SVG icons** or **icon fonts.** Don't use bitmap image formats (.jpg and .png)_

- These forms are vector-based and scale indefinitely without pixelation

_Rule #4: Adjust to website personality. **Roundness, weight** and **filled/outlined** depend on typography_

- Use an icon pack that has a similar roundness and weight to your typography

**WHEN TO USE ICONS**

_Rule #5: Use icons to **provide visual assistance** to text_
_Rule #6: Use icons for **product feature blocks** -- the most common use_

- Typically consist of an icon, some smaller heading, and some description. Describe feature of a product or service - Well-chosen icons can make it so the user doesn't even have to read the text to know what the feature is

_Rule #7: Use icons **associated with actions**, and **label them** (unless no space or icon is 100% clear)_

- Example, buttons or menus
- Try to avoid menus where some elements are text and others are unlabeled icons

_Rule #8: Use icons **as bullet points**_

- Check marks, X, etc

**USE ICONS WELL**

_Rule #9: To keep icons neutral, **use same color as text.** To draw more attention, **use different color**_

- With same color, allows users to focus more on the text and the icon serves as some visual assistance in the background
- With different color, draws more attention to the icons. Can use brand colors. Can also make each icon a different color from one another for even more attention

_Rule #10: Don't confuse your users: icons need to make sense and **fit the text or action**_
_Rule #11: Don't make icons larger than what they **were designed for.** If needed, **enclose them in a shape** to fill them out to your desired larger size_

- Typically, icons that _are_ designed to be used at larger sizes contain more detail and use very thin lines

## Ingredient #5 - Shadows

Shadows can play an important part in helping users figure out the relationships between parts of our designs or just add interesting visual details

After an era of 100% flat design, we're not back to using shadows in UI design (what some may call "Flat Design 2.0")

1. Skeuomorphic design -- glossy, a lot of shadows
2. Flat Design (minimal) -- flat, little shadows. Perhaps a bit too flat!
3. Flat Design 2.0 -- still minimal, but brings back shadows and depth for better usability

**Shadow creates depth (3D):** the more shadow, the **further away from the interface** the element is

- Shadows can be used on **boxes** and **text**

**USE SHADOWS WELL**
_Rule #1: You **don't have to use** shadows! Only use them if it makes sense for the website personality_

- Serious / elegant designs tend to use less shadows
- More playful / fun tend to use more shadows

_Rule #2: Use shadows **in small doses:** don't add shadows to every element_
_Rule #3: Go light on shadows; don't make them **too dark**_

- Just looks bad and unnatural

**USE SHADOWS IN THE RIGHT SITUATION**

_Rule #4: Use **small shadows** for smaller elements that should stand out (to draw attention)_
_Rule #5: Use **medium-sized shadows** for larger areas that should stand out a bit more_

- Make entire sections float above the page
- Make cards stand out

_Rule #6: Use **large shadows** for elements that should really **float above** the interface_

- Pop-up windows, navigations

_Rule #7: Experiment with **changing shadows** on mouse interaction (click and hover)_

- Example: Perhaps no shadow at first, then a medium one when hovered (pulling it closer to the user), and a small when when clicked (pushing it away from the user)

_Rule #8: Bonus: Experiment with **glows** (colored shadows)_

## Ingredient #6 - Border-Radius

Can play a big role on the seriousness / playfulness of our design

**USE BORDER-RADIUS WELL**

_Rule #1: Use border-radius to **increase the playfulness** and fun of the design, to make it **less serious**_
_Rule #2: Typefaces have a certain roundness: make sure that border-radius **matches that roundness**_
_Rule #3: Use border-radius on **buttons, images, around icons, standout sections & other elements**_

- Can even use some creativity and use some corners of an element sharp, while others are rounded

## Ingredient #7 - Whitespace

One of the easiest and fastest ways to drastically improve a design!

**WHY WHITESPACE**

- The right amount of whitespace makes designs look **clean, modern** and **polished**
- Whitespace communicates how different pieces of information **are related to one another**
- Whitespace implies **invisible relationships between elements** of a layout

**WHERE TO USE WHITESPACE**

_Rule #1: Use tons of whitespace **between sections**_
_Rule #2: Use a lot of whitespace **between groups of elements**_

- Usually vertically we need a lot more space than horizontally

_Rule #3: Use whitespace **between elements**_
_Rule #4: Inside **groups of elements,** try to use whitespace **instead of lines**_

**HOW MUCH WHITESPACE**

_Rule #5: **The more some elements** (or groups of elements) **belong together, the closer they should be!**_

- This is called _The Law of Proximity_

_Rule #6: Start with **a lot of whitespace,** maybe even too much! Then **remove whitespace** from there_

- Too much whitespace looks **detached,** while too little looks too **crammed** and **uninviting**

_Rule #7: Match **other design choices.**_

- If you have big text or big icons, you need more whitespace

_Rule #8: Try a hard rule, such as using **multiples of 16px** for all spacing_

- You will need _some_ small values, like 2px, 4px, 8px, 12px -- but after that stick to multiples of 16px
- Limitations can actually be a good thing!

## Ingredient #8 - Visual Hierarchy

Encapsulates many of the concepts taught so far, bringing them together in a thoughtful way.

- Visual hierarchy is about **establishing which elements** of a design **are the most important ones**
- Visual hierarchy is about **drawing attention** to these most important elements
- Visual hierarchy is about **defining a "path" for users,** to guide them through the page
- We use a combination of **position, size, colors, spacing, borders,** and **shadows** to establish a meaningful visual hierarchy between elements / components

**VISUAL HIERARCHY FUNDAMENTALS**
_Rule #1: Position important elements **closer to the top of the page,** where they typically get more attention_

- Attention flows down the page (and components)
- People usually read from top to bottom, left to right

_Rule #2: Use images mindfully, as they draw **a lot of attention** (larger images get more attention)_
_Rule #3: Whitespace creates separation, so **use whitespace strategically** to emphasize elements_

**VISUAL HIERARCHY FOR TEXT ELEMENTS**

_Rule #4: For text elements, use **font size, font weight, color,** and **whitespace** to convey importance_

- When all text in a component is the same color, size, and weight, it can be confusing
- You can begin by increasing the font size of more important elements, like headings and ratings
- Next you can increase the font weight, again perhaps on a heading and subheading
- Finally, you can lighten the color of less important text

_Rule #5: What text elements to emphasize? **Titles, sub-titles, links, buttons, data points, icons**_

- You can also **de-emphasize** less important text, like **labels** or **secondary / additional information**

**VISUAL HIERARCHY BETWEEN COMPONENTS**

_Rule #6: Emphasize an important component using **background color, shadow,** or **border** (or multiple)_
_Rule #7: Try emphasizing some component A over component B by **de-emphasizing component B**_
_Rule #8: What components to emphasize? **Testimonials, call-to-action sections, highlight sections, preview cards, forms, pricing tables, important rows / columns in tables,** etc_

## Ingredient #9 - User Experience

What is User Experience (UX)?

User Interface (UI) is the visual presentation of a product. It is how the graphical interface looks and feels like

- Layout
- "Personality"
- Typography, colors, icons, etc

User Experience (UX) is the overall experience the user has while interacting with the product

- Does the app feel logical and well thought out?
- Does the navigation work intuitively?
- Are users reaching their goals?

**UI AND UX DESIGN**

UI is graphical interface -- UI Design is what makes an interface beautiful
UX is experience with interface -- UX Design is what makes an interface useful and functional

UX Design cannot exist without UI Design -- deeply intertwined

**UX DESIGN GUIDING PRINCIPLE: GOALS**

A website or application exists for a reason: a user has a goal for visiting it, and a business has a goal for creating it
Good UX design aligns the user's goals with the business' goals

- Example: When highlighting an option in a product pricing table. It helps the user decide faster which option is the bst, while also helping the business maximize revenue (by highlight perhaps the most expensive option, or one which they know will sell the best)
- Conversely, a pop-up form to grab the user's email. This is good for the business' goals, but not for the user's experience!

**UX RULES FOR USABILITY**

_Rule #1: Don't design complicated layouts. Don't reinvent the wheel. **Use patterns that users know**_
_Rule #2: Make your call-to-action the **most prominent element,** and make the **text descriptive**_
_Rule #3: Use **blue text** and **underlined text** only for **links!**_

- Users are accustomed to this

_Rule #4: Animations should have a **purpose** and be **fast:**: between 200ms and 500ms_
_Rule #5: In forms, align labels and fields in a **single vertical line,** to make the form **easier to scan**_
_Rule #6: Offer users **good feedback** for all actions: form errors, form success, etc. [web apps]_
_Rule #7: Place action buttons where they will **create an effect** (law of locality) [web apps]_

**UX RULES FOR WEBSITE CONTENT**

_Rule #8: Use a **descriptive, keyword-focused headline** on your main page. Don't be vague or fancy!_
_Rule #9: Only include **relevant information,** efficiently! **Cut out fluff** and make the content 100% clear_
_Rule #10: Use **simple words**. Avoid technical jargon and "smart-sounding" words_
_Rule #11: Break up long text with **sub-headings, images, block quotes, bullet points,** etc_

## Website Personalities Framework

We can distill websites into some general personalities:

- Serious / Elegant
- Minimalist / Simple
- Plain / Neutral
- Bold / Confident
- Calm / Peaceful
- Startup / Upbeat
- Playful / Fun

When it comes to choosing the right personality, think about:

- How do you want the website to appear to users? What "vibe" do you want to transmit?
- Choose one of the website personalities accordingly
- Apply personality traits to each design ingredient

A personality will limit the choices you have in the design ingredients. For example, a serious site will avoid border radius and shadows.

### Personality 01 - Serious / Elegant

**Overview**

Design for luxury and elegance, based on thin serif typefaces, golden or pastel colors, and big high-quality images

**Industries**

Real estate, high fashion, jewelry, luxury products or services

**Traits**

- Typography
  - Serif typefaces (especially in headings), light font weight, small body font size
- Colors
  - Gold, pastel colors, black, dark blue or grey
- Images
  - Big, high-quality images are used to feature elegant and expensive products
- Icons
  - Usually no icons, but thin icons and lines may be used
- Shadows
  - Usually no shadows
- Border-Radius
  - Usually no border-radius
- Layout
  - A creative and experimental layout is quite common

### Personality 02 - Minimalist / Simple

**Overview**

Focuses on the essential text content, usign small or medium-sized sans-serif black text, lines, and few images and icons

**Industries**

Fashion, portfolios, minimalism companies, software startups

**Traits**

- Typography
  - Boxy / squared sans-serif typefaces, small body font sizes
- Colors
  - Usually black or dark grey, on pure white background. Usually just one color throughout the design
- Images
  - Few images, which can be used to add some color to the design. Usually no illustrations, but if there are, than just black
- Icons
  - Usually no icons, but small simple black icons may be used
- Shadows
  - Usually no shadows
- Border-Radius
  - Usually no border-radius
- Layout
  - Simple layout, a narrow one-column layout is quite common

### Personality 03 - Plain / Neutral

**Overview**

Design that gets out of the way by using very neutral and small typefaces, and a boxy, structured, and condensed layout

**Industries**

Well-established corporations, companies that don't want to make an impact through design

**Traits**

- Typography
  - Neutral-looking sans-serif typefaces are uses, and text is usually small and doesn't have visual impact
- Colors
  - Safe colors are employed, nothing too bright or too washed-out. Blues and blacks are common
- Images
  - Images are frequently used, but usually in a small format
- Icons
  - Usually no icons, but simple icons may be used
- Shadows
  - Usually no shadows
- Border-Radius
  - Usually no border-radius
- Layout
  - Structured and condensed layout, with lots of boxes and rows

## Personality 04 - Bold / Confident

**Overview**

Design that makes an impact, by featuring big and bold typography, paired with confident use of big colored blocks

**Industries**

Digital agencies, software startups, travel, "strong" companies

**Traits**

- Typography
  - Boxy / squared sans-serif typefaces, big and bold typography, especially in headings. Uppercase headings are common
- Colors
  - Usually multiple bright colors. Big color blocks / sections are used to draw attention
- Images
  - Lots of big images are usually displayed
- Icons
  - Usually no icons
- Shadows
  - Usually no shadows
- Border-Radius
  - Usually no border-radius
- Layout
  - All kinds of layouts, no particular tendencies

## Personality 05 - Calm / Peaceful

This is one of the more commonly used personalities used recently.

**Overview**

For products and services that care about the consumer, which is transmitted by calming pastel colors and soft serif headings

**Industries**

Healthcare, all products with focus on consumer well-being

**Traits**

- Typography
  - Soft serif typefaces frequently used for headings, but sans-serif headings might be used too (e.g for software products)
- Colors
  - Pastel / washed-out colors: light oranges, yellows, browns, greens, blues
- Images
  - Images and illustrations are usual, matching calm color palettte
- Icons
  - Icons are quite frequent
- Shadows
  - Usually no shadows, but might be used sparingly
- Border-Radius
  - Some border-radius is typical
- Layout
  - All kinds of layouts, no particular tendencies

## Personality 06 - Startup / Upbeat

This is one of the more commonly used personalities used recently.

**Overview**

Widely used in startups, featuring medium-sized sans-serif typefaces, light-grey backgrounds, and rounded elements

**Industries**

Software startups, and other modern-looking companies

**Traits**

- Typography
  - Medium-sized headings (not too large), usually one sans-serif typeface in whole design. Tendency for lighter text colors
- Colors
  - Blues, greens and purples are widely used. Lots of light backgrounds (mainly grey), gradients are also common
- Images
  - Images or illustrations are always used. 3D illustrations are modern. Sometimes patterns and shapes add visual details
- Icons
  - Icons are very frequent
- Shadows
  - Subtle shadows are frequent. Glows are becoming modern
- Border-Radius
  - Border-radius is very common
- Layout
  - Rows of cards and Z-patterns are usual, as well as animations

## Personality 07 - Playful / Fun

**Overview**

Colorful and round designs, fueled by creative elements like hand-drawn icons or illustrations, animations, and fun language

**Industries**

Child products, animal products, food

**Traits**

- Typography
  - Round and creative (e.g. handwritten) sans-serif typefaces are frequent. Centered text is more common
- Colors
  - Multiple colors are frequently used to design a colorful layout, all over backgrounds and text
- Images
  - Images, hand-drawn (or 3D) illustrations, geometric shapes and patterns are all very frequently used
- Icons
  - Icons are very frequent, many times in a hand-drawn style
- Shadows
  - Subtle shadows are quite common, but not always used
- Border-Radius
  - Border-radius is very common
- Layout
  - All kinds of layouts, no particular tendencies

## Advanced: Combining Playfulness and Boldness

We can chart these personalities onto a graph with Serious to Playful on one axis and Calm to Bold on another.

We can note that the more Playful a site is, we'll have:

- More colorful
- Rounded corners, typography and icons
- Shadows
- Illustrations

In order from Serious to Playful, we have:

- Serious / Elegant -> Minimalist / Simple -> Plain / Neutral -> Startup / Upbeat -> Playful / Fun

We can also note that the more Bold a site is, we'll have:

- Boxy / squared sans-serif typeface
- Big and bold typography
- Bright / flashy colors
- Big color blocks

Whereas with calm we'll have:

- Headings using soft, serif typefaces
- Pastel / washed-out colors
- Illustrations

In order from Calm to Bold, we have:

- Calm / Peaceful -> Bold / Confident

Why does this matter? All these personalities are fluid; some traits of the Calm / Bold personalities can be injected into the other 5 personalities. (We could technically combine _any_ of the personalities together, but we will typically find that taking a personality and leaning it more towards either Calm or Bold is the most prevalent. Even Calm and Bold can be mixed to wonderful results, but can be rather challenging to pull off).

## Final Piece - Stealing Like An Artist

Design ingredients, website personalities, design guidelines and rules...wha'ts missing?
Getting **inspired** and **stealing like an artist**!

- Not completely copying a design. Instead, it's about taking good parts and adapting them to our needs.

Some great resources are Land-Book, One Page Love, Awwwards, Screenlane, and Dribbble

## Design Ingredient #10 - Designing Components & Layouts

**FROM ELEMENTS TO WEBPAGE**

Staring at a blank page and trying to envision the end result can be overwhelming. Fortunately, the flow from a blank page to a full-fledged webpage can be broken into manageable, easily-planned chunks.

Elements -> Components --Patterns-> Layouts -> Webpage

1. Use common elements and components to convey your website's information
2. Combine components into layouts using common layout patterns
3. Assemble different layout areas into a complete, final page

### Most Common Elements, Components, Sections, Patterns

Most common Elements

1. Text
2. Buttons
3. Images
4. Input elements
5. Tags

Most common Components (combining the elements listed previously)

1. Breadcrumbs
2. Pagination
3. Alert and status bars
4. Statistics
5. Gallery
6. Feature box
7. Preview and profile cards
8. Accordion
9. Tabs
10. Carousel
11. Customer testimonials
12. Customer logos
13. "Featured-in" logos (social proof -- where your site or product has been featured)
14. Steps
15. Forms
16. Tables
17. Pricing tables
18. Modal windows

Most common Section Components

1. Navigation
2. Hero section
3. Footer
4. Call-to-action section
5. Feature row

Most common Layout Patterns (combining multiple components)

1. Row of boxes or cards
2. Grid of boxes or cards
3. Z-pattern
4. F-pattern
5. Single-column
6. Sidebar
7. Multi-column / magazine
8. Asymmetry / Experimental

## Design Ingredient #10 - Part 2 - Section Components & Layout Patterns

### Section Components

Bigger components!

#### Navigation Components

Primary and sub (or secondary) means of navigation through the site

#### Hero Section

Very first section of the page. Description of site, heading, buttons, images, etc

Three big trends

- Text on one side, image on the other (probably the most modern trend)
- Background image with some text on top (popular around 2015)
- First text, then some image

#### Footer

- Trend (perhaps even a standard) to include a complete site map in your footer
- Common to have social icons in the footer
- Sometimes a submit form, for a news letter

#### Call-To-Action Section

- Some kind of section close to the end of the page. We want the user to take some sort of action
- Common to have them stand out via visual hierarchy

#### Feature Row

- Small sections of the page which usually describe some feature of the product or service
- Usually multiple of these rows are combined using some kind of pattern
- Simple, some kind of image, some kind of heading / text / button that explains feature further
- Sometimes includes a testimonial related to that feature
- Trend to use small uppercase title just above the main heading

### Layout Patterns

Specific way of repeating a certain component multiple times. Can mix-and-match and even nest patterns

#### Row of Boxes / Cards

- Most simple is probably the row of boxes or row of cards

#### Grid of Boxes / Cards

- Also extremely common, it's a 2 dimension grid of boxes / cards
- Read from left-to-right, then you go to the row below that, repeat

#### Z-Pattern

- Combination of different feature rows
- Way of repeating similar feature rows but with alternating configurations
- Common example is image on left, text on right. Then the next row is image on right, text on left
- Creates a "Z" pattern because you view from left-to-right, then your eye moves diagnally down to the next row and goes from right-to-left
- Popular because our eyes have a tendency for scanning opposing rows
- Most of the time, three rows are used

#### F-Pattern

- Again, about repeating feature rows
- Repetition can also be about more-horizontal cards
- Configuration of the rows does not alternate -- images always on same side, text always on same side
- Can also be "inverted" where we scan the right-side first, then the left, then move to the next row and repeat

#### Single Column Pattern

- Mostly used on mobile responsive websites, or very simple websites
- Can be used on simple blog posts

#### Sidebar Pattern

- Options for a web app
- Table of contents
- Summary

#### Multi-Column / Magazine

- Combining different columns with different widths
- Create a more traditional magazine-like layout

#### Asymmetry / Experimental

- Highly-impactful if done right
- CSS Grid would be great for these!
- Doesn't have to be the entire page -- can be just a small section

## Omni Food - Part 1

### The Process Behind Building a Website

1. Define
2. Plan
3. Sketch
4. Design and Build
5. Test and Optimize
6. Launch
7. Maintain and Update

### 1 - Define the Project

- Define **WHO the website is for.** Is it for yourself? For a client of your agency or your freelancing business?
- Define **WHAT the website is for.** In other words, define **business and user goals** of your website project. Providing information, selling something, or entertaining are the three most common goals.
- Define a **target audience.** Be really specific if possible and if it makes sense for your website (this can come from your client).

### 2 - Plan the Project

- Plan and gather **website content:** copy (text), images, videos, etc.
- Content is usually **provided by the client,** but you also can help them produce and find some content (simply finding free images is easiest, but if they want copy, charge them extra).
- For bigger sites, plan out the **sitemap:** what pages the site needs, and how they are related to one another (content hierarchy).
- Based on the content, plan what **sections** each page needs in order to convey the content's message, and in which order. Let the content dictate the design, not the other way around!
- Define the **website personality**.

### 3 - Sketch Layout & Component Ideas

- Think about what **components** you need, and how you can use them in **layout patterns**
- **Get ideas out of your head:** sketch them with **pen and paper** or some design software (e.g. Figma)
- This is an **iterative process:** experiment with different components and layouts, until you arrive at a good first solution
- You don't need to sketch everything, and **don't make it perfect.** At some point, you're ready to jump into HTML and CSS

### 4 - Design and Build Website

- Use decisions, content and sketches from previous steps to **design and build the website with HTML and CSS** ("designing in the browser")
- You already have the **layout** and **components** that you selected in Step 3. In this step, you need to design the actual **visual styles**
- Create the design based on selected **website personality,** the **design guidelines**, and **inspiration**
- Use the **client's branding** (if it exists already) for design decisions whenever possible: **colors, typography, icons,** etc

### 5 - Test and Optimize

- Make sure website works well in **all major browsers**
- Test the website on **actual mobile devices,** not just in DevTools
- Optimize all **images,** in terms of dimensions and file size
- Fix simple **accessibility** problems (e.g. color contrast issues)
- Run the **Lighthouse** performance test in CHrome DevTools and try to fix reported issues
- Think about **Search Engine Optimization** (SEO)

### 6 - Launch Website

- Once all the work is done, everything is perfect, and you got approval from your client, it's time to **share your masterpiece with the world!**
- Upload your website files to a **hosting platform.** There are countless platforms
- Choose and buy a great **domain name,** one that represents the brand well, is memorable and easy to write

### 7 - Maintain and Update

- Launching is not the end...
- Keep the website content **updated over time.** If you're working with a client, you can create a monthly maintenance contract (recurring revenue)
- Install **analytics software** (e.g. Google Analytics or Fathom) to get statistics about website users. This may **inform future changes** in the site structure and content
- A **blog** that is updated regularly is a good way to keep users coming back, and is also good for SEO

## Omni Food - Defining and Planning

### Step 1 - Define

Define WHO the website is for

- For a client

Define WHAT the website is for

- Business goal: Selling monthly food subscription
- User goal: Eating well effortlessly, without spending a lot of money or time

Define target audience

- Busy people who like technology, are interested in a healthy diet, and have a well-paying job

### Step 2 - Plan

- Content provided for us by client!
- Plan out the sitemap
  - We will just build a **one-page marketing website** (oftentimes called a **landing page**), so no sitemap
- Define website personality:
  - Based on the tech-centered target audience, as well as the actual product being sold, we will use the **startup / upbeat** personality. We might add some elements of the **calm / peaceful** personality, since the product is all about consumer well-being
- Plan page sections
  - Logo + Navigation
  - Hero
  - Featured-in (typically after hero)
  - How it works (seems more primary than 'Features')
  - Meals / list of diets
  - Testimonials + photo gallery
  - Pricing (typically low on page) + features
  - Call-to-action (typically near bottom)
  - Footer with contact information

## Responsive Web Design

- Design technique to make a webpage adjust its layout and visual style to **any possible screen size** (window or viewport size)
- In practice, this means that responsive design makes websites usable on all devices, such as **desktop computers, tablets, and mobile phones.**
- It's a set of practices, **not a separate technology.** It's all just CSS

### Responsive Design Ingredients

1. Fluid Layouts

- To allow webpage to adapt to the **current viewport** width (or even height)
- Use % (or vh / vw) unit instead of px for elements that **should adapt to viewport (usually layout)**
- Use max-width instead of width

2. Responsive Units

- Use rem unit instead of px for most lengths
- To make it easy to **scale the entire layout down** (or up) automatically
- **Helpful trick:** setting 1rem to 10px for easy calculations

3. Flexible Images

- By default, images **don't scale automatically** as we change the viewport, so we need to fix that
- Always use % for image dimensions, together with the max-width property

4. Media Queries

- Brings responsive sites to life
- To change CSS styles on **certain viewport widths** (called breakpoints)

### Desktop-First vs. Mobile-First Development

Desktop-First

- Start writing CSS for desktop: large screen
- Then, media queries **shrink design** to smaller screens

Mobile-First

- Start writing CSS for mobile: small screen
- Then, media queries **expand design** to a large screen
- Forces us to reduce websites and apps to the **absolute essentials**

## Rem & Max-Width

### Max-Width

- If the container width is larger than the specified max-width, then the width of the element is equal to the value that was specified for amx-width. If the container width is less than the specified max-width, then the width of the element will be 100% of the container element width.

### Rem Unit

- Root Element font-size
- If no font-size specified on HTML element, default rem is used
- Default browser 1rem = 16px
- Common to change the html font-size to 10px, so 1rem = 10px => easier calculations
  - But this doesn't respect user's font-size settings!
  - Instead of setting it to a fixed-size, we set it to a percentage: **62.5%**
  - This represents the percentage of user's browser font-size setting. If default of 16, then this gives 10
  - If user sets it to 18px, the font size is 11.25 -- so the layout still grows proportionally

## Random Notes

- Good idea to use utility classes for margins, instead of placing them directly on re-usable styles (which will make them not as re-usable!)

```css
width: 100%;
max-width: 1000px;

Alternative:
width: min(100%, 1000px);

But let's say you want 20px horizontal padding on mobile. If you do:
padding: 0 20px;

You will have to reset the padding in a media query for desktop. Using the new'ish min function above, we can simply do this:
width: min(100% - 40px, 1000px);

Even better:
width: min(100% - 2rem, 60rem);
```

### Responsive Font Size

First approach:

```css
font-size: 28px;

@media screen and (min-width: 900px) {
  font-size: 2.25rem;
}
@media screen and (min-width: 1400px) {
  font-size: 2.625rem;
}
```

Better approach:

```css
font-size: 7.5vw;
```

- No media queries required
- Font can grow too drastically
- Font gets way too big on large screens

Even better approach:

```css
font-size: calc(1rem + 2vw);
```

- Ensures font size is at least 16px
- Lower reliance on the viewport width -- it's only accounting for a smaller fraction of the viewport than before
- But on really large screens, the font may still get a bit too big

Best approach:

```css
h1 {
  font-size: clamp(1.75rem, 1rem + 2vw, 42px);
}
h2 {
  font-size: clamp(1.375rem, 0.875rem + 1.5vw, 2.25rem);
}
```

- Clamps the font size to be minimum of first argument, max of third argument, and preferred size of second argument
- Note we don't need to use the calc function when using clamp

**Important**:

- Try to only use vw for font-sizes if it's adding to a number that is dependent on base font size, like rem

### Media Queries

- Use em for breakpoints (rem has bugs, px doesn't account for large font sizes)

### Margin Collapse

Rather than combining two adjacent margins, CSS will "collapse" the margins -- using only the larger of the two values.

- To avoid margin collapse, need to create a "block formatting context" using some css properties on the parent
  - Giving any border or padding, for instance, will create a new block formatting context
