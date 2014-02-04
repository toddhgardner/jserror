(function (window, document) {

  // demonstration notes:
  // add this to callback.html and instrument script and wrapListenerErrors
  // to view performance information on wrapping.
  //
  // add `window.marks()` to interesting points. will take last-first call
  // check error to global
  //       error to handler
  //       successful return (with a new event)

  var started = false,
      marks = [];

  window.mark = function mark() {
    if (!window.performance) {
      return;
    }

    marks.push(window.performance.now());

    if (!started) {
      setTimeout(printPerformance, 1);
      started = true;
    }

  };

  function printPerformance() {
    var diff = marks[marks.length-1] - marks[0];
    document.body.innerHTML += "<h1>Total time: "+diff+" ms</h1>";
  }

})(window, document);