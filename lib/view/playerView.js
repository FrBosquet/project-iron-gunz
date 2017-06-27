function createPlayerViewContainer() {
  var playersContainerView = createView("relative");
  playersContainerView.appendChild(createPlayerView("red", "player1"));
  playersContainerView.appendChild(createPlayerView("blue", "player2"));
  return playersContainerView;
}

function createPlayerView(color, id) {
  return createView("posicionable soldier " + color, id);
}

function renderPlayerView(model, view) {
  translateView(view, model._posX, model._posY);
}
