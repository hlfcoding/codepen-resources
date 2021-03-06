# [Device #1](https://codepen.io/hlfcoding/details/GZvjXp)

> An old sketch from 2013, updated for 2016, updated for 2018.
>
> A contrived device with command line, basic drawing, physical buttons, and lots of shadows.

Head
----
Omits script import; JS imports module directly.

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1">
<link rel="apple-touch-icon" href="//assets.pengxwang.com/codepen-resources/app-icons/device-1.png">
<link rel="stylesheet" href="//assets.pengxwang.com/codepen-resources/common-helpers/main-v2.css">
<link rel="preload" as="script" crossorigin="anonymous" href="//assets.pengxwang.com/codepen-resources/common-helpers/main.mjs">
```

Body
----
Includes configuration for animations, behaviors.

```json
<script id="settings" type="application/json">
{
  "buttonShapesByName": {
    "A": "triangle",
    "B": "square",
    "C": "circle",
    "D": "semicircle"
  },
  "demoButtonName": "A",
  "powerButtonLayout": {
    "radius": { "ring": 30, "dot": 5 },
    "endRadiusRatio": { "ring": 0.5, "dot": 2 }
  },
  "shapeLayerOpaqueValue": 0.1,
  "shapeLayout": {
    "baseAttributes": { "stroke-width": 2 },
    "boundsPaddingRatio": { "x": 0.1, "y": 0.2 },
    "gridResolution": 10,
    "rectCorner": 6,
    "sizeLimits": { "min": 0.1, "scale": 0.5 }
  },
  "shapeLimit": 10,
  "soundBackupElements": 3,
  "soundTimeRanges": {
    "button": [2, 2.5],
    "error": [3, 3.9],
    "panelClose": [0, 0.5],
    "panelOpen": [1, 1.5],
    "power": [5, 5.9],
    "prompt": [4, 4.5]
  },
  "soundVolumes": {
    "default": 0.5,
    "button": 0.2,
    "panelClose": 0.2,
    "panelOpen": 0.3,
    "prompt": 0.3
  },
  "timing": {
    "characterPauses": {
      ",": 300,
      ".": 100,
      "default": 30
    },
    "cliInputDelay": 500,
    "gameLeaveDelay": 1000,
    "greetLeaveDelay": 1000,
    "offLeaveDelay": 200,
    "powerAnimationDuration": 500,
    "powerOnPause": 300,
    "selfClickDelay": 300,
    "slideEndDelay": 600
  }
}
</script>
```

```html
<!--
  button: Button-SoundBible.com-1420500901.mp3
  error: Computer Error Alert-SoundBible.com-783113881.mp3
  panelClose: Button Click Off-SoundBible.com-1730098776.mp3
  panelOpen: Click On-SoundBible.com-1697535117.mp3
  power: examples.phaser.io/assets/audio/SoundEffects/fx_mixdown.ogg
  prompt: examples.phaser.io/assets/audio/SoundEffects/fx_mixdown.ogg
-->

<!-- using: -bar-layout -blink -centered -input-style-none -invisible -->
<div class="container">

<button class="light-switch" type="button">Light</button>

<div class="device -centered -input-style-none">
  <div class="body -panel-skin">
    <div class="main-screen -display-skin">
      <div class="scanlines" role="presentation"></div>
      <div class="body">
        <div class="cli" data-module="cli">
          <input type="text" class="-invisible">
        </div>
        <svg class="canvas" data-module="canvas">
          <g class="power-button">
            <circle class="ring"></circle>
            <circle class="dot"></circle>
          </g>
        </svg>
      </div>
      <div class="tint" role="presentation"></div>
    </div><!--/main-screen-->
    <div class="buttons-panel -slide-panel" data-module="slide-panel">
      <div class="cover">
        <div class="power-led" role="presentation"></div>
        <div class="symbol" role="presentation"></div>
      </div>
      <nav class="inside -bar-layout">
        <button class="-button-skin" name="A" type="button">A</button>
        <button class="-button-skin" name="B" type="button">B</button>
        <button class="-button-skin" name="C" type="button">C</button>
        <button class="-button-skin" name="D" type="button">D</button>
      </nav>
    </div><!--/buttons-panel-->
  </div><!--/body-->
  <audio preload src="//assets.pengxwang.com/files/codepen_GZvjXp.ogg"></audio>
</div><!--/device-->

</div><!--/container-->
```

Styles
------
Includes animations.

```css
.device {
  --bezel: 15px;
  --corner: var(--bezel);
  --corner-inner: 7px;
  --device-height: 300px;
  --device-width: 300px;
  --display-base: #0f0;
  --display-dark: #090;
  --display-height: 190px;
  --display-width: calc(var(--device-width) - 2 * var(--bezel));
  --display-size: 330px; /* hypotenuse */
}

