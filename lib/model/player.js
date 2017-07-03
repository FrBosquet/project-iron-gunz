function Player(character) {
  Positionable.call(this);
  this._character = character;
  this._wingspan = this._character.wingspan;
  this._lives = this._character.lives;
  this._roundsLeft = this._character.starterBullets;
  this._framesToShot = 0;
  this._hammerLock = false;
  this._isShooting = false;
  this._isDead = false;
}

Player.prototype = Object.create(Positionable.prototype);
Player.prototype.constructor = Player;

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
    if (this._character.weapon.hammerlock) this._hammerLock = true;
  }

  if (!val.shot && this._hammerLock) {
    this._hammerLock = false;
  }
}

Player.prototype.update = function(pos) {
  if (this.isMoving()) {
    this._posX += this._speedX * MOVE_SPEED / TIME_DELTA;
    this._posY += this._speedY * MOVE_SPEED / TIME_DELTA;

  }
  if (this._framesToShot !== 0) this._framesToShot--;
}

Player.prototype.canShot = function() {
  return this._framesToShot == 0;
}

Player.prototype.getShot = function() {
  var angle = degToRad(this._rotation);
  var incx = Math.cos(angle) * SHOT_ORIGIN / BOARD_TILESIZE;
  var incy = Math.sin(angle) * SHOT_ORIGIN / BOARD_TILESIZE;
  var sx = this._posX + incx;
  var sy = this._posY + incy;

  this._isShooting = false;
  this._framesToShot = this.getWeapon().shotdelay;
  this._roundsLeft--;

  return {
    x: sx,
    y: sy,
    r: this._rotation,
    weapon: this.getWeapon()
  }
}

Player.prototype.hurt = function(shot) {
  this._lives -= shot._force;
  if (this._lives <= 0) {
    this._isDead = true;
  }

  this._speedX += shot._speedX / PLAYER_WEIGHT;
  this._speedY += shot._speedY / PLAYER_WEIGHT;
}

Player.prototype.getTimeStamp = function() {
  var timeStamp = new Positionable(this._posX, this._posY, this._rotation, this._id);
  Object.assign(timeStamp, this);
  return timeStamp;
}

Player.prototype.getWeapon = function() {
  return this._character.weapon;
}
