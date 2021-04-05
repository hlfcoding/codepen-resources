# [Pixelated](https://codepen.io/hlfcoding/details/YzGzExo)

> TODO

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
```

```html
<canvas id="pad" width="100" height="100" class="-card-skin -centered"></canvas>
<canvas id="screen" width="600" height="200" class="-card-skin -centered"></canvas>
```

```css
body {
  background: var(--shade-2);
}

canvas {
  image-rendering: pixelated;
}
canvas.-card-skin {
  /* border-radius: 0; */
  padding: 0;
}

#pad {
/* #screen { */
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

const drawHaze = ({ w = stage.width, h = stage.height } = {}) => {
  ctx.fillStyle = 'rgba(40,40,40,0.01)'
  ctx.fillRect(0, 0, w, h)
}

const moveOne = (dir) => {
  console.log(dir)
  const rad = Math.PI / 6 // 30 deg
  const offset = {
    x: Math.round(cubeSize * Math.cos(rad)) + 1,
    y: Math.round(cubeSize * Math.sin(rad)) + 1,
  }
  switch (dir) {
    case 'left':
      nextCube.x -= offset.x
      nextCube.y += offset.y
      break
    case 'right':
      nextCube.x += offset.x
      nextCube.y += offset.y
      break
    case 'up':
      nextCube.y -= cubeSize + 1
      break
  }
}

let prevMove = {}
const moveNext = ({ inertia = 3 } = {}) => {
  const rollDie = (sides) => (
    Math.ceil(Math.random() * sides)
  )
  let dir, noDir
  const prevCube = nextCube
  if (prevCube.y >= stage.height) {
    dir = 'up'
  } else if (prevCube.y <= 0) {
    noDir = 'up'
  } else if (prevCube.x >= stage.width) {
    dir = 'left'
  } else if (prevCube.x <= 0) {
    dir = 'right'
  } else if (prevMove?.inertia && prevMove.inertia--) {
    dir = prevMove.dir
  }
  if (dir === undefined) { // Change direction.
    let roll
    if (prevMove.dir) {
      noDir = prevMove.dir
    }
    switch (noDir) {
      case 'left':
        roll = rollDie(2) + 1; break
      case 'right':
        roll = rollDie(3)
        if (roll === 2) { roll = 1 }
        break
      case 'up':
        roll = rollDie(2); break
      default:
        roll = rollDie(3); break
    }
    switch (roll) {
      case 1:
        dir = 'left'
        drawHaze(); break
      case 2:
        dir = 'right'
        drawHaze(); break
      case 3:
        dir = 'up'; break
    }
  }
  if (dir != prevMove.dir) { // Add inertia.
    prevMove.dir = dir
    prevMove.inertia = rollDie(inertia)
  }
  moveOne(dir)
}

// ---

let moves = 500
const inertia = moves / 100
while (moves--) {
  moveNext({ inertia })
  drawCube()
}
```
