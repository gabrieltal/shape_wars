import Ship from './ship.js';
import WanderEnemy from './wander_enemy.js';
import AvoiderEnemy from './avoider_enemy.js';
import FollowEnemy from './follow_enemy.js';
import Bullet from './bullet.js';
import Particle from './particle.js';

class Game {
  constructor(ctx, input, sound) {
    this.ctx = ctx;
    this.input = input;
    this.sound = sound;
    this.newFrame = this.newFrame.bind(this);
    this.resume = this.resume.bind(this);
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
    this.input.attachHandlers(this);
    this.playing = true;
    requestAnimationFrame(this.newFrame);
  }

  pause() {
    this.playing = false;
    document.getElementById('message').innerHTML = "Paused. Click to resume game."
    document.body.addEventListener('click', this.resume);
  }

  resume() {
    this.playing = true;
    document.getElementById('message').innerHTML = ""
    requestAnimationFrame(this.newFrame);
    document.body.removeEventListener('click', this.resume);
  }

  bomb() {
    if (this.ship.bombs > 0) {
      this.sound.play('bomb');
      this.ship.bombs -= 1;
      this.createParticles(this.ship.x, this.ship.y, this.ship.color);
      this.points += 100;

      this.enemies.forEach((enemy) => {
        this.createParticles(enemy.x, enemy.y, enemy.color);
        this.points += 10;
      });

      this.enemies = [];
      this.updateGameInfoDisplay();
    }
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
    this.bombPressed = true;
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
    this.enemies.forEach((enemy) => {
      if (this.ship.x >= enemy.x - enemy.width && this.ship.x <= enemy.x + enemy.width
          && this.ship.y >= enemy.y - enemy.width && this.ship.y <= enemy.y + enemy.width) {
        this.ship.color = 'black';
        this.sound.play('death');
        this.createParticles(this.ship.x, this.ship.y, 'red');
      }
    });
    // if (ship.lives > 0) {
    //   updateLives();
    //   timeToRespawn = Date.now();
    //   reset();
    // } else {
    //   bullets = [];
    //   if (points > highScore) {
    //     highScore = points;
    //     highScoreDisplay.innerHTML = highScore;
    //   }
    //   updateLives();
    //   emptyEnemies();
    // }
  }

  checkBulletCollision() {
    this.bullets.forEach((bullet) => {
      this.enemies.forEach((enemy, index) => {
        if (bullet.x >= enemy.x - enemy.width && bullet.x <= enemy.x + enemy.width
          && bullet.y >= enemy.y - enemy.width && bullet.y <= enemy.y + enemy.width
        ) {
          this.createParticles(enemy.x, enemy.y, enemy.color);
          this.enemies.splice(index, 1);
          this.sound.play('kill');
          this.points += 10;
          this.updateGameInfoDisplay();
        }
      });
    });
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
    this.particles.forEach((particle, i) => {
      if (particle.life >= particle.maxLife) {
        this.particles.splice(i, 1);
      }
    });
  }

  createParticles(x, y, color) {
    for (var i = 0; i < num_particles; i++) {
      this.particles.push(new Particle(x, y, color, PARTICLE_MAX_LIFE));
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
Game.WIDTH = 720;
Game.HEIGHT = 540;
Game.PARTICLE_MAX_LIFE = 40;
Game.NUM_PARTICLES = 30;
Game.BULLET_COUNT = 10;
Game.INITIAL_DIFFICULTY = 0.001;
Game.DIFFICULTY_DELTA = 0.003;
Game.BASE_HIGHSCORE = 1000;

export default Game;
