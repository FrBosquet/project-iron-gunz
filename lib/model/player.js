/**
 * Player - Class for the human-driven players
 *
 * @return {Object}  the player
 */
function Player() {
  Positionable.call(this);
  this._wingspan = 16;
  this._aim = 100;
  this._lives = 3;
  this._isShooting = false;
  this._hammerLock = false;
  this._framesToShot = 0;
  this._roundsLeft = 7;
}

Player.prototype = Object.create(Positionable.prototype);
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
      this._speedY = -1;
    } else {
      this._speedX = 0;
      this._speedY = 0;
    }
  }

  if (val.shot && !this._hammerLock && this.canShot()) {
    this._isShooting = true;
    this._hammerLock = true;
  }

  if (!val.shot && this._hammerLock) {
    this._hammerLock = false;
  }
}

/**
 * Solves the movement for a frame
 *
 * @param  {Array} board the static state of the board as Array
 */
Player.prototype.update = function(pos) {
  if (this._speedX !== 0 || this._speedY !== 0) {
    this._posX += this._speedX * MOVE_SPEED / TIME_DELTA;
    this._posY += this._speedY * MOVE_SPEED / TIME_DELTA;
  }
  if (this._framesToShot !== 0) this._framesToShot--;
}


Player.prototype.canShot = function() {
  return this._framesToShot == 0;
}
/**
 * Shots a bullet
 *
 * @return {Object}  Descriptor to build the bullet
 */
Player.prototype.getShot = function() {
  var angle = 0;
  var incx = Math.cos(angle) * SHOT_ORIGIN / BOARD_TILESIZE;
  var incy = Math.sin(angle) * SHOT_ORIGIN / BOARD_TILESIZE;
  var sx = this._posX + incx;
  var sy = this._posY + incy;
  this._isShooting = false;
  this._framesToShot = SHOT_RATE;
  this._roundsLeft--;
  return {
    x: sx,
    y: sy,
    r: this._rotation
  }
}
