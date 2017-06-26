/**
 * Board - describes the state of the game
 *
 * @return {Board}  a Board
 */
function Board() {
  this._player1 = null;
  this._player2 = null;
  this._shots = [];
  this._stage = [];
  this._ids = {
    columns: 0,
    boxes: 0,
    shots: 0
  }
}


/**
 * Initializes the stage state and calls for box and colum randomization
 *
 * @return {type}  description
 */
Board.prototype.initializeStage = function() {
  //Initialize grid
  this._stage = new Array(BOARD_WIDTH).fill(null).map(function() {
    return new Array(BOARD_HEIGHT).fill(null);
  });

  //Barriers
  for (var i = 1; i < BOARD_HEIGHT - 1; i++) {
    this._stage[1][i] = new Column(this._ids.column++, 1, i);
    this._stage[BOARD_WIDTH - 2][i] = new Column(this._ids.column++, BOARD_WIDTH - 2, i);
  }

  this.randomizeStage();
}

/**
 * Randomizes the position of the objects in the grid
 */
Board.prototype.randomizeStage = function() {
  var x, y, i;

  i = 0;
  do {
    x = Math.floor(Math.random() * (BOARD_WIDTH - BOARD_FREETILES * 2)) + BOARD_FREETILES;
    y = Math.floor(Math.random() * BOARD_HEIGHT);

    if (this._stage[x][y] === null) {
      this._stage[x][y] = i < BOARD_BOXES ? new Box(this._ids.boxes++, x, y) : new Column(this._ids.columns++, x, y);
      i++;
    }
  } while (i < (BOARD_BOXES + BOARD_COLUMNS));
}
