function createEffectViewContainer() {
  return createView("relative", "effectViewContainer");
}

function createEffectView(id, type) {
  return createView("posicionable effect " + type.name, id);
}

function renderEffectView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
