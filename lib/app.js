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
var impactViewContainer;
var impactView;

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
  shotViewContainer = createShotViewContainer();
  impactViewContainer = createImpactViewContainer();
  shotsView = {};
  impactView = {};

  //Add elements to the dom
  app.appendChild(boardView);
  boardView.appendChild(tileViewContainer);
  boardView.appendChild(sceneryViewContainer);
  boardView.appendChild(playerViewContainer);
  boardView.appendChild(shotViewContainer);
  boardView.appendChild(impactViewContainer);

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

  //Render bullets
  state.shots.forEach((s) => {
    if (s._destroy) {
      shotViewContainer.removeChild(shotsView[s._id]);
      return; //If the element is removed, dont render it
    }
    if (shotsView[s._id] === undefined) {
      var newShot = createShotView(s._id);
      shotViewContainer.appendChild(newShot);
      shotsView[s._id] = newShot;
    }
    renderShotView(s, shotsView[s._id]);
  });

  //Render impacts
  state.impacts.forEach((i) => {
    if (i._destroy) {
      impactViewContainer.removeChild(impactView[i._id]);
      return;
    }
    if (impactView[i._id] === undefined) {
      var newImpact = createImpactView(i._id);
      impactViewContainer.appendChild(newImpact);
      renderImpactView(i, newImpact);
      impactView[i._id] = newImpact;
    }
  });
}

//Keyboard listeners
document.addEventListener("keydown", function(e) {
  keyboard[e.keyCode] = true;
}, false)

document.addEventListener("keyup", function(e) {
  keyboard[e.keyCode] = false;
}, false)
