(function() {
  'use strict';

  console.clear();

  // ---

  function createStateMachine() {
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

  function delay(duration, completion) {
    return setTimeout(resolveCompletion(completion), duration);
  }

  function delayed(duration, completion) {
    return function() { delay(duration, completion); };
  }

  function fixActiveStateForTouch(el) {
    return el.addEventListener('touchstart', (function() {}), false);
  }

  function resolveCompletion(obj) {
    if (obj.resolve) { return obj.resolve.bind(obj); }
    if (typeof obj === 'function') { return obj; }
    throw 'unsupported input';
  }

  function setupDisplayClasses(context) {
    let target = context.querySelector('[data-display-target]');
    console.assert(target);
    let radios = context.querySelectorAll('[name=display]');
    console.assert(radios.length);
    let classNames = Array.from(radios).map(r => r.getAttribute('value'));
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

  function showOnReady(completion) {
    if (window.$ && $.fn.ready) {
      $(function() {
        $('.show-on-ready').attr('data-ready', '');
        if (completion) { completion(); }
      });
    } else {
      document.onreadystatechange = function() {
        if (document.readyState !== 'complete') { return; }
        Array.from(document.querySelectorAll('.show-on-ready')).forEach((el) => {
          el.setAttribute('data-ready', '');
        });
        if (completion) { completion(); }
      };
    }
  }

  function test(subject, fn, options = {}) {
    let { run } = Object.assign({ run: true }, options);
    function ok(assertion) {
      console.assert(assertion);
      if (assertion) {
        console.log('assertion ok');
      }
    }
    function wrapped() {
      console.group(name);
      try {
        fn(subject, ok);
      } finally {
        console.groupEnd();
      }
    }
    if (run) {
      setTimeout(wrapped);
    } else {
      subject._test = wrapped;
    }
  }

  let debugMixin = {
    _logCleared: true,
    log(label, ...args) {
      if (!this.debug) { return; }
      if (!this._logCleared) {
        console.clear();
        this._logCleared = true;
      }
      console.log(label, args);
    },
  };

  window.commonHelpers = {
    createStateMachine, debugMixin, delay, delayed, fixActiveStateForTouch,
    resolveCompletion, setupDisplayClasses, showOnReady, test,
  };

  if (window.$ && $.Deferred) {
    Object.assign(commonHelpers, {
      delayDeferred(duration, ...args) {
        let deferred = $.Deferred();
        deferred.reject = deferred.reject.bind(deferred, ...args);
        deferred.resolve = deferred.resolve.bind(deferred, ...args);
        delay(duration, deferred);
        return deferred;
      }
    });
  }

  // ---

  if (window.$ && $.fn) {
    Object.assign($.fn, {

      animateChars(delegate) {
        let completion = resolveCompletion(delegate.completion);
        let chars = delegate.string.split('');
        let ms = delegate.stepDuration || 30;
        let step = () => {
          if (!chars.length) { return completion(); }
          this.text(this.text() + chars.shift());
          delay(ms, function() { requestAnimationFrame(step); });
        };
        requestAnimationFrame(step);
        return this;
      },

      center() {
        return { x: this.innerWidth() / 2, y: this.innerHeight() / 2 };
      },

      cssDuration(type) {
        function convert(s) { return parseInt(parseFloat(s) * 1000); }
        switch (type) {
          case 'transition':
            return convert(this.css('transition-duration'));
          default:
            return console.warn('unsupported');
        }
      },

      innerSize() {
        return { h: this.innerHeight(), w: this.innerWidth() };
      },

      keyboardHandling(obj) {
        if (obj === false) { return this.off('keydown.common change.common'); }
        let delegate = obj;
        const backspaceKey = 8;
        const deleteKey = 46;
        const enterKey = 13;
        let getChar = (() => this.val().replace(this.data('oldValue') || '', ''));
        return this.on('keydown.common', (e) => {
          switch (e.keyCode) {
            case backspaceKey:
            case deleteKey:
              delegate.onDelete();
              break;
            case enterKey:
              delegate.onEnter();
              return false;
            default:
              delay(0, function() { return delegate.onChar(getChar()); });
              break;
          }
          this.data('oldValue', this.val());
        });
      },

      wait(...args) {
        function dataKey(id) { return `wait-${id}-promise`; }
        let isGet = args.length === 1;
        if (isGet) {
          let [id] = args;
        } else {
          let [delay, id] = args;
          let deferred = $.Deferred();
          let promise = deferred.promise();
          this.data(dataKey(id), promise);
          setTimeout(function() { return deferred.resolve(); }, delay);
        }
        return this.data(dataKey(id));
      },

      isWaiting(waitId) {
        let wait = this.wait(waitId);
        if (!wait) { return false; }
        return wait.state() !== 'resolved';
      }

    });
  }

}());
