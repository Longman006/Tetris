const DOMboard = document.getElementById('board')
const canvasContext = DOMboard.getContext("2d")

// Calculate size of canvas from constants.
canvasContext.canvas.width = COLS * BLOCK_SIZE;
canvasContext.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);

// Implement Play button function
function play() {
    tempBoard = new Board(canvasContext);
    console.table(tempBoard.grid);

    canvasContext.fillStyle = 'blue';
    canvasContext.fillRect(0,0,1,1)
}