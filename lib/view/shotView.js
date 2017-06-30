function createShotViewContainer() {
  return createView("relative", "shotViewContainer");
}

function createShotView(id, model) {
  return createView("posicionable " + model.bclass, id);
}

function renderShotView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
