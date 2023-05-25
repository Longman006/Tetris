const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;
const LINES_PER_LEVEL = 4;
const DEF_DROP_INTERVAL = 1000;
const NUMBER_OF_HIGH_SCORES = 10;
const HIGH_SCORES = "highscores"
const KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SPACE: 32
}
const COLORS = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red', 'magenta'];

//Shapes are filled with a number corresponding to its color, for later use inside the board
const SHAPES = [
  [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ],
  [
    [2, 0, 0],
    [2, 2, 2],
    [0, 0, 0]
  ],
  [
    [0, 0, 3],
    [3, 3, 3],
    [0, 0, 0]
  ],
  [
    [4, 4],
    [4, 4]
  ],
  [
    [0, 5, 5],
    [5, 5, 0],
    [0, 0, 0]
  ],
  [
    [0, 6, 0],
    [6, 6, 6],
    [0, 0, 0]
  ],
  [
    [7, 7, 0],
    [0, 7, 7],
    [0, 0, 0]
  ],
  [
    [0, 8, 0],
    [8, 8, 8],
    [0, 8, 0]
  ]
];

Object.freeze(KEY);

const POINTS = {
  SINGLE_LINE: 100, 
  DOUBLE_LINE: 300, 
  TRIPLE_LINE: 400,
  TETRIS: 700, 
  SOFT_DROP: 1, 
  HARD_DROP: 2
};

Object.freeze(POINTS);