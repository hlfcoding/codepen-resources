export function createStateMachine() {
  let activeState;
  let states = [];
  Object.assign(states, {
    _activeState: null,
    async to(state) {
      if (typeof state === 'string') {
        state = states.find(s => s.name === state);
      }
      console.assert(state);
      if (activeState) {
        await activeState.leave();
      }
      activeState = state;
      await activeState.enter();
    },
    async next() {
      let i = states.indexOf(activeState);
      console.assert(i !== -1);
      i = (i + 1) % states.length;
      await states.to(states[i]);
    },
  });
  return states;
}

export function animateCharacters({ element, getStepDuration, string }) {
  getStepDuration = getStepDuration || (_ => 30);
  let queue = string.split('');
  return new Promise((resolve, reject) => {
    function step() {
      if (!queue.length) { return resolve(); }
      const character = queue.shift();
      element.textContent += character;
      delay(getStepDuration(character), () => { requestAnimationFrame(step); });
    }
    requestAnimationFrame(step);
  });
}

export function assert(expression, ...objects) {
  console.assert(expression, ...objects);
  return expression;
}

export function createAudioClipPlayer(element, tick = 10) {
  const initialState = () => ({ progressInterval: null, timeRange: null });
  let state = initialState();
  async function play(timeRange) {
    if (!element.paused) { return; }
    element.currentTime = timeRange[0];
    element.muted = false;
    try {
      await element.play();
      Object.assign(state, {
        progressInterval: setInterval(() => {
          if (element.currentTime >= timeRange[1]) { stop(); }
        }, tick),
        timeRange,
      });
    } catch(error) {
      console.error(error);
    }
  }
  function stop() {
    clearInterval(state.progressInterval);
    state = initialState();
    element.pause();
    element.muted = true;
  }
  stop();
  return { element, play };
}

export function delay(duration, completion) {
  if (completion == null) {
    return new Promise(function(resolve, reject) {
      setTimeout(resolve, duration);
    });
  }
  return setTimeout(completion, duration);
}

export function fixActiveStateForTouch(element) {
  return element.addEventListener('touchstart', (function() {}), false);
}

export function forEach(object, callback) {
  Object.keys(object).forEach(key => callback(key, object[key]));
}

export function getComputedTransitionDurations(element) {
  return getComputedStyle(element).transitionDuration.split(',')
    .map(secondsString => parseFloat(secondsString) * 1000);
}

export function setAttributes(element, attributes) {
  forEach(attributes, element.setAttribute.bind(element));
}

export function setupDisplayClasses(contextElement) {
  let targetElement = contextElement.querySelector('[data-display-target]');
  console.assert(targetElement);
  let radioElements = contextElement.querySelectorAll('[name=display]');
  console.assert(radioElements.length);
  let classNames = [...radioElements].map(el => el.getAttribute('value'));
  console.assert(classNames.length);
  radioElements.forEach(element => {
    element.addEventListener('change', event => {
      targetElement.classList.remove(...classNames);
      let className = event.target.value;
      console.assert(classNames.indexOf(className) !== -1);
      targetElement.classList.add(className);
    });
  });
}

export function setupKeyboardHandling({ element, keyHandlers }) {
  const { tagName, type } = element;
  if (tagName.toLowerCase() !== 'input' || type !== 'text') {
    throw 'unsupported input';
  }
  const keyCodes = {
    backspace: 8, 'delete': 46, enter: 13,
  };
  let oldValue = '';
  function keydownListener({ keyCode }) {
    switch (keyCode) {
      case keyCodes.backspace:
      case keyCodes.delete:
        keyHandlers.delete();
        break;
      case keyCodes.enter:
        keyHandlers.enter();
        return false;
      default:
        setTimeout(() => {
          const character = element.value.replace(oldValue, '');
          keyHandlers.character(character);
        });
        break;
    }
    oldValue = element.value;
  }
  element.addEventListener('keydown', keydownListener);
  function teardown() {
    element.removeEventListener('keydown', keydownListener);
  }
  return { teardown };
}

export function showOnReady(completion) {
  document.onreadystatechange = function() {
    if (document.readyState !== 'complete') { return; }
    [...document.querySelectorAll('.show-on-ready')].forEach(el => {
      el.setAttribute('data-ready', '');
    });
    if (completion) { completion(); }
  };
}
