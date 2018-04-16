const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/ 2;
let y = canvas.height/2;
let dx = 0;
let dy = 0;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  updatePosition();
  checkBounds();
}


function updatePosition() {
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
}

function checkBounds() {
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

setInterval(draw, 10);
