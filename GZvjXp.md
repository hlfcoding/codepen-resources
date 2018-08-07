# [Device #1](https://codepen.io/hlfcoding/details/GZvjXp)

> An old sketch from 2013, updated for 2016.
>
> A contrived device with command line, basic drawing, physical buttons, and lots of shadows.

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="apple-touch-icon" href="//assets.pengxwang.com/codepen-resources/app-icons/device-1.png">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
<script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
```

```html
<!-- using: -bar-layout -blink -centered -input-style-none -invisible -->
<div class="container">

<div class="device -centered -input-style-none">
  <div class="body -panel-skin">
    <div class="main-screen -display-skin">
      <div class="tint"></div>
      <div class="scanlines"></div>
      <div class="body">
        <div class="cli" data-module="cli"></div>
        <svg class="canvas" data-module="canvas">
          <g class="power-button">
            <circle class="ring"></circle>
            <circle class="dot"></circle>
          </g>
        </svg>
      </div>
    </div><!--/main-screen-->
    <div class="buttons-panel -slide-panel" data-module="slide-panel">
      <div class="cover"><div class="symbol">&middot;</div></div>
      <nav class="inside -bar-layout">
        <button class="-button-skin" name="A" type="button">A</button>
        <button class="-button-skin" name="B" type="button">B</button>
        <button class="-button-skin" name="C" type="button">C</button>
        <button class="-button-skin" name="D" type="button">D</button>
      </nav>
    </div><!--/buttons-panel-->
  </div><!--/body-->
</div><!--/device-->

</div><!--/container-->
```

```css
.device {
  --bezel: 15px;
  --corner: var(--bezel);
  --corner-inner: 7px;
  --device-height: 300px;
  --device-width: 300px;
  --display-height: 190px;
  --display-width: calc(var(--device-width) - 2 * var(--bezel));
  --display-size: 330px; /* hypotenuse */
}

.-panel-skin {
  --panel-base: #bbb;
  --panel-dark: #6f6f6f;
  --panel-darker: #3c3c3c;
  --panel-depth: 2px;
  --panel-drop-diffuse: 10px;
  --panel-texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAD0lEQVQYV2NgYGAwZgABAAE8ADSqC3qCAAAAAElFTkSuQmCC';
  /* front to back */
  --panel-shadows:
    inset 0 0 var(--bezel) var(--shade-3), /* contour */
    inset 0 0 2px var(--shade-3), /* inner edges */
    inset 0 0 1px 1px var(--shade-1),
    0 1px 0 var(--panel-darker), /* edge */
    0 calc(var(--panel-depth) + 1px) 0 var(--panel-dark), /* edge */
    0 calc(var(--panel-depth) + 2px) 0 var(--panel-darker); /* edge shadow */
  background-color: var(--panel-base);
  background-image:
    linear-gradient(var(--light-5), transparent var(--display-height)),
    url('var(--panel-texture)');
  border-radius: var(--corner);
}

.-panel-skin .-button-skin {
  background-color: var(--panel-base);
  background-image: linear-gradient(var(--light-5), transparent);
  border: 0;
  border-radius: var(--corner-inner);
  /* front to back */
  box-shadow:
    inset 0 0 0 1px var(--light-3), /* inner edge */
    inset 0 0 var(--corner) var(--shade-2), /* contour */
    0 var(--panel-depth) 0 var(--panel-dark), /* edge */
    0 calc(var(--panel-depth) + 1px) 0 var(--panel-darker), /* edge shadow */
    0 var(--panel-depth) 3px 1px var(--shade-5); /* diffuse */
  color: #666;
  cursor: pointer;
  font-weight: bold;
  outline: none;
  text-shadow: (
    0 -1px 0 var(--shade-3),
    0 1px 0 var(--light-5)
  );
  transition: color .2s ease-in-out;
}
.-panel-skin .-button-skin.hover,
.-panel-skin .-button-skin:hover {
  background-image: linear-gradient(var(--light-9), transparent);
  color: #08f;
}
.-panel-skin .-button-skin.active,
.-panel-skin .-button-skin:active {
  background-color: #a2a2a2;
  background-image: linear-gradient(var(--light-5), transparent);
  /* front to back */
  box-shadow:
    inset 0 0 1px 1px var(--shade-2), /* shadow */
    inset 0 2px 3px 1px var(--shade-2), /* shadow */
    inset 0 0 var(--corner) var(--shade-2), /* contour */
    0 calc(var(--panel-depth) * -1) 0 var(--shade-4), /* socket edge */
    0 0 0 1px var(--shade-1); /* socket edge */
  margin-bottom: calc(var(--panel-depth) * -1);
  margin-top: calc(var(--panel-depth) - 1px);
}

