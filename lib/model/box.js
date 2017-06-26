/**
 * Box - Describes a box
 *
 * @return {type}  A box
 */
function Box(id, x, y) {
  Scenery.call(this, x, y);
  this._height = 1;
  this._isBreakable = true;
  this._hitsLeft = 10;
  this._id = "Box" + id;
}

Box.prototype = Object.create(Scenery.prototype);
Box.prototype.constructor = Box;


/**
 * Make the box receive a hit
 *
 * @param  {type} Shot The shot received
 */
Box.prototype.receiveShot = function(Shot) {
  this._hitsLeft -= Shot._force;
  if (this_hitsLeft <= 0) this.Destroy();
}


/**
 * Destroys the box
 *
 */
Box.prototype.destroy = function() {

}
