function createFloorTileViewContainer() {
  var tilesView = createView("relative", "floortileViewContainer");
  for (var i = 0; i < BOARD_WIDTH; i++) {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
      var tile = createView("floortile posicionable");
      translateView(tile, i, j);
      tilesView.appendChild(tile);
    }
  }
  return tilesView;
}
