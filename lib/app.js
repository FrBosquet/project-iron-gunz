var board;
var keyboard = {};

window.onload = function() {
  console.log("loaded");
  var app = document.getElementById("app");
  var boardView = createView("relative", "board");
  measureView(boardView, BOARD_WIDTH, BOARD_HEIGHT);
  scaleView(boardView, VIEW_ZOOM);
  var tilesView = createView("relative");
  var sceneryView = createView("relative");
  var playersView = createView("relative");

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

  var player1View = createView("posicionable soldier red", "player1");
  playersView.appendChild(player1View);
  // translateView(player1View, player1._posX, player1._posY);

  var player2View = createView("posicionable soldier blue", "player2");
  playersView.appendChild(player2View);
  // translateView(player2View, player2._posX, player2._posY);

  console.log(player1);

  //FLOORT TILES
  for (var i = 0; i < BOARD_WIDTH; i++) {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
      var tile = createView("floortile posicionable");
      translateView(tile, i, j);
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
    var sceneryItem = createView("posicionable " + ((val instanceof Column) ? "columnn" : "box"));
    translateView(sceneryItem, val._posX, val._posY);
    sceneryView.appendChild(sceneryItem);
  })

  //FIRST RENDER function
  setInterval(function() {
    player1.setMove(solvePlayerInput(PLAYER1_CONTROLS));
    player1.update();
    renderPlayerView(player1, player1View);

    player2.setMove(solvePlayerInput(PLAYER2_CONTROLS));
    player2.update();
    renderPlayerView(player2, player2View);
  }, TIME_DELTA);
}
//Functions

function solvePlayerInput(keyscheme) {
  var playerMovement = {
    x: 0,
    y: 0
  };
  if (keyboard[keyscheme.LEFT]) {
    playerMovement.x = 1;
  } else if (keyboard[keyscheme.RIGHT]) {
    playerMovement.x = -1;
  }
  if (keyboard[keyscheme.DOWN]) {
    playerMovement.y = 1;
  } else if (keyboard[keyscheme.UP]) {
    playerMovement.y = -1;
  }

  return playerMovement;
}


//Keyboard listeners
document.addEventListener("keydown", function(e) {
  keyboard[e.keyCode] = true;
}, false)

document.addEventListener("keyup", function(e) {
  keyboard[e.keyCode] = false;
}, false)
