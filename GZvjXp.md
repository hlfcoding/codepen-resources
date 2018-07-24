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

```coffee
# using $.fn.animateChars
# using $.fn.center
# using $.fn.cssDuration
# using $.fn.innerSize
# using $.fn.keyboardHandling
# using createStateMachine
# using delay
# using delayed
# using delayDeferred

{ isTouch } = Modernizr

$ ->
  $root = $ '.device'
  $root.addClass '--ready'
  buttons = initButtons $root
  slidePanel = initSlidePanel $root
  normalScaleWait = $root.find('.body').cssDuration('transition') + 300
  delay normalScaleWait, ->
    api.mainScreen = initMainScreen $root
  api = { buttons, slidePanel }

createGameState = ({ states, shapes, paper, cli, $context }) ->
  buttonShapes =
    A: 'triangle'
    B: 'square'
    C: 'circle'
    D: 'semicircle'
  name: 'game'
  enter: ->
    delay 0, -> $context.trigger 'slide-panel:toggle', on
    drawn = 0
    $context.on 'click.shape', '[type=button]', (e) ->
      return states.next() if drawn >= 10
      drawn += 1;
      $button = $ e.target
      shapes.draw
        relSize: Math.random()
        relX: Math.random()
        relY: Math.random()
        shape: buttonShapes[$button.attr('name')]
      return
    # draw first
    delay 1000, -> $context.trigger 'button:click', 'A'
    return
  leave: ->
    paper.clear()
    $context.trigger 'slide-panel:toggle', off
    $context.off 'click.shape'
    cli.echo 'too much, need rest...'
    .then -> delayDeferred 500
    .then -> cli.clear()

createGreetState = ({ states, cli }) ->
  name: 'greet'
  enter: ->
    cli.echo 'hello, your name?'
    .then -> cli.command()
    .then (name) ->
      cli.echo "play a game, #{name}?"
      .then -> cli.command()
    .then (response) ->
      agree = /^y/i.test response
      cli.echo if agree then 'great...' else 'going to force you...'
      .then -> delay 1000, states.next
      return
    return
  leave: -> cli.clear(); return

createOffState = ({ states, paper, $canvas }) ->
  name: 'off'
  enter: ->
    power = createPowerButton paper, $canvas
    power.toggle on
    $canvas.on 'power:on', delayed 300, ->
      power.toggle off, delayed(600, states.next)
      return
    return
  leave: ->
    paper.clear()
    $canvas.off 'power:on'
    return

# a stateful cli subview with a promise-based api
createCLI = ($root, $context) ->
  html =
    command: (command) -> "&raquo; #{command}"
    cursor: '<span class="cursor -blink">&marker;</span>'
    input: '<input type="text" class="-invisible">'
    line: '<div class="line">'

  ms = { pause: 500 }

  state = {}
  state.$buffer = -> $root.find '.line'
  state.$input = $(html.input).appendTo $root
  state.$newLine = -> $(html.line).insertBefore @$input

  state.beginCommand = ->
    @commandDfd = $.Deferred()
    @$line = @$newLine()
    delay ms.pause, =>
      @updateCommand()
      @$line.get(0).scrollIntoView()
      return
    @
  state.endCommand = ->
    @$input?.val ''
    @$line = null
    @command = ''
    @commandDfd = null
    @
  state.updateCommand = ({ action, payload }={}) ->
    switch action
      when 'add' then @command += payload
      when 'delete' then @command = @command.slice 0, -1
      when 'submit' then delay ms.pause, => @commandDfd.resolve @command; return
    cursor = if action is 'submit' then '' else html.cursor
    @$line.html "#{html.command(@command)}#{cursor}"
    @
  state.endCommand()

  state.beginInput = ->
    @inputting = yes
    $context.on 'click.cli', => @$input.focus(); return
    @$input.focus().keyboardHandling
      onDelete: => @updateCommand { action: 'delete' }; return
      onEnter: => @updateCommand { action: 'submit' }; return
      onChar: (char) => @updateCommand { action: 'add', payload: char }; return
    @
  state.endInput = ->
    @inputting = no
    $context.off 'click.cli'
    @$input.blur().keyboardHandling off
    @

  state.resetEcho = ->
    @echoDfd = null
    @

  clear = ->
    state.$buffer().remove()
    state.endInput().endCommand()
    api

  command = ->
    return if state.$line
    state.beginInput() unless state.inputting
    state.beginCommand().commandDfd.promise()

  echo = (message) ->
    $line = state.$newLine()
    $line.get(0).scrollIntoView()
    state.endCommand()
    # animate
    state.echoDfd = $.Deferred()
    $line.animateChars string: message, completion: state.echoDfd
    state.echoDfd.promise()

  api = { clear, command, echo }

# simple subview
createPowerButton = (paper, $root) ->
  state = { power: off }
  center = $root.center()
  radius = { ring: 30, dot: 5 }
  # svg styling props often need to be attributes
  ring = paper.circle center.x, center.y, radius.ring
    .addClass 'ring'
    .attr 'strokeWidth', 2
  dot = paper.circle center.x, center.y, radius.dot
    .addClass 'dot'
  button = paper.group ring, dot
    .addClass 'power-button'
    .attr 'opacity', 0
  # animate
  ms = 300
  e = mina.easeinout
  button.hover( ->
    ring.animate { r: radius.ring / 2 }, ms, e
    dot.animate { r: radius.dot * 2 }, ms, e
    state.power = on
    delay ms, ->
      return unless state.power is on
      $root.trigger 'power:on'
      return
    return
  , ->
    ring.animate { r: radius.ring }, ms, e
    dot.animate { r: radius.dot }, ms, e
    state.power = off
    return
  )

  toggle = (visible, completion) ->
    opacity = if visible then 1 else 0
    button.animate { opacity }, ms, e, completion
    return

  api = { toggle }

# a basic subview factory
createShapeDrawer = (paper, $root) ->
  { max, min, round, sqrt } = Math

  draw = ({ relSize, relX, relY, shape }) ->
    relSize = max .1, relSize / 2
    relX = min .9, max .1, relX
    relY = min .8, max .2, relY
    # convert to absolute
    stage = $root.innerSize()
    size = round stage.w * relSize
    x = round (stage.w - size) * relX; mx = x + size
    y = round (stage.h - size) * relY; my = y + size
    r = size / 2; cx = x + r; cy = y + r
    # draw
    el = switch shape
      when 'circle' then paper.circle cx, cy, r
      when 'square' then paper.rect x, y, size, size, 6, 6
      when 'triangle' then paper.polygon [
        cx, y + my * (1 - sqrt(3) / 2), mx, my, x, my
      ]
      when 'semicircle' then paper.path(
        "M#{x} #{my}, L#{mx} #{my}, A#{r} #{r} 0 0 0 #{x} #{my}, Z"
      )
      else throw 'unsupported shape'
    el.addClass 'shape'
      .attr 'strokeWidth', 2
    el

  api = { draw }

initButtons = ($context) ->
  $context.on 'button:click', (e, name) ->
    $button = $context.find "[type=button][name=#{name}]"
    return unless $button.length
    $button.addClass 'hover active'
    delay 300, -> $button.trigger('click').removeClass 'hover active'

  api = {}

initMainScreen = ($context) ->
  $root = $context.find '.main-screen'
  $cli = $root.find '[data-module=cli]'
  $canvas = $root.find '[data-module=canvas]'
  paper = Snap "##{$canvas.attr('id')}"

  cli = createCLI $cli, $root
  shapes = createShapeDrawer paper, $canvas

  states = createStateMachine()
  states.push createOffState { states, paper, $canvas }
  states.push createGreetState { states, cli }
  states.push createGameState { states, shapes, paper, cli, $context }
  states.to 'off'

  api = {}

initSlidePanel = ($context) ->
  $root = $context.find '[data-module=slide-panel]'
  $cover = $root.find '.cover'
  $inside = $root.find '.inside'

  $cover.addClass '--closed'
  $cover.on 'click', (e) ->
    return unless $(e.currentTarget).is '.cover'
    $cover.toggleClass '--open --closed'
    return
  $context.on 'slide-panel:toggle', (e, visible) ->
    $cover
      .toggleClass '--open', visible
      .toggleClass '--closed', not visible
    return

  api = {}
```
