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
var effectViewContainer;
var effectView;
var uiView;

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
  effectViewContainer = createEffectViewContainer();
  shotsView = {};
  effectView = {};

  //Add elements to the dom
  app.appendChild(boardView);
  boardView.appendChild(tileViewContainer);
  boardView.appendChild(sceneryViewContainer);
  boardView.appendChild(playerViewContainer);
  boardView.appendChild(shotViewContainer);
  boardView.appendChild(effectViewContainer);

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
  if (state.shots.length !== 0) {
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
  } else {
    //If backwards rendering, remove all childs
    emptyView(shotViewContainer);
  }
  //Render effects
  state.effects.forEach((e) => {
    if (state.effect.length !== 0) {
      if (e._destroy) {
        effectViewContainer.removeChild(effectView[e._id]);
        return;
      }
      if (effectView[e._id] === undefined) {
        var newEffect = createEffectView(e._id, e._type);
        effectViewContainer.appendChild(newEffect);
        renderEffectView(e, newEffect);
        effectView[e._id] = newEffect;
      }
    } else {
      emptyView(effectViewContainer);
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
