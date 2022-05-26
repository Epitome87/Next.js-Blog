---
title: "My VS Code Notes"
date: "2022-05-25"
image: "post1.jpg"
excerpt: "Some of my VS Code notes!"
isFeatured: true
---

## Emmet

Using VS Code and Emmet, typing `.item{$}*4` and pressing tab will give:

```html
<div class="item">1</div>
<div class="item">2</div>
<div class="item">3</div>
<div class="item">4</div>
```

```
.item.item${$}*10 (tab)
```

The above Emmet abbreviations will obtain the following:

```html
<div class="item item1">1</div>
<div class="item item2">2</div>
<div class="item item3">3</div>
etc
```

## Navigation

- Hold `Ctrl` and press `Tab` to view a list of all the files open in an editor group. To open one of them, keep pressing `Tab` until it is selected, then release `Ctrl`
- Press `Ctrl + p` or `Ctrl + e` opens up an input field to search for a file in the project by name
