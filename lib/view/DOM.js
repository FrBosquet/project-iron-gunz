function scaleElement(element, factor) {
  element.style.transform = "scale".concat("(", factor, ")");

}


/**
 * Moves a Div to a desired position
 *
 * @param  {DOMelement} element the element to move
 * @param  {float} x       the X coordinate
 * @param  {float} y       the Y coordinate
 */
function translateElement(element, x, y) {
  element.style.transform = "translate".concat("(", x * BOARD_TILESIZE, "px,", y * BOARD_TILESIZE, "px)");
}

function measureElement(element, width, height) {
  element.style.width = width * BOARD_TILESIZE + "px";
  element.style.height = height * BOARD_TILESIZE + "px";
}

function createElement(className, id) {
  var newDiv = document.createElement("DIV");
  if (className != null) newDiv.className = className;
  if (id != null) newDiv.id = id;
  return newDiv;
}
