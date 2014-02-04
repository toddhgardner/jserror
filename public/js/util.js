
var errorElCounter = 0;
function listErrorProperties(element, error) {
  var hasStack = false;
  errorElCounter++;

  element.innerHTML = "<table class='table'><thead><tr><th>Prop</th><th>Value</th></tr></thead><tbody id='error-table-"+ errorElCounter +"'></tbody></table>";
  var elementTable = document.getElementById("error-table-"+ errorElCounter);

  getAllProperties(error).forEach(function (prop) {

    if (typeof error[prop] === "function") {
      return;
    }

    if (prop === 'stack') {
      hasStack = true;
    }

    elementTable.innerHTML += "<tr><td>"+prop+"</td><td>"+error[prop]+"</td></tr>";
  });

  // weird Mozilla issue where the stack property doesn't enumerate, but it does exist
  if (!hasStack && error.stack) {
    elementTable.innerHTML += "<tr><td>stack</td><td>"+error.stack+"</td></tr>";
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
