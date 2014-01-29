
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