.-panel-skin .-slide-panel {
  border-bottom: 1px solid var(--light-5);
  border-top: 1px solid var(--shade-2);
  cursor: pointer;
}
.-panel-skin .-slide-panel .cover {
  background: var(--panel-base) url('var(--panel-texture)') repeat;
  border-bottom: 1px solid var(--shade-2);
  border-top: 1px solid var(--light-5);
  padding-top: 1px;
}
.-panel-skin .-slide-panel .cover.--open  {
  box-shadow:
    0 0 2px var(--shade-5),
    0 0 calc(var(--panel-drop-diffuse) * 1.5) var(--shade-8),
    0 0 0 var(--shade-2);
}
.-panel-skin .-slide-panel .cover .symbol {
  box-shadow: /* TODO: refactor */
    inset 0 0 var(--bezel) var(--shade-3), /* contour */
    inset 0 0 2px var(--shade-3), /* inner edges */
    inset 0 0 1px 1px var(--shade-1);
  color: #aaa;
  font: bold 56px Helvetica, sans-serif;
  text-align: center;
  text-shadow:
    0 -1px 0 var(--shade-3),
    0 1px 0 var(--light-5);
}
.-panel-skin .-slide-panel .inside {
  background-color: #777;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAGklEQVQIW2NkQAKMMPb///+N4RygoA8yhwEAYOgDgYLmjHMAAAAASUVORK5CYII=');
  border-color: var(--shade-5) var(--shade-4) var(--light-8);
  border-style: solid;
  border-width: 2px 1px 1px;
  /* front to back */
  box-shadow:
    inset 0 1px var(--bezel) var(--shade-5), /* diffuse */
    inset 0 var(--panel-depth) 0 #6a6a6a, /* inner edge */
    inset 0 calc(var(--panel-depth) + 1px) 0 #515151; /* edge shadow */
}

.-panel-skin .-slide-panel .cover {
  transition-property: box-shadow, transform;
  transition-duration: .4s;
  will-change: box-shadow, transform;
}
.-panel-skin .-slide-panel .cover.--closed {
  transform: translateX(0);
  transition-timing-function: cubic-bezier(.9,0, .1,1);
}
.-panel-skin .-slide-panel .cover.--open {
  --hinge-size: calc(var(--bezel) / 3);
  transform: translateX(calc(var(--hinge-size) - var(--device-width)));
  transition-timing-function: cubic-bezier(.8,0, .2,1.1);
}

.-display-skin {
  background-color: #111;
  background-image: linear-gradient(var(--light-2), transparent);
  border-color: transparent;
  border-radius: var(--corner-inner);
  border-style: solid;
  border-width: 2px 1px 0; /* edges */
  /* front to back */
  box-shadow:
    inset 0 0 15px var(--shade-5), /* shadow */
    inset 0 0 100px var(--shade-5), /* diffuse */
    0 0 2px var(--light-8), /* edge */
    0 0 var(--corner-inner) 1px var(--light-8); /* highlight */
}
.-display-skin>.scanlines {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAD0lEQVQYV2NgYGAwZgABAAE8ADSqC3qCAAAAAElFTkSuQmCC');
  border-radius: calc(var(--corner-inner) - 1px);
  margin: 1px;
}

