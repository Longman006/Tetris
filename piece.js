class Piece {
    constructor(canvasContext) {
        //Piece properties
        //The DOM 2d canvas element on which to draw on
        this.canvasContext = canvasContext;

        //The shape and color of the piece
        const tetroTypeNumber = this.getRandomTetronimoNumber();
        this.shape = SHAPES[tetroTypeNumber];
        this.color = COLORS[tetroTypeNumber];

        //The current position of the piece, always starts at the top
        this.x = 0;
        this.y = 0;


    }

    draw() {
        this.canvasContext.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((column, x) => {
                if (column > 0){
                    this.canvasContext.fillRect(this.x + x, this.y + y, 1, 1);
            }

            });
        });
    }

    move(p) {
        [this.x, this.y] = [p.x, p.y];
        this.shape = p.shape;
    }

    getRandomTetronimoNumber(){
        return Math.floor(Math.random()*COLORS.length);
    }
}