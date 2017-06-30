/**
 * Game - defines a game
 *
 * @return {Game}  the game
 */
function Game() {
  this._board = null;
  this._players = [];
  this._shots = [];
  this._effects = [];
  this._soundState = {};
  this._timer = -1;
  this._points = [];
  this._timeForward = true;
  this._frameCount = 0;
  this._rewindFrames = [];
  this._defaultP1 = CHAR_ANNA;
  this._defaultP2 = CHAR_MIKE;
}


/**
 * Makes a fresh start of the game
 *
 * @param  {function} renderCallback       a function to call for the rendering of the game
 */
Game.prototype.initialize = function() {
  this._rewindFrames = new Array(0);

  /*
    INITIALIZE BOARD
  */
  this._board = new Board();
  this._board.initializeStage();

  /*
    INICIALIZE PLAYERS
  */
  this.restart();

  /*
    INITIALIZE SCORES
  */

  this._points = [0, 0];
}

Game.prototype.restart = function() {
  this._shots = []
  this._effects = [];
  this.restartPlayers();
}

Game.prototype.restartPlayers = function() {

  this._players[0] = new Player(this._defaultP1);
  this._players[0].setPosition({
    x: 0,
    y: BOARD_HEIGHT / 2
  });
  this._players[0]._id = "Player1";

  this._players[1] = new Player(this._defaultP2);
  this._players[1].setPosition({
    x: BOARD_WIDTH - 1,
    y: BOARD_HEIGHT / 2
  });
  this._players[1]._id = "Player2";
  this.facePlayers();
}


/**
 * Starts the game
 *
 * @param  {type} renderCallback the function in the controller to represent state in the dom
 */
Game.prototype.start = function(renderCallback) {
  this._timer = setInterval(function() {
    this.update(renderCallback);
  }.bind(this), TIME_DELTA);
}


/**
 * Game.prototype.update - description
 *
 * @param  {type} renderCallback description
 * @return {type}                description
 */
Game.prototype.update = function(renderCallback) {
  /*
    DEFAULT UPDATE & RENDERING
  */
  if (this._timeForward) {
    // console.log("Normal rendering");
    this._shots = this._shots.filter((s) => !s._destroy);
    this._effects = this._effects.filter((i) => !i._destroy);

    this._players[0].setMove(solvePlayerInput(PLAYER1_CONTROLS));
    this._players[1].setMove(solvePlayerInput(PLAYER2_CONTROLS));

    //Solve shots collisions
    this._shots.forEach(function(shot) {
      this.solveShotCollisions(shot);
      shot.update();
    }.bind(this));


    var isMoving1 = this._players[0].isMoving();
    var isShooting1 = this._players[0]._isShooting;
    var isMoving2 = this._players[1].isMoving();
    var isShooting2 = this._players[1]._isShooting;
    if (isMoving1) {
      this.solvePlayerCollisions(this._players[0]);
    }
    this._players[0].update();
    if (isMoving2) {
      this.solvePlayerCollisions(this._players[1]);
    }
    this._players[1].update();
    if (isMoving1 || isMoving2) this.facePlayers();

    //Go trough shots array and destroy those marked for it

    //Create shots
    if (isShooting1) this.createShot(this._players[0].getShot());
    if (isShooting2) this.createShot(this._players[1].getShot());

    //Solve impacts lifespans
    this._effects.forEach(function(effect) {
      effect.update();
    })

    var currentState = this.getState();
    if ((isMoving1 || isMoving2) && ++this._frameCount % RECORD_EACHFRAME == 0) {
      this._rewindFrames.unshift(currentState);
      // console.table(this._rewindFrames);
    }
    renderCallback(currentState);

    //Clean sound buffer
    this._soundState = {};

    if (this._players[0]._isDead || this._players[1]._isDead) {
      console.log("Game is over");
      this._timeForward = false;
    }

  } else {
    // console.log("Backwards rendering", this._rewindFrames.length);
    /*
      BACKWARS RENDERING
    */
    if (this._rewindFrames.length > 0) {
      var recordedState = this._rewindFrames.shift();
      //CLEAN FRAME OF SHOTS AND EFFECTS
      recordedState.shots = []
      recordedState.effects = [];
      recordedState.rewind = true;
      renderCallback(recordedState);
    } else {
      if (this._players[0]._isDead) {
        this._points[1]++;
      } else {
        this._points[0]++;
      }
      this.restart();
      this._timeForward = true;
    }
  }
}

/**
 * Returns an object describing the game state
 *
 * @return {Object}  the object state
 */
Game.prototype.getState = function() {
  return {
    points1: this._points[0],
    points2: this._points[1],
    player1: this._players[0].getTimeStamp(),
    player2: this._players[1].getTimeStamp(),
    shots: this._shots,
    effects: this._effects,
    sound: this._soundState,
    rewind: false
  }
}


