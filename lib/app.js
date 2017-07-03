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
var uiScore1View;
var uiScore2View;
var audioMusicContainer;
var audioEffectsContainer;
var audioMusic;
var audioEffects;
var scanLines;
var screenMenus;
var screenIronhack;
var screenMe;
var screenMenu;
var screenBlack;
var screenWhite;
var startButton;

var p1Selectors;
var p2Selectors;

var p1SelectedChar;
var p2SelectedChar;


window.onload = function() {
  //Create game
  var game = new Game();


  //Load sounds
  audioEffectsContainer = createView("", "sound-effects");
  audioEffects = {};
  Object.keys(SOUND_EFFECTS).forEach(function(key) {
    audioEffects[key] = createEffectTag(SOUND_EFFECTS[key]);
    audioEffectsContainer.appendChild(audioEffects[key]);
  }.bind(this));

  audioMusicContainer = createView("", "sound-music");
  audioMusic = {};
  Object.keys(SOUND_MUSIC).forEach(function(key) {
    audioMusic[key] = createMusicTag(SOUND_MUSIC[key]);
    audioMusicContainer.appendChild(audioMusic[key]);
  }.bind(this));

  //Get app anchor
  var app = document.getElementById("app");
  //Create views

  app.appendChild(audioEffectsContainer);
  app.appendChild(audioMusicContainer);

  screenMenus = document.getElementById("menus");
  screenIronhack = document.getElementById("screen-ironhack");
  screenMe = document.getElementById("screen-me");
  screenMenu = document.getElementById("screen-menu");
  screenBlack = document.getElementById("screen-black");
  screenWhite = document.getElementById("screen-white");

  scanlines = document.getElementById("scanlines");
  startButton = document.getElementById("start-button");
  p1SelectedChar = document.getElementById("player1-selected-char");
  p2SelectedChar = document.getElementById("player2-selected-char");

  //start button
  startButton.addEventListener("click", () => {
    screenMenu.style.display = "none";
  });

  //char selector buttons
  document.getElementById("p1c1").addEventListener("click", () => selectPlayer(CHAR_ANNA, game, "_defaultP1", p1SelectedChar));
  document.getElementById("p1c2").addEventListener("click", () => selectPlayer(CHAR_MONEY, game, "_defaultP1", p1SelectedChar));
  document.getElementById("p1c3").addEventListener("click", () => selectPlayer(CHAR_MIKE, game, "_defaultP1", p1SelectedChar));
  document.getElementById("p1c4").addEventListener("click", () => selectPlayer(CHAR_FRANK, game, "_defaultP1", p1SelectedChar));
  document.getElementById("p2c1").addEventListener("click", () => selectPlayer(CHAR_ANNA, game, "_defaultP2", p2SelectedChar));
  document.getElementById("p2c2").addEventListener("click", () => selectPlayer(CHAR_MONEY, game, "_defaultP2", p2SelectedChar));
  document.getElementById("p2c3").addEventListener("click", () => selectPlayer(CHAR_MIKE, game, "_defaultP2", p2SelectedChar));
  document.getElementById("p2c4").addEventListener("click", () => selectPlayer(CHAR_FRANK, game, "_defaultP2", p2SelectedChar));

  document.getElementById("launch-game-button").addEventListener("click", () => {
    game.initialize();
    start(game)
  });
  //Intro
  audioMusic.theme.play();
  //hide the ironack presents screen
  setTimeout(() => screenIronhack.style.display = "none", 6000);
  setTimeout(() => {
    screenMe.style.display = "none";
    screenBlack.style.display = "none";
    screenWhite.classList.add("animation-blackout");
  }, 12000);
  // start(game);
}

function selectPlayer(char, reference, player, name) {
  reference[player] = char;
  name.innerHTML = char.name;
}

function start(game) {
  uiView = createUiScoreViewContainer();
  uiScore1View = uiView.children[0];
  uiScore2View = uiView.children[1];
  scanLines = createView("scanlines");
  boardView = createBoard();
  tileViewContainer = createFloorTileViewContainer();
  playerViewContainer = createPlayerViewContainer(game);
  player1View = playerViewContainer.children[1];
  player2View = playerViewContainer.children[0];
  sceneryViewContainer = createSceneryViewContainer(game._board._stage);
  shotViewContainer = createShotViewContainer();
  effectViewContainer = createEffectViewContainer();
  screenMenus.style.display = "none";
  audioMusic.theme.pause();
  audioMusic.stage.play();

  shotsView = {};
  effectView = {};

  //Add elements to the dom
  app.appendChild(boardView);
  boardView.appendChild(tileViewContainer);
  boardView.appendChild(sceneryViewContainer);
  boardView.appendChild(playerViewContainer);
  boardView.appendChild(shotViewContainer);
  boardView.appendChild(effectViewContainer);
  app.appendChild(uiView);

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
  renderUiScorePlayerView(state.player1, uiScore1View, state.points1);
  renderUiScorePlayerView(state.player2, uiScore2View, state.points2);

  //Render bullets
  if (state.shots.length !== 0) {
    state.shots.forEach((s) => {
      if (s._destroy) {
        shotViewContainer.removeChild(shotsView[s._id]);
        return; //If the element is removed, dont render it
      }
      if (shotsView[s._id] === undefined) {
        var newShot = createShotView(s._id, s._weapon);
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
  if (state.effects.length !== 0) {
    state.effects.forEach((e) => {
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
    });
  } else {
    emptyView(effectViewContainer);
  }
  if (state.rewind) {
    scanlines.style.display = "block";
    audioMusic.stage.pause();
    playSoundEffect("rewind");
  } else {
    scanlines.style.display = "none";
    audioMusic.stage.play();
    stopSoundEffect("rewind");
    //Play sound effects
    Object.keys(state.sound).forEach(function(effect) {
      playSoundEffect(effect);
    });
  }
}

function playSoundEffect(effect) {
  audioEffects[effect].currentTime = 0;
  audioEffects[effect].play();
}

function stopSoundEffect(effect) {
  audioEffects[effect].pause();
}

//Keyboard listeners
document.addEventListener("keydown", function(e) {
  keyboard[e.keyCode] = true;
}, false)

document.addEventListener("keyup", function(e) {
  keyboard[e.keyCode] = false;
}, false)
