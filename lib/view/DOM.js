function scaleView(element, factor) {
  element.style.transform = "scale".concat("(", factor, ")");

}

/**
 * Moves a Div to a desired position
 *
 * @param  {DOMelement} element the element to move
 * @param  {float} x       the X coordinate
 * @param  {float} y       the Y coordinate
 */
function translateView(element, x, y) {
  element.style.transform = "translate".concat("(", x * BOARD_TILESIZE, "px,", y * BOARD_TILESIZE, "px)");
}

function transformView(element, x, y, r) {
  element.style.transform = "translate".concat("(", x * BOARD_TILESIZE, "px,", y * BOARD_TILESIZE, "px) rotate(", r, "deg)");

}

function measureView(element, width, height) {
  element.style.width = width * BOARD_TILESIZE + "px";
  element.style.height = height * BOARD_TILESIZE + "px";
}

function createView(className, id) {
  var newDiv = document.createElement("DIV");
  if (className != null) newDiv.className = className;
  if (id != null) newDiv.id = id;
  return newDiv;
}
