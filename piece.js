class Piece {
    constructor(canvasContext) {
        //Piece properties
        //The DOM 2d canvas element on which to draw on
        this.canvasContext = canvasContext;

        //The shape of the piece
        this.shape = [
            [3, 0, 0],
            [3, 3, 3],
            [0, 0, 0]
        ];

        //The current position of the piece
        this.x = 4;
        this.y = 0;

        //The color of the object 
        this.color = 'blue'
    }

    draw() {
        this.canvasContext.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((column, x) => {
                if (column > 0)
                    this.canvasContext.fillRect(this.x + x, this.y + y, 1, 1);
            });
        });
    }

    move(p) {
        [this.x, this.y] = [p.x, p.y];
    }
}