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
const count = 10;
const min = 50;

let svg = document.querySelector('svg');
let main = svg.querySelector('circle');

let height = svg.getAttribute('height');
let width = svg.getAttribute('width');
console.assert(height === width);

main.setAttribute('cx', width / 2);
main.setAttribute('cy', height / 2);
main.setAttribute('r', width / 2);

let fragment = document.createDocumentFragment();
function createSub(_, index, range) {
  let sub = main.cloneNode(true);
  let mid = range.length / 2;
  let n = index + 1;
  let step = (width - min) / range.length;
  sub.setAttribute('cx', main.getAttribute('cx') - step * (
    (n > mid) ? -(n - mid) : n // 1 2 3 4 -1 -2 -3 -4
  ));
  sub.setAttribute('r', main.getAttribute('r') - step * (
    (n > mid) ? (n - mid) : n // 1 2 3 4 1 2 3 4
  ));
  return sub;
}
let subs = Array.from(Array(count)).map(createSub)
  .forEach(sub => fragment.appendChild(sub));
svg.appendChild(fragment);
```
