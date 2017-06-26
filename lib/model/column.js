/**
 * Column - Describes a column
 *
 * @return {type}  A column
 */
function Column(id, x, y) {
  Scenery.call(this, x, y);
  this._height = 2;
  this._isBreakable = false;
  this.id = "Columnn" + id;
}

Box.prototype = Object.create(Scenery.prototype);
Box.prototype.constructor = Box;
