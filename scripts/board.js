const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/ 2;
let y = canvas.height/2;
let dx = 0;
let dy = 0;

let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;
let keySpace = false;

function keyDownHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
    case 37:
      keyLeft = true;
      break;
    case 87:
    case 38:
      keyUp = true;
      break;
    case 68:
    case 39:
      keyRight = true;
      break;
    case 83:
    case 40:
      keyDown = true;
      break;
    case 32:
    case 75:
      keySpace = true;
      break;
  }
}

function keyUpHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
    case 37:
      keyLeft = false;
      break;
    case 87:
    case 38:
      keyUp = false;
      break;
    case 68:
    case 39:
      keyRight = false;
      break;
    case 83:
    case 40:
      keyDown = false;
      break;
    case 32:
    case 75:
      keySpace = false;
      break;
  }
}

function drawShip() {
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 10, y - 10);
  ctx.lineTo(x, y-20);
  ctx.fillStyle = "white";
  ctx.fill();
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
  x += dx;
  y += dy;

  if ( x > canvas.width ) {
    dx = 0;
    x = 640;
  }
  if ( y  > canvas.height ) {
    dy = 0;
    y = 480;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

setInterval(draw, 10);
