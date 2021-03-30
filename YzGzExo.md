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
 v: vertex
 */
let ctx

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

const drawCube = ({
  size, x, y,
  fill = { left: '#e66', right: '#d55', top: '#f99' },
  stroke = { outline: '#933', side: '#f99', top: '#fcc' },
}) => {
  const v0 = { x: x + 0.5, y: y + 0.5 }
  const aV = [30, 90, 150, 210, 270, 330]
    .map(deg => deg * Math.PI/180)
    .map(rad => ({
      x: Math.round(Math.cos(rad) * size) + x + 0.5,
      y: -Math.sin(rad) * size + y + 0.5,
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
  size: 20, x: pad.width / 2, y: pad.height / 2,
  fill: { left: '#29d', right: '#17a', top: '#4be' },
  stroke: { outline: '#048', side: '#4be', top: '#adf' },
})

// ---

const screen = document.getElementById('screen')
```
