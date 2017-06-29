function createUiScoreViewContainer() {
  var uiContainerView = createView("", "uiViewContainer");
  uiContainerView.appendChild(createUiScorePlayerView());
  uiContainerView.appendChild(createUiScorePlayerView());
  return uiContainerView;
}

function createUiScorePlayerView() {
  var uiPlayerView = createView("scoreboard ");
  uiPlayerView.appendChild(createView("playerName"));
  uiPlayerView.appendChild(createView("playerAvatar"));
  uiPlayerView.appendChild(createView("playerAmmo"));
  uiPlayerView.appendChild(createView("playerScore"));
  return uiPlayerView;
}

function renderUiScorePlayerView(model, view) {

}
