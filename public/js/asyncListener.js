(function asyncListenerClosure(window) {

  var originalFn = Element.prototype.addEventListener;
  Element.prototype.addEventListener = function addEventListener(event, callback, onerror) {

    var asyncStack,
        bindTicks;

    try {
      throw new Error();
    } catch(e) {
      asyncStack = e.stack;
      bindTicks = Date.now();
    }

    originalFn.call(this, event, function addEventListenerCallback() {
      try {

        callback();

      } catch(e) {
        e.stack += getAsyncStack();

        if (typeof onerror === 'function') {
          onerror(e);
        } else {
          throw e;
        }
      }
    });

    function getAsyncStack() {
      var boundaryTime = Date.now() - bindTicks;
      return "\r\n" +
        "/--------------------------/\r\n" +
        " Async (" + boundaryTime + "ms)\r\n" +
        "/--------------------------/\r\n" +
        asyncStack;
    }

  };

})(window);