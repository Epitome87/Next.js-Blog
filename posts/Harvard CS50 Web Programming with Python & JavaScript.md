# Harvard CS50 Web Programming with Python and JavaScript

## HTML

`datalist`:

Allows user to select one option from a list of options. It has auto-complete feature to help them filter down an option more quickly.

```html
<input name="country" list="countries" placeholder="Country" />
<datalist id="countries">
  <option value="Afghanistan"></option>
  <option value="Albania"></option>
  <option value="Ageria"></option>
  <option value="Andorra">
    <!-- Etc -->
  </option>
</datalist>
```

## CSS

`border-collapse`:

The border-collapse CSS property sets whether cells inside a <table> have shared or separate borders.

```css
border-collapse: collapse; // default is 'separate'
```
