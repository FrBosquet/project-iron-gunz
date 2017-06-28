var impactId = 0;
/**
 * Impact - Describes a impact in a wall
 *
 * @return {type}  the shot
 */
function Impact(impact) {
  Positionable.call(this, impact.x, impact.y);
  this._rotation = impact.r;
  this._destroy = false;
  this._life = IMPACT_LIFESPAN;
  this._id = "Impacts".concat(impactId++);
}

Impact.prototype = Object.create(Positionable.prototype);
Impact.prototype.constructor = Impact;

Impact.prototype.update = function() {
  if (--this._life == 0) this._destroy = true;
}
