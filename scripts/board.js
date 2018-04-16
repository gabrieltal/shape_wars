const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dx = 0;
let dy = 0;
const shipSize = 10;
const bulletCount = 3;
const bullets = [];
let ship = new Ship(shipSize, canvas.width/2, canvas.height/2, 0);
for (var i = 0; i < bulletCount; i++) {
  bullets.push(new Bullet(canvas.width/2, canvas.height/2, 0))
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.drawShip();

  for (var i = 0; i < bullets.length; i++) {
    bullets[i].drawBullet();
  }
  updatePosition();
  checkBounds();
}

function updatePosition() {
  if (keyLeft) {
    dx -= .04;
  } else if (keyRight) {
    dx += .04;
  } else if (keyUp) {
    dy -= .04;
  } else if (keyDown) {
    dy += .04;
  } else {
    dx += dx > 0 ? -.02 : 0.02;
    dy += dy > 0 ? -.02 : 0.02;
  }

  if (rotateLeft) {
    ship.angle -= .03;
  } else if (rotateRight) {
    ship.angle += .03;
  }


}

function checkBounds() {
  if ( ship.x > canvas.width - shipSize ) {
    dx = 0;
    ship.x = canvas.width - shipSize;
  }
  if ( ship.y  > canvas.height - shipSize ) {
    dy = 0;
    ship.y = canvas.height - shipSize;
  }
  if ( ship.y < shipSize ) {
    dy = 0;
    ship.y = shipSize;
  }
  if ( ship.x < shipSize ) {
    dx = 0;
    ship.x = shipSize;
  }
}

function move() {
  ship.x += dx;
  ship.y += dy;
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].x += 2 * Math.cos((bullets[i].angle));
    bullets[i].y += 2 * Math.sin((bullets[i].angle));
  }
}

function turn () {
  move();
  draw();
}

setInterval(turn, 10);
