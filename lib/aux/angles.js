function degToRad(angle) {
  return Math.PI * angle / 180;
}

function radToDeg(angle) {
  return 180 * angle / Math.PI;
}

function blurAngle(angle, offset) {
  return angle + Math.random() * offset - offset / 2;
}
