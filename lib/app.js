var keyboard = {};

//views
//
var boardView;
var tileViewContainer;
var playerViewContainer;
var player1View;
var player2View;
var sceneryViewContainer;
var shotViewContainer;
var shotsView;

window.onload = function() {
  //Create game
  var game = new Game();
  game.initialize();

  //Get app anchor
  var app = document.getElementById("app");
  //Create views
  boardView = createBoard();
  tileViewContainer = createFloorTileViewContainer();
  playerViewContainer = createPlayerViewContainer();
  player1View = playerViewContainer.children[0];
  player2View = playerViewContainer.children[1];
  sceneryViewContainer = createSceneryViewContainer(game._board._stage);
  shotViewContainer = createShotViewController();
  shotsView = {};

  //Add elements to the dom
  app.appendChild(boardView);
  boardView.appendChild(tileViewContainer);
  boardView.appendChild(sceneryViewContainer);
  boardView.appendChild(playerViewContainer);
  boardView.appendChild(shotViewContainer);

  //Make a first render to properly orientate players
  render(game.getState());

  //Start the game loop
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
  state.shots.forEach((s) => {
    if (shotsView[s._id] === undefined) {
      var newShot = createShotView(s._id);
      shotViewContainer.appendChild(newShot);
      shotsView[s._id] = newShot;
    }
    renderShotView(s, shotsView[s._id]);
  });
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
    y: 0,
    shot: false
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
  if (keyboard[keyscheme.SHOT]) {
    playerMovement.shot = true;
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
