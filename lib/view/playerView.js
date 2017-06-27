function createPlayerViewContainer() {
  var playersContainerView = createView("relative");
  playersContainerView.appendChild(createPlayerView("red", "player1"));
  playersContainerView.appendChild(createPlayerView("blue", "player2"));
  return playersContainerView;
}

function createPlayerView(color, id) {
  var playerCont = createView("posicionable ", id);
  var body = createView("sprite soldier " + color);
  var gun = createView("sprite gun gun-pistol");
  playerCont.appendChild(gun);
  playerCont.appendChild(body);
  return playerCont;
}

function renderPlayerView(model, view) {
  transformView(view, model._posX, model._posY, model._rotation);
}
