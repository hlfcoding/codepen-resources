# [SVG Sketch #1](https://codepen.io/hlfcoding/details/OvqxNZ)

> [Brand New: New Logo and Identity for Ministry for Foreign Affairs of Finland by 358](https://underconsideration.com/brandnew/archives/new_logo_and_identity_for_ministry_for_foreign_affairs_of_finland_by_358.php)

```html
<svg xmlns="http://www.w3.org/2000/svg" class="card-skin centered"
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
}
```

```js
const count = 6; // Per side.
const minR = 6;

let svg = document.querySelector('svg');
let main = svg.querySelector('circle');

let height = svg.getAttribute('height');
let width = svg.getAttribute('width');
console.assert(height === width);

main.setAttribute('cx', width / 2);
main.setAttribute('cy', height / 2);
main.setAttribute('r', width / 2);

let animations = [];
let fragment = document.createDocumentFragment();
let offset = (width / 2 - minR) / count;
function createSub(step, dir) {
  let sub = main.cloneNode(true);
  function cx(shift = 0) { return Math.round(main.getAttribute('cx') - offset * (step + shift) * dir); }
  function r(shift = 0) { return Math.round(main.getAttribute('r') - offset * (step + shift)); }
  sub.setAttribute('cx', cx());
  sub.setAttribute('r', r());
  if (typeof sub.animate === 'function') {
    let keys = [{ cx: cx(), r: r() }, { cx: cx(-1), r: r(-1) }];
    if (step === 1) {
      keys[0].fillOpacity = parseFloat(getComputedStyle(main).fillOpacity);
      keys[1].fillOpacity = 0;
    }
    let a = sub.animate(keys, { duration: 3000, id: `${step}:${dir}`, iterations: Infinity });
    sub.setAttribute('data-animation-id', a.id);
    animations.push(a);
  }
  return sub;
}
let steps = Array.from(Array(count)).map((_, i) => i + 1);
let pairs = steps.map(s => [createSub(s, -1), createSub(s, 1)]);
pairs.forEach(p => p.forEach(sub => fragment.appendChild(sub)));
svg.insertBefore(fragment, main);
main.addEventListener('click', _ => {
  animations.forEach(a => {
    if (a.playState === 'paused') { a.play(); }
    else { a.pause(); }
  });
});
```
