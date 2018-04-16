const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let shipSize = 10;

let x = canvas.width/ 2;
let y = canvas.height/2;
let dx = 0;
let dy = 0;

let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;
let keySpace = false;
let rotateLeft = false;
let rotateRight = false;
function keyDownHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
      keyLeft = true;
      break;
    case 37:
      rotateLeft = true;
      break;
    case 87:
      keyUp = true;
      break;
    case 68:
      keyRight = true;
      break;
    case 39:
      rotateRight = true;
      break;
    case 83:
      keyDown = true;
      break;
    case 75:
      keySpace = true;
      break;
  }
}

function keyUpHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
      keyLeft = false;
      break;
    case 37:
      rotateLeft = false;
    case 87:
      keyUp = false;
      break;
    case 68:
      keyRight = false;
      break;
    case 39:
      rotateRight = false;
      break;
    case 83:
      keyDown = false;
      break;
    case 75:
      keySpace = false;
      break;
  }
}
let angle = 0;
function drawShip() {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-shipSize/2, shipSize/2);
  ctx.lineTo(shipSize, 0);
  ctx.lineTo(-shipSize/2, -shipSize/2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.restore();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  if (keyLeft) {
    dx -= .2;
  } else if (keyRight) {
    dx += .2;
  }
  if (keyUp) {
    dy -= .2;
  } else if (keyDown) {
    dy += .2;
  }
  if (rotateLeft) {
    angle -= .1;
  } else if (rotateRight) {
    angle += .1;
  }
  x += dx;
  y += dy;

  if ( x > canvas.width - shipSize ) {
    dx = 0;
    x = canvas.width - shipSize;
  }
  if ( y  > canvas.height - shipSize ) {
    dy = 0;
    y = canvas.height - shipSize;
  }

  if ( y < shipSize ) {
    dy = 0;
    y = shipSize;
  }
  if ( x < shipSize ) {
    dx = 0;
    x = shipSize;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);
