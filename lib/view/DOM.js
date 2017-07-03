function scaleView(element, factor) {
  element.style.transform = "scale".concat("(", factor, ")");
}

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

function createView(className, id, childs) {
  var newDiv = document.createElement("DIV");
  if (className) newDiv.className = className;
  if (id) newDiv.id = id;
  if (childs) appendChildToView(newDiv, childs);
  return newDiv;
}

function appendChildsToView(element, childs) {
  childs.forEach((child) => element.appendChild(child));
}

function emptyView(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
