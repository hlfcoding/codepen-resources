# [Pixelated](https://codepen.io/hlfcoding/details/YzGzExo)

> TODO

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
```

```html
<canvas id="pad" width="100" height="100" class="-card-skin -centered"></canvas>
<canvas id="screen" width="300" height="300"></canvas>
```

```css
body {
  background: var(--shade-2);
}

canvas {
  image-rendering: pixelated;
}

#screen {
  display: none;
}
```

```js
/*
 https://en.wikipedia.org/wiki/Isometric_projection#/media/File:3D_shapes_in_isometric_projection.svg
 v: vertex
 */

// const stage = document.getElementById('pad')
const stage = document.getElementById('screen')

const ctx = stage.getContext('2d')

const drawLine = (aV, { stroke }) => {
  ctx.strokeStyle = stroke
  ctx.beginPath()
  ctx.moveTo(aV[0].x, aV[0].y)
  aV.slice(1).forEach(v => ctx.lineTo(v.x, v.y))
  ctx.closePath()
  ctx.stroke()
}

const drawPlane = (aV, { fill }) => {
  ctx.fillStyle = fill
  ctx.beginPath()
  ctx.moveTo(aV[0].x, aV[0].y)
  aV.slice(1).forEach(v => ctx.lineTo(v.x, v.y))
  ctx.closePath()
  ctx.fill()
}

let nextCube = {
  x: stage.width / 2,
  y: stage.height,
}
const cubeBlue = {
  fill: { left: '#29d', right: '#17a', top: '#4be' },
  stroke: { outline: '#048', side: '#4be', top: '#adf' },
}
const cubeRed = {
  fill: { left: '#e66', right: '#d55', top: '#f99' },
  stroke: { outline: '#933', side: '#f99', top: '#fcc' },
}
const cubeSize = 20
const drawCube = ({
  size = cubeSize, fX = () => (nextCube.x), fY = () => (nextCube.y),
  fill = cubeBlue.fill,
  stroke = cubeBlue.stroke,
} = {}) => {
  const v0 = { x: fX() + 0.5, y: fY() + 0.5 }
  const aV = [30, 90, 150, 210, 270, 330]
    .map(deg => deg * Math.PI/180)
    .map(rad => ({
      x: Math.round(Math.cos(rad) * size) + fX() + 0.5,
      y: -Math.sin(rad) * size + fY() + 0.5,
    }))
  // console.log(aV)
  drawPlane([v0].concat(aV.slice(0, 3)), { fill: fill.top })
  drawPlane([v0].concat(aV.slice(2, 5)), { fill: fill.left })
  drawPlane([v0].concat(aV.slice(4)).concat([aV[0]]), { fill: fill.right })
  drawLine([v0].concat(aV[0]), { stroke: stroke.top })
  drawLine([v0].concat(aV[2]), { stroke: stroke.top })
  drawLine([v0].concat(aV[4]), { stroke: stroke.side })
  drawLine(aV, { stroke: stroke.outline })
}

// ---

const pad = document.getElementById('pad')
ctx = pad.getContext('2d')

drawCube({
})

// ---

const screen = document.getElementById('screen')
```
