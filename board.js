//Tetris Board logic and rendering

class Board { 
    constructor(canvasContext){
        this.canvasContext = canvasContext;
        this.grid = this.getEmptyBoard();
    }

    getEmptyBoard() {
        return Array.from(
            {length : ROWS}, (x,i) => Array(COLS).fill(0)
        );
    }
}