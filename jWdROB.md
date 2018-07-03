# [Heart](https://codepen.io/hlfcoding/details/jWdROB)

> Happy Valentine's Day

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="apple-touch-icon" href="//assets.pengxwang.com/codepen-resources/app-icons/heart.png">
<link rel="modulepreload" href="//assets.pengxwang.com/codepen-resources/common-helpers/main.mjs">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
<script src="//assets.pengxwang.com/codepen-resources/unsupported.js"></script>
```

```html
<div class="background --light"></div>
<div class="background --dark"></div>
<div class="proximity"></div>
<div class="heart -graphic">
  <div class="glow -layer"></div>
  <div class="glow -layer --excited"></div>
  <div class="shape -layer"></div>
</div>
```

```css
:root {
  --heart-angle: 45deg;
  --heart-fill: #c03;
  --heart-size: 100px; /* scale() causes blurry artifacts */
  --glow-fill: rgba(204,0,51, .5);
  --glow-size: calc(var(--heart-size) * .8);
  --glow-size-fix: calc(var(--heart-size) / 5);
  --beat-contracted: translate(-50%,-50%) rotate(calc(var(--heart-angle)));
  --beat-less-expanded: translate(-50%,-50%) scale(1.1) rotate(calc(var(--heart-angle)));
  --beat-more-expanded: translate(-50%,-50%) scale(1.15) rotate(calc(var(--heart-angle)));
  --beat-resting-duration: 1s; /* 60bpm */
  --beat-excited-duration: .66s; /* 90bpm */
  --beat-omfg-duration: .27s; /* 220bpm */
}

@keyframes heart-beat {
  10% { transform: var(--beat-contracted); }
  40% { transform: var(--beat-more-expanded); }
  50% { transform: var(--beat-contracted); }
  60% { transform: var(--beat-less-expanded); }
  90% { transform: var(--beat-contracted); }
}

.proximity,
.heart .-layer::before,
.heart .-layer::after,
.heart .-layer,
.heart {
  height: var(--heart-size);
  position: absolute;
  width: var(--heart-size);
}

.proximity,
.heart {
  left: 50%;
  top: 50%;
}

.heart {
  animation: heart-beat var(--beat-resting-duration) ease-in-out infinite both;
  transform: var(--beat-contracted);
  /* will-change: transform; */
}

.heart .-layer::before,
.heart .-layer::after {
  border-radius: calc(var(--heart-size) / 2);
  content: '';
  display: block;
}
.heart .-layer::before { top: -50%; }
.heart .-layer::after { left: -50%; }

.heart .shape.-layer::before,
.heart .shape.-layer::after,
.heart .shape.-layer {
  background: var(--heart-fill);
  transition: background .3s ease-out;
}

.heart .glow {
  box-shadow: 0 0 var(--glow-size) var(--glow-fill);
  opacity: 1;
  transition: opacity .3s ease-out;
  /* will-change: opacity; */
}
.heart .glow::before,
.heart .glow::after {
  box-shadow: 0 0 var(--glow-size) var(--glow-size-fix) var(--glow-fill);
}
.heart .glow.--excited {
  --glow-fill: rgba(204,0,51, .7);
  --glow-size: calc(var(--heart-size) * 1.6);
  opacity: 0;
}

.proximity {
  padding: calc(var(--heart-size) * .7);
  transform: translate(-50%,-50%);
}

.heart:hover {
  --heart-fill: #f36;
  animation-duration: var(--beat-excited-duration);
  cursor: pointer;
}
.proximity:hover + .heart .glow,
.heart:hover .glow { opacity: 0; }
.proximity:hover + .heart .glow.--excited,
.heart:hover .glow.--excited { opacity: 1; }

.heart:active {
  --heart-fill: #ffccd9;
  animation-duration: var(--beat-omfg-duration);
  cursor: wait;
  transition: none; /* not perfect */
}
.heart:active .glow.--excited {
  --glow-fill: rgba(255,204,217, .5);
}

.background {
  height: 100%;
  position: absolute;
  width: 100%;
}
.background.--light {
  background: #223;
  box-shadow: inset 0 0 15vw var(--shade-5);
}
.background.--dark {
  background: #0e0e14;
  opacity: 0;
  /*
  relative scaling isn't accurate
  transform: scale(100); 1%
  body { overflow: hidden; }
  */
  transition: opacity .2s ease-in-out;
  /* will-change: opacity; */
}
body:active .background.--dark { opacity: 1; }
```

```js
import { fixActiveStateForTouch } from '//assets.pengxwang.com/codepen-resources/common-helpers/main.mjs';
fixActiveStateForTouch(document.querySelector('.heart'));
```