/**
 * Solves the players collisions and restrict the movement
 *
 * @param  {Player} model The player object to restric
 * @return {Object}       An object with restrictions in the format {x: bool, y:bool}
 */
Game.prototype.solvePlayerCollisions = function(model) {
  var mx = model._posX;
  var my = model._posY;
  var vx = model._speedX;
  var vy = model._speedY;
  var wingspan = (model._wingspan / BOARD_TILESIZE) / 2;
  var targetX = mx + ((vx > 0 ? 1 : -1) * wingspan) + vx * MOVE_SPEED / TIME_DELTA;
  var targetY = my + ((vy > 0 ? 1 : -1) * wingspan) + vy * MOVE_SPEED / TIME_DELTA;

  var boxInX = this._board.isOccupied(targetX, my);
  var boxInY = this._board.isOccupied(mx, targetY);

  model.restrainSpeed({
    x: !boxInX,
    y: !boxInY
  });
}


/**
 * Solves the shots collisions
 *
 * @param  {Shot} shot The shot to collision solve
 */
Game.prototype.solveShotCollisions = function(shot) {
  var px = shot._posX,
    py = shot._posY,
    vx, vy;
  for (var i = 0; i <= RAYCAST_PRECISION; i++) {
    vx = (shot._speedX * i / RAYCAST_PRECISION) / TIME_DELTA;
    vy = (shot._speedY * i / RAYCAST_PRECISION) / TIME_DELTA;

    //Scenery collisions
    if (this._board.isOccupied(px + vx, py + vy)) {
      this.shotImpact(shot, px, py, vx, vy, EFFECT_IMPACT);
      break;
    } else if (shot.distance(this._players[0]) < this._players[0]._wingspan / (BOARD_TILESIZE)) {
      //Player collisions
      console.log("Player 1 is hit");
      this._players[0].hurt(shot);
      this.shotImpact(shot, px, py, vx, vy, EFFECT_BLOOD);
      this._soundState[this._players[0]._character.moan] = true;
      break;
    } else if (shot.distance(this._players[1]) < this._players[1]._wingspan / (BOARD_TILESIZE)) {
      console.log("Player 2 is hit");
      this._players[1].hurt(shot);
      this.shotImpact(shot, px, py, vx, vy, EFFECT_BLOOD);
      this._soundState[this._players[0]._character.moan] = true;
      break;
    }
  }

  if (this._board.isOccupied(shot._posX, shot._posY)) {
    shot._speedX = 0;
    shot._speedY = 0;
  }
}

Game.prototype.shotImpact = function(shot, px, py, vx, vy, type) {
  shot._destroy = true;
  shot.setPosition({
    x: px + vx,
    y: py + vy
  });
  shot.setSpeed({
    x: 0,
    y: 0
  });
  var impact = new Effect({
    x: shot._posX,
    y: shot._posY,
    r: shot._rotation
  }, type);
  this._effects.push(impact);

  switch (type) {
    case EFFECT_IMPACT:
      this._soundState["impact"] = true;
      break;
  }
}

/**
 * Sets the players rotation
 *
 */
Game.prototype.facePlayers = function() {
  var x1, x2, y1, y2, x3, y3, d, cos, angle, deg;

  x1 = this._players[0]._posX;
  y1 = this._players[0]._posY;
  x2 = this._players[1]._posX;
  y2 = this._players[1]._posY;
  x3 = x2 - x1;
  y3 = y2 - y1;

  d = Math.sqrt(Math.pow(x3, 2) + Math.pow(y3, 2));
  cos = x3 / d;
  angle = Math.acos(cos) * (y3 < 0 ? -1 : 1);
  deg = angle * 180 / Math.PI;

  this._players[0]._rotation = angle * 180 / Math.PI;;
  this._players[1]._rotation = (angle + Math.PI) * 180 / Math.PI;;
}

Game.prototype.createShot = function(shot) {
  this._soundState[shot.weapon.wsound] = true;
  var sceneryAtShot = (this._board.sceneryAt(shot.x, shot.y));
  console.log(sceneryAtShot);
  var muzzle = new Effect(shot, EFFECT_MUZZLE);

  for (var i = 0; i < shot.weapon.bulletsPerShot; i++) {
    var newShot = new Shot(shot, shot.weapon);
    switch (sceneryAtShot) {
      case TILE_COLUMN:
        //create impact
        var impact = new Effect(shot, EFFECT_IMPACT);
        this._effects.push(impact);
        return;
      case TILE_BOX:
        newShot._flyHigh = true;
        break;
    }
    this._shots.push(newShot);
  }
  this._effects.push(muzzle);
}
