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
    if (this._players[0].isMoving()) this.solveCollisions(this._players[0]);
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

Game.prototype.solveCollisions = function(model) {
  var momentum = model.getMomentum();

  var wingspan = 0;
  //If is a player, take wingspan into account
  if (model instanceof Player) {
    wingspan = model._wingspan / 2;
  }

  var lockX = false,
    lockY = false;
  var vx, vy;
  var dvx = momentum.vx,
    dvy = momentum.vy;
  for (var i = 1; i <= RAYCAST_PRECISION; i++) {
    if (!lockX) vx = momentum.vx * i / RAYCAST_PRECISION;
    if (!lockY) vy = momentum.vy * i / RAYCAST_PRECISION;
    var futureX = momentum.x + momentum.vx * MOVE_SPEED + ((wingspan / BOARD_TILESIZE) * (momentum.vx > 0 ? 1 : -1));
    var futureY = momentum.y + momentum.vy * MOVE_SPEED + ((wingspan / BOARD_TILESIZE) * (momentum.vy > 0 ? 1 : -1));
    //If position in front by X is occupied, lock x and set dvx;
    if (!lockX && this._board.isOccupied({
        x: Math.round(futureX),
        y: Math.round(momentum.y)
      })) {
      lockX = true;
    } else {
      //Else, save vx
      dvx = vx;
    }
    //If position in front by X is occupied, lock x and set dvx;
    if (!lockY && this._board.isOccupied({
        x: Math.round(momentum.x),
        y: Math.round(futureY)
      })) {
      lockX = true;
    } else {
      //Else, save vx
      dvy = vy;
    }

    if (lockX && lockY) break;
  }
  model.setSpeed({
    x: dvx,
    y: dvy
  })
}
