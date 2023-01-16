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
    canvasContext.fillRect(0, 0, 1, 1)

    tempBoard.clearBoard();
    tempBoard.mainPiece.draw();

    addEventListeners();
}

//User Interaction
const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => ({ ...p, y: p.y + 1 })
}

function handleKeyDown(event) {
    //stop the event from bubbling 
    event.preventDefault();

    //get new piece position based on key pressed if it exists
    if (MOVES[event.keyCode]) {
        let p = MOVES[event.keyCode](tempBoard.mainPiece);
        //update main piece to new position
        tempBoard.mainPiece.move(p);
        //render new position
        tempBoard.draw();
    }

}

function addEventListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
}


