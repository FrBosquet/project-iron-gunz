/**
 * Game - defines a game
 *
 * @return {Game}  the game
 */
function Game() {
  this._board = null;
  this._players = [];
  this._timer = -1;
  this._points = [];
}


/**
 * Makes a fresh start of the game
 *
 * @param  {function} renderCallback       a function to call for the rendering of the game
 */
Game.prototype.initialize = function() {
  /*
    INITIALIZE BOARD
  */
  this._board = new Board();
  this._board.initializeStage();

  /*
    INICIALIZE PLAYERS
  */
  this._players[0] = new Player();
  this._players[0].setPosition({
    x: 0,
    y: BOARD_HEIGHT / 2
  });

  this._players[1] = new Player();
  this._players[1].setPosition({
    x: BOARD_WIDTH - 1,
    y: BOARD_HEIGHT / 2
  });

  /*
    INITIALIZE SCORES
  */

  this.points = [0, 0];
}

Game.prototype.start = function(renderCallback) {
  /*
    INITIALIZE TIMER
  */
  this._timer = setInterval(function() {
    this._players[0].setMove(solvePlayerInput(PLAYER1_CONTROLS));
    this._players[1].setMove(solvePlayerInput(PLAYER2_CONTROLS));
    this._players[0].update();
    this._players[1].update();
    renderCallback(this.getState());
  }.bind(this), TIME_DELTA);
}

Game.prototype.getState = function() {
  return {
    player1: this._players[0],
    player2: this._players[1]
  }
}
