(function printPropsClosure (window, document) {
  var printCounter = 0;

  //stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object
  function getAllProperties (obj) {
    var allProps = [],
        props,
        curr = obj;

    do {
      props = Object.getOwnPropertyNames(curr);
      props.forEach(function propertyIterator (prop) {
        if (allProps.indexOf(prop) === -1) {
          allProps.push(prop);
        }
      });
    } while( curr = Object.getPrototypeOf(curr) );

    return allProps.sort();
  }


  function prepareValueForPrint(value) {
    return value.toString()
         .replace(/(\r\n|\n|\r)/gm,"<br>") // rendering newlines
         .replace(/(\t|\s\s)/gm,"&nbsp;&nbsp;"); // rendering indents
  }


  window.printProps = function printProps(obj, elementId) {
    var element = document.getElementById(elementId),
        hasStack = false,
        innerPrintCounter = 0;
    printCounter++;

    element.innerHTML = "" +
      "<table class='table'>" +
        "<thead><tr>" +
          "<th>Prop</th><th>Value</th></tr>" +
        "</thead><tbody id='print-prop-table-"+ printCounter +"'>" +
        "</tbody>"+
      "</table>";

    var printTable = document.getElementById("print-prop-table-"+ printCounter);

    // in case we were passed a primitive type
    if (typeof obj !== 'object') {
      printTable.innerHTML += "<tr><td></td><td>"+obj+"</td></tr>";
      return;
    }

    getAllProperties(obj).forEach(function propertyIterator(prop) {
      var value;
      innerPrintCounter++;

      // some special processing necessary for stacks in Mozilla
      if (prop === 'stack') {
        hasStack = true;
      }

      if (typeof obj[prop] === "function") {
        return;
      }

      if (typeof obj[prop] === "object" && prop !== "__proto__") {

        // Recursion!
        printTable.innerHTML += "" +
          "<tr>" +
            "<td>"+prop+"</td>" +
            "<td id='inner-print-prop-table-"+innerPrintCounter+"'></td>" +
          "</tr>";
        printProps(obj[prop], "inner-print-prop-table-" + innerPrintCounter);

      }
      else {
        printTable.innerHTML += "" +
          "<tr>" +
            "<td>"+prop+"</td>" +
            "<td>"+prepareValueForPrint(obj[prop])+"</td>" +
          "</tr>";
      }

    });

    // weird Mozilla issue where the stack property doesn't enumerate,
    // but it does exist
    if (!hasStack && obj.stack) {
      printTable.innerHTML += "" +
        "<tr>" +
          "<td>stack</td>" +
          "<td>"+prepareValueForPrint(obj.stack)+"</td>" +
        "</tr>";
    }
  };

})(window, document);
