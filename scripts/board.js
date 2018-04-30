const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let pause = true;

let bulletCount = 10;
let points = 0;
let timeToSpawn = Date.now();
let PARTICLE_MAX_LIFE = 40;
let num_particles = 30;

let ship = new Ship(canvas.width/2, canvas.height/2);
let enemies = [];
let bullets = [];
let particles = [];
resetBullets();

let pointBoard = document.getElementById("points");
let livesDisplay = document.getElementById("livesDisplay");
let bombsDisplay = document.getElementById("bombsDisplay");
let highScoreDisplay = document.getElementById("highScores");
let highScore = parseInt(highScoreDisplay.innerText);
livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);

function checkParticleLife() {
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].life >= particles[i].maxLife) {
      particles.splice(i, 1);
    }
  }
}

function createParticles(x, y, color) {
  for (var i = 0; i < num_particles; i++) {
    particles.push(new Particles(x, y, color, PARTICLE_MAX_LIFE));
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].draw();
  }
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].draw();
  }
}

function emptyEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    createParticles(enemies[i].x, enemies[i].y, enemies[i].color);
  }
  enemies = [];
}

function replaceEnemy(enemy) {
  if (enemy instanceof WanderEnemy) {
    enemies.push(new WanderEnemy());
  } else if (enemy instanceof FollowEnemy) {
    enemies.push(new FollowEnemy());
  } else if (enemy instanceof AvoiderEnemy) {
    enemies.push(new AvoiderEnemy());
  }
}

function bomb() {
  if (ship.bombs > 0) {
    createParticles(ship.x, ship.y, "white");
    timeToSpawn = Date.now();
    ship.bombs -= 1;
    this.emptyEnemies();
    bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
  }
}

function resetBullets() {
  bullets = [];
  for (var i = 0; i < bulletCount; i++) {
    bullets.push(new Bullet(ship.x, ship.y, ship.angle));
  }
}

function shipReset() {
  ship.x = canvas.width/2;
  ship.y = canvas.height/2;
  ship.angle = 0;
  ship.color = "white";
}

function reset() {
  emptyEnemies();
  shipReset();
  timeToSpawn = Date.now();
  resetBullets();
  if (restart === true) {
    points = 0;
    ship.lives = 2;
    ship.bombs = 1;
    bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
    livesDisplay.removeAttribute("id");
    livesDisplay.setAttribute("id", "livesDisplay");
    livesDisplay.innerHTML = "Lives Left: " + ship.lives;
  }
  pointBoard.innerHTML = "Points: " + points;
}

function fillBullets() {
  if (bullets.length === 10) {
    for (var i = 0; i < 80; i++) {
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
    for (var j = 0; j < enemies.length; j++) {
      enemyX = enemies[j].x;
      enemyY = enemies[j].y;
      enemyWidth = enemies[j].size/2;
      if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
        && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {

        createParticles(enemies[j].x, enemies[j].y, enemies[j].color);
        replaceEnemy(enemies[j]);
        enemies.splice(j, 1);
          points += 10;
          pointBoard.innerHTML = "Points: " + points;
      }
    }
  }
}

function updateLives() {
  ship.lives -= 1;
  if (ship.lives < 0) {
    livesDisplay.removeAttribute("id");
    livesDisplay.setAttribute("id", "gameOver");
    livesDisplay.innerHTML = "Game Over!!!";
  } else {
    livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
  }
}

function shipCollisionDetection() {
  for (var i = 0; i < enemies.length; i++) {
    let enemyX = enemies[i].x;
    let enemyY = enemies[i].y;
    let enemyWidth = enemies[i].size/2;
    if (ship.x >= enemyX - enemyWidth && ship.x <= enemyX + enemyWidth
       && ship.y >= enemyY - enemyWidth && ship.y <= enemyY + enemyWidth)
    {
      ship.color = "black";
      createParticles(ship.x, ship.y, "red");
        if (ship.lives > 0) {
          updateLives();
          timeToRespawn = Date.now();
          reset();
        } else {
          bullets = [];
          updateLives();
          emptyEnemies();
        }
    }
  }
}

function pauseGame() {
  pause = !pause;
}

function populateBoard () {
  let time = Date.now() - timeToSpawn;
  if (ship.lives < 0) {
  }
  else if (ship.bombs < 1 || ship.lives < 2) {
    if (time >= 1000 && enemies.length < 5) {
      for (var i = 0; i < 6; i++) {
        enemies.push(new WanderEnemy());
      }
    }
    if (time >= 8000 && enemies.length <= 6) {
      for (var i = 0; i < 3; i++) {
        enemies.push(new FollowEnemy());
        enemies.push(new WanderEnemy());
        enemies.push(new AvoiderEnemy());
      }
    }

    if (time >= 20000 && enemies.length <= 15) {
      for (var i = 0; i < 2; i++) {
        enemies.push(new FollowEnemy());
        enemies.push(new AvoiderEnemy());
      }
    }
  } else {
    if (time < 3000 && enemies.length < 4) {
      for (var i = 0; i < 4; i++) {
        enemies.push(new WanderEnemy());
      }
    }

    else if (time >= 5000 && enemies.length < 5) {
      for (var i = 0; i < 3; i++) {
        enemies.push(new WanderEnemy());
      }
    }

    else if (enemies.length < 8 && time >= 10000) {
      for (var i = 0; i < 2; i++) {
        enemies.push(new FollowEnemy());
      }
    }

    else if (enemies.length < 10 && time >= 15000 ) {
      for (var i = 0; i < 3; i++) {
        enemies.push(new FollowEnemy());
      }
      enemies.push(new AvoiderEnemy());
    }

    else if (enemies.length < 14 && time >= 20000 ) {
      for (var i = 0; i < 2; i++) {
        enemies.push(new FollowEnemy());
        enemies.push(new AvoiderEnemy());
      }
    }
  }
}

function move() {
  ship.move();
  for (var i = 0; i < bullets.length; i++) {
    bullets[i].move(i);
  }

  for (var i = 0; i < enemies.length; i++) {
    enemies[i].move();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}

function turn () {
  populateBoard();
  if (pause) {} else {
  move();
  shipCollisionDetection();
  checkBulletCollision();
  draw();
  checkParticleLife();
}
}

setInterval(turn, 10);
