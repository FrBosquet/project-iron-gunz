/**
 * Posicionable - Interface for the objects which lay in the stage
 *
 */
function Posicionable() {
  this._posX = 0;
  this._posY = 0;
  this._speedX = 0;
  this._speedY = 0;
  this._rotation = 0;
  this._id = "";
}

/**
 * Returns the position of the Posicionable
 *
 * @return {Object} an object with {x,y} coordinates of the object
 */
Posicionable.prototype.getPosition() {
  return {
    x: this._posX,
    y: this._posY
  };
}

/**
 * Sets the position of the Posicionable
 *
 * @param  {Object} newPosition the new desired position for the object in {x: float, y:float}
 */
Posicionable.prototype.setPosition(newPosition) {
  this._posX = newPosition.x;
  this._posY = newPosition.y;
}


/**
 * Returns the id of the objects
 *
 * @return {string}  id of the associated html element
 */
Posicionable.prototype.getId() {
  return this._id;
}
