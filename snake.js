const boardBorder = "black";
const boardBackground = "white";
const snakeColor = "white";
const snakeBorder = "black";

document.addEventListener("keydown", changeDir)
const gameCanvas = document.getElementById("gameCanvas");
const ctx = gameCanvas.getContext("2d");

let upDisplay = document.getElementById("up");
let leftDisplay = document.getElementById("left");
let downDisplay = document.getElementById("down");
let rightDisplay = document.getElementById("right");

let snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];
let foodX = randomCoord(0,gameCanvas.width-10);
let foodY = randomCoord(0,gameCanvas.height-10);
let xSpeed = 0;
let ySpeed = 0;
let gameSpeed = 100;
let xDir = 1;
let yDir = 0;

let LEFT_KEY;
let RIGHT_KEY;
let UP_KEY;
let DOWN_KEY;

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
    // console.log(foodX,foodY,head.x,head.y) 
    if (onXY(foodX,foodY,snake[0])) newFood();
    else snake.pop();
}   

function changeDir() {
    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY && xDir != 1) {xDir = -1; yDir = 0;}
    if (keyPressed === RIGHT_KEY && xDir != -1) {xDir = 1; yDir = 0;}
    if (keyPressed === UP_KEY && yDir != 1) {xDir = 0; yDir = -1;}
    if (keyPressed === DOWN_KEY && yDir != -1) {xDir = 0; yDir = 1;}

    var arr = [];
    while(arr.length < 4){
        var r = Math.floor(Math.random() * 26) + 65;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    LEFT_KEY = arr[0];
    RIGHT_KEY = arr[1];
    UP_KEY = arr[2];
    DOWN_KEY = arr[3];

    upDisplay.innerHTML=String.fromCharCode(UP_KEY);
    leftDisplay.innerHTML=String.fromCharCode(LEFT_KEY);
    downDisplay.innerHTML=String.fromCharCode(DOWN_KEY);
    rightDisplay.innerHTML=String.fromCharCode(RIGHT_KEY);
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

function startGame() {
    snake = [  {x: 200, y: 200},  {x: 190, y: 200},  {x: 180, y: 200},  {x: 170, y: 200},  {x: 160, y: 200},];
    foodX = randomCoord(0,gameCanvas.width-10);
    foodY = randomCoord(0,gameCanvas.height-10);
    xSpeed = 10;
    ySpeed = 10;
    gameSpeed = 100;
    xDir = 1;
    yDir = 0;
    var arr = [];
    while(arr.length < 4){
        var r = Math.floor(Math.random() * 26) + 65;
        if(arr.indexOf(r) === -1) arr.push(r);
    }

    LEFT_KEY = arr[0];
    RIGHT_KEY = arr[1];
    UP_KEY = arr[2];
    DOWN_KEY = arr[3];

    upDisplay.innerHTML=String.fromCharCode(UP_KEY);
    leftDisplay.innerHTML=String.fromCharCode(LEFT_KEY);
    downDisplay.innerHTML=String.fromCharCode(DOWN_KEY);
    rightDisplay.innerHTML=String.fromCharCode(RIGHT_KEY);
    main();
}

startGame();