.-panel-skin {
  --panel-base: #bbb;
  --panel-base-dark: #aaa;
  --panel-base-darker: #a2a2a2;
  --panel-dark: #6f6f6f;
  --panel-darker: #3c3c3c;
  --panel-depth: 2px;
  --panel-depth-outer: 3px;
  --panel-drop-diffuse: 10px;
  --panel-highlight: var(--light-5);
  --panel-highlight-strong: var(--light-8);
  --panel-highlight-weak: var(--light-3);
  --panel-interior: #777;
  --panel-shadow: var(--shade-2);
  --panel-texture: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFUlEQVQYV2NkYGCQZGBgeM7IAAGSAAqqARzZRIhzAAAAAElFTkSuQmCC');
  /* front to back */
  --panel-shadows:
    inset 0 0 var(--bezel) var(--shade-3), /* contour */
    inset 0 0 2px var(--shade-3), /* inner edges */
    inset 0 0 1px 1px var(--shade-1),
    0 1px 0 var(--shade-4), /* edge */
    0 var(--panel-depth-outer) 0 var(--light-2), /* edge */
    0 calc(var(--panel-depth-outer) + 1px) 0 var(--shade-4); /* edge shadow */
  background-color: var(--panel-base);
  background-image:
    linear-gradient(var(--panel-highlight), transparent var(--display-height)),
    var(--panel-texture);
  border-radius: var(--corner);
  margin-top: calc(-1 * (var(--panel-depth-outer) + 1px));
}

.--dark .-panel-skin {
  --panel-base: #444;
  --panel-base-dark: #333;
  --panel-base-darker: #222;
  --panel-dark: #222;
  --panel-darker: #111;
  --panel-highlight: var(--light-2);
  --panel-highlight-strong: var(--light-3);
  --panel-highlight-weak: var(--light-1);
  --panel-interior: #333;
  --panel-shadow: var(--shade-4);
}

.-panel-skin .-button-skin {
  background-color: var(--panel-base);
  background-image: linear-gradient(var(--panel-highlight), transparent);
  border: 0;
  border-radius: var(--corner-inner);
  /* front to back */
  box-shadow:
    inset 0 0 0 1px var(--panel-highlight-weak), /* inner edge */
    inset 0 0 var(--corner) var(--shade-2), /* contour */
    0 var(--panel-depth) 0 var(--panel-dark), /* edge */
    0 calc(var(--panel-depth) + 1px) 0 var(--panel-darker), /* edge shadow */
    0 var(--panel-depth) 3px 1px var(--shade-5); /* diffuse */
  color: var(--panel-dark);
  font-weight: bold;
  outline: none;
  text-shadow:
    0 -1px 0 var(--shade-3),
    0 1px 0 var(--panel-highlight);
  transition: color .2s ease-in-out, margin .1s ease-out;
}
.-panel-skin .-button-skin:not([disabled]) {
  cursor: pointer;
}
.-panel-skin .-button-skin:not([disabled]).--hover,
.-panel-skin .-button-skin:not([disabled]):hover {
  background-image: linear-gradient(var(--panel-highlight-strong), transparent);
}
.-panel-skin .-button-skin[disabled],
.-panel-skin .-button-skin:not([disabled]).--active,
.-panel-skin .-button-skin:not([disabled]):active {
  --depress-ratio: 1;
  background-color: var(--panel-base-dark);
  background-image: linear-gradient(var(--panel-highlight-weak), transparent);
  /* front to back */
  box-shadow:
    inset 0 0 1px 1px var(--shade-2), /* shadow */
    inset 0 2px 3px 1px var(--shade-2), /* shadow */
    inset 0 0 var(--corner) var(--shade-2), /* contour */
    0 calc(var(--panel-depth) * -1 * var(--depress-ratio)) 0 var(--shade-4), /* socket edge */
    0 0 0 1px var(--shade-1); /* socket edge */
}
.-panel-skin .-button-skin[disabled] {
  --depress-ratio: 0.5;
}
.-panel-skin .-button-skin:not([disabled]).--active,
.-panel-skin .-button-skin:not([disabled]):active {
  color: var(--display-dark);
  margin-bottom: calc(var(--panel-depth) * -1);
  margin-top: calc(var(--panel-depth) - 1px);
}

