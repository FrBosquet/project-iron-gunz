var effectId = 0;
/**
 * Effect - Describes a effect in a wall
 *
 * @return {type}  the shot
 */
function Effect(effect, type) {
  Positionable.call(this, effect.x, effect.y);
  this._rotation = effect.r;
  this._destroy = false;
  this._life = type.lifespan;
  this._id = type.name.concat(effectId++);
  this._type = type;
}

Effect.prototype = Object.create(Positionable.prototype);
Effect.prototype.constructor = Effect;

Effect.prototype.update = function() {
  if (--this._life == 0) this._destroy = true;
}
