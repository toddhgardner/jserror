(function asyncErrorClosure (window) {

  patchFunctionForAsyncError(window, 'setTimeout', 0);
  patchFunctionForAsyncError(Element.prototype, 'addEventListener', 1);

  // Monkey-patches host functions adding support for global error
  // objects and async stacktraces.
  // @obj (object)
  // reference to host object of the function to be patched.
  // IE `window`
  //
  // @functionName (string)
  // name of the function to be patched
  // IE `setTimeout`
  //
  // @callbackIndex (int)
  // index in the arguments for the host function where the callback
  // is passed.
  function patchFunctionForAsyncError (obj, functionName, callbackIndex) {
    var originalFn = obj[functionName];
    obj[functionName] = function asyncWrapped() {

      var asyncStack,
          bindTicks,
          callback = arguments[callbackIndex];

      try {
        throw new Error();
      } catch(e) {
        asyncStack = e.stack;
        bindTicks = Date.now();
      }

      function getAsyncStack() {
        var boundaryTime = Date.now() - bindTicks;
        return "\r\n" +
          "/--------------------------/\r\n" +
          " Async (" + boundaryTime + "ms)\r\n" +
          "/--------------------------/\r\n" +
          asyncStack;
      }

      function asyncWrappedCallback() {
        try {
          callback();
        } catch(e) {
          e.stack += getAsyncStack();
          window.onerror(e.name + ": " + e.message || "", e.lineNumber || "", e.columnNumber || "", e.fileName || "", e);
        }
      }

      var args = Array.prototype.slice.call(arguments);
      args[callbackIndex] = asyncWrappedCallback;
      originalFn.apply(this, args);
    };
  }

})(window);