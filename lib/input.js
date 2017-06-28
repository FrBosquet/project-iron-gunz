/**
 *  Returns a player movement object given a keyscheme, reading keyboard state
 *
 * @param  {Object} keyscheme the keyscheme to parse keyboard state
 * @return {Object}           the player movement object
 */
function solvePlayerInput(keyscheme) {
  var playerMovement = {
    x: 0,
    y: 0,
    shot: false
  };
  if (keyboard[keyscheme.LEFT]) {
    playerMovement.x = 1;
  } else if (keyboard[keyscheme.RIGHT]) {
    playerMovement.x = -1;
  }
  if (keyboard[keyscheme.DOWN]) {
    playerMovement.y = 1;
  } else if (keyboard[keyscheme.UP]) {
    playerMovement.y = -1;
  }
  if (keyboard[keyscheme.SHOT]) {
    playerMovement.shot = true;
  }

  return playerMovement;
}
