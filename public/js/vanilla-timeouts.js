(function (document, window) {
  document.addEventListener("DOMContentLoaded", function () {

  // the containing "app"
  try {

    var timeoutErrorEl = document.getElementById("js-settimeout-error");
    var intervalErrorEl = document.getElementById("js-setinterval-error");
    var caughtErrorEl = document.getElementById("js-caught-error");
    var globalErrorEl = document.getElementById("js-global-error");

    window.onerror = function (message, file, line, col, error) {
      globalErrorEl.innerHTML += "----";
      globalErrorEl.innerHTML += "<div><strong>message:</strong>"+message+"</div>";
      globalErrorEl.innerHTML += "<div><strong>file:</strong>"+file+"</div>";
      globalErrorEl.innerHTML += "<div><strong>line:</strong>"+line+"</div>";
      globalErrorEl.innerHTML += "<div><strong>col:</strong>"+col+"</div>";

      // wow, webkit has this!
      if (error) {
        listErrorProperties(globalErrorEl, error);
      }
    };

    function triggerError() {
      throw new Error("an example error");
    }

    function setTimeoutError() {
      setTimeout(function () {
        try {
          triggerError();
        } catch(error) {
          listErrorProperties(timeoutErrorEl, error);
          throw error;
        }
      }, 1);
    }

    function setIntervalError() {
      var interval = setInterval(function () {
        try {
          triggerError();
        } catch(error) {
          clearInterval(interval);
          listErrorProperties(intervalErrorEl, error);
          throw error;
        }
      }, 1);
    }

  }
  catch(error) {
    listErrorProperties(caughtErrorEl, error);
  }

  setIntervalError();
  setTimeoutError();

  });
})(document, window);




