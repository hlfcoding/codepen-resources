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
<!-- <div class="board static"> -->
<div class="board">
  <div class="piece">
    <div class="label">Psychographic Display</div>
  </div>
  <div class="piece">
    <div class="label danger">Approaching Limits</div>
    <div class="separator"></div>
    <div class="label danger short">Danger</div>
  </div>
  <div class="piece">
    <div id="internal" class="label">
      <div class="sub-label characters">内部</div>
      <div class="sub-label">Internal</div>
    </div>
  </div>
  <div class="piece via-rotate">
    <div class="hex-row"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
    <div class="hex-row"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
    <div class="hex-row"><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div><div class="hex"></div></div>
  </div>
  <!-- alternate implementation -->
  <!-- <div class="hex-grid">
    <div class="row"><span>&#x2B22;</span><span>&#x2B22;</span><span>&#x2B22;</span></div>
    <div class="row"><span>&#x2B22;</span><span>&#x2B22;</span><span>&#x2B22;</span></div>
    <div class="row"><span>&#x2B22;</span><span>&#x2B22;</span><span>&#x2B22;</span></div>
  </div> -->
</div>
```

```scss
// //codepen.io/hlfcoding/pen/QbmaBV

// using %clearfix
// using blink
// using shade

// `font-stretch` isn't well supported, so instead of using a condensed font variant, load a condensed font.
@import url(//fonts.googleapis.com/css?family=Roboto+Condensed:400,600,700);

$bg-color: #000;
$text-color: #fa0;
$glow-color: #f60;
$danger-fill-color: #f23;
$danger-text-color: #f30;
$danger-glow-color: #f00;

$gutter-size: 8px;

@function border-glow($color: $glow-color) {
  $color: transparentize($color, .3);
  $shadows: (
    inset 0 0 0 1px $color,
    0 0 0 1px $color
  );
  @return $shadows;
}

@function text-glow($color: $glow-color) {
  $color: transparentize($color, .5);
  $shadows: (
    -1px 1px 0 $color,
    1px -1px 0 $color,
    -1px -1px 0 $color,
    1px 1px 0 $color
  );
  @return $shadows;
}

@function text-bloom-glow($radius, $color: $glow-color) {
  $color: transparentize($color, .5);
  $shadows: (
    0 0 $radius $color,
    0 0 ($radius / 2) $color
  );
  @return $shadows;
}

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

@mixin stripes($size: 15px, $direction: -45deg, $glow-size: 3px,
               $color: $danger-fill-color, $glow-color: $danger-glow-color)
{
  $glow-color: transparentize($glow-color, .8);
  background-image: repeating-linear-gradient(
    $direction,
    $glow-color (- $glow-size), // glow boundary
    $color 0, // fade into foreground
    $color ($size - $glow-size / 2), // fade from foreground
    $glow-color ($size + $glow-size / 2), // glow boundary
    transparent ($size + $glow-size / 2), // fade to background
    transparent (2 * $size), // fade from background
    $glow-color (2 * $size - $glow-size) // glow boundary
  );
  box-shadow: inset 0 0 1px ($glow-size / 2) shade(.3);
}

html {
  cursor: none;
}

body {
  background: $bg-color;
}

.board {
  @extend %clearfix;
  padding: { top: 1rem; left: 1rem; }
  .piece {
    float: left;
    margin: { bottom: 1rem; right: 1rem; }
  }
}

// attributes

%bordered {
  border: {
    radius: $gutter-size;
    style: solid;
    width: 3px;
  }
  box-shadow: border-glow();
  &.danger {
    box-shadow: border-glow($color: $danger-glow-color);
  }
}

%has-stripes {
  position: relative;
  &::after {
    @include blink;
    @include stripes;
    border-radius: 2px;
    content: '';
    position: absolute;
    right: 2px; top: 2px; bottom: 2px;
  }
}

// modifiers

.danger {
  @include blink;
}

// components

.label {
  @extend %bordered;
  display: inline-block;
  font: {
    family: 'Roboto Condensed';
    size: 32px;
    weight: 400;
  }
  letter-spacing: -1px;
  line-height: 1;
  padding: 1px ($gutter-size - 3px);
  text: {
    transform: uppercase;
  }
  user-select: none;
  white-space: no-wrap;
  &.short {
    font-size: 40px;
  }
  & + .separator {
    height: $gutter-size;
  }
  // skin
  color: $text-color;
  text-shadow: text-glow();
  &.danger {
    color: $danger-text-color;
    text-shadow: text-glow($color: $danger-glow-color);
  }
  // children
  .sub-label {
    text-align: center;
    &.characters {
      font-weight: 600;
      margin: { top: 6px; }
    }
  }

  &#internal {
    .characters.sub-label {
      font-size: 64px;
    }
    @extend %has-stripes;
    $stripes-width: 50px;
    padding-right: $stripes-width + $gutter-size;
    &::after {
      width: $stripes-width;
    }
  }
}


// alternate implementation
/*
.hex-grid {
  $size: 64px;
  // layout
  $inline-spacing: round(.05 * $size);
  font-size: $size;
  line-height: .8;
  padding: $size / 2;
  transform: rotate(30deg);
  .row {
    &:nth-child(even) {
      margin-left: $size / 2 - $inline-spacing;
    }
  }
  // skin
  color: $danger-text-color;
  text-shadow: append(
    text-glow($color: $danger-glow-color),
    text-bloom-glow($radius: $size, $color: $danger-glow-color)
  );
  // animation
  .row {
    > span { @include tandem-blink; }
    &:nth-child(even) > span { @include tandem-blink-even; }
  }
}
*/

.hex {
  $fill: $danger-text-color;
  $ratio: 1.732;
  $edge: 20px;
  $gutter-ratio: .866;

  $diagonal: $edge * 2;
  $diagonal-s: round($edge * $ratio); // diagonal
  $gutter: round($edge / 3);
  $gutter-d: round($edge / 2);
  $glow: text-bloom-glow($radius: $gutter-d, $color: $danger-glow-color);

  background: $fill;
  box-shadow: $glow;
  float: left;
  height: $diagonal-s;
  margin: {
    bottom: round($gutter);
    left: round($gutter-ratio * $edge / 2);
    right: round($gutter-ratio * $edge / 2);
  }
  position: relative;
  width: $edge;

  &::before, &::after { content: ''; display: block; position: absolute; }

  &:nth-child(odd) {
    top: ($diagonal-s + $gutter) / 2;
  }

  .via-border & {
    $tip-width: $edge / 2;
    $tip-height: $diagonal-s;
    &::before, &::after {
      border: { color: transparent $fill; style: solid; }
      border-width: ceil($tip-height / 2) $tip-width;
    }
    &::before { border-left: 0; left: -$tip-width; }
    &::after { border-right: 0; right: -$tip-width; }
  }

  .via-rotate & {
    &::before, &::after {
      background: $fill;
      box-shadow: $glow;
      height: $diagonal-s;
      width: $edge;
    }
    &::before { transform: rotate(60deg); }
    &::after { transform: rotate(-60deg); }
  }
}

.hex-row {
  @extend %clearfix;

  > .hex { @include tandem-blink; }
  &:nth-child(even) > .hex { @include tandem-blink-even; }
}
```
