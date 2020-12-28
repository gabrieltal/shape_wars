import Ship from './ship.js';
import WanderEnemy from './wander_enemy.js';
import AvoiderEnemy from './avoider_enemy.js';
import FollowEnemy from './follow_enemy.js';
import Bullet from './bullet.js';

const PARTICLE_MAX_LIFE = 40;
const num_particles = 30;
const BULLET_COUNT = 10;

export default class Game {
  constructor(ctx, input, sound) {
    this.ctx = ctx;
    this.input = input;
    this.sound = sound;
    this.newFrame = this.newFrame.bind(this);
    this.ship = new Ship(360, 270);
    this.points = 0;
    this.highscore = 1000;
    this.bullets = [];

    this.enemyInfo = {
      wander: {
        spawn_rate: 2500,
        last_spawn: null
      },
      follow: {
        spawn_rate: 5000,
        last_spawn: null
      },
      avoider: {
        spawn_rate: 8000,
        last_spawn: null
      }
    }

    this.gameInfo = {
      points: document.getElementById("points"),
      lives: document.getElementById('lives'),
      bombs: document.getElementById('bombs'),
      highscore: document.getElementById('highscore')
    };

    this.updateGameInfoDisplay();
  }

  start() {
    this.enemies = [];
    this.fillBullets();
    this.particles = [];
    this.sound.play('background');
    this.input.attachHandlers();
    this.playing = true;
    requestAnimationFrame(this.newFrame);
  }

  newFrame(time) {
    this.addEnemies(time);
    this.move();
    this.checkShipCollision();
    this.checkBulletCollision();
    this.draw();
    this.checkParticleLife();
    if (this.playing) {
      requestAnimationFrame(this.newFrame);
    }
  }

  move() {
    this.ship.move(this);
    this.bullets.forEach((bullet, idx) => {
      bullet.move(this, idx);
    });

    this.enemies.forEach((enemy) => {
      enemy.move(this);
    });

    this.particles.forEach((particle) => {
      particle.move(this);
    });
  }

  addEnemies(time) {
    if (this.enemyInfo.wander.last_spawn === null) {
      this.enemies.push(new WanderEnemy(this));
      this.enemies.push(new WanderEnemy(this));
      this.enemies.push(new WanderEnemy(this));
      this.enemies.push(new WanderEnemy(this));
      this.enemyInfo.wander.last_spawn = time;
      this.enemyInfo.follow.last_spawn = time;
      this.enemyInfo.avoider.last_spawn = time;
    } else {
      if (time - this.enemyInfo.wander.last_spawn >= this.enemyInfo.wander.spawn_rate) {
        this.enemies.push(new WanderEnemy(this));
        this.enemies.push(new WanderEnemy(this));
        this.enemyInfo.wander.last_spawn = time;
      }
    }

    if (time - this.enemyInfo.follow.last_spawn >= this.enemyInfo.follow.spawn_rate) {
      this.enemies.push(new FollowEnemy(this));
      this.enemyInfo.follow.last_spawn = time;
    }

    if (time - this.enemyInfo.avoider.last_spawn >= this.enemyInfo.avoider.spawn_rate) {
      this.enemies.push(new AvoiderEnemy(this));
      this.enemyInfo.avoider.last_spawn = time;
    }
  }

  checkShipCollision() {
    // for (var i = 0; i < enemies.length; i++) {
    //   let enemyX = enemies[i].x;
    //   let enemyY = enemies[i].y;
    //   let enemyWidth = enemies[i].size/2;
    //   if (ship.x >= enemyX - enemyWidth && ship.x <= enemyX + enemyWidth
    //      && ship.y >= enemyY - enemyWidth && ship.y <= enemyY + enemyWidth)
    //   {
    //     ship.color = "black";
    //     deathSound.play();
    //     createParticles(ship.x, ship.y, "red");
    //       if (ship.lives > 0) {
    //         updateLives();
    //         timeToRespawn = Date.now();
    //         reset();
    //       } else {
    //         bullets = [];
    //         if (points > highScore) {
    //           highScore = points;
    //           highScoreDisplay.innerHTML = highScore;
    //         }
    //         updateLives();
    //         emptyEnemies();
    //       }
    //   }
    // }
  }

  checkBulletCollision() {
    // for (var i = 0; i < bullets.length; i++) {
    //   let bx = bullets[i].x;
    //   let by = bullets[i].y;
    //   let enemyX;
    //   let enemyY;
    //   let enemyWidth;
    //   for (var j = 0; j < enemies.length; j++) {
    //     enemyX = enemies[j].x;
    //     enemyY = enemies[j].y;
    //     enemyWidth = enemies[j].size/2;
    //     if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
    //       && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
    //
    //       createParticles(enemies[j].x, enemies[j].y, enemies[j].color);
    //       replaceEnemy(enemies[j]);
    //       enemies.splice(j, 1);
    //         enemyDestroy.play();
    //         points += 10;
    //         pointBoard.innerHTML = "Points: " + points;
    //     }
    //   }
    // }
  }

  updateGameInfoDisplay() {
    this.gameInfo.points.innerHTML = this.points;
    this.gameInfo.lives.innerHTML = this.ship.lives
    this.gameInfo.bombs.innerHTML = this.ship.bombs;
    this.gameInfo.highscore.innerHTML = this.highscore;
  }

  fillBullets() {
    for (var i = 0; i < BULLET_COUNT; i++) {
      this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
    }
  }

  checkParticleLife() {
    // for (var i = 0; i < particles.length; i++) {
    //   if (particles[i].life >= particles[i].maxLife) {
    //     particles.splice(i, 1);
    //   }
    // }
  }

  createParticles(x, y, color) {
    for (var i = 0; i < num_particles; i++) {
      particles.push(new Particles(x, y, color, PARTICLE_MAX_LIFE));
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 720, 540);
    this.ship.draw(this.ctx);

    this.bullets.forEach((bullet) => {
      bullet.draw(this.ctx);
    });

    this.enemies.forEach((enemy) => {
      enemy.draw(this.ctx);
    });

    this.particles.forEach((particle) => {
      particle.draw(this.ctx);
    });
  }
};

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
    bombSound.play();
    points += 200;
    pointBoard.innerHTML = "Points: " + points;
    createParticles(ship.x, ship.y, "white");
    timeToSpawn = Date.now();
    ship.bombs -= 1;
    this.emptyEnemies();
    bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
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
    ship.bombs = 2;
    bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
    livesDisplay.removeAttribute("id");
    livesDisplay.setAttribute("id", "livesDisplay");
    livesDisplay.innerHTML = "Lives Left: " + ship.lives;
  }
  pointBoard.innerHTML = "Points: " + points;
  if (pause === true) {
    pauseGame();
  }
}

function updateLives() {
  ship.lives -= 1;
  if (ship.lives < 0) {
    livesDisplay.removeAttribute("id");
    livesDisplay.setAttribute("id", "gameOver");
    livesDisplay.innerHTML = "Game Over!!! Press R to restart";
  } else {
    livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
  }
}
