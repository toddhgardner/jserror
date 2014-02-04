(function (window, document) {

  var originalAddEventListener = Element.prototype.addEventListener;

  Element.prototype.addEventListener = function wrappedAddEventListener(event, callback, onerror) {

    originalAddEventListener.call(this, event, function() {

      try {
        callback();
      } catch(error) {
        if (typeof onerror === 'function') {
          onerror(error);
        } else {
          throw error;
        }
      }
    });

  };

})(window, document);