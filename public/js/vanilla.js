(function (document, window) {
  document.addEventListener("DOMContentLoaded", function () {

    var triggerErrorEl = document.getElementById("js-trigger-error");
    var caughtErrorEl = document.getElementById("js-caught-error");
    var globalErrorEl = document.getElementById("js-global-error");

    window.onerror = function (message, file, line, col, error) {
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
      try {
        throw new Error("an example error");
      } catch(error) {
        listErrorProperties(triggerErrorEl, error);
        throw error;
      }
    }

    function wrappingFunction(func) {
      try {
        func();
      } catch(error) {
        listErrorProperties(caughtErrorEl, error);
        throw error;
      }
    }

    // anonymous functions calling functions
    wrappingFunction(function () {
      wrappingFunction(function () {
        triggerError();
      });
    });

  });
})(document, window);




