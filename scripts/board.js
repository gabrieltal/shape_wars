const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let bulletCount = 10;
let points = 0;
let pointBoard = document.getElementById("points");
let livesDisplay = document.getElementById("livesDisplay");
let ship = new Ship(canvas.width/2, canvas.height/2);
livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
let bombsDisplay = document.getElementById("bombsDisplay");
bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
let timeToSpawn = Date.now();
let bullets = [];
for (var i = 0; i < bulletCount; i++) {
  bullets.push(new Bullet(ship.x, ship.y, ship.angle));
}
let wanderEnemies = [];
let followEnemies = [];
let avoiderEnemies = [];
let highScoreDisplay = document.getElementById("highScores");
let highScore = parseInt(highScoreDisplay.innerText);
let PARTICLE_MAX_LIFE = 50;
let num_particles = 10;
let particles = [];

function checkParticleLife() {
  for (var i = 0; i < particles.length; i++) {
    if (particles[i].life >= particles[i].maxLife) {
      particles.splice(i, 1);
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ship.draw();
  let enemies = this.enemies();
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

function enemies() {
  return  wanderEnemies.concat(followEnemies).concat(avoiderEnemies);
}

function emptyEnemies() {
  let enemies = this.enemies();
  for (var i = 0; i < enemies.length; i++) {
    for (var j = 0; j < num_particles; j++) {
      particles.push(new Particles(enemies[i].x, enemies[i].y, enemies[i].color, PARTICLE_MAX_LIFE));
    }
  }
  wanderEnemies = [];
  followEnemies = [];
  avoiderEnemies = [];
}

function bomb() {
  if (ship.bombs > 0) {
    for (var i = 0; i < num_particles; i++) {
      particles.push(new Particles(ship.x, ship.y, "green", PARTICLE_MAX_LIFE));
    }
    timeToSpawn = Date.now();
    ship.bombs -= 1;
    this.emptyEnemies();
    bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
  }
}

function reset() {
  ship.x = canvas.width/2;
  ship.y = canvas.width/2;
  ship.angle = 0;
  ship.color = "white";
  this.emptyEnemies();
  timeToSpawn = Date.now();
  bullets = [];
  for (var i = 0; i < bulletCount; i++) {
    bullets.push(new Bullet(ship.x, ship.y, ship.angle));
  }
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

        for (var i = 0; i < num_particles; i++) {
          particles.push(new Particles(wanderEnemies[j].x, wanderEnemies[j].y, wanderEnemies[j].color, PARTICLE_MAX_LIFE));
        }
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
        for (var i = 0; i < num_particles; i++) {
          particles.push(new Particles(followEnemies[z].x, followEnemies[z].y, followEnemies[z].color, PARTICLE_MAX_LIFE));
        }
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
          for (var i = 0; i < num_particles; i++) {
            particles.push(new Particles(avoiderEnemies[y].x, avoiderEnemies[y].y, avoiderEnemies[y].color, PARTICLE_MAX_LIFE));
          }
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
      for (var i = 0; i < num_particles; i++) {
        particles.push(new Particles(ship.x, ship.y, "red", PARTICLE_MAX_LIFE));
      }
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
          ship.lives -= 1;
          livesDisplay.removeAttribute("id");
          livesDisplay.setAttribute("id", "gameOver");
          livesDisplay.innerHTML = "Game Over!!!!";
          if (points > highScore) {
            highScoreDisplay.innerText = points;
            highScore = points;
          }
          emptyEnemies();
        }
    }
  }
}

function populateBoard () {
  let time = Date.now() - timeToSpawn;
  if (ship.lives < 0) {
  }
  else if (ship.bombs < 1 || ship.lives < 2) {
    if (time >= 1000 && wanderEnemies.length < 6) {
      for (var i = 0; i < 7; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (time >= 8000 && avoiderEnemies.length < 3) {
      for (var i = 0; i < 4; i++) {
        followEnemies.push(new FollowEnemy());
        wanderEnemies.push(new WanderEnemy());
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }

    if (time >= 20000 && avoiderEnemies.length < 5) {
      for (var i = 0; i < 2; i++) {
        followEnemies.push(new FollowEnemy());
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }
  } else {
    if (time < 3000 && wanderEnemies.length < 4) {
      for (var i = 0; i < 4; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (time >= 5000 && wanderEnemies.length < 5) {
      for (var i = 0; i < 4; i++) {
        wanderEnemies.push(new WanderEnemy());
      }
    }

    if (followEnemies.length < 2 && time >= 10000) {
      for (var i = 0; i < 2; i++) {
        followEnemies.push(new FollowEnemy());
      }
    }

    if (followEnemies.length < 3 && time >= 15000 ) {
      for (var i = 0; i < 3; i++) {
        followEnemies.push(new FollowEnemy());
      }
      avoiderEnemies.push(new AvoiderEnemy());
    }

    if (followEnemies.length < 6 && time >= 20000 ) {
      for (var i = 0; i < 2; i++) {
        followEnemies.push(new FollowEnemy());
      }
      for (var i = 0; i < 2; i++) {
        avoiderEnemies.push(new AvoiderEnemy());
      }
    }

    if (time >= 30000 && followEnemies.length <= 6) {
      for (var i = 0; i < 3; i++) {
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

  let enemies = this.enemies();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].move();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].move();
  }
}

function turn () {
  populateBoard();
  move();
  shipCollisionDetection();
  checkBulletCollision();
  draw();
  checkParticleLife();
}

setInterval(turn, 10);
