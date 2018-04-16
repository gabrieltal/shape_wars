const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dx = 0;
let dy = 0;
const shipSize = 10;

let ship = new Ship(shipSize, canvas.width/2, canvas.height/2, 0);
let bullet = new Bullet(canvas.width/2, canvas.height/2, ship.angle);

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  console.log(ship.angle);
  bullet.drawBullet();
  ship.drawShip();
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
  bullet.a += Math.cos((bullet.angle));
  bullet.b += Math.sin((bullet.angle));
}

function turn () {
  move();
  draw();
}

setInterval(turn, 10);
