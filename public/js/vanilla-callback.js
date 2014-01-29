(function (document, window) {
  document.addEventListener("DOMContentLoaded", function () {

    var listenerErrorButton = document.getElementById("js-button-listener-error");
    var listenerErrorEl = document.getElementById("js-listener-error");
    var namedListenerErrorButton = document.getElementById("js-button-named-listener-error");
    var namedListenerErrorEl = document.getElementById("js-named-listener-error");

    var caughtErrorEl = document.getElementById("js-caught-error");
    var globalErrorEl = document.getElementById("js-global-error");

    try {

      listenerErrorButton.addEventListener("click", function () {
        try {
          triggerError();
        } catch(error) {
          listErrorProperties(listenerErrorEl, error);
          throw error;
        }
      });

      namedListenerErrorButton.addEventListener("click", function onButtonClick() {
        try {
          triggerError();
        } catch(error) {
          listErrorProperties(namedListenerErrorEl, error);
          throw error;
        }
      });

    }
    catch(error) {
      listErrorProperties(caughtErrorEl, error);
    }

    function triggerError() {
      throw new Error("an example error");
    }

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

  });
})(document, window);




