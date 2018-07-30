export function createStateMachine() {
  let states = [];
  function getActiveState() { return states._activeState; }
  function setActiveState(next) {
    function completion() {
      states._activeState = null;
      return states.to(next);
    }
    let promise = getActiveState().leave(); // invoke callback
    if (promise) {
      promise.then(completion);
    } else {
      completion();
    }
  }
  Object.assign(states, {
    _activeState: null,
    to(nameOrState) {
      if (getActiveState()) {
        return setActiveState(nameOrState);
      }
      states._activeState = (
        (typeof nameOrState === 'string') ?
        states.find((s) => s.name === nameOrState) : nameOrState
      );
      getActiveState().enter(); // invoke callback
    },
    next() {
      let i = states.indexOf(getActiveState());
      if (i === -1) {
        throw 'bad index';
      }
      i = (states.length - 1 <= i) ? 0 : (i + 1);
      setActiveState(states[i]);
    },
  });
  return states;
}

export function animateChars({ completion, element, stepDuration, string }) {
  completion = resolveCompletion(completion);
  stepDuration = stepDuration || 30;
  let chars = string.split('');
  function step() {
    if (!chars.length) { return completion(); }
    element.textContent += chars.shift();
    delay(stepDuration, () => { requestAnimationFrame(step); });
  }
  requestAnimationFrame(step);
}

export function delay(duration, completion) {
  return setTimeout(resolveCompletion(completion), duration);
}

export function delayed(duration, completion) {
  return function() { delay(duration, completion); };
}

export function fixActiveStateForTouch(el) {
  return el.addEventListener('touchstart', (function() {}), false);
}

export function getComputedTransitionDurations(element) {
  return getComputedStyle(element).transitionDuration.split(',')
    .map(secondsString => parseFloat(secondsString) * 1000);
}

export function resolveCompletion(obj) {
  if (obj.resolve) { return obj.resolve.bind(obj); }
  if (typeof obj === 'function') { return obj; }
  throw 'unsupported input';
}

export function setupDisplayClasses(context) {
  let target = context.querySelector('[data-display-target]');
  console.assert(target);
  let radios = context.querySelectorAll('[name=display]');
  console.assert(radios.length);
  let classNames = [...radios].map(r => r.getAttribute('value'));
  console.assert(classNames.length);
  radios.forEach(radio => {
    radio.addEventListener('change', event => {
      target.classList.remove(...classNames);
      let className = event.target.value;
      console.assert(classNames.indexOf(className) !== -1);
      target.classList.add(className);
    });
  });
}

export function showOnReady(completion) {
  document.onreadystatechange = function() {
    if (document.readyState !== 'complete') { return; }
    [...document.querySelectorAll('.show-on-ready')].forEach((el) => {
      el.setAttribute('data-ready', '');
    });
    if (completion) { completion(); }
  };
}
