const DOMboard = document.getElementById('board');
const canvasContext = DOMboard.getContext("2d");

const canvasContextNext = document.getElementById('next').getContext("2d");
canvasContextNext.canvas.width = 4 * BLOCK_SIZE;
canvasContextNext.canvas.height = 4 * BLOCK_SIZE;
canvasContextNext.scale(BLOCK_SIZE,BLOCK_SIZE);

// Calculate size of canvas from constants.
canvasContext.canvas.width = COLS * BLOCK_SIZE;
canvasContext.canvas.height = ROWS * BLOCK_SIZE;

// Scale blocks
canvasContext.scale(BLOCK_SIZE, BLOCK_SIZE);

let time = {start: 0, elapsed: 0, dropInterval: 1000};
let requestID = null;
let scoreBoard = {
    score: 0, 
    lines: 0, 
    level: 0
};

//Updating data model (scoreboard) will also update display using a Proxy to intercept updates
let scoreBoardHandler = {
    set(target, property, value){
        target[property] = value;
        updateScoreBoard(property,value);
        if(property === "level"){
            time.dropInterval = DEF_DROP_INTERVAL/(value+1);
        }
        return true;
    }
}
let scoreBoardProxy = new Proxy(scoreBoard,scoreBoardHandler);



// Implement Play button function
function play() {
    resetGame();
    addEventListeners();
    draw();
    animate();
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
            console.log("Old P = "+ p.y)
            console.log("New P = "+newP.y)

            scoreBoardProxy.score += POINTS.HARD_DROP
        }
        return p;
    }
}

function handleKeyDown(event) {
    //stop the event from bubbling 
    event.preventDefault();

    //get new piece position based on key pressed if it exists
    if (MOVES[event.keyCode]) {

        //Piece in new position
        let p = MOVES[event.keyCode](tempBoard.mainPiece);
       
        //update main piece to new position if its valid
        if(tempBoard.isValid(p)){
            tempBoard.mainPiece.move(p);
            //render new position on board
            draw();

            if(event.keyCode === KEY.DOWN){
                scoreBoardProxy.score += POINTS.SOFT_DROP
            }
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
    let isGameOver = false;
    time.elapsed = now - time.start;

    if(time.elapsed >= time.dropInterval){
        time.start = now;
        isGameOver = drop();
        
        if(isGameOver){
            gameOver();
            return;
        }
        
    }
    draw();
    requestID = requestAnimationFrame(animate)
}

//return false if game over
function drop(){
    let p = MOVES[KEY.DOWN](tempBoard.mainPiece);
    if(tempBoard.isValid(p)){
        tempBoard.mainPiece.move(p);
    }
    else{
        //Freeze old piece in place and generate a new one
        tempBoard.freeze();
        //console.table(tempBoard.grid);
        //console.log("x: " + tempBoard.mainPiece.x + "y: " + tempBoard.mainPiece.y);
        tempBoard.clearLines();
        
        //Check if the piece has reached the top of the board
        if(tempBoard.mainPiece.y === 0){
            //Game Over
            return true;
        }
        else{
            tempBoard.setCurrentPiece();
        }
    }
}

function draw(){
    tempBoard.draw();
}
function gameOver(){
    cancelAnimationFrame(requestID);

    //display Game Over
    //Box
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(1, 1, COLS-2, 1.4);

    //Text
    canvasContext.font = '1px Arial';
    canvasContext.fillStyle = 'red';
    canvasContext.fillText('Game Over',1, 2,COLS-4)


}
function updateScoreBoard(key, value){
    let element = document.getElementById(key);
    element.textContent = value;
}

function resetGame(){
    tempBoard = new Board(canvasContext, canvasContextNext, scoreBoardProxy);
    scoreBoardProxy.level = 0;
    scoreBoardProxy.score = 0;
    scoreBoardProxy.lines = 0;
    //game loop logic and animation
    if(requestID){
        cancelAnimationFrame(requestID);
    }
    time = {start: performance.now(), elapsed: 0, dropInterval: DEF_DROP_INTERVAL};
}

function checkHighScore(currentScore){

    //return empty array if no highscores in local storage (null)
    let highScoreString = localStorage.getItem(HIGH_SCORES);
    let highScores = JSON.parse(highScoreString) || [];

    //get lowest score in list (0 if none) and compare with current
    let lowestScore = highScores[NUMBER_OF_HIGH_SCORES - 1]?.score ?? 0;
    if(currentScore > lowestScore){
        saveHighScore(score, highScores);
        drawHighScores();
    }

}