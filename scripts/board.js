const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let points = 0;
let pointBoard = document.getElementById("points");
let ship = new Ship(canvas.width/2, canvas.height/2);

let bullets = [];
for (var i = 0; i < 10; i++) {
  bullets.push(new Bullet(ship.x, ship.y, ship.angle));
}
const wanderEnemies = [];
for (var i = 0; i < 10; i++) {
  let x = Math.floor(Math.random() * canvas.width);
  if (x === ship.x) x++;
  wanderEnemies.push(new WanderEnemy());
}

const followEnemies = [];
for (var i = 0; i < 5; i++) {
  followEnemies.push(new FollowEnemy());
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
  for (var i = 0; i < wanderEnemies.length; i++) {
    wanderEnemies[i].draw();
  }

  for (var i = 0; i < followEnemies.length; i++) {
    followEnemies[i].draw();
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
        wanderEnemies.push(new WanderEnemy(20, Math.floor(Math.random() * canvas.width),
          Math.floor(Math.random() * canvas.width)));
          points += 10;
          pointBoard.innerHTML = "Points: " + points;
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

function move() {
  ship.move();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move(i);
  }
  for (var i = 0; i < wanderEnemies.length; i++) {
    wanderEnemies[i].move();
  }

  for (var i = 0; i < followEnemies.length; i++) {
    followEnemies[i].move();
  }
}

function turn () {
  move();
  shipCollisionDetection();
  checkBulletCollision();
  draw();
}

setInterval(turn, 10);
