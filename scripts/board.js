const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let x = canvas.width/ 2;
let y = canvas.height/2;
let dx = 0;
let dy = 0;
let a = x;
let b = y;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawShip();
  drawBullet();
  updatePosition();
  checkBounds();
}

function updatePosition() {
  if (keyLeft) {
    dx -= .03;
  } else if (keyRight) {
    dx += .03;
  } else if (keyUp) {
    dy -= .03;
  } else if (keyDown) {
    dy += .03;
  } else {
    dx += dx > 0 ? -.02 : 0.02;
    dy += dy > 0 ? -.02 : 0.02;
  }

  if (rotateLeft) {
    angle -= .03;
  } else if (rotateRight) {
    angle += .03;
  }
  x += dx;
  y += dy;
  a += Math.cos(angle);
  b += Math.sin(angle);
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

function move() {
  
}

function turn () {
  move();
  draw();
}

setInterval(turn, 10);
