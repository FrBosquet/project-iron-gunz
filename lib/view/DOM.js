function scaleElement(element, factor) {
  element.style.transform = "scale".concat("(", factor, ")");

}

function transformElement(element, x, y) {
  element.style.transform = "translate".concat("(", x, "px,", y, "px)");
}

function measureElement(element, width, height) {
  element.style.width = width + "px";
  element.style.height = height + "px";
}

function createElement(className, id) {
  var newDiv = document.createElement("DIV");
  if (className != null) newDiv.className = className;
  if (id != null) newDiv.id = id;
  return newDiv;
}
