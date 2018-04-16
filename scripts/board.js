const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dx = 0;
let dy = 0;
const shipSize = 10;

let ship = new Ship(shipSize, canvas.width/2, canvas.height/2, 0);
const bullets = [];
for (var i = 0; i < 6; i++) {
  bullets.push(new Bullet(ship.x, ship.y, 0));
}

const enemies = [];
enemies.push(new Enemy(10, 20, 20));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.drawShip();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].drawBullet();
  }
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].drawEnemy();
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



function shipCollisionDetection() {

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
    bullets[i].x += ((i + 3) * Math.cos(bullets[i].angle));
    bullets[i].y += ((i + 3) * Math.sin(bullets[i].angle));
  }
}

function turn () {
  move();
  draw();
}

setInterval(turn, 10);
