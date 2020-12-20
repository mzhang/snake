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

function drawSnake() {
    snake.forEach(drawSnakePart);
}
let foodX = randomCoord(0,gameCanvas.width-10);
let foodY = randomCoord(0,gameCanvas.height-10);
let xSpeed = 10;
let ySpeed = 10;
let gameSpeed = 100;
let xDir = 1;
let yDir = 0;

function main() {
    setTimeout(() => {
        if (isGameOver()) {
            endCeremony();
            return;
        }
        clearCanvas();
        update();
        drawSnake();
        drawFood(foodX,foodY);

        main();
    }, gameSpeed);
}

function endCeremony() {
    console.log("died. sorry.");
}

function isGameOver() {  

  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;  
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;
 
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
}

function update() {
    const head = {x: snake[0].x+xSpeed*xDir, y:snake[0].y+ySpeed*yDir};
    snake.unshift(head);
    console.log(foodX,foodY,head.x,head.y) 
    if (onXY(foodX,foodY,snake[0])) newFood();
    else snake.pop();
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

function randomCoord(min, max) {
    return Math.round((Math.random()*(max-min)+min)/10)*10;
}

function onXY(x,y,part) {
    return x === part.x && y === part.y
}

function drawFood(x,y) {
    ctx.fillstyle=snakeColor;
    ctx.strokestyle=snakeBorder;
    ctx.fillRect(x,y, 10, 10);  
    ctx.strokeRect(x,y, 10, 10);
}

function newFood() {
    foodX = randomCoord(0,gameCanvas.width-10);
    foodY = randomCoord(0,gameCanvas.height-10);
    snake.forEach((part)=>{
        if (onXY(foodX,foodY,part)) newFood();
    })
}

main();