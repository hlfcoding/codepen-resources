# [Heart](https://codepen.io/hlfcoding/details/jWdROB)

> Happy Valentine's Day

```html
<div class="background-light"></div>
<div class="background-dark"></div>
<div class="heart">
  <div class="resting-glow"></div>
  <div class="excited-glow"></div>
  <div class="shape"></div>
</div>
```

```scss
$background-fill: #223;
.background-light {
  background: $background-fill;
  box-shadow: inset 0 0 15vw rgba(darken($background-fill, 20%), .5);
  position: absolute; width: 100%; height: 100%;
}
.background-dark {
  background: darken($background-fill, 10%);
  position: absolute; width: 100%; height: 100%;
  // relative scaling isn't accurate
  // transform: scale(100); // 1%, body { overflow: hidden; }

  opacity: 0;
  transition: opacity .2s ease-in-out;
  // will-change: opacity;
  body:active & { opacity: 1; }
}

$heart-fill: #c03;
$heart-size: 100px; // scale() causes blurry artifacts
%heart-layer {
  position: absolute; width: $heart-size; height: $heart-size;
  &::before, &::after {
    content: ''; display: block;
    position: absolute; width: $heart-size; height: $heart-size;
    border-radius: $heart-size / 2;
  }
  &::before { top: -50%; }
  &::after { left: -50%; }
}
@mixin heart-layer-glow($size, $color) {
  $size-fix: $heart-size / 5;
  box-shadow: 0 0 $size $color;
  &::before, &::after { box-shadow: 0 0 $size $size-fix $color; }
  transition: opacity .3s ease-in-out;
  // will-change: opacity;
}
.heart {
  @extend %ch-graphic;

  .shape {
    @extend %heart-layer;
    background: $heart-fill;
    &::before, &::after { background: $heart-fill; }
  }
  .resting-glow {
    @extend %heart-layer;
    @include heart-layer-glow(
      $size: $heart-size * .8, $color: rgba($heart-fill, .4)
    );
    opacity: 1;
  }
  .excited-glow {
    @extend %heart-layer;
    @include heart-layer-glow(
      $size: $heart-size * 1.6, $color: rgba($heart-fill, .7)
    );
    opacity: 0;
  }
  &:hover {
    .resting-glow { opacity: 0; }
    .excited-glow { opacity: 1; }
  }
  &:active {
    $fill: lighten($heart-fill, 50%);
    transition: none; // not perfect
    .shape {
      background: $fill;
      &::before, &::after { background: $fill; }
    }
    .excited-glow {
      @include heart-layer-glow(
        $size: $heart-size * 1.6, $color: rgba($fill, .5)
      );
    }
  }

  $size: $heart-size;
  position: absolute; top: 50%; left: 50%;
  width: $size; height: $size;

  $angle: 45deg;
  $offset: (-50%, -50%);
  transform: translate($offset) rotate($angle);
  // will-change: transform;
  $contracted: translate($offset) rotate($angle);
  $less-expanded: translate($offset) scale(1.1) rotate($angle);
  $more-expanded: translate($offset) scale(1.15) rotate($angle);
  $resting-duration: 1s; // 60bpm
  $excited-duration: .66s; // 90bpm
  $omfg-duration: .27s; // 220bpm
  @keyframes beat {
    10% { transform: $contracted; }
    40% { transform: $more-expanded; }
    50% { transform: $contracted; }
    60% { transform: $less-expanded; }
    90% { transform: $contracted; }
  }
  animation: beat $resting-duration ease-in-out infinite both;
  &:hover { animation-duration: $excited-duration; }
  &:active { animation-duration: $omfg-duration; }

  &:hover { cursor: pointer; }
  &:active { cursor: wait; }
}
```

```css
```

```js
const { fixActiveStateForTouch } = window.commonHelpers;
fixActiveStateForTouch(document.querySelector('.heart'));
```