.-display-skin>.body {
  --color: #0f0;
  color: var(--color);
  font: 15px/1.7 'Menlo', 'Consolas', monospace;
  padding: var(--bezel);
  text-shadow: 0 -1px 0 var(--shade-9);
}
.-display-skin .power-button .dot {
  fill: var(--color);
}
.-display-skin .power-button .ring {
  fill: none;
  stroke: var(--color);
}
.-display-skin .shape {
  fill: none;
  stroke: var(--color);
  strokeWeight: 2;
}
.-display-skin .cursor {
  --blink-duration: 1s;
}

.-display-skin>.tint {
  --falloff-height: calc(var(--display-height) * .75);
  --falloff-width: calc(var(--display-width) * .25);
  background-image: linear-gradient(
    145deg, /* diagonal gradient */
    #fff calc(var(--device-width) / 2), /* midpoint before blur */
    var(--light-5) calc(var(--device-width) / 2 + 4px), /* midpoint */
    transparent var(--display-size));
  border-radius: calc(var(--corner-inner) - 1px);
  box-shadow:
    inset 0 0 2px var(--shade-8),
    inset var(--falloff-width) calc(var(--falloff-height) * -1) var(--falloff-height) var(--shade-8);
  opacity: .3;
  transition: opacity .3s ease-in-out;
}
.-display-skin.hover>.tint,
.-display-skin:hover>.tint {
  opacity: 0;
}

body {
  background: #eee url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAPElEQVQYV2OcNWuWDyMj4/P///9LpqWlbWGcOXOmJAMUpKenP2ecPXu28b9//54xMTFJpaamnmWEycJoAFZbFAVaNOxjAAAAAElFTkSuQmCC') repeat;
}
body>.container {
  background: linear-gradient(to bottom, var(--light-5), transparent, var(--shade-2));
  height: 100%;
  position: absolute;
  width: 100%;
}

/* Layout */

