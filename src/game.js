import Ship from './objects/ship.js';
import WanderEnemy from './objects/wander_enemy.js';
import AvoiderEnemy from './objects/avoider_enemy.js';
import FollowEnemy from './objects/follow_enemy.js';
import Bullet from './objects/bullet.js';
import Particle from './objects/particle.js';

class Game {
  constructor(ctx, input, sound) {
    this.ctx = ctx;
    this.input = input;
    this.sound = sound;
    this.newFrame = this.newFrame.bind(this);
    this.resume = this.resume.bind(this);
    this.restart = this.restart.bind(this);
    this.ship = new Ship(Game.WIDTH / 2, Game.HEIGHT / 2);
    this.points = 0;
    this.highscore = Game.BASE_HIGHSCORE;
    this.difficulty = Game.INITIAL_DIFFICULTY;
    this.bullets = [];
    this.message = '';

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
      highscore: document.getElementById('highscore'),
      message: document.getElementById('message'),
      overlay: document.getElementById('canvas-overlay')
    };

    this.input.attachHandlers(this);
    this.updateGameInfoDisplay();
  }

  start() {
    this.enemies = [];
    this.bullets = [];
    this.fillBullets();
    this.particles = [];
    this.sound.play('background');
    this.playing = true;
    requestAnimationFrame(this.newFrame);
  }

  pause() {
    this.playing = false;
    this.sound.pause();
    this.message = 'Paused. Click to resume.';
    this.gameInfo.overlay.classList.remove('d-none');
    this.gameInfo.overlay.addEventListener('click', this.resume);
    this.updateGameInfoDisplay();
  }

  resume() {
    this.playing = true;
    this.sound.play('background');
    this.message = '';
    this.gameInfo.overlay.classList.add('d-none');
    this.gameInfo.overlay.removeEventListener('click', this.resume);
    requestAnimationFrame(this.newFrame);
    this.updateGameInfoDisplay();
  }

  restart() {
    this.gameInfo.overlay.classList.add('d-none');
    this.gameInfo.overlay.removeEventListener('click', this.restart);
    this.message = '';
    this.points = 0;
    this.ship.color = 'white';
    this.ship.lives = 2;
    this.ship.bombs = 2;
    this.difficulty = Game.INITIAL_DIFFICULTY;
    this.updateGameInfoDisplay();
    this.start();
  }

  bomb() {
    if (this.ship.bombs > 0) {
      this.sound.play('bomb');
      this.ship.bombs -= 1;
      this.createParticles(this.ship.x, this.ship.y, this.ship.color);
      this.points += 100;

      this.enemies.forEach((enemy) => {
        this.createParticles(enemy.x, enemy.y, enemy.color);
        this.points += enemy.points;
      });

      this.enemies = [];
      this.updateGameInfoDisplay();
    }
  }

  newFrame(time) {
    this.difficulty += Game.DIFFICULTY_DELTA;
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
      return;
    }

    if (time - this.enemyInfo.wander.last_spawn >= (this.enemyInfo.wander.spawn_rate - this.difficulty)) {
      this.enemies.push(new WanderEnemy(this));
      this.enemies.push(new WanderEnemy(this));
      this.enemyInfo.wander.last_spawn = time;
    }

    if (time - this.enemyInfo.follow.last_spawn >= (this.enemyInfo.follow.spawn_rate - this.difficulty)) {
      this.enemies.push(new FollowEnemy(this));
      this.enemyInfo.follow.last_spawn = time;
    }

    if (time - this.enemyInfo.avoider.last_spawn >= (this.enemyInfo.avoider.spawn_rate - this.difficulty)) {
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

        if (this.ship.lives > 0) {
          this.enemies = [];
          this.ship.lives -= 1;
          this.ship.x = Game.WIDTH / 2;
          this.ship.y = Game.HEIGHT / 2;
          this.ship.color = 'white';
          this.enemies.push(new FollowEnemy(this));
          this.enemies.push(new FollowEnemy(this));
          this.enemies.push(new FollowEnemy(this));
        } else {
          this.bullets = [];

          this.sound.pause();
          this.playing = false;
          this.message = 'Game Over. Click to Play Again.';

          if (this.points > this.highscore) {
            this.highscore = this.points;
            this.message = 'New High Score! Click to Play Again.';
          }

          this.gameInfo.overlay.classList.remove('d-none');
          this.gameInfo.overlay.addEventListener('click', this.restart);
        }

        this.updateGameInfoDisplay();
      }
    });
  }

  checkBulletCollision() {
    this.bullets.forEach((bullet) => {
      this.enemies.forEach((enemy, index) => {
        if (bullet.x >= enemy.x - enemy.width && bullet.x <= enemy.x + enemy.width
          && bullet.y >= enemy.y - enemy.width && bullet.y <= enemy.y + enemy.width
        ) {
          this.createParticles(enemy.x, enemy.y, enemy.color);
          this.points += enemy.points;
          this.enemies.splice(index, 1);
          this.sound.play('kill');
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
    this.gameInfo.message.innerHTML = this.message;
  }

  fillBullets() {
    for (var i = 0; i < Game.BULLET_COUNT; i++) {
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
    for (var i = 0; i < Game.NUM_PARTICLES; i++) {
      this.particles.push(new Particle(x, y, color, Game.PARTICLE_MAX_LIFE));
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
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

Game.WIDTH = 720;
Game.HEIGHT = 540;
Game.PARTICLE_MAX_LIFE = 40;
Game.NUM_PARTICLES = 30;
Game.BULLET_COUNT = 10;
Game.INITIAL_DIFFICULTY = 0.001;
Game.DIFFICULTY_DELTA = 0.003;
Game.BASE_HIGHSCORE = 1000;

export default Game;
