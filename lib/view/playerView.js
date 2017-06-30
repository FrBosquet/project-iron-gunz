function createPlayerViewContainer(model) {
  var playersContainerView = createView("relative", "playerViewContainer");
  playersContainerView.appendChild(createPlayerView("red", model._players[1], "player1"));
  playersContainerView.appendChild(createPlayerView("blue", model._players[0], "player2"));
  return playersContainerView;
}

function createPlayerView(color, model, id) {
  var playerCont = createView("posicionable ", id);
  var body = createView("sprite soldier " + color);
  var gun = createView("sprite gun " + model.getWeapon().wclass);
  playerCont.appendChild(gun);
  playerCont.appendChild(body);
  return playerCont;
}

function renderPlayerView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
