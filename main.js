const DOMboard = document.getElementById('board');
const canvasContext = DOMboard.getContext("2d");
let time = {start: 0, elapsed: 0, dropInterval: 1000};
let requestID = null;
// Calculate size of canvas from constants.
canvasContext.canvas.width = COLS * BLOCK_SIZE;
canvasContext.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);

// Implement Play button function
function play() {
    tempBoard = new Board(canvasContext);
    draw();
    //console.table(tempBoard.grid);

    addEventListeners();

    //game loop logic and animation
    if(requestID){
        cancelAnimationFrame(requestID);
    }
    time.start = performance.now();
    animate()
}

//User Interaction. Return a piece object with updated properties
const MOVES = {
    [KEY.LEFT]: (p) => ({ ...p, x: p.x - 1 }),
    [KEY.RIGHT]: (p) => ({ ...p, x: p.x + 1 }),
    [KEY.DOWN]: (p) => (moveDown(p)), 
    [KEY.UP]: (p) =>{
        //Rotate piece when up key is pressed. 
        //Rotation is matrix transposition and then reverse row order 
        //The spread operator only copies one level deep
        //Need to clone the piece object first to avoid inner arrays from getting updated through reference 
        let clone = JSON.parse(JSON.stringify(p));
        for(let y = 0; y < clone.shape.length; y++){
            for(let x = 0; x < y; x++){
                [clone.shape[x][y],clone.shape[y][x]] = [clone.shape[y][x],clone.shape[x][y]]
            }
        }
        clone.shape.forEach(element => {
            element.reverse()
        });
        return clone;
    }, 
    [KEY.SPACE]: (p) => {
        //Handle SPACE hard drop
        let newP = p;
        while(tempBoard.isValid(newP)){
            [p,newP] = [newP,moveDown(p)]
        }
        return p;
    }
}

function handleKeyDown(event) {
    //stop the event from bubbling 
    event.preventDefault();

    //get new piece position based on key pressed if it exists
    if (MOVES[event.keyCode]) {
        let p = MOVES[event.keyCode](tempBoard.mainPiece);
       
        
        //update main piece to new position if its valid
        if(tempBoard.isValid(p)){
            tempBoard.mainPiece.move(p);
            //render new position
            draw();
        }

        console.log(p);
    }

}

function addEventListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleKeyDown);
}

function moveDown(piece){
    return { ...piece, y: piece.y + 1 };
}

//If elapsed time since last drop has reached the desired time interval, move the piece down
//Animate calls itself indefinetely
function animate(now = 0){
    time.elapsed = now - time.start;

    if(time.elapsed >= time.dropInterval){
        time.start = now;
        drop();
        draw();
    }
    requestID = requestAnimationFrame(animate)
}

function drop(){
    let p = MOVES[KEY.DOWN](tempBoard.mainPiece);
    if(tempBoard.isValid(p)){
        tempBoard.mainPiece.move(p);
    }
}

function draw(){
    tempBoard.draw();
}