.-panel-skin .-slide-panel {
  border-bottom: 1px solid var(--panel-highlight);
  border-top: 1px solid var(--panel-shadow);
}
.-panel-skin .-slide-panel .cover {
  background: var(--panel-base) var(--panel-texture) repeat;
  border-bottom: 1px solid var(--panel-shadow);
  border-top: 1px solid var(--panel-highlight);
  cursor: pointer;
  padding-top: 1px;
}
.-panel-skin .-slide-panel .cover.--open  {
  box-shadow:
    0 0 2px var(--shade-5),
    0 0 calc(var(--panel-drop-diffuse) * 1.5) var(--shade-8),
    0 0 0 var(--shade-2);
}
.-panel-skin .-slide-panel .cover .power-led {
  --diameter: 9px;
  --radius: calc(var(--diameter) / 2);
  background: radial-gradient(
    circle var(--radius), var(--display-base) 50%, var(--display-dark)
  );
  border-radius: var(--radius);
  height: var(--diameter);
  left: calc(50% - var(--radius));
  opacity: 0;
  position: absolute;
  top: calc(50% - var(--radius) - 1.5px);
  transition: opacity .2s;
  width: var(--diameter);
}
.-panel-skin .-slide-panel .cover .power-led.--on {
  opacity: 1;
}
.-panel-skin .-slide-panel .cover .symbol {
  box-shadow: /* TODO: refactor */
    inset 0 0 var(--bezel) var(--shade-3), /* contour */
    inset 0 0 2px var(--shade-3), /* inner edges */
    inset 0 0 1px 1px var(--shade-1);
  color: var(--panel-base-dark);
  font: bold 56px Helvetica, sans-serif;
  text-align: center;
  text-shadow:
    0 -1px 0 var(--shade-3),
    0 1px 0 var(--panel-highlight);
}
.-panel-skin .-slide-panel .cover .symbol::before {
  content: '\00b7';
}
.-panel-skin .-slide-panel .inside {
  background-color: var(--panel-interior);
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAGklEQVQIW2NkQAKMMPb///+N4RygoA8yhwEAYOgDgYLmjHMAAAAASUVORK5CYII=');
  border-color: var(--shade-5) var(--shade-4) var(--panel-highlight-strong);
  border-style: solid;
  border-width: 2px 1px 1px;
  /* front to back */
  box-shadow:
    inset 0 1px var(--bezel) var(--shade-5), /* diffuse */
    inset 0 var(--panel-depth) 0 var(--shade-1), /* inner edge */
    inset 0 calc(var(--panel-depth) + 1px) 0 var(--shade-1); /* edge shadow */
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
  --color: var(--display-base);
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
    0 0 2px var(--panel-highlight-strong), /* edge */
    0 0 var(--corner-inner) 1px var(--panel-highlight-strong); /* highlight */
}
.-display-skin>.scanlines {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAADElEQVQYV2NggAJfAABXAE62dfEOAAAAAElFTkSuQmCC');
  border-radius: calc(var(--corner-inner) - 1px);
  margin: 1px;
}

.-display-skin>.body {
  color: var(--color);
  font: 15px/1.7 'Menlo', 'Consolas', monospace;
  padding: var(--bezel);
  text-shadow: 0 0 1px var(--color);
}
.-display-skin svg {
  filter: drop-shadow(0 0 1px var(--color));
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
    var(--top-light-strong) calc(var(--device-width) / 2), /* midpoint before blur */
    var(--top-light) calc(var(--device-width) / 2 + 4px), /* midpoint */
    transparent var(--display-size));
  border-radius: calc(var(--corner-inner) - 1px);
  box-shadow:
    inset 0 0 2px var(--shade-8),
    inset var(--falloff-width) calc(var(--falloff-height) * -1) var(--falloff-height) var(--shade-8);
  opacity: .3;
  transition: opacity .3s ease-in-out;
}
.-display-skin:not(.--active)>.tint {
  cursor: pointer;
}
.-display-skin.--active:hover>.tint {
  opacity: 0;
}

body {
  --top-light: var(--light-5);
  --top-light-strong: #fff;
  background-color: #eee;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAPElEQVQYV2OcNWuWDyMj4/P///9LpqWlbWGcOXOmJAMUpKenP2ecPXu28b9//54xMTFJpaamnmWEycJoAFZbFAVaNOxjAAAAAElFTkSuQmCC');
}
body>.container {
  background: linear-gradient(to bottom, var(--top-light), transparent, var(--shade-2));
  height: 100%;
  position: absolute;
  width: 100%;
}
.container>button.light-switch {
  cursor: pointer;
  opacity: 0;
  width: 100%;
}
body.--dark {
  --top-light: var(--light-1);
  --top-light-strong: var(--light-4);
  background-color: #111;
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
  position: relative; /* FIXME: Hack against mysterious gray patch that's somewhat effective. */
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
  cursor: none;
  padding: var(--bezel);
}
.device .main-screen.--pointer-enabled>.body {
  cursor: crosshair;
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
  top: calc(var(--bezel) + var(--edges));
  width: calc(var(--display-width) - var(--edges));
}
.device .main-screen>.scanlines { z-index: 9; }
.device .main-screen>.tint { z-index: 10; }
.device .main-screen.--active>.scanlines,
.device .main-screen.--active>.tint { pointer-events: none; }
@media (hover: none) { /* TODO */
  .device .main-screen:hover>.body .canvas { z-index: 20; }
}

