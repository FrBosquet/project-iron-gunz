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
  this._players[0]._id = "Player1";

  this._players[1] = new Player();
  this._players[1].setPosition({
    x: BOARD_WIDTH - 1,
    y: BOARD_HEIGHT / 2
  });
  this._players[1]._id = "Player2";

  /*
    INITIALIZE SCORES
  */

  this.points = [0, 0];
}


/**
 * Starts the game
 *
 * @param  {type} renderCallback the function in the controller to represent state in the dom
 */
Game.prototype.start = function(renderCallback) {
  this.facePlayers();
  /*
    INITIALIZE TIMER
  */
  this._timer = setInterval(function() {
    this._players[0].setMove(solvePlayerInput(PLAYER1_CONTROLS));
    this._players[1].setMove(solvePlayerInput(PLAYER2_CONTROLS));
    var isMoving1 = this._players[0].isMoving();
    var isMoving2 = this._players[1].isMoving();
    if (isMoving1) {
      this.solvePlayerCollisions(this._players[0]);
      this._players[0].update();
    }
    if (isMoving2) {
      this.solvePlayerCollisions(this._players[1]);
      this._players[1].update();
    }
    if (isMoving1 || isMoving2) this.facePlayers();

    renderCallback(this.getState());
  }.bind(this), TIME_DELTA);
}


/**
 * Returns an object describing the game state
 *
 * @return {Object}  the object state
 */
Game.prototype.getState = function() {
  return {
    player1: this._players[0],
    player2: this._players[1]
  }
}


/**
 * Solves the players collisions and restrict the movement
 *
 * @param  {Player} model The player object to restric
 * @return {Object}       An object with restrictions in the format {x: bool, y:bool}
 */
Game.prototype.solvePlayerCollisions = function(model) {
  var mx = model._posX;
  var my = model._posY;
  var vx = model._speedX;
  var vy = model._speedY;
  var wingspan = (model._wingspan / BOARD_TILESIZE) / 2;
  var targetX = mx + ((vx > 0 ? 1 : -1) * wingspan) + vx * MOVE_SPEED / TIME_DELTA;
  var targetY = my + ((vy > 0 ? 1 : -1) * wingspan) + vy * MOVE_SPEED / TIME_DELTA;

  var boxInX = this._board.isOccupied(targetX, my);
  var boxInY = this._board.isOccupied(mx, targetY);

  model.restrainSpeed({
    x: !boxInX,
    y: !boxInY
  });
}


/**
 * Sets the players rotation
 *
 */
Game.prototype.facePlayers = function() {
  var x1, x2, y1, y2, x3, y3, d, cos, angle, deg;

  x1 = this._players[0]._posX;
  y1 = this._players[0]._posY;
  x2 = this._players[1]._posX;
  y2 = this._players[1]._posY;
  x3 = x2 - x1;
  y3 = y2 - y1;

  d = Math.sqrt(Math.pow(x3, 2) + Math.pow(y3, 2));
  cos = x3 / d;
  angle = Math.acos(cos) * (y3 < 0 ? -1 : 1);
  deg = angle * 180 / Math.PI;

  this._players[0]._rotation = angle * 180 / Math.PI;;
  this._players[1]._rotation = (angle + Math.PI) * 180 / Math.PI;;
}
