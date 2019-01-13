# [Evangelion UI Artboard](https://codepen.io/hlfcoding/details/oXpWOV)

> Inspired by [this album](https://imgur.com/a/gfcEr) of screenshots from the movies and episodes.
>
> Not a real screen from any of those shots. Just an initial playground for new elements. Screens coming later. は新準備!

Head
----

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
```

Body
----

```html
<!-- using: -blink -clearfix -->
<!-- <div class="board static -clearfix -static"> -->
<div class="board -clearfix">
  <div class="piece">
    <div class="label -bordered">Psychographic Display</div>
  </div>
  <div class="piece">
    <div class="label -blink -bordered --danger">Approaching Limits</div>
    <div class="separator"></div>
    <div class="label -blink -bordered -short --danger">Danger</div>
  </div>
  <div class="piece">
    <div id="internal" class="label -bordered">
      <div class="text -characters">内部</div>
      <div class="text">Internal</div>
      <div class="decal -blink -striped"></div>
    </div>
  </div>
  <div class="piece -rotate-method">
    <div class="hex-row -clearfix"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
    <div class="hex-row -clearfix"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
    <div class="hex-row -clearfix"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
  </div>
</div>
```

```scss
// //codepen.io/hlfcoding/pen/QbmaBV

// using blink

@mixin tandem-blink {
  @include blink($duration: 3s);
  animation-delay: .1s;
  &:nth-child(2n) { animation-delay: .2s; }
  &:nth-child(3n) { animation-delay: .3s; }
}
@mixin tandem-blink-even {
  animation-delay: .3s;
  &:nth-child(2n) { animation-delay: .2s; }
  &:nth-child(3n) { animation-delay: .1s; }
}

.hex-row {
  > .hex { @include tandem-blink; }
  &:nth-child(even) > .hex { @include tandem-blink-even; }
}
```

```css
/* `font-stretch` isn't well supported, so instead of using a condensed font variant, load a condensed font. */
@import url(//fonts.googleapis.com/css?family=Roboto+Condensed:400,600,700);

html {
  cursor: none;
}

body {
  background: #000;
}

.board {
  --glow-rgb: 255, 102, 0;
  --text-color: #fa0;
  --danger-fill-color: #f23;
  --danger-glow-rgb: 255, 0, 0;
  --danger-text-color: #f30;
  --gutter-size: 8px;
  padding-left: 1rem;
  padding-top: 1rem;
}

.piece {
  float: left;
  margin-bottom: 1rem;
  margin-right: 1rem;
}

/* attributes */

.-bordered {
  --border-glow-color: rgba(var(--glow-rgb), .7);
  border-radius: var(--gutter-size);
  border-style: solid;
  border-width: 3px;
  box-shadow:
    inset 0 0 0 1px var(--border-glow-color),
    0 0 0 1px var(--border-glow-color);
}
.-bordered.--danger {
  --border-glow-color: rgba(var(--danger-glow-rgb), .7);
}

.-striped {
  --stripe-color: var(--danger-fill-color);
  --stripe-size: 15px;
  --glow-color: rgba(var(--danger-glow-rgb), .8);
  --glow-size: 3px;
  background-image: repeating-linear-gradient(
    -45deg,
    /* glow boundary */
    var(--glow-color) calc(-1 * var(--glow-size)),
    /* fade into foreground */
    var(--stripe-color) 0,
    /* fade from foreground */
    var(--stripe-color) calc(var(--stripe-size) - var(--glow-size) / 2),
    /* glow boundary */
    var(--glow-color) calc(var(--stripe-size) + var(--glow-size) / 2),
    /* fade to background */
    transparent calc(var(--stripe-size) + var(--glow-size) / 2),
    /* fade from background */
    transparent calc(2 * var(--stripe-size)),
    /* glow boundary */
    var(--glow-color) calc(2 * var(--stripe-size) - var(--glow-size))
  );
  box-shadow: inset 0 0 1px calc(var(--glow-size) / 2) var(--shade-3);
}

/* components */

.label {
  display: inline-block;
  font: 400 32px 'Roboto Condensed';
  letter-spacing: -1px;
  line-height: 1;
  padding: 1px calc(var(--gutter-size) - 3px);
  text-transform: uppercase;
  user-select: none;
  white-space: nowrap;
  /* skin */
  --text-glow-color: rgba(var(--glow-rgb), .5);
  color: var(--text-color);
  text-shadow:
    -1px 1px 0 var(--text-glow-color),
    1px -1px 0 var(--text-glow-color),
    -1px -1px 0 var(--text-glow-color),
    1px 1px 0 var(--text-glow-color);
}
.label.-short {
  font-size: 40px;
}
.label.--danger {
  --text-glow-color: rgba(var(--danger-glow-rgb), .5);
  color: var(--danger-text-color);
}
.label + .separator {
  height: var(--gutter-size);
}
.label .text.-characters {
  font-weight: 600;
}
.label#internal {
  --decal-width: 50px;
  --label-corner-size: 3px;
  --label-gutter-size: 5px;
  display: grid;
  column-gap: var(--label-gutter-size);
  grid-template-columns: auto var(--decal-width);
  padding: var(--label-corner-size);
}
.label#internal .text {
  text-align: right;
}
.label#internal .text.-characters {
  font-size: 64px;
  padding-top: var(--label-gutter-size);
}
.label#internal .decal {
  border-radius: calc(var(--label-corner-size) - 1px);
  grid-area: 1 / 2 / span 2 / 2;
}

.hex {
  --edge-size: 20px;
  --diagonal-size: calc(var(--edge-size) * 2);
  --diagonal-s-size: calc(var(--edge-size) * 1.75); /* diagonal */
  --gutter-ratio: .85;
  --gutter-size: calc(var(--edge-size) * .35);
  --gutter-d-size: calc(var(--edge-size) / 2);
  float: left;
  height: var(--diagonal-s-size);
  margin-bottom: var(--gutter-size);
  margin-left: calc(var(--gutter-ratio) * var(--edge-size) / 2);
  margin-right: calc(var(--gutter-ratio) * var(--edge-size) / 2);
  position: relative;
  width: var(--edge-size);
  /* skin */
  --fill-color: var(--danger-text-color);
  --glow-color: rgba(var(--danger-glow-rgb), .5);
  background: var(--fill-color);
  box-shadow:
    0 0 var(--gutter-d-size) var(--glow-color),
    0 0 calc(var(--gutter-d-size) / 2) var(--glow-color);
}
.hex::before, .hex::after { content: ''; display: block; position: absolute; }
.hex:nth-child(odd) {
  top: calc((var(--diagonal-s-size) + var(--gutter-size)) / 2);
}

.-border-method .hex {
  --tip-height: var(--diagonal-s-size);
  --tip-width: calc(var(--edge-size) * 2);
}
.-border-method .hex::before, .-border-method .hex::after {
  border-color: transparent var(--fill-color);
  border-style: solid;
  border-width: calc(var(--tip-height) / 2) var(--tip-width);
}
.-border-method .hex::before { border-left: 0; left: calc(-1 * var(--tip-width)); }
.-border-method .hex::after { border-right: 0; right: calc(-1 * var(--tip-width)); }

.-rotate-method .hex::before, .-rotate-method .hex::after {
  background: var(--fill-color);
  box-shadow: inherit;
  height: var(--diagonal-s-size);
  width: var(--edge-size);
}
.-rotate-method .hex::before { transform: rotate(60deg); }
.-rotate-method .hex::after { transform: rotate(-60deg); }
```
