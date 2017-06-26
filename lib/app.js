var board;

window.onload = function() {
  console.log("loaded");
  var app = document.getElementById("app");

  var boardView = createElement("relative", "board");
  measureElement(boardView, BOARD_WIDTH * 32, BOARD_HEIGHT * 32);
  scaleElement(boardView, VIEW_ZOOM);
  var tilesView = createElement("relative");
  var sceneryView = createElement("relative");

  boardView.appendChild(tilesView)
  boardView.appendChild(sceneryView);
  app.appendChild(boardView);

  board = new Board();
  board.initializeStage();


  for (var i = 0; i < BOARD_WIDTH; i++) {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
      var tile = createElement("floortile posicionable");
      transformElement(tile, i * 32, j * 32);
      tilesView.appendChild(tile);
    }
  }

  //BOXES AND COLUMNS
  var allScenery = [];
  board._stage.forEach(function(arr) {
    allScenery = allScenery.concat(arr.filter(function(val) {
      return val !== null;
    }))
  });

  console.log(allScenery);
  allScenery.forEach(function(val) {
    var sceneryItem = createElement("posicionable " + ((val instanceof Column) ? "columnn" : "box"));
    transformElement(sceneryItem, val._posX * 32, val._posY * 32);
    sceneryView.appendChild(sceneryItem);
  })
}
