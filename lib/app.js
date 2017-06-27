var keyboard = {};

//views
//
var boardView;
var tileView;
var playerView;
var player1View;
var player2View;
var sceneryView;

window.onload = function() {
  //Get app anchor
  var app = document.getElementById("app");

  var game = new Game();
  game.start();
  //Create views
  boardView = createBoard();
  tileView = createFloorTileViewContainer();
  playerView = createPlayerViewContainer();
  sceneryView = createSceneryViewContainer(game._board._stage);

  app.appendChild(boardView);
  boardView.appendChild(tileView);
  boardView.appendChild(sceneryView);
  boardView.appendChild(playerView);

  //FIRST RENDER function
  setInterval(function() {


    renderPlayerView(player1, player1View);
    renderPlayerView(player2, player2View);
  }, TIME_DELTA);
}
//Functions

function render(state) {
  renderPlayerView(state.player1, player1View);
  renderPlayerView(state.player2, player2View);
}

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
