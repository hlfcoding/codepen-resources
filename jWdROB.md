# [Heart](https://codepen.io/hlfcoding/details/jWdROB)

> Happy Valentine's Day

```html
<div class="background --light"></div>
<div class="background --dark"></div>
<div class="heart -graphic">
  <div class="glow -layer"></div>
  <div class="glow -layer --excited"></div>
  <div class="shape -layer"></div>
</div>
```

```css
.heart {
  --heart-angle: 45deg;
  --heart-fill: #c03;
  --heart-size: 100px; /* scale() causes blurry artifacts */
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

.heart .-layer::before,
.heart .-layer::after,
.heart .-layer,
.heart {
  height: var(--heart-size);
  position: absolute;
  width: var(--heart-size);
}

.heart {
  animation: heart-beat var(--beat-resting-duration) ease-in-out infinite both;
  left: 50%;
  top: 50%;
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
}

.heart .glow {
  --glow-fill: rgba(204,0,51, .4);
  --glow-size: calc(var(--heart-size) * .8);
  --glow-size-fix: calc(var(--heart-size) / 5);
  box-shadow: 0 0 var(--glow-size) var(--glow-fill);
  opacity: 1;
  transition: opacity .3s ease-in-out;
  /* will-change: opacity; */
}
.heart .glow::before,
.heart .glow::after {
  box-shadow: 0 0 var(--glow-size) var(--glow-size-fix) var(--glow-fill);
}
.heart .glow.--excited {
  --glow-fill: rgba(204,0,51, .7);
  --glow-size: calc(var(--heart-size) * .1.6);
  opacity: 0;
}

.heart:hover {
  animation-duration: var(--beat-excited-duration);
  cursor: pointer;
}
.heart:hover .glow { opacity: 0; }
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
const { fixActiveStateForTouch } = window.commonHelpers;
fixActiveStateForTouch(document.querySelector('.heart'));
```
