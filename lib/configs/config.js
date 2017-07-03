//Board config
BOARD_HEIGHT = 15;
BOARD_WIDTH = 25;
BOARD_FREETILES = 3 //Tile margin for randomization
BOARD_BOXES = 10;
BOARD_COLUMNS = 10;
BOARD_TILESIZE = 32; //px

//Shot config
SHOT_ORIGIN = 32;

//Engine
VIEW_ZOOM = 1.5;
FPS = 40;
TIME_DELTA = 1000 / FPS;
RAYCAST_PRECISION = 10;

SQUARE_COS = Math.cos(Math.PI / 4);

//Game
RECORD_EACHFRAME = 5;


//Player
MOVE_SPEED = 3;
PLAYER_WEIGHT = 10;


//Controls
PLAYER1_CONTROLS = {
  UP: 87,
  DOWN: 83,
  LEFT: 68,
  RIGHT: 65,
  SHOT: 81
}

PLAYER2_CONTROLS = {
  UP: 38,
  DOWN: 40,
  LEFT: 39,
  RIGHT: 37,
  SHOT: 189
}

TILE_COLUMN = "Column";
TILE_BOX = "Box";
TILE_FLOOR = "Floor";

SOUND_EFFECTS = {
  boxbreak: "sound-boxbreak",
  impact: "sound-impact",
  manmoan: "sound-manimpact",
  pistol: "sound-pistol",
  rewind: "sound-rewind",
  rifle: "sound-rifle",
  shotgun: "sound-shotgun",
  smg: "sound-smg",
  womanmoan: "sound-womanimpact"
}

SOUND_MUSIC = {
  theme: "theme",
  stage: "stage"
}
