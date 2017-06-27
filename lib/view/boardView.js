function createBoard() {
  var boardView = createView("relative", "board");
  measureView(boardView, BOARD_WIDTH, BOARD_HEIGHT);
  scaleView(boardView, VIEW_ZOOM);
  return boardView;
}
