const boardBorder = "black";
const boardBackground = "white";
const snakeColor = "white";
const snakeBorder = "black";

document.addEventListener("keydown", changeDir)
const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];

function clearCanvas() {
    ctx.fillStyle = boardBackground;
    ctx.strokestyle = boardBorder;
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }

function drawSnakePart(snakePart) {
    ctx.fillstyle=snakeColor;
    ctx.strokestyle=snakeBorder;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);  
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function drawSnake() 
{  
  snake.forEach(drawSnakePart);
}

let xSpeed = 10;
let ySpeed = 10;
let gameSpeed = 100;
let xDir = 1;
let yDir = 0;

function main() {
    setTimeout(() => {
        
        clearCanvas();
        move();
        drawSnake();
    main();
    }, gameSpeed);
}

function move() {
    const head = {x: snake[0].x+xSpeed*xDir, y:snake[0].y+ySpeed*yDir};
    snake.unshift(head);
    snake.pop();
}   

function isReverseMovement() {

}

function changeDir() {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY && xDir != 1) {xDir = -1; yDir = 0;}
    if (keyPressed === RIGHT_KEY && xDir != -1) {xDir = 1; yDir = 0;}
    if (keyPressed === UP_KEY && yDir != 1) {xDir = 0; yDir = -1;}
    if (keyPressed === DOWN_KEY && yDir != -1) {xDir = 0; yDir = 1;}
    

}

main();