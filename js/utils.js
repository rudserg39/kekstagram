'use strict';

/* eslint-enable */

(function () {

  var ESC_KEYCODE = 27;


  var DEBOUNCE_INTERVAL = 500; // ms

  var setInterval = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    setInterval: setInterval
  };

})();
