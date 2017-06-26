/**
 * Player - Class for the human-driven players
 *
 * @return {Object}  the player
 */
function Player() {
  Posicionable.call(this);
  this._wingspan = 32;
  this._aim = 100;
  this._roundsLeft = 0;
  this._lives = 3;
}

Player.prototype = Object.create(Posicionable.prototype);
Player.prototype.constructor = Player;


/**
 * Sets the movement of the player
 *
 * @param  {Object} val the movement to ser in format {x: float, y: float}
 */
Player.prototype.setMove = function(val) {
  if (val.x == 1) {
    if (val.y == 1) {
      this._speedX = SQUARE_COS;
      this._speedY = SQUARE_COS;
    } else if (val.y == -1) {
      this._speedX = SQUARE_COS;
      this._speedY = -SQUARE_COS;
    } else {
      this._speedX = 1;
      this._speedY = 0;
    }
  } else if (val.x == -1) {
    if (val.y == 1) {
      this._speedX = -SQUARE_COS;
      this._speedY = SQUARE_COS;
    } else if (val.y == -1) {
      this._speedX = -SQUARE_COS;
      this._speedY = -SQUARE_COS;
    } else {
      this._speedX = -1;
      this._speedY = 0;
    }
  } else {
    if (val.y == 1) {
      this._speedX = 0;
      this._speedY = 1;
    } else if (val.y == -1) {
      this._speedX = 0;
      this._speedY = -SQUARE_COS;
    } else {
      this._speedX = 0;
      this._speedY = 0;
    }
  }
}


/**
 * Solves the movement for a frame
 *
 * @param  {Array} board the static state of the board as Array
 */
Player.prototype.update = function(board) {
  var targetX = this._posX + this._speedX * MOVE_SPEED / TIME_DELTA;
  var targetY = this._posY + this._speedY * MOVE_SPEED / TIME_DELTA;
  // check desired position and correct
  console.log(targetX, targetY);
  this._posX = targetX;
  this._posY = targetY;
}
