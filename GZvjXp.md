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
    <div class="buttons-panel -slide-panel-motion -slide-panel-skin" data-module="slide-panel">
      <div class="cover"><div class="symbol">&middot;</div></div>
      <nav class="inside -bar-layout">
        <button class="-button-skin" name="A" type="button">A</button>
        <button class="-button-skin" name="B" type="button">B</button>
        <button class="-button-skin" name="C" type="button">C</button>
        <button class="-button-skin" name="D" type="button">D</button>
      </nav>
    </div><!--/btn-panel-->
  </div><!--/device-body-->
</div><!--/device-->

</div><!--/container-->
```

```css
:root {
  --bezel: 15px;
  --corner-radius: 15px;
  --corner-radius-inner: 7px;
  --device-height: 300px;
  --device-width: 300px;
  --display-height: 190px;
  --intro-transition-duration: .6s;
  --panel-base-color: #bbb;
  --panel-dark-color: #6f6f6f;
  --panel-darker-color: #3c3c3c;
  --panel-depth: 2px;
  --panel-diffuse-shadow-size: 10px;
  --panel-texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAD0lEQVQYV2NgYGAwZgABAAE8ADSqC3qCAAAAAElFTkSuQmCC';
  --slide-panel-inside-color: #777;
  --slide-panel-inside-dark-color: #444;
  --slide-panel-inside-darker-color: #2b2b2b;
}

