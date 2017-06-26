/**
 * Player - Class for the human-driven players
 *
 * @return {Object}  the player
 */
function Player() {
  Posicionable.call(this);
  this._wingspan = 0;
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

}


/**
 * Solves the movement for a frame
 *
 * @param  {Array} board the static state of the board as Array
 */
Player.prototype.update = function(board) {
  var targetX = this._posX + this._speedX * this._speed;
  var targetY = this._posY + this._speedY * this._speed;
  // check desired position and correct
  this._posX = targetX;
  this._posY = targetY;
}
