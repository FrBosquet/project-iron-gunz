var board;
var keyboard = {};

window.onload = function() {
  console.log("loaded");
  var app = document.getElementById("app");
  var boardView = createElement("relative", "board");
  measureElement(boardView, BOARD_WIDTH, BOARD_HEIGHT);
  scaleElement(boardView, VIEW_ZOOM);
  var tilesView = createElement("relative");
  var sceneryView = createElement("relative");
  var playersView = createElement("relative");

  boardView.appendChild(tilesView)
  boardView.appendChild(sceneryView);
  boardView.appendChild(playersView);
  app.appendChild(boardView);

  board = new Board();
  board.initializeStage();

  var player1 = new Player();
  player1.setPosition({
    x: 0,
    y: BOARD_HEIGHT / 2
  });
  var player2 = new Player();
  player2.setPosition({
    x: BOARD_WIDTH - 1,
    y: BOARD_HEIGHT / 2
  });

  var player1View = createElement("posicionable soldier-red", "player1");
  playersView.appendChild(player1View);
  translateElement(player1View, player1._posX, player1._posY);


  console.log(player1);

  //FLOORT TILES
  for (var i = 0; i < BOARD_WIDTH; i++) {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
      var tile = createElement("floortile posicionable");
      translateElement(tile, i, j);
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

  allScenery.forEach(function(val) {
    var sceneryItem = createElement("posicionable " + ((val instanceof Column) ? "columnn" : "box"));
    translateElement(sceneryItem, val._posX, val._posY);
    sceneryView.appendChild(sceneryItem);
  })

  //FIRST RENDER function
  setInterval(function() {
    var player1movement = {
      x: 0,
      y: 0
    };
    if (keyboard[68]) {
      player1movement.x = 1;
    } else if (keyboard[65]) {
      player1movement.x = -1;
    }
    if (keyboard[83]) {
      player1movement.y = 1;
    } else if (keyboard[87]) {
      player1movement.y = -1;
    }
    player1.setMove(player1movement);
    player1.update();

    translateElement(player1View, player1._posX, player1._posY);
  }, TIME_DELTA);

}

//Keyboard listeners
document.addEventListener("keydown", function(e) {
  keyboard[e.keyCode] = true;
}, false)

document.addEventListener("keyup", function(e) {
  keyboard[e.keyCode] = false;
}, false)
