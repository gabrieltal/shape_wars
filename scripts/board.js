const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bulletCount = 10;
let points = 0;
let pointBoard = document.getElementById("points");
let gameOver = document.getElementById("gameOver");
let livesDisplay = document.getElementById("livesDisplay");
let ship = new Ship(canvas.width/2, canvas.height/2);
livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
let timeToSpawn = Date.now();
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
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
  for (var i = 0; i < wanderEnemies.length; i++) {
    wanderEnemies[i].draw();
  }

  for (var i = 0; i < followEnemies.length; i++) {
    followEnemies[i].draw();
  }

  for (var i = 0; i < avoiderEnemies.length; i++) {
    avoiderEnemies[i].draw();
  }
}

function bomb() {
  if (ship.bombs > 0) {
    ship.bombs -= 1;
    wanderEnemies = [];
    followEnemies = [];
    avoiderEnemies = [];
    timeToSpawn = Date.now();
  }
}

function reset() {
  gameOver.innerHTML = "";
  ship.x = canvas.width/2;
  ship.y = canvas.width/2;
  ship.angle = 0;
  ship.color = "white";
  this.bomb();
  wanderEnemies = [];
  followEnemies = [];
  avoiderEnemies = [];
  timeToSpawn = Date.now();
  bullets = [];
  for (var i = 0; i < bulletCount; i++) {
    bullets.push(new Bullet(ship.x, ship.y, ship.angle));
  }
  if (restart === true) {
    points = 0;
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
    let enemyX;
    let enemyY;
    let enemyWidth;
    for (var j = 0; j < wanderEnemies.length; j++) {
      enemyX = wanderEnemies[j].x;
      enemyY = wanderEnemies[j].y;
      enemyWidth = wanderEnemies[j].size/2;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
        wanderEnemies.splice(j, 1);
        wanderEnemies.push(new WanderEnemy());
          points += 10;
          pointBoard.innerHTML = "Points: " + points;
      }
    }
    for (var z = 0; z < followEnemies.length; z++) {
      enemyX = followEnemies[z].x;
      enemyY = followEnemies[z].y;
      enemyWidth = followEnemies[z].size/2;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
        followEnemies.splice(z, 1);
        followEnemies.push(new FollowEnemy());
          points += 20;
          pointBoard.innerHTML = "Points: " + points;
        }
    }

    for (var y = 0; y < avoiderEnemies.length; y++) {
      enemyX = avoiderEnemies[y].x;
      enemyY = avoiderEnemies[y].y;
      enemyWidth = avoiderEnemies[y].size;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth) {
          avoiderEnemies.splice(y, 1);
          avoiderEnemies.push(new AvoiderEnemy());
          points += 30;
          pointBoard.innerHTML = "Points: " + points;
        }
    }
  }
}

function shipCollisionDetection() {
  const enemies = wanderEnemies.concat(followEnemies).concat(avoiderEnemies);
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
        } else if (ship.lives === 1 ) {
          ship.lives -= 1;
          livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
          timeToRespawn = Date.now();
          reset();
        } else if (ship.lives === 0 ) {
          bullets = [];
          livesDisplay.innerHTML = "Lives Left: " + (ship.lives) + " :(";
          gameOver.innerHTML = "Game Over!!!!";
        }
    }
  }
}

function populateBoard () {
  let time = Date.now() - timeToSpawn;

  if (ship.lives < 2 || ship.bombs < 1) {
    if (time < 5000 && wanderEnemies.length < 7) {
      for (var i = 0; i < 7; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (time >= 7000 && avoiderEnemies.length < 7) {
      for (var i = 0; i < 7; i++) {
        followEnemies.push(new FollowEnemy());
        wanderEnemies.push(new WanderEnemy());
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }

    if (time >= 20000 && avoiderEnemies.length < 8) {
      for (var i = 0; i < 5; i++) {
        followEnemies.push(new FollowEnemy());
        wanderEnemies.push(new WanderEnemy());
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }
  } else {
    if (time < 5000 && wanderEnemies.length < 5) {
      for (var i = 0; i < 5; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (time >= 10000 && wanderEnemies.length < 5) {
      for (var i = 0; i < 5; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (followEnemies.length < 2 && time >= 15000) {
      for (var i = 0; i < 2; i++) {
        followEnemies.push(new FollowEnemy());
      }
    }

    if (followEnemies.length < 5 && time >= 20000 ) {
      for (var i = 0; i < 3; i++) {
        followEnemies.push(new FollowEnemy());
      }
      avoiderEnemies.push(new AvoiderEnemy());
    }

    if (followEnemies.length < 8 && time >= 35000 ) {
      for (var i = 0; i < 3; i++) {
        followEnemies.push(new FollowEnemy());
      }
      for (var i = 0; i < 2; i++) {
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }

    if (time >= 45000 && followEnemies.length <= 11) {
      for (var i = 0; i < 4; i++) {
        followEnemies.push(new FollowEnemy());
        avoiderEnemies.push(new AvoiderEnemy());
        wanderEnemies.push(new WanderEnemy());
      }
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

  for (var i = 0; i < avoiderEnemies.length; i++) {
    avoiderEnemies[i].move();
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
