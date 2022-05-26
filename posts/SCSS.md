---
title: "My SCSS Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my SCSS notes!"
isFeatured: true
---

# SCSS

A collection of random SCSS-related notes.

## mixin vs extend

Which should you use?
Like everything frontend related, it depends on your use case and the tradeoffs you require.
Generally, if you don’t have dynamic styles, using @extend (preferably using placeholders — unless you are referencing the class in the DOM) is good enough. Using mixins for static-only styles causes unnecessarily bloated stylesheets so it’s a good idea to keep the declarations minimal and only for dynamic declarations because it’s going to be duplicated.

Reference: https://medium.com/stories-from-the-keen/when-to-use-extends-vs-mixins-in-sass-b09d55abd53