.-button-skin {
  --depth: 2px;
  background-color: var(--panel-base-color);
  background-image: linear-gradient(var(--light-5), transparent);
  border: 0;
  border-radius: var(--corner-radius-inner);
  /* front to back */
  box-shadow:
    inset 0 0 0 1px var(--light-3), /* inner edge */
    inset 0 0 var(--corner-radius) var(--shade-2), /* contour */
    0 var(--depth) 0 var(--panel-dark-color), /* edge */
    0 calc(var(--depth) + 1px) 0 var(--panel-darker-color), /* edge shadow */
    0 var(--depth) 3px 1px var(--shade-5); /* diffuse */
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
.-button-skin.hover,
.-button-skin:hover {
  background-image: linear-gradient(var(--light-9), transparent);
  color: #08f;
}
.-button-skin.active,
.-button-skin:active {
  background-color: #a2a2a2;
  background-image: linear-gradient(var(--light-5), transparent);
  /* front to back */
  box-shadow:
    inset 0 0 1px 1px var(--shade-2), /* shadow */
    inset 0 2px 3px 1px var(--shade-2), /* shadow */
    inset 0 0 var(--corner-radius) var(--shade-1), /* contour */
    0 calc(var(--depth) * -1) 0 var(--slide-panel-inside-darker-color), /* socket edge */
    0 0 0 1px var(--slide-panel-inside-dark-color); /* socket edge */
  margin-bottom: calc(var(--depth) * -1);
  margin-top: calc(var(--depth) - 1px);
}

.-display-skin {
  background-color: #111;
  background-image: linear-gradient(var(--light-2), transparent);
  border-color: transparent;
  border-radius: var(--corner-radius-inner);
  border-style: solid;
  border-width: 2px 1px 0; /* edges */
  /* front to back */
  box-shadow:
    inset 0 0 15px var(--shade-5), /* shadow */
    inset 0 0 100px var(--shade-5), /* diffuse */
    0 0 2px var(--light-8), /* edge */
    0 0 var(--corner-radius-inner) 1px var(--light-8); /* highlight */
}
.-display-skin>.scanlines {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAD0lEQVQYV2NgYGAwZgABAAE8ADSqC3qCAAAAAElFTkSuQmCC');
  border-radius: calc(var(--corner-radius-inner) - 1px);
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
  border-radius: calc(var(--corner-radius-inner) - 1px);
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

.-panel-skin {
  background-color: var(--panel-base-color);
  background-image:
    linear-gradient(var(--light-5), transparent var(--display-height)),
    url('var(--panel-texture)');
  border-radius: var(--corner-radius);
}

.-slide-panel-skin .cover {
  background: var(--panel-base-color) url('var(--panel-texture)') repeat;
}

nav.inside.-bar-layout {
  --bar-layout-gutter: 11px;
}
```

```scss
// using %centered
// using %clearfix
// using %disabled-mobile-interactions
// using light(), shade()

// section: vars

$bezel: 15px;
$corner-radius: 15px;
$corner-radius-inner: 7px;
$button-gutter: 11px;
$device-height: 300px;
$device-width: 300px;
$display-height: 190px;
$intro-transition-duration: .6s;
$panel-base-color: #bbb;
$panel-depth: 2px;
$panel-diffuse-shadow-size: 10px;
$slide-panel-inside-color: #777;

$display-width: $device-width - (2 * $bezel);
$display-size: 330px; // hypotenuse

// section: includes

$panel-shadows: ( // front to back
  inset 0 0 $bezel shade(.3), // contour
  inset 0 0 2px shade(.3), // inner edges
  inset 0 0 1px 1px shade(.1),
  0 1px 0 darken($panel-base-color, 25%), // edge
  0 ($panel-depth + 1px) 0 darken($panel-base-color, 20%), // edge
  0 ($panel-depth + 2px) 0 darken($panel-base-color, 30%) // edge shadow
);
$panel-shadow-diffuse: 0 ($panel-depth + 1px) $panel-diffuse-shadow-size shade(.8);
$panel-shadow-diffuse-afloat: 0 ($panel-depth + 10px) ($panel-diffuse-shadow-size + 10px) 2px shade(.4);

%slide-panel-skin {
  border: {
    bottom: 1px solid light(.5);
    top: 1px solid shade(.2);
  }
  cursor: pointer;
  .cover {
    border: {
      bottom: 1px solid shade(.2);
      top: 1px solid light(.5);
    }
    padding-top: 1px;
    .symbol {
      box-shadow: ( // TODO: refactor
        inset 0 0 $bezel shade(.3), // contour
        inset 0 0 2px shade(.3), // inner edges
        inset 0 0 1px 1px shade(.1)
      );
      color: #aaa;
      font: bold 56px Helvetica, sans-serif;
      text-align: center;
      text-shadow: (
        0 -1px 0 shade(.3),
        0 1px 0 light(.5)
      );
    }
  }
  .inside {
    $rubber-texture: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAYAAABLLYUHAAAAGklEQVQIW2NkQAKMMPb///+N4RygoA8yhwEAYOgDgYLmjHMAAAAASUVORK5CYII=';
    background: $slide-panel-inside-color url($rubber-texture);
    border {
      color: shade(.5) shade(.4) light(.8);
      style: solid;
      width: 2px 1px 1px;
    }
    box-shadow: ( // front to back
      inset 0 1px $bezel shade(.5), // diffuse
      inset 0 $panel-depth 0 darken($slide-panel-inside-color, 5%), // inner edge
      inset 0 ($panel-depth + 1px) 0 darken($slide-panel-inside-color, 15%) // edge shadow
    );
  }
  .cover.open  {
    box-shadow: (
      0 0 2px shade(.5),
      0 0 ($panel-diffuse-shadow-size * 1.5) shade(.8),
      0 0 0 shade(.2)
    );
  }
}

%slide-panel-motion {
  .cover {
    transition: {
      property: box-shadow, transform;
      duration: .4s;
    }
    will-change: box-shadow, transform;
    &.open {
      $hinge-size: round($bezel / 3);
      transform: translateX(-($device-width - $hinge-size));
      transition-timing-function: cubic-bezier(.8, 0, .2, 1.1);
    }
    &.closed {
      transform: translateX(0);
      transition-timing-function: cubic-bezier(.9, 0, .1, 1);
    }
  }
}

// section: main, layout

body {
  $mesh: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAPElEQVQYV2OcNWuWDyMj4/P///9LpqWlbWGcOXOmJAMUpKenP2ecPXu28b9//54xMTFJpaamnmWEycJoAFZbFAVaNOxjAAAAAElFTkSuQmCC';
  background: #eee url($mesh) repeat;
  >.container {
    background: linear-gradient(to bottom, light(.5), transparent, shade(.2));
    height: 100%;
    position: absolute;
    width: 100%;
  }
}

.device {
  @extend %centered;
  height: $device-height;
  text-align: left;
  width: $device-width;
  ::selection {
    background: transparent;
  }
  * {
    @extend %disabled-mobile-interactions;
  }
  >.body {
    box-shadow: join($panel-shadows, ($panel-shadow-diffuse-afloat,));
    padding: $bezel 0;
    transform: translateY(-30%) scale(1.1);
    transition: (
      box-shadow .2s ease-out .2s,
      transform $intro-transition-duration cubic-bezier(0, .9, .3, 1)
    );
    will-change: box-shadow, transform;
  }
  &.ready>.body {
    box-shadow: join($panel-shadows, ($panel-shadow-diffuse,));
    transform: translateY(0) scale(1);
  }
  .buttons-panel {
    @extend %slide-panel-motion;
    @extend %slide-panel-skin;
    margin-bottom: $bezel;
    opacity: 0;
    transition: opacity .2s ease-in-out $intro-transition-duration;
  }
  &.ready .buttons-panel {
    opacity: 1;
  }
  .main-screen {
    height: $display-height;
    margin: {
      bottom: $bezel;
      left: $bezel;
      right: $bezel;
    }
    position: relative;
  }
}

.device .buttons-panel {
  position: relative;
  .cover {
    $height: 46px;
    height: $height;
    line-height: $height;
    left: 0;
    overflow: hidden;
    position: absolute;
    width: 100%;
    .symbol {
      // fills container
      line-height: $height;
      margin-top: -$panel-diffuse-shadow-size;
      padding: $panel-diffuse-shadow-size 0;
    }
  }
  nav.inside {
    padding: ($button-gutter - 1px) $bezel ($button-gutter + 1px);
    button {
      padding: 6px 10px 5px;
    }
  }
}

.device .main-screen {
  line-height: 0;
  overflow: scroll;
  >.body {
    cursor: crosshair;
    padding: $bezel;
  }
  >.body .cli input.invisible {
    // fixed so it doesn't scroll
    // only positions correctly as last child,
    // so focusing doesn't change scroll position
    position: fixed;
  }
  >.body .canvas {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
  >.scanlines,
  >.tint {
    $edges: 2px;
    height: $display-height - $edges;
    // fixed so it doesn't scroll
    // only positions correctly as first child
    position: fixed;
    width: $display-width - $edges;
  }
  html.no-touch & {
    >.scanlines { z-index: 9; }
    >.tint { z-index: 10; }
    &:hover {
      >.body .canvas { z-index: 20; }
    }
  }
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
  $root.addClass 'ready'
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
    input: '<input type="text" class="invisible">'
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

  $cover.addClass 'closed'
  $cover.on 'click', (e) ->
    return unless $(e.currentTarget).is '.cover'
    $cover.toggleClass 'open closed'
    return
  $context.on 'slide-panel:toggle', (e, visible) ->
    $cover
      .toggleClass 'open', visible
      .toggleClass 'closed', not visible
    return

  api = {}
```
