(function customErrorClosure(window) {

  window.CustomError = function CustomError(message) {

    this.name = "CustomError";
    this.message = message || "";

    try {
      throw new Error();
    } catch (e) {
      this.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
    }
  };

  window.CustomError.prototype = Error.prototype;

})(window);