.device {
  height: var(--device-height);
  text-align: left;
  width: var(--device-width);
}
.device.-input-style-none ::selection {
  background: transparent;
}
.device>.body {
  padding: var(--bezel) 0;
}
.device .buttons-panel {
  --button-gutter: 11px;
  margin-bottom: var(--bezel);
  position: relative;
}
.device .buttons-panel .cover {
  --cover-height: 49px;
  height: var(--cover-height);
  line-height: var(--cover-height);
  left: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
}
.device .buttons-panel .cover .symbol {
  /* fills container */
  line-height: var(--cover-height);
  margin-top: calc(var(--panel-drop-diffuse) * -1);
  padding: var(--panel-drop-diffuse) 0;
}
.device .buttons-panel nav.inside {
  padding: calc(var(--button-gutter) - 1px) var(--bezel) calc(var(--button-gutter) + 1px);
}
.device .buttons-panel nav.inside.-bar-layout {
  --bar-layout-gutter: var(--button-gutter);
}
.device .buttons-panel nav.inside button {
  padding: 6px 10px 5px;
}
.device .main-screen {
  height: var(--display-height);
  margin: var(--bezel);
  margin-top: 0;
  position: relative;
}
.device .main-screen {
  line-height: 0;
  overflow: scroll;
}
.device .main-screen>.body {
  cursor: crosshair;
  padding: var(--bezel);
}
.device .main-screen>.body .cli input.-invisible {
  /* fixed so it doesn't scroll
     only positions correctly as last child,
     so focusing doesn't change scroll position */
  position: fixed;
}
.device .main-screen>.body .canvas {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.device .main-screen>.scanlines,
.device .main-screen>.tint {
  --edges: 2px;
  height: calc(var(--display-height) - var(--edges));
  /* fixed so it doesn't scroll
     only positions correctly as first child */
  position: fixed;
  width: calc(var(--display-width) - var(--edges));
}
html.no-touch .device .main-screen>.scanlines { z-index: 9; }
html.no-touch .device .main-screen>.tint { z-index: 10; }
html.no-touch .device .main-screen:hover>.body .canvas { z-index: 20; }

/* Intro */

.device>.body {
  --intro-duration: .6s;
  --panel-drop: 0 calc(var(--panel-depth) + 1px) var(--panel-drop-diffuse) var(--shade-8);
  --panel-drop-afloat: 0 calc(var(--panel-depth) + 10px) calc(var(--panel-drop-diffuse) + 10px) 2px var(--shade-4);
  box-shadow: var(--panel-shadows), var(--panel-drop-afloat);
  transform: translateY(-30%) scale(1.1);
  transition:
    box-shadow .2s ease-out .2s,
    transform var(--intro-duration) cubic-bezier(0, .9, .3, 1);
  will-change: box-shadow, transform;
}
.device.--ready>.body {
  box-shadow: var(--panel-shadows), var(--panel-drop);
  transform: translateY(0) scale(1);
}
.device .buttons-panel {
  opacity: 0;
  transition: opacity .2s ease-in-out var(--intro-duration);
}
.device.--ready .buttons-panel {
  opacity: 1;
}
```

```js
import {
  animateChars,
  createStateMachine,
  delay,
  delayed,
  delayedPromise,
  getComputedTransitionDurations,
  setupKeyboardHandling,
} from '//assets.pengxwang.com/codepen-resources/common-helpers/main.mjs';

const { isTouch } = Modernizr;

document.onreadystatechange = () => {
  if (document.readyState !== 'complete') { return; }
  let api = {};
  let rootElement = document.querySelector('.device');
  rootElement.classList.add('--ready');
  api.buttons = initButtons(rootElement);
  api.slidePanel = initSlidePanel(rootElement);
  delay(getComputedTransitionDurations(document.querySelector('.device > .body'))[1], () => {
    api.mainScreen = initMainScreen(rootElement);
  });
  window.deviceOne = api;
};

function createGameState({ states, canvas, cli, contextElement }) {
  const buttonShapes = {
    A: 'triangle',
    B: 'square',
    C: 'circle',
    D: 'semicircle',
  };
  let drawn = 0;
  function drawListener({ target: button }) {
    if (button.type !== 'button') { return; }
    if (!(button.name in buttonShapes)) { return; }
    if (drawn >= 10) { return states.next(); }
    drawn += 1;
    canvas.draw({
      relSize: Math.random(),
      relX: Math.random(),
      relY: Math.random(),
      shape: buttonShapes[button.name],
    });
  }
  return {
    name: 'game',
    enter() {
      contextElement.addEventListener('click', drawListener);
      // draw first
      delay(0, () => window.deviceOne.slidePanel.toggle(true));
      delay(1000, () => window.deviceOne.buttons.click('A'));
    },
    leave() {
      canvas.erase();
      window.deviceOne.slidePanel.toggle(false);
      contextElement.removeEventListener('click', drawListener);
      return cli.echo('too much, need rest...')
        .then(() => delayedPromise(500))
        .then(() => cli.clear());
    },
  };
}

function createGreetState({ states, cli }) {
  return {
    name: 'greet',
    enter() {
      cli.echo('hello, your name?')
      .then(() => cli.command())
      .then((name) => cli.echo(`play a game, ${name}?`).then(() => cli.command()))
      .then((response) => {
        const text = /^y/i.test(response) ? 'great...' : 'going to force you...';
        cli.echo(text).then(() => delay(1000, states.next));
      });
    },
    leave() {
      cli.clear();
    },
  };
}

function createOffState({ states, powerButton }) {
  const powerOnListener = delayed(300, (event) => {
    powerButton.toggleVisible(false, delayed(600, states.next));
  });
  return {
    name: 'off',
    enter() {
      powerButton.toggleAttached(true);
      powerButton.toggleVisible(true);
      powerButton.rootElement.addEventListener('power:on', powerOnListener);
    },
    leave() {
      powerButton.toggleAttached(false);
      powerButton.rootElement.removeEventListener('power:on', powerOnListener);
    },
  };
}

// a stateful cli subview with a promise-based api
function createCLI($root, $context) {
  var api, clear, command, html, ms, state;
  html = {
    command: function(command) {
      return `&raquo; ${command}`;
    },
    cursor: '<span class="cursor -blink">&marker;</span>',
    input: '<input type="text" class="-invisible">',
    line: '<div class="line">'
  };
  ms = {
    pause: 500
  };
  state = {};
  state.$buffer = function() {
    return $root.find('.line');
  };
  state.$input = $(html.input).appendTo($root);
  state.$newLine = function() {
    return $(html.line).insertBefore(this.$input);
  };
  state.beginCommand = function() {
    this.commandDfd = $.Deferred();
    this.$line = this.$newLine();
    delay(ms.pause, () => {
      this.updateCommand();
      this.$line.get(0).scrollIntoView();
    });
    return this;
  };
  state.endCommand = function() {
    var ref7;
    if ((ref7 = this.$input) != null) {
      ref7.val('');
    }
    this.$line = null;
    this.command = '';
    this.commandDfd = null;
    return this;
  };
  state.updateCommand = function({action, payload} = {}) {
    var cursor;
    switch (action) {
      case 'add':
        this.command += payload;
        break;
      case 'delete':
        this.command = this.command.slice(0, -1);
        break;
      case 'submit':
        delay(ms.pause, () => {
          this.commandDfd.resolve(this.command);
        });
    }
    cursor = action === 'submit' ? '' : html.cursor;
    this.$line.html(`${html.command(this.command)}${cursor}`);
    return this;
  };
  state.endCommand();
  state.beginInput = function() {
    this.inputting = true;
    $context.on('click.cli', () => {
      this.$input.focus();
    });
    this.$input.focus();
    state.teardownKeyboardHandling = setupKeyboardHandling({
      element: this.$input.get(0),
      keyHandlers: {
        character(character) {
          state.updateCommand({ action: 'add', payload: character });
        },
        delete() {
          state.updateCommand({ action: 'delete' });
        },
        enter() {
          state.updateCommand({ action: 'submit' });
        },
      },
    }).teardown;
    return this;
  };
  state.endInput = function() {
    this.inputting = false;
    $context.off('click.cli');
    this.$input.blur();
    state.teardownKeyboardHandling();
    return this;
  };
  clear = function() {
    state.$buffer().remove();
    state.endInput().endCommand();
    return api;
  };
  command = function() {
    if (state.$line) {
      return;
    }
    if (!state.inputting) {
      state.beginInput();
    }
    return state.beginCommand().commandDfd.promise();
  };
  function echo(message) {
    let lineElement = state.$newLine().get(0);
    lineElement.scrollIntoView();
    state.endCommand();
    // animate
    return new Promise((fulfill, reject) => {
      animateChars({
        element: lineElement,
        string: message,
        completion: fulfill,
      });
    });
  }
  return (api = {clear, command, echo});
}

// simple subview
function createPowerButton(rootElement) {
  let state = { power: false };
  const center = { x: rootElement.clientWidth / 2, y: rootElement.clientHeight / 2 };
  const radius = { ring: 30, dot: 5 };
  // svg styling props often need to be attributes
  let buttonElement = rootElement.querySelector('.power-button');
  buttonElement.setAttribute('opacity', 0);
  let ringElement = buttonElement.querySelector('.ring');
  ringElement.setAttribute('cx', center.x);
  ringElement.setAttribute('cy', center.y);
  ringElement.setAttribute('r', radius.ring);
  ringElement.setAttribute('stroke-width', 2);
  let dotElement = buttonElement.querySelector('.dot');
  dotElement.setAttribute('cx', center.x);
  dotElement.setAttribute('cy', center.y);
  dotElement.setAttribute('r', radius.dot);
  // animate
  const options = { duration: 300, easing: 'ease-in-out', fill: 'both' };
  function onEnter(event) {
    ringElement.animate({ r: [parseFloat(ringElement.getAttribute('r')), radius.ring / 2] }, options);
    dotElement.animate({ r: [parseFloat(dotElement.getAttribute('r')), radius.dot * 2] }, options);
    state.power = true;
    delay(options.duration, () => {
      if (!state.power) { return; }
      rootElement.dispatchEvent(new CustomEvent('power:on'));
    });
  }
  function onLeave(event) {
    ringElement.animate({ r: [parseFloat(ringElement.getAttribute('r')), radius.ring] }, options);
    dotElement.animate({ r: [parseFloat(dotElement.getAttribute('r')), radius.dot] }, options);
    state.power = false;
  }
  buttonElement.addEventListener('mouseenter', onEnter);
  buttonElement.addEventListener('mouseleave', onLeave);
  // api
  function toggleAttached(attached) {
    if (attached) {
      rootElement.appendChild(buttonElement);
    } else {
      onLeave(null);
      rootElement.removeChild(buttonElement);
    }
  }
  function toggleVisible(visible, completion) {
    const opacity = visible ? 1 : 0;
    let animation = buttonElement.animate({ opacity: [parseFloat(buttonElement.getAttribute('opacity')), opacity] }, options);
    animation.onfinish = completion;
  }
  return { rootElement, toggleAttached, toggleVisible };
}

// a basic subview factory
function createCanvas(rootElement) {
  function draw({ relSize, relX, relY, shape }) {
    const { max, min, round, sqrt } = Math;
    relSize = max(0.1, relSize / 2);
    relX = min(0.9, max(0.1, relX));
    relY = min(0.8, max(0.2, relY));
    const h = rootElement.clientHeight;
    const w = rootElement.clientWidth;
    const size = round(w * relSize);
    const x = round((w - size) * relX);
    const mx = x + size;
    const y = round((h - size) * relY);
    const my = y + size;
    const r = size / 2;
    const cx = x + r;
    const cy = y + r;
    let name;
    let attributes = { 'stroke-width': 2 };
    switch (shape) {
      case 'circle':
        name = 'circle';
        Object.assign(attributes, { cx, cy, r });
        break;
      case 'square':
        name = 'rect';
        Object.assign(attributes, { x, y, width: size, height: size, rx: 6, ry: 6 });
        break;
      case 'triangle':
        name = 'polygon';
        Object.assign(attributes, { points: [cx, y + my * (1 - sqrt(3) / 2), mx, my, x, my].join(',') });
        break;
      case 'semicircle':
        name = 'path';
        Object.assign(attributes, { d: `M${x} ${my}, L${mx} ${my}, A${r} ${r} 0 0 0 ${x} ${my}, Z` });
        break;
      default:
        throw 'unsupported shape';
    }
    let element = document.createElementNS('http://www.w3.org/2000/svg', name);
    element.classList.add('shape');
    Object.keys(attributes).forEach(name => {
      element.setAttribute(name, attributes[name]);
    });
    rootElement.appendChild(element);
    return element;
  }
  function erase() {
    [...rootElement.querySelectorAll('.shape')].forEach(element => {
      element.parentElement.removeChild(element);
    });
  }
  return { draw, erase };
}

function initButtons(contextElement) {
  function click(name) {
    let buttonElement = contextElement.querySelector(`[type=button][name=${name}]`);
    if (!buttonElement) { return; }
    const click = new MouseEvent('click', {bubbles: true, cancelable: true});
    buttonElement.classList.add('hover', 'active');
    delay(300, () => {
      buttonElement.dispatchEvent(click);
      buttonElement.classList.remove('hover', 'active');
    });
  }
  return { click };
}

function initMainScreen(contextElement) {
  const rootElement = contextElement.querySelector('.main-screen');
  const cliElement = rootElement.querySelector('[data-module=cli]');
  const canvasElement = rootElement.querySelector('[data-module=canvas]');
  const cli = createCLI($(cliElement), $(rootElement));
  const powerButton = createPowerButton(canvasElement);
  const canvas = createCanvas(canvasElement);
  let states = createStateMachine();
  states.push(createOffState({ states, powerButton }));
  states.push(createGreetState({ states, cli }));
  states.push(createGameState({ states, canvas, cli, contextElement }));
  states.to('off');
  return {};
}

function initSlidePanel(contextElement) {
  const rootElement = contextElement.querySelector('[data-module=slide-panel]');
  let coverElement = rootElement.querySelector('.cover');
  function toggle(visible) {
    coverElement.classList.toggle('--open', visible);
    coverElement.classList.toggle('--closed', !visible);
  }
  toggle(false);
  coverElement.addEventListener('click', (event) => {
    if (event.currentTarget !== coverElement) { return; }
    toggle();
  });
  return { toggle };
}
```
