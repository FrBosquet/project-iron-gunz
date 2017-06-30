function createUiScoreViewContainer() {
  var uiContainerView = createView("", "uiViewContainer");
  uiContainerView.appendChild(createUiScorePlayerView());
  uiContainerView.appendChild(createUiScorePlayerView());
  return uiContainerView;
}

function createUiScorePlayerView() {
  var uiPlayerView = createView("scoreboard pixel-font");
  uiPlayerView.appendChild(createView("playerName pixel-font animated"));
  uiPlayerView.appendChild(createView("playerAvatar"));
  var playerStatus = createView("playerStatus")
  uiPlayerView.appendChild(playerStatus);
  playerStatus.appendChild(createView("playerLives"))
  var bulletsLeft = createView("playerBullets")
  playerStatus.appendChild(bulletsLeft)

  for (var i = 0; i < 30; i++) {
    bulletsLeft.appendChild(createView("bullet"))
  }

  uiPlayerView.appendChild(createView("playerScore pixel-font"));
  return uiPlayerView;
}

function renderUiScorePlayerView(model, view, points) {
  view.children[0].innerHTML = model._character.name;
  view.children[1].classList.add(model._character.css);
  view.children[2].innerHTML = "Life " + model._lives;
  view.children[3].innerHTML = points;

}
