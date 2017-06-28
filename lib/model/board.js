/**
 * Board - describes the state of the game
 *
 * @return {Board}  a Board
 */
function Board() {
  this._stage = [];
  this._ids = {
    columns: 0,
    boxes: 0
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

/**
 * Given a grid position, returns true if its not reachable
 *
 * @param  {Object} spot the position to check in format {x: int, y:int}
 * @return {bool}      true, if the position is occupied
 */
Board.prototype.isOccupied = function(valX, valY) {
  var x = Math.round(valX);
  var y = Math.round(valY);
  x = (x == -0 ? 0 : x);
  y = (y == -0 ? 0 : y);
  if (x < 0 || x >= BOARD_WIDTH) return true;
  if (y < 0 || y >= BOARD_HEIGHT) return true;
  if (this._stage[x][y] !== null) return true;
  return false;
}

Board.prototype.sceneryAt = function(valX, valY) {
  var x = Math.round(valX);
  var y = Math.round(valY);
  x = (x == -0 ? 0 : x);
  y = (y == -0 ? 0 : y);
  if (x < 0 || x >= BOARD_WIDTH) return TILE_COLUMN;
  if (y < 0 || y >= BOARD_HEIGHT) return TILE_COLUMN;
  var item = this._stage[x][y];
  if (item instanceof Column) return TILE_COLUMN;
  if (item instanceof Box) return TILE_BOX;
  return TILE_FLOOR;
}
