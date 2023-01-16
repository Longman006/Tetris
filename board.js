//Tetris Board logic and rendering

class Board { 
    constructor(canvasContext){
        this.canvasContext = canvasContext;
        this.grid = this.getEmptyBoard();
        this.mainPiece = new Piece(canvasContext); 
    }

    getEmptyBoard() {
        return Array.from(
            {length : ROWS}, (x,i) => Array(COLS).fill(0)
        );
    }

    clearBoard(){
        const { width, height } = this.canvasContext.canvas;
        this.canvasContext.clearRect(0,0,width,height);
    }

    draw() {
        const {width, height } = this.canvasContext.canvas;
        this.canvasContext.clearRect(0,0,width,height);
        this.mainPiece.draw();
    }
}