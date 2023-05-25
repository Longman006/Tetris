//Tetris Board logic and rendering

class Board { 
    constructor(canvasContext,canvasContextNextPiece, scoreBoard){
        this.canvasContext = canvasContext;
        this.canvasContextNextPiece = canvasContextNextPiece;
        this.grid = this.getEmptyBoard();
        this.setNextPiece();
        this.setCurrentPiece();
        this.scoreBoard = scoreBoard;
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

        this.grid.forEach((row,indexy) => {
            row.forEach((value,indexx) => {
                if(value > 0){
                    this.canvasContext.fillStyle = COLORS[value-1];
                    this.canvasContext.fillRect(indexx,indexy,1,1);

                }
            });
        });

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

    isNotOccupied(x,y){
        return (
            this.grid[y] && this.grid[y][x] === 0
        );
    }

    //Check if given piece is within board boundaries
    isValid(p){
        //Using for loops
        return p.shape.every((row, rowIndex) =>{
            return row.every((value, columnIndex) =>(
                value == 0 || 
                (
                    this.isInsideWalls(p.x + columnIndex, p.y + rowIndex) && 
                    this.isNotOccupied(p.x + columnIndex, p.y + rowIndex)
                )
            ));
        });
    }

    //Freeze the current piece to the board and alter board grid structure
    freeze() {
        this.mainPiece.shape.forEach((row,indexy) => {
            row.forEach((value, indexx) => {
                if(value > 0){
                    this.grid[this.mainPiece.y + indexy][this.mainPiece.x + indexx] = value;
                }

            });
            
        });
    }
     //check for completed rows and remove them and insert an empty row on top
     clearLines() {
        let lineCount = 0;
        this.grid.forEach((row,indexy) => {
            if(row.every(value => value > 0)){
                //remove complete line
                this.grid.splice(indexy, 1)
                this.grid.splice(0, 0, Array(COLS).fill(0))
                //update line count
                lineCount ++;
            }
        })
        //Update points
        this.scoreBoard.lines += lineCount;
        this.scoreBoard.score += this.getClearLinesPoints(lineCount);
        this.scoreBoard.level = this.getCurrentLevel(this.scoreBoard.lines);

    }
    getClearLinesPoints(lineCount){
        let basePoints = (
        lineCount === 0 ? 0 : 
        lineCount === 1 ? POINTS.SINGLE_LINE :
        lineCount === 2 ? POINTS.DOUBLE_LINE :
        lineCount === 3 ? POINTS.TRIPLE_LINE :
        lineCount === 4 ? POINTS.TETRIS : 0 );

        return basePoints * (this.scoreBoard.level + 1);
    }
    getCurrentLevel(numberOfLines){
        return numberOfLines > 0 ? Math.ceil(numberOfLines/LINES_PER_LEVEL) - 1 : 0;
    }

    setNextPiece(){
        this.nextPiece = new Piece(this.canvasContextNextPiece);
        this.canvasContextNextPiece.clearRect(0,0,this.canvasContextNextPiece.canvas.width,this.canvasContextNextPiece.canvas.height);
        this.nextPiece.draw();
    }

    setCurrentPiece(){
        this.mainPiece = this.nextPiece;
        this.mainPiece.canvasContext = this.canvasContext;
        this.mainPiece.x = 4;//this.canvasContext.canvas.width/2;
        this.setNextPiece();
    }
}