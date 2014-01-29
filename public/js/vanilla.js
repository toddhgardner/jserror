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







function listErrorProperties(element, error) {
  var hasStack = false;

  getAllProperties(error).forEach(function (prop) {
    if (prop === 'stack') {
      hasStack = true;
    }

    if (typeof error[prop] === "function") {
      return;
    }

    element.innerHTML += "<div><strong>"+prop+":</strong>"+error[prop]+"</div>";
  });

  if (!hasStack) {
    element.innerHTML += "<div><strong>magic stack:</strong>"+error.stack+"</div>";
  }
}





//stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object
function getAllProperties(obj){
  var allProps = [],
    props,
    curr = obj;

  do {
    props = Object.getOwnPropertyNames(curr);
    props.forEach(function(prop) {
      if (allProps.indexOf(prop) === -1) {
        allProps.push(prop);
      }
    });
  } while( curr = Object.getPrototypeOf(curr) );

  return allProps;
}
