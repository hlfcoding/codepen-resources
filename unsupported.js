(function() {
  'use strict';

  var body = document.body;
  var supported = true;

  try {
    eval('()=>{}');
  } catch (e) {
    supported = false;
  }

  if (!CSS.supports || !CSS.supports('(--custom-property: 0)')) {
    supported = false;
  }

  if (!supported) {
    alert('To view, you must upgrade your browser!');

    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }
  }

}());
