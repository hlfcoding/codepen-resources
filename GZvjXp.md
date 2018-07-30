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
<script src="//cdnjs.cloudflare.com/ajax/libs/snap.svg/0.4.1/snap.svg-min.js"></script>
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
        <svg id="snap-svg-1" class="canvas" data-module="canvas"></svg>
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
/*
using $.fn.animateChars
using $.fn.center
using $.fn.cssDuration
using $.fn.innerSize
using $.fn.keyboardHandling
using createStateMachine
using delay
using delayed
using delayDeferred
*/

import {
  delay,
  getComputedTransitionDurations,
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

function createGameState({states, shapes, paper, cli, $context}) {
  var buttonShapes;
  buttonShapes = {
    A: 'triangle',
    B: 'square',
    C: 'circle',
    D: 'semicircle'
  };
  return {
    name: 'game',
    enter: function() {
      var drawn;
      drawn = 0;
      $context.on('click.shape', '[type=button]', function(e) {
        var $button;
        if (drawn >= 10) {
          return states.next();
        }
        drawn += 1;
        $button = $(e.target);
        shapes.draw({
          relSize: Math.random(),
          relX: Math.random(),
          relY: Math.random(),
          shape: buttonShapes[$button.attr('name')]
        });
      });
      // draw first
      delay(0, () => {
        window.deviceOne.slidePanel.toggle(true);
      });
      delay(1000, () => {
        window.deviceOne.buttons.click('A');
      });
    },
    leave: function() {
      paper.clear();
      $context.trigger('slide-panel:toggle', false);
      $context.off('click.shape');
      return cli.echo('too much, need rest...').then(function() {
        return delayDeferred(500);
      }).then(function() {
        return cli.clear();
      });
    }
  };
}

function createGreetState({states, cli}) {
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
    }
  };
}

function createOffState({states, paper, $canvas}) {
  return {
    name: 'off',
    enter: function() {
      var power;
      power = createPowerButton(paper, $canvas);
      power.toggle(true);
      $canvas.on('power:on', delayed(300, function() {
        power.toggle(false, delayed(600, states.next));
      }));
    },
    leave: function() {
      paper.clear();
      $canvas.off('power:on');
    }
  };
}

// a stateful cli subview with a promise-based api
function createCLI($root, $context) {
  var api, clear, command, echo, html, ms, state;
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
    this.$input.focus().keyboardHandling({
      onDelete: () => {
        this.updateCommand({
          action: 'delete'
        });
      },
      onEnter: () => {
        this.updateCommand({
          action: 'submit'
        });
      },
      onChar: (char) => {
        this.updateCommand({
          action: 'add',
          payload: char
        });
      }
    });
    return this;
  };
  state.endInput = function() {
    this.inputting = false;
    $context.off('click.cli');
    this.$input.blur().keyboardHandling(false);
    return this;
  };
  state.resetEcho = function() {
    this.echoDfd = null;
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
  echo = function(message) {
    var $line;
    $line = state.$newLine();
    $line.get(0).scrollIntoView();
    state.endCommand();
    // animate
    state.echoDfd = $.Deferred();
    $line.animateChars({
      string: message,
      completion: state.echoDfd
    });
    return state.echoDfd.promise();
  };
  return (api = {clear, command, echo});
}

// simple subview
function createPowerButton(paper, $root) {
  var api, button, center, dot, e, ms, radius, ring, state, toggle;
  state = {
    power: false
  };
  center = $root.center();
  radius = {
    ring: 30,
    dot: 5
  };
  // svg styling props often need to be attributes
  ring = paper.circle(center.x, center.y, radius.ring).addClass('ring').attr('strokeWidth', 2);
  dot = paper.circle(center.x, center.y, radius.dot).addClass('dot');
  button = paper.group(ring, dot).addClass('power-button').attr('opacity', 0);
  // animate
  ms = 300;
  e = mina.easeinout;
  button.hover(function() {
    ring.animate({
      r: radius.ring / 2
    }, ms, e);
    dot.animate({
      r: radius.dot * 2
    }, ms, e);
    state.power = true;
    delay(ms, function() {
      if (state.power !== true) {
        return;
      }
      $root.trigger('power:on');
    });
  }, function() {
    ring.animate({
      r: radius.ring
    }, ms, e);
    dot.animate({
      r: radius.dot
    }, ms, e);
    state.power = false;
  });
  toggle = function(visible, completion) {
    var opacity;
    opacity = visible ? 1 : 0;
    button.animate({opacity}, ms, e, completion);
  };
  return (api = {toggle});
}

// a basic subview factory
function createShapeDrawer(paper, $root) {
  var api, draw, max, min, round, sqrt;
  ({max, min, round, sqrt} = Math);
  draw = function({relSize, relX, relY, shape}) {
    var cx, cy, el, mx, my, r, size, stage, x, y;
    relSize = max(.1, relSize / 2);
    relX = min(.9, max(.1, relX));
    relY = min(.8, max(.2, relY));
    // convert to absolute
    stage = $root.innerSize();
    size = round(stage.w * relSize);
    x = round((stage.w - size) * relX);
    mx = x + size;
    y = round((stage.h - size) * relY);
    my = y + size;
    r = size / 2;
    cx = x + r;
    cy = y + r;
    // draw
    el = (function() {
      switch (shape) {
        case 'circle':
          return paper.circle(cx, cy, r);
        case 'square':
          return paper.rect(x, y, size, size, 6, 6);
        case 'triangle':
          return paper.polygon([cx, y + my * (1 - sqrt(3) / 2), mx, my, x, my]);
        case 'semicircle':
          return paper.path(`M${x} ${my}, L${mx} ${my}, A${r} ${r} 0 0 0 ${x} ${my}, Z`);
        default:
          throw 'unsupported shape';
      }
    })();
    el.addClass('shape').attr('strokeWidth', 2);
    return el;
  };
  return (api = {draw});
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
  const paper = Snap(`#${canvasElement.id}`);
  const cli = createCLI($(cliElement), $(rootElement));
  const shapes = createShapeDrawer(paper, $(canvasElement));
  let states = createStateMachine();
  states.push(createOffState({states, paper, $canvas: $(canvasElement)}));
  states.push(createGreetState({states, cli}));
  states.push(createGameState({states, shapes, paper, cli, $context: $(contextElement)}));
  states.to('off');
  return (api = {});
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
