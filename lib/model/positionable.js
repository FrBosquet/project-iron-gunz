/**
 * Positionable - Interface for the objects which lay in the stage
 *
 */
function Positionable(x, y, r = 0, id = "") {
  this._posX = x;
  this._posY = y;
  this._speedX = 0;
  this._speedY = 0;
  this._rotation = r;
  this._id = id;
}

/**
 * Returns the position of the Positionable
 *
 * @return {Object} an object with {x,y} coordinates of the object
 */
Positionable.prototype.getPosition = function() {
  return {
    x: this._posX,
    y: this._posY
  };
}

/**
 * Sets the position of the Positionable
 *
 * @param  {Object} newPosition the new desired position for the object in {x: float, y:float}
 */
Positionable.prototype.setPosition = function(newPosition) {
  this._posX = newPosition.x;
  this._posY = newPosition.y;
}


/**
 * Returns the id of the objects
 *
 * @return {string}  id of the associated html element
 */
Positionable.prototype.getId = function() {
  return this._id;
}


/**
 * Return the position and movement intention of an posicionable
 *
 * @return {type}  description
 */
Positionable.prototype.getMomentum = function() {
  return {
    x: this._posX,
    y: this._posY,
    vx: this._speedX,
    vy: this._speedY
  }
}


/**
 * Positionable.prototype.setSpeed - description
 *
 * @param  {type} newSpeed description
 * @return {type}          description
 */
Positionable.prototype.setSpeed = function(newSpeed) {
  this._speedX = newSpeed.x;
  this._speedY = newSpeed.y;
}


/**
 * Positionable.prototype.restrainSpeed - description
 *
 * @param  {type} locks description
 * @return {type}       description
 */
Positionable.prototype.restrainSpeed = function(locks) {
  this._speedX *= locks.x;
  this._speedY *= locks.y;
}


/**
 * Positionable.prototype.isMoving - description
 *
 * @return {type}  description
 */
Positionable.prototype.isMoving = function() {
  return this._speedX !== 0 || this._speedY !== 0;
}


/**
 * Positionable - description
 *
 * @param  {type} pos1 description
 * @param  {type} pos2 description
 * @return {type}      description
 */
Positionable.prototype.distance = function(pos) {
  return Math.sqrt(Math.pow(this._posX - pos._posX, 2) + Math.pow(this._posY - pos._posY, 2))
}

Positionable.prototype.getTimeStamp = function() {
  return new Positionable(this._posX, this._posY, this._rotation, this._id);
}
