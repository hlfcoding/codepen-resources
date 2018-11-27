# [SVG Sketch #1](https://codepen.io/hlfcoding/details/OvqxNZ)

> [Brand New: New Logo and Identity for Ministry for Foreign Affairs of Finland by 358](https://underconsideration.com/brandnew/archives/new_logo_and_identity_for_ministry_for_foreign_affairs_of_finland_by_358.php)

```html
<svg xmlns="http://www.w3.org/2000/svg" class="-card-skin -centered"
     width="200" height="200">
  <circle />
</svg>
```

```css
body {
  background: var(--shade-2);
}
circle {
  fill: var(--prussian-blue-medium);
  fill-opacity: 0.3;
  mix-blend-mode: multiply;
  transition-duration: 1s;
  transition-property: fill-opacity, mix-blend-mode;
  transition-timing-function: linear;
}
circle:hover {
  fill-opacity: 0.5;
  mix-blend-mode: hard-light;
}
```

```js
const count = 6; // Per side.
const minR = 6;

let svgElement = document.querySelector('svg');
let mainElement = svgElement.querySelector('circle');

let height = svgElement.getAttribute('height');
let width = svgElement.getAttribute('width');
console.assert(height === width);

mainElement.setAttribute('cx', width / 2);
mainElement.setAttribute('cy', height / 2);
mainElement.setAttribute('r', width / 2);

let animations = [];
let fragment = document.createDocumentFragment();
let offset = (width / 2 - minR) / count;
function createSub(step, dir) {
  let subElement = mainElement.cloneNode(true);
  function cx(shift = 0) { return Math.round(mainElement.getAttribute('cx') - offset * (step + shift) * dir); }
  function r(shift = 0) { return Math.round(mainElement.getAttribute('r') - offset * (step + shift)); }
  subElement.setAttribute('cx', cx());
  subElement.setAttribute('r', r());
  if (typeof subElement.animate === 'function') {
    let keys = [{ cx: cx(), r: r() }, { cx: cx(-1), r: r(-1) }];
    if (step === 1) {
      keys[0].fillOpacity = parseFloat(window.getComputedStyle(mainElement).fillOpacity);
      keys[1].fillOpacity = 0;
    }
    let animation = subElement.animate(keys, { duration: 3000, id: `${step}:${dir}`, iterations: Infinity });
    subElement.setAttribute('data-animation-id', animation.id);
    animations.push(animation);
  }
  return subElement;
}
let steps = [...Array(count)].map((_, i) => i + 1);
let pairs = steps.map(s => [createSub(s, -1), createSub(s, 1)]);
pairs.forEach(p => p.forEach(subElement => fragment.appendChild(subElement)));
svgElement.insertBefore(fragment, mainElement);
mainElement.addEventListener('click', _ => {
  animations.forEach(animation => {
    if (animation.playState === 'paused') { animation.play(); }
    else { animation.pause(); }
  });
});
```
