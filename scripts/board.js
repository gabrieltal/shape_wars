const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bulletCount = 10;
let points = 0;
let pointBoard = document.getElementById("points");
let gameOver = document.getElementById("gameOver");
let livesDisplay = document.getElementById("livesDisplay");
let ship = new Ship(canvas.width/2, canvas.height/2);
livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
let bullets = [];
for (var i = 0; i < bulletCount; i++) {
  bullets.push(new Bullet(ship.x, ship.y, ship.angle));
}
let wanderEnemies = [];
let followEnemies = [];
let avoiderEnemies = [];
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
  avoiderEnemy.draw();
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

function reset() {
  gameOver.innerHTML = "";
  ship.x = canvas.width/2;
  ship.y = canvas.width/2;
  ship.angle = 0;
  ship.color = "white";
  bullets = [];
  for (var i = 0; i < bulletCount; i++) {
    bullets.push(new Bullet(ship.x, ship.y, ship.angle));
  }
  if (restart === true) {
    points = 0;
    wanderEnemies = [];
    followEnemies = [];
    ship.lives = 2;
    livesDisplay.innerHTML = "Lives Left: " + ship.lives;
  }
  pointBoard.innerHTML = "Points: " + points;
}

function fillBullets() {
  if (bullets.length === 10) {
    for (var i = 0; i < 90; i++) {
      bullets.push(new Bullet(ship.x, ship.y, ship.angle));
    }
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
        wanderEnemies.push(new WanderEnemy());
          points += 10;
          pointBoard.innerHTML = "Points: " + points;
      }
    }
    for (var z = 0; z < followEnemies.length; z++) {
      let enemyX = followEnemies[z].x;
      let enemyY = followEnemies[z].y;
      let enemyWidth = followEnemies[z].size/2;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
        followEnemies.splice(z, 1);
        followEnemies.push(new FollowEnemy());
          points += 20;
          pointBoard.innerHTML = "Points: " + points;
        }
    }
  }
}

function shipCollisionDetection() {
  const enemies = wanderEnemies.concat(followEnemies);
  for (var i = 0; i < enemies.length; i++) {
    let enemyX = enemies[i].x;
    let enemyY = enemies[i].y;
    let enemyWidth = enemies[i].size/2;
    if (ship.x >= enemyX - enemyWidth && ship.x <= enemyX + enemyWidth
       && ship.y >= enemyY - enemyWidth && ship.y <= enemyY + enemyWidth)
    {
      ship.color = "black";
        if (ship.lives === 2) {
          ship.lives -= 1;
          livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
          reset();
        }
        else if (ship.lives === 1) {
          ship.lives -= 1;
          livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
          reset();
        }
        else if (ship.lives === 0) {
          bullets = [];
          livesDisplay.innerHTML = "Lives Left: " + (ship.lives) + " :(";
          gameOver.innerHTML = "Game Over!!!!";
        }
    }
  }
}

function populateBoard () {
  if (wanderEnemies.length < 5 && points === 0) {
    for (var i = 0; i < 5; i++) {
      wanderEnemies.push(new WanderEnemy());
    }
  }

  if (wanderEnemies.length < 11 && points === 50) {
    for (var i = 0; i < 5; i++) {
      wanderEnemies.push(new WanderEnemy());
    }
  }

  if (followEnemies.length < 2 && points === 200) {
    for (var i = 0; i < 2; i++) {
      followEnemies.push(new FollowEnemy());
    }
  }

  if (followEnemies.length < 5 && points === 400) {
    for (var i = 0; i < 3; i++) {
      followEnemies.push(new FollowEnemy());
    }
  }

  if (followEnemies.length < 8 && points === 3000) {
    for (var i = 0; i < 3; i++) {
      followEnemies.push(new FollowEnemy());
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
  populateBoard();
  move();
  shipCollisionDetection();
  checkBulletCollision();
  draw();
}

setInterval(turn, 10);
