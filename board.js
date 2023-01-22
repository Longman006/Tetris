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
        this.clearBoard();
        this.mainPiece.draw();
    }

    //Helper function. Check if given coordinates are within board boundaries
    isInsideWalls(x,y){
        return (
            y < ROWS &&
            x < COLS &&
            x >= 0
        );
    }

    //Check if given piece is within board boundaries
    isValid(p){
        //Using for loops
        return p.shape.every((row, rowIndex) =>{
            return row.every((value, columnIndex) =>(
                value == 0 || 
                this.isInsideWalls(p.x + columnIndex, p.y + rowIndex))
            );
        });
    }

    //Freeze the current piece to the board and alter board grid structure
    freeze() {
        
    }
}