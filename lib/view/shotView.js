function createShotViewController() {
  return createView("relative", "shotViewContainer");
}

function createShotView(id) {
  return createView("posicionable gun-shot", id);
}

function renderShotView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
