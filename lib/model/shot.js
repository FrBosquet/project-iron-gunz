var shotsId = 0;
/**
 * Shot - Describes a projectile flying
 *
 * @return {type}  the shot
 */
function Shot(shot, weapon) {
  Positionable.call(this, shot.x, shot.y);
  this._rotation = blurAngle(shot.r, weapon.shotprecision);
  this._speedX = Math.cos(degToRad(this._rotation)) * weapon.shotspeed;
  this._speedY = Math.sin(degToRad(this._rotation)) * weapon.shotspeed;
  this._destroy = false;
  this._weapon = weapon;
  this._force = weapon.damage;
  this._flyHigh = false;
  this._id = "Shots".concat(shotsId++);
}

Shot.prototype = Object.create(Positionable.prototype);
Shot.prototype.constructor = Shot;


/**
 * Checks the board and determines where the bullet hit
 *
 * @param  {Aray} board a grid with a board
 * @return {Object}       coordinates of the impact point in {x: float, y: float}
 */
Shot.prototype.checkBoard = function(board) {
  return {
    x: 0,
    y: 0
  };
}


/**
 * Determines if the bullet is close enought to hit the player
 *
 * @param  {Player} player the player object
 * @return {boolean}        if the bullet has hit a player
 */
Shot.prototype.checkPlayer = function(player) {
  var dist = Math.sqrt(Math.pow(this._posX - player._posX, 2) + Math.pow(this._posY - player._posY, 2));
  return dist < player._wingspan / 2;
}

/**
 * Solves the movement for a frame
 *
 * @param  {Array} board the static state of the board as Array
 */
Shot.prototype.update = function() {
  this._posX += this._speedX / TIME_DELTA;
  this._posY += this._speedY / TIME_DELTA;
}
