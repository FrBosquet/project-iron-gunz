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
  game.initialize();
  //Create views
  boardView = createBoard();
  tileView = createFloorTileViewContainer();
  playerView = createPlayerViewContainer();
  player1View = playerView.children[0];
  player2View = playerView.children[1];
  sceneryView = createSceneryViewContainer(game._board._stage);

  app.appendChild(boardView);
  boardView.appendChild(tileView);
  boardView.appendChild(sceneryView);
  boardView.appendChild(playerView);

  game.start(render);
}
//Functions


/**
 * Cascade render every element
 *
 * @param  {Object} state current state of the game
 */
function render(state) {
  renderPlayerView(state.player1, player1View);
  renderPlayerView(state.player2, player2View);
}


/**
 *  Returns a player movement object given a keyscheme, reading keyboard state
 *
 * @param  {Object} keyscheme the keyscheme to parse keyboard state
 * @return {Object}           the player movement object
 */
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
