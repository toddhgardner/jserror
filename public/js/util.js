
var errorElCounter = 0;
function printProps(error, element) {
  var hasStack = false;
  var innerElCounter = 0;
  errorElCounter++;

  element.innerHTML = "<table class='table'><thead><tr><th>Prop</th><th>Value</th></tr></thead><tbody id='error-table-"+ errorElCounter +"'></tbody></table>";
  var elementTable = document.getElementById("error-table-"+ errorElCounter);

  if (typeof error !== 'object') {
    elementTable.innerHTML += "<tr><td></td><td>"+error+"</td></tr>";
  }

  else {
    getAllProperties(error).forEach(function (prop) {
      innerElCounter++;

      if (prop === 'stack') {
        hasStack = true;
      }

      if (typeof error[prop] === "function") {
        return;
      }

      if (typeof error[prop] === "object" && prop !== "__proto__") {
        elementTable.innerHTML += "<tr><td>"+prop+"</td><td id='inner-error-"+innerElCounter+"'></td></tr>";
        var innerTableEl = document.getElementById("inner-error-"+ innerElCounter);
        printProps(error[prop], innerTableEl);
      }
      else {
        elementTable.innerHTML += "<tr><td>"+prop+"</td><td>"+error[prop].toString().replace(/(\r\n|\n|\r)/gm,"<br>").replace(/(\t|\s\s)/gm,"&nbsp;&nbsp;")+"</td></tr>";
      }

    });

    // weird Mozilla issue where the stack property doesn't enumerate, but it does exist
    if (!hasStack && error.stack) {
      elementTable.innerHTML += "<tr><td>stack</td><td>"+error.stack.toString().replace(/(\r\n|\n|\r)/gm,"<br>").replace(/(\t|\s\s)/gm,"&nbsp;&nbsp;")+"</td></tr>";
    }
  }

}

//stackoverflow.com/questions/8024149/is-it-possible-to-get-the-non-enumerable-inherited-property-names-of-an-object
function getAllProperties(obj){
  if (typeof obj !== "object") {
    return [];
  }

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