/* Intro */

.device>.body {
  --intro-duration: .6s;
  --panel-drop: 0 calc(var(--panel-depth) + 1px) var(--panel-drop-diffuse) var(--shade-8);
  --panel-drop-afloat: 0 calc(var(--panel-depth) + 10px) calc(var(--panel-drop-diffuse) + 10px) 2px var(--shade-4);
  --panel-drop-hover: 0 calc(var(--panel-depth) + 5px) calc(var(--panel-drop-diffuse) + 5px) 2px var(--shade-6);
  --panel-ease-afloat: cubic-bezier(0, .9, .3, 1);
  box-shadow: var(--panel-shadows), var(--panel-drop-afloat);
  transform: translateY(-30%) scale(1.1);
  transition:
    box-shadow .2s ease-out .2s,
    transform var(--intro-duration) var(--panel-ease-afloat);
  will-change: box-shadow, transform;
}
.device.--landed>.body {
  box-shadow: var(--panel-shadows), var(--panel-drop);
  transform: translateY(0) scale(1);
}
.device.--ready>.body {
  transition:
    box-shadow .3s ease-out,
    transform .3s var(--panel-ease-afloat);
}
.device.--ready.--has-focused-main-screen>.body {
  box-shadow: var(--panel-shadows), var(--panel-drop-hover);
  transform: translateY(-2%) scale(1);
}
.device .buttons-panel {
  opacity: 0;
  transition: opacity .2s ease-in-out var(--intro-duration);
}
.device.--ready .buttons-panel {
  opacity: 1;
}
```

Behaviors
---------
May include styles if needed.

```js
import {
  animateCharacters,
  assert,
  createAudioClipPlayer,
  createStateMachine,
  delay,
  forEach,
  getComputedTransitionDurations,
  setAttributes,
  setupKeyboardHandling,
} from '//assets.pengxwang.com/codepen-resources/common-helpers/main.mjs';

const { log10, max, min, random, round, sqrt } = Math;

if (document.readyState !== 'loading') { window.deviceOne = initApp(); }
else { document.addEventListener('DOMContentLoaded', event => window.deviceOne = initApp()); }

function initApp() {
  let rootElement = document.querySelector('.device');
  rootElement.classList.add('--landed');
  const settingsElement = document.querySelector('script#settings');
  const settings = JSON.parse(settingsElement.innerHTML);
  let api = {};
  const shared = {
    async act(targetName, methodName, ...parameters) {
      const target = api[targetName];
      if (!assert(target, targetName)) { return; }
      if (!assert(target[methodName], methodName)) { return; }
      const result = await target[methodName](...parameters);
      return result
    },
    settings,
  };
  Object.assign(api, shared, {
    buttons: initButtons(rootElement, shared),
    light: initLight(document.body),
    slidePanel: initSlidePanel(rootElement, shared),
    sounds: initSounds(rootElement, shared),
  });
  const initDuration = getComputedTransitionDurations(document.querySelector('.device > .body'))[1];
  delay(initDuration, () => {
    api.mainScreen = initMainScreen(rootElement, shared);
    rootElement.classList.add('--ready');
  });
  return api
}

function createGameState(
  { states, canvas, cli, contextElement },
  { act, settings: { buttonShapesByName, demoButtonName, shapeLimit, timing } }
) {
  let drawn;
  function drawListener({ target: element }) {
    if (element.type !== 'button') { return; }
    if (!(element.name in buttonShapesByName)) { return; }
    if (drawn >= shapeLimit) { return states.next(); }
    drawn += 1;
    canvas.draw({
      sizeRatio: random(),
      xRatio: random(),
      yRatio: random(),
      shape: buttonShapesByName[element.name],
    });
  }
  return {
    name: 'game',
    async enter() {
      drawn = 0;
      contextElement.addEventListener('click', drawListener);
      await delay(0);
      act('buttons', 'toggleDisabled', false);
      await act('slidePanel', 'toggle', true);
      await delay(timing.slideEndDelay);
      act('buttons', 'click', demoButtonName);
    },
    async leave() {
      canvas.erase();
      contextElement.removeEventListener('click', drawListener);
      act('sounds', 'play', 'error');
      await act('slidePanel', 'toggle', false);
      act('slidePanel', 'toggleDisabled', true);
      await delay(timing.slideEndDelay);
      await cli.echo('too much, need rest...');
      await delay(timing.gameLeaveDelay);
      cli.clear();
      act('slidePanel', 'toggleDisabled', false);
    },
  };
}

