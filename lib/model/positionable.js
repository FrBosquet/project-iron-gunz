/**
 * Positionable - Interface for the objects which lay in the stage
 *
 */
function Positionable(x, y) {
  this._posX = x;
  this._posY = y;
  this._speedX = 0;
  this._speedY = 0;
  this._rotation = 0;
  this._id = "";
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

Positionable.prototype.setSpeed = function(newSpeed) {
  this._speedX = newSpeed.x;
  this._speedY = newSpeed.y;
}

Positionable.prototype.isMoving = function() {
  return this._speedX !== 0 || this._speedY !== 0;
}
