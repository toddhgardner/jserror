(function listenerWithErrorClosure(window) {

  var originalFn = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function addEventListener(event, callback, onerror) {

    originalFn.call(this, event, function addEventListenerCallback() {
      try {

        callback();

      } catch(e) {
        if (typeof onerror === 'function') {
          onerror(e);
        } else {
          throw e;
        }
      }
    });

  };

})(window);