function createGreetState({ states, cli }, { settings: { timing } }) {
  const patterns = {
    no: /^n(a(h|y)?|ever|o(pe)?)$/i,
    yes: /^ok(ay|ie)?|sure|y(a|e)(ah?|p|s|y)?$/i,
  };
  return {
    name: 'greet',
    async enter() {
      await cli.echo('hello, your name?');
      const name = await cli.read();
      await cli.echo(`play a game, ${name}?`);
      const response = await cli.read();
      await cli.echo(
        patterns.yes.test(response) ? 'great...'
        : patterns.no.test(response) ? 'going to force you...'
        : 'i don\'t understand, going to force you...'
      );
      await delay(timing.greetLeaveDelay);
      states.next();
    },
    leave() {
      cli.clear();
    },
  };
}

function createOffState({ states, powerButton }, { act, settings: { timing } }) {
  async function powerOnListener(_) {
    await delay(timing.powerOnPause);
    act('sounds', 'play', 'power');
    await powerButton.toggleVisible(false);
    await act('slidePanel', 'togglePowerLED', true);
    await delay(timing.offLeaveDelay);
    states.next();
  }
  return {
    name: 'off',
    async enter() {
      act('buttons', 'toggleDisabled', true);
      act('mainScreen', 'toggleClass', '--pointer-enabled', true);
      act('slidePanel', 'togglePowerLED', false);
      powerButton.toggleAttached(true);
      powerButton.rootElement.addEventListener('power:on', powerOnListener);
      await powerButton.toggleVisible(true);
    },
    leave() {
      act('mainScreen', 'toggleClass', '--pointer-enabled', false);
      powerButton.toggleAttached(false);
      powerButton.rootElement.removeEventListener('power:on', powerOnListener);
    },
  };
}

function createCLI(rootElement, contextElement, { act, settings: { timing } }) {
  const inputElement = rootElement.querySelector('input[type=text]');
  const initialReadingState = () => ({
    input: '',
    pendingReading: { reject: null, resolve: null },
    lineElement: null,
  });
  const initialState = () => Object.assign({
    isInputting: false,
    teardownKeyboardHandling: null,
  }, initialReadingState());
  const keyHandlers = {
    character(character) { updateReading({ action: 'add', payload: character }); },
    delete() { updateReading({ action: 'delete' }); },
    enter() { updateReading({ action: 'submit' }); },
  };
  function createLineElement() {
    let element = document.createElement('div');
    element.classList.add('line');
    inputElement.parentElement.insertBefore(element, inputElement);
    return element;
  }
  let state = initialState();
  function beginReading() {
    state.lineElement = createLineElement();
    delay(timing.cliInputDelay, () => {
      updateReading();
      state.lineElement.scrollIntoView();
      act('sounds', 'play', 'prompt');
    });
    return new Promise((resolve, reject) => state.pendingReading = { resolve, reject });
  }
  function endReading() {
    inputElement.value = '';
    Object.assign(state, initialReadingState());
  }
  function updateReading({ action, payload } = {}) {
    switch (action) {
      case 'add':
        state.input += payload;
        break;
      case 'delete':
        state.input = state.input.slice(0, -1);
        break;
      case 'submit':
        const { resolve } = state.pendingReading;
        delay(timing.cliInputDelay, () => resolve(state.input));
        break;
    }
    const cursor = (action === 'submit') ? '' : '<span class="cursor">&marker;</span>';
    state.lineElement.innerHTML = `&raquo; ${state.input}${cursor}`;
    if (document.activeElement === inputElement) {
      onInputFocus();
    }
  }
  function onInputBlur(_) {
    rootElement.dispatchEvent(new CustomEvent('cli:blur'));
    if (!state.lineElement) { return; }
    const cursorElement = state.lineElement.querySelector('.cursor');
    if (!cursorElement) { return; }
    cursorElement.classList.remove('-blink');
  }
  function onInputFocus(_) {
    rootElement.dispatchEvent(new CustomEvent('cli:focus'));
    if (!state.lineElement) { return; }
    const cursorElement = state.lineElement.querySelector('.cursor');
    if (!cursorElement) { return; }
    cursorElement.classList.add('-blink');
  }
  inputElement.addEventListener('blur', onInputBlur);
  inputElement.addEventListener('focus', onInputFocus);
  function beginInput() {
    const element = inputElement;
    state.focusListener = event => element.focus();
    state.isInputting = true;
    contextElement.addEventListener('click', state.focusListener);
    element.focus();
    state.teardownKeyboardHandling = setupKeyboardHandling({ element, keyHandlers }).teardown;
  }
  function endInput() {
    state.isInputting = false;
    contextElement.removeEventListener('click', state.focusListener);
    inputElement.blur();
    onInputBlur();
    if (state.teardownKeyboardHandling) {
      state.teardownKeyboardHandling();
    }
  }
  return {
    clear() {
      const bufferElements = rootElement.querySelectorAll('.line');
      [...bufferElements].forEach(line => line.parentElement.removeChild(line));
      endReading();
      endInput();
      state = initialState();
    },
    read() {
      if (state.lineElement) { return; }
      if (!state.isInputting) {
        beginInput();
      }
      return beginReading();
    },
    async echo(message) {
      const lineElement = createLineElement();
      lineElement.scrollIntoView();
      endReading();
      const { characterPauses: pauses } = timing;
      await animateCharacters({
        element: lineElement, string: message,
        getStepDuration(c) { return (c in pauses) ? pauses[c] : pauses.default },
      });
    },
  };
}

