const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let dx = 0;
let dy = 0;
const shipSize = 10;

let ship = new Ship(shipSize, canvas.width/2, canvas.height/2, 0);
let bullets = [];
for (var i = 0; i < 10; i++) {
  bullets.push(new Bullet(ship.x, ship.y, 0));
}

const wanderEnemies = [];
for (var i = 0; i < 8; i++) {
  wanderEnemies.push(new WanderEnemy(20, canvas.width/2, canvas.width/2));
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.drawShip();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].drawBullet();
  }
  for (var i = 0; i < wanderEnemies.length; i++) {
    wanderEnemies[i].drawEnemy();
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

function checkBulletCollision() {
  for (var i = 0; i < bullets.length; i++) {
    let bx = bullets[i].x;
    let by = bullets[i].y;
    for (var j = 0; j < wanderEnemies.length; j++) {
      let enemyX = wanderEnemies[j].x;
      let enemyY = wanderEnemies[j].y;
      let enemyWidth = wanderEnemies[j].size/2;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
        wanderEnemies.splice(j, 1);
      }
    }
  }
}


function shipCollisionDetection() {
  for (var i = 0; i < wanderEnemies.length; i++) {
    let enemyX = wanderEnemies[i].x;
    let enemyY = wanderEnemies[i].y;
    let enemyWidth = wanderEnemies[i].size/2;
    if (ship.x >= enemyX - enemyWidth && ship.x <= enemyX + enemyWidth
       && ship.y >= enemyY - enemyWidth && ship.y <= enemyY + enemyWidth) {
        ship.color = "black";
        bullets = [];
    }
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
    bullets[i].x += ((i + 3) * Math.cos(bullets[i].angle));
    bullets[i].y += ((i + 3) * Math.sin(bullets[i].angle));
  }
  for (var i = 0; i < wanderEnemies.length; i++) {
    wanderEnemies[i].enemyMove();
  }
}

function turn () {
  move();
  shipCollisionDetection();
  checkBulletCollision();
  draw();
}

setInterval(turn, 10);
