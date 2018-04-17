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
const count = 5;
const minR = 25;

let svg = document.querySelector('svg');
let main = svg.querySelector('circle');

let height = svg.getAttribute('height');
let width = svg.getAttribute('width');
console.assert(height === width);

main.setAttribute('cx', width / 2);
main.setAttribute('cy', height / 2);
main.setAttribute('r', width / 2);

let fragment = document.createDocumentFragment();
let step = (width / 2 - minR) / count;
function createSub(n, dir) {
  let sub = main.cloneNode(true);
  sub.setAttribute('cx', main.getAttribute('cx') - step * n * dir);
  sub.setAttribute('r', main.getAttribute('r') - step * n);
  return sub;
}
let steps = Array.from(Array(count)).map((_, i) => i + 1);
let pairs = steps.map(n => [createSub(n, -1), createSub(n, 1)]);
pairs.forEach(p => p.forEach(sub => fragment.appendChild(sub)));
svg.appendChild(fragment);
```
