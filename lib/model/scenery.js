/**
 * Scenery - describes an static element of the scene
 *
 */
function Scenery(x, y) {
  Positionable.call(this, x, y);
  this._height = 0;
  this._isBreakable = false;
}

Scenery.prototype = Object.create(Positionable.prototype);
Scenery.prototype.constructor = Scenery;