function createPowerButton(rootElement, { settings: { powerButtonLayout: layout, timing } }) {
  const { radius, endRadiusRatio: ratio } = layout;
  let state = { animations: { dot: null, ring: null }, isOn: false };
  const center = { x: rootElement.clientWidth / 2, y: rootElement.clientHeight / 2 };
  let buttonElement = rootElement.querySelector('.power-button');
  buttonElement.setAttribute('opacity', 0);
  let ringElement = buttonElement.querySelector('.ring');
  setAttributes(ringElement, { cx: center.x, cy: center.y, r: radius.ring, 'stroke-width': 2 });
  let dotElement = buttonElement.querySelector('.dot');
  setAttributes(dotElement, { cx: center.x, cy: center.y, r: radius.dot });
  const options = { duration: timing.powerAnimationDuration, easing: 'ease-in-out', fill: 'both' };
  Object.assign(state.animations, {
    ring: ringElement.animate({ r: [radius.ring, radius.ring * ratio.ring] }, options),
    dot: dotElement.animate({ r: [radius.dot, radius.dot * ratio.dot] }, options),
  });
  const mainAnimation = state.animations.dot;
  mainAnimation.onfinish = ({ target: animation }) => {
    if (animation.playbackRate < 0) { return; }
    rootElement.dispatchEvent(new CustomEvent('power:on'));
    state.isOn = true;
  };
  forEach(state.animations, (_, a) => a.pause());
  function onEnter(_) {
    if (!isInteractive()) { return; }
    forEach(state.animations, (_, a) => {
      if (a.playState === 'paused') { return a.play(); }
      a.reverse();
    });
  }
  function onLeave(_) {
    if (!isInteractive()) { return; }
    forEach(state.animations, (_, a) => a.reverse());
  }
  function isInteractive() {
    return mainAnimation.playState !== 'running' && !state.isOn;
  }
  buttonElement.addEventListener('mouseenter', onEnter);
  buttonElement.addEventListener('mouseleave', onLeave);
  function toggleAttached(attached) {
    if (attached) {
      rootElement.appendChild(buttonElement);
    } else {
      rootElement.removeChild(buttonElement);
      console.assert(state.isOn);
      forEach(state.animations, (_, a) => a.reverse());
      state.isOn = false;
    }
  }
  async function toggleVisible(visible) {
    let keyframes;
    if (visible) {
      keyframes = { opacity: [0, 1], transform: ['none', 'none'] };
    } else {
      const offscreen = rootElement.clientHeight / 2 + radius.ring * 2;
      keyframes = { transform: [0, offscreen].map(y => `translateY(${y}px)`) };
    }
    return new Promise((resolve, reject) => {
      Object.assign(buttonElement.animate(keyframes, options), { oncancel: reject, onfinish: resolve });
    });
  }
  return { rootElement, toggleAttached, toggleVisible };
}

