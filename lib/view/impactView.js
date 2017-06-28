function createImpactViewContainer() {
  return createView("relative", "impactViewContainer");
}

function createImpactView(id) {
  return createView("posicionable collision", id);
}

function renderImpactView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