function createCanvas(rootElement, { settings: { shapeLayerOpaqueValue, shapeLayout } }) {
  function snap(number, { gridResolution }) {
    return number.toFixed(log10(gridResolution)) * 1;
  }
  function layout({ h, w, sizeRatio, xRatio, yRatio, shapeLayout }) {
    const { boundsPaddingRatio: padding, sizeLimits } = shapeLayout;
    sizeRatio = max(sizeLimits.min, snap(sizeRatio, shapeLayout) * sizeLimits.scale);
    xRatio = snap(xRatio, shapeLayout);
    yRatio = snap(yRatio, shapeLayout);
    const size = round(w * sizeRatio), r = size / 2;
    const xBound = w - size, yBound = h - size;
    const x = round(min(xBound - w * padding.x, max(w * padding.x, xBound * xRatio)));
    const y = round(min(yBound - h * padding.y, max(h * padding.y, yBound * yRatio)));
    const mx = x + size, my = y + size;
    const cx = x + r, cy = y + r;
    return { size, r, x, mx, cx, y, my, cy };
  }
  function draw({ sizeRatio, xRatio, yRatio, shape }) {
    const { clientHeight: h, clientWidth: w } = rootElement;
    const { size, r, x, mx, cx, y, my, cy } = layout({ h, w, sizeRatio, xRatio, yRatio, shapeLayout })
    let name, attributes = Object.assign({ opacity: 1 }, shapeLayout.baseAttributes);
    switch (shape) {
      case 'circle':
        name = 'circle';
        Object.assign(attributes, { cx, cy, r });
        break;
      case 'square':
        const { rectCorner: radius } = shapeLayout;
        name = 'rect';
        Object.assign(attributes, { x, y, width: size, height: size, rx: radius, ry: radius });
        break;
      case 'triangle':
        const dy = round(size * (1 - sqrt(3) / 2));
        name = 'polygon';
        Object.assign(attributes, { points: [cx, y + dy, mx, my, x, my].join(',') });
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
    setAttributes(element, attributes);
    [...rootElement.querySelectorAll('.shape')].forEach(element => {
      const opacity = parseFloat(element.getAttribute('opacity')) - shapeLayerOpaqueValue;
      element.setAttribute('opacity', opacity);
    });
    rootElement.appendChild(element);
    return element;
  }
  function erase() {
    [...rootElement.querySelectorAll('.shape')].forEach(element => {
      element.parentElement.removeChild(element);
    });
  }
  return { draw, erase, layout };
}

function initButtons(contextElement, { act, settings: { timing } }) {
  function onClick(event) {
    const buttonElement = event.currentTarget;
    if (buttonElement.getAttribute('disabled')) { return; }
    act('sounds', 'play', 'button');
  }
  [...contextElement.querySelectorAll(`[type=button]`)].forEach(element => {
    element.addEventListener('click', onClick);
  });
  async function click(name) {
    let buttonElement = contextElement.querySelector(`[type=button][name=${name}]`);
    if (!buttonElement) { return; }
    const click = new MouseEvent('click', {bubbles: true, cancelable: true});
    buttonElement.classList.add('--hover', '--active');
    await delay(timing.selfClickDelay);
    buttonElement.dispatchEvent(click);
    buttonElement.classList.remove('--hover', '--active');
  }
  function toggleDisabled(disabled) {
    const buttons = contextElement.querySelectorAll(`[type=button]`);
    [...buttons].forEach(element => {
      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    });
  }
  return { click, toggleDisabled };
}

function initLight(contextElement) {
  let switchElement = contextElement.querySelector('.light-switch');
  function toggle(on = contextElement.classList.contains('--dark')) {
    contextElement.classList.toggle('--dark', !on);
  }
  switchElement.addEventListener('click', event => toggle());
  return { toggle };
}

function initMainScreen(contextElement, shared) {
  const rootElement = contextElement.querySelector('.main-screen');
  const cliElement = rootElement.querySelector('[data-module=cli]');
  const canvasElement = rootElement.querySelector('[data-module=canvas]');
  const tintElement = rootElement.querySelector('.tint');
  const cli = createCLI(cliElement, rootElement, shared);
  const powerButton = createPowerButton(canvasElement, shared);
  const canvas = createCanvas(canvasElement, shared);
  let states = createStateMachine();
  states.push(createOffState({ states, powerButton }, shared));
  states.push(createGreetState({ states, cli }, shared));
  states.push(createGameState({ states, canvas, cli, contextElement }, shared));
  delay(0, () => states.to('off'));
  function activateListener(_) {
    const { parentElement } = tintElement;
    parentElement.insertBefore(tintElement, parentElement.firstChild);
    toggleClass('--active', true);
    contextElement.removeEventListener('click', activateListener);
  }
  contextElement.addEventListener('click', activateListener);
  function toggleClass(className, on) {
    rootElement.classList.toggle(className, on);
    contextElement.classList.toggle(`--has-${className.replace(/^[-]+/, '')}-main-screen`, on);
  }
  cliElement.addEventListener('cli:blur', event => toggleClass('--focused', false));
  cliElement.addEventListener('cli:focus', event => toggleClass('--focused', true));
  return { canvas, toggleClass };
}

function initSlidePanel(contextElement, { act }) {
  const rootElement = contextElement.querySelector('[data-module=slide-panel]');
  let coverElement = rootElement.querySelector('.cover');
  let state = { disabled: false };
  const toggleDuration = getComputedTransitionDurations(coverElement)[0];
  async function toggle(visible = coverElement.classList.contains('--closed'), silent = false) {
    if (state.disabled) { return; }
    coverElement.classList.toggle('--open', visible);
    coverElement.classList.toggle('--closed', !visible);
    if (!silent) {
      act('sounds', 'play', `panel${visible ? 'Open' : 'Close'}`);
    }
    await delay(toggleDuration);
  }
  function toggleDisabled(disabled) {
    state.disabled = disabled;
  }
  const ledElement = coverElement.querySelector('.power-led');
  const ledDuration = getComputedTransitionDurations(ledElement)[0];
  async function togglePowerLED(on = ledElement.classList.contains('--on')) {
    ledElement.classList.toggle('--on', on);
    await delay(ledDuration);
  }
  toggle(false, true);
  coverElement.addEventListener('click', event => {
    if (event.currentTarget !== coverElement) { return; }
    toggle();
  });
  return { toggle, toggleDisabled, togglePowerLED };
}

function initSounds(contextElement, { settings: { soundBackupElements, soundTimeRanges, soundVolumes } }) {
  let audioElement = contextElement.querySelector('audio');
  const backupElements = [...Array(soundBackupElements)].map(_ => audioElement.cloneNode());
  backupElements.forEach(element => audioElement.parentElement.appendChild(element));
  const players = [audioElement, ...backupElements].map(createAudioClipPlayer);
  function play(track) {
    const player = players.find(({ element }) => element.paused);
    if (!assert(player, track)) { return; }
    player.element.volume = soundVolumes[track] || soundVolumes.default;
    player.play(soundTimeRanges[track]);
  }
  return { play };
}
```

Tests
-----
Unit tests for the above JS. Can be run by pasting into the console (at the level of the pen `iframe`), individually or together.

```js
(({ mainScreen: { canvas: { layout }}}, { log, assert }) => {
  const result = layout({
    h: 200, w: 300, sizeRatio: 0.11, xRatio: 0, yRatio: 0,
    shapeLayout: { boundsPaddingRatio: { x: 0, y: 0 }, gridResolution: 10, sizeLimits: { min: 0, scale: 0.5 } },
  });
  log(result);
  const { size, r, x, mx, cx, y, my, cy } = result;
  assert(size === 15 && mx === size && my === size, 'size-related values');
  assert(r === 7.5 && cx === r && cy === r, 'radius-related values');
  assert(x === 0 && y === 0, 'position values');
})(window.deviceOne, console);

(({ mainScreen: { canvas: { layout }}}, { log, assert }) => {
  const result = layout({
    h: 200, w: 300, sizeRatio: 0.1, xRatio: 0, yRatio: 0,
    shapeLayout: { boundsPaddingRatio: { x: 0, y: 0 }, gridResolution: 10, sizeLimits: { min: 0.1, scale: 0.5 } },
  });
  log(result);
  const { size, r, x, mx, cx, y, my, cy } = result;
  assert(size === 30 && mx === size && my === size, 'size-related values');
  assert(r === 15 && cx === r && cy === r, 'radius-related values');
  assert(x === 0 && y === 0, 'position values');
})(window.deviceOne, console);

(({ mainScreen: { canvas: { layout }}}, { log, assert }) => {
  const result = layout({
    h: 200, w: 300, sizeRatio: 0.1, xRatio: 0, yRatio: 0,
    shapeLayout: { boundsPaddingRatio: { x: 0.1, y: 0.1 }, gridResolution: 10, sizeLimits: { min: 0, scale: 1 } },
  });
  log(result);
  const { size, r, x, mx, cx, y, my, cy } = result;
  assert(size === 30 && mx === 60 && my === 50, 'size-related values');
  assert(r === 15 && cx === 45 && cy === 35, 'radius-related values');
  assert(x === 30 && y === 20, 'position values');
})(window.deviceOne, console);

(({ mainScreen: { canvas: { layout }}}, { log, assert }) => {
  const result = layout({
    h: 200, w: 300, sizeRatio: 0.1, xRatio: 0.5, yRatio: 0.5,
    shapeLayout: { boundsPaddingRatio: { x: 0.1, y: 0.1 }, gridResolution: 10, sizeLimits: { min: 0, scale: 1 } },
  });
  log(result);
  const { size, r, x, mx, cx, y, my, cy } = result;
  assert(size === 30 && mx === 165 && my === 115, 'size-related values');
  assert(r === 15 && cx === 150 && cy === 100, 'radius-related values');
  assert(x === 135 && y === 85, 'position values');
})(window.deviceOne, console);

(({ mainScreen: { canvas: { layout }}}, { log, assert }) => {
  const result = layout({
    h: 200, w: 300, sizeRatio: 0.1, xRatio: 1, yRatio: 1,
    shapeLayout: { boundsPaddingRatio: { x: 0.1, y: 0.1 }, gridResolution: 10, sizeLimits: { min: 0, scale: 1 } },
  });
  log(result);
  const { size, r, x, mx, cx, y, my, cy } = result;
  assert(size === 30 && mx === 270 && my === 180, 'size-related values');
  assert(r === 15 && cx === 255 && cy === 165, 'radius-related values');
  assert(x === 240 && y === 150, 'position values');
})(window.deviceOne, console);
```
