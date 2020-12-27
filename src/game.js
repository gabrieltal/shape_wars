const PARTICLE_MAX_LIFE = 40;
const num_particles = 30;

export default class Game {
  constructor(ctx, input, sound) {
    this.ctx = ctx;
    this.input = input;
    this.sound = sound;
  }

  start() {
    this.ship = new Ship(360, 270);
    this.enemies = [];
    this.bulletCount = 10;
    this.points = 0;
    this.bullets = [];
    this.particles = [];
  }

  resetBullets() {
    for (var i = 0; i < bulletCount; i++) {
      this.bullets.push(new Bullet(this.ship.x, this.ship.y, this.ship.angle));
    }
  }

  addMuteListener() {
    volumeCtrls.addEventListener("change", this.updateVolume);
    soundOnDisplay.addEventListener("click", this.switchMute);
    muteDisplay.addEventListener("click", this.switchMute);
    volumeCtrls.addEventListener("mouseup", () => volumeCtrls.blur() )
  }
}


// let pause = true;
// let timeToSpawn;
// let soundTips = document.getElementById("soundTipDisplay");
// let pointBoard = document.getElementById("points");
// let livesDisplay = document.getElementById("livesDisplay");
// let bombsDisplay = document.getElementById("bombsDisplay");
// let highScoreDisplay = document.getElementById("highScores");
// let highScore = parseInt(highScoreDisplay.innerText);
// let bombSound = document.getElementById('bombAudio');
// let enemyDestroy = document.getElementById('destroyEnemy');
// let mainSong = document.getElementById('mainSong');
// let deathSound = document.getElementById('die');
// let mute = true;
// let muteDisplay = document.querySelector(".fas.fa-volume-off");
// let soundOnDisplay = document.querySelector(".fas.fa-volume-up");
// let volumeCtrls = document.getElementById("volume-ctrls");
// let demoDisplay = document.getElementById("demoDisplay");
// let demoInt;
// let demoLoop;
//
// addMuteListener();
// updateVolume();
// switchMute();
// livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
// bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
// demo();
//
// function demo() {
//   ship.color = "white";
//   demoTurn();
//   startDemoReel();
//   demoInt = setInterval(demoTurn, 12);
// }
//
// function WpressDemo() {
//   demoLoop = setInterval(() => {
//     if (keyLeft) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Press S to move down";
//       ApressDemo();
//     }
//   }, 100)
// }
//
// function ApressDemo() {
//   demoLoop = setInterval(() => {
//     if (keyDown) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Press D to move right";
//       SpressDemo();
//     }
//   }, 100)
// }
//
// function SpressDemo() {
//   demoLoop = setInterval(() => {
//     if (keyRight) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Press left arrow to rotate left";
//       DpressDemo();
//     }
//   }, 100)
// }
//
// function DpressDemo() {
//   demoLoop = setInterval(() => {
//     if (rotateLeft) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Press right arrow to rotate right";
//       LRotpressDemo();
//     }
//   }, 100)
// }
//
// function LRotpressDemo() {
//   demoLoop = setInterval(() => {
//     if (rotateRight) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Space bar to use a bomb. It clears the screen of enemies!";
//       RRotpressDemo();
//     }
//   }, 100);
// }
//
// function RRotpressDemo() {
//   enemies.push(new WanderEnemy())
//   demoLoop = setInterval(() => {
//     if (bombPress) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Destroy enemies and try to stay alive! During gameplay press P to pause. Click below to start, good luck :)"
//       soundTips.style.display = 'inline-block';
//     }
//   }, 100);
// }
//
// function startDemoReel() {
//   demoLoop = setInterval(() => {
//     if (keyUp) {
//       clearInterval(demoLoop);
//       demoDisplay.innerHTML = "Press A to move left";
//       WpressDemo();
//     }
//   }, 100);
// }
//
// function demoTurn() {
//   move();
//   shipCollisionDetection()
//   checkBulletCollision();
//   draw();
//   checkParticleLife();
// }
//
//
//
// function switchMute() {
//   mute = !mute;
//   if (mute) {
//     soundOnDisplay.removeAttribute("id");
//     muteDisplay.setAttribute("id", "selectedMute");
//   } else {
//     muteDisplay.removeAttribute("id");
//     soundOnDisplay.setAttribute("id", "selectedMute");
//   }
//
//   bombSound.muted = mute;
//   mainSong.muted = mute;
//   deathSound.muted = mute;
//   enemyDestroy.muted = mute;
// }
//
// function updateVolume() {
//   bombSound.volume = volumeCtrls.value;
//   mainSong.volume = volumeCtrls.value;
//   deathSound.volume = volumeCtrls.value;
//   enemyDestroy.volume = volumeCtrls.value;
//
//   if (volumeCtrls.value === 0) {
//     if (mute === false) {
//       switchMute();
//     }
//   }
// }
//
// function checkParticleLife() {
//   for (var i = 0; i < particles.length; i++) {
//     if (particles[i].life >= particles[i].maxLife) {
//       particles.splice(i, 1);
//     }
//   }
// }
//
// function createParticles(x, y, color) {
//   for (var i = 0; i < num_particles; i++) {
//     particles.push(new Particles(x, y, color, PARTICLE_MAX_LIFE));
//   }
// }
//
// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ship.draw();
//   for (var i = 0; i < bullets.length; i++) {
//     bullets[i].draw();
//   }
//   for (var i = 0; i < enemies.length; i++) {
//     enemies[i].draw();
//   }
//   for (var i = 0; i < particles.length; i++) {
//     particles[i].draw();
//   }
// }
//
// function startGame () {
//   let initialDisplay = document.getElementById("overDisplay");
//   initialDisplay.style.display = 'none';
//   mainSong.play();
//   timeToSpawn = Date.now();
//   demoDisplay.style.display = "none";
//   points = 0;
//   pointBoard.innerHTML = 'Points: ' + points;
//   points = 0;
//   ship.lives = 2;
//   ship.bombs = 2;
//   bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
//   livesDisplay.removeAttribute("id");
//   livesDisplay.setAttribute("id", "livesDisplay");
//   livesDisplay.innerHTML = "Lives Left: " + ship.lives;
//   soundTips.style.display = 'none';
//   clearInterval(demoInt);
//   clearInterval(demoLoop);
//   setInterval(turn, 10);
//   if (pause === true) {
//     pauseGame();
//   }
// }
//
// function emptyEnemies() {
//   for (var i = 0; i < enemies.length; i++) {
//     createParticles(enemies[i].x, enemies[i].y, enemies[i].color);
//   }
//   enemies = [];
// }
//
// function replaceEnemy(enemy) {
//   if (enemy instanceof WanderEnemy) {
//     enemies.push(new WanderEnemy());
//   } else if (enemy instanceof FollowEnemy) {
//     enemies.push(new FollowEnemy());
//   } else if (enemy instanceof AvoiderEnemy) {
//     enemies.push(new AvoiderEnemy());
//   }
// }
//
// function bomb() {
//   if (ship.bombs > 0) {
//     bombSound.play();
//     points += 200;
//     pointBoard.innerHTML = "Points: " + points;
//     createParticles(ship.x, ship.y, "white");
//     timeToSpawn = Date.now();
//     ship.bombs -= 1;
//     this.emptyEnemies();
//     bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
//   }
// }
//
//
//
// function shipReset() {
//   ship.x = canvas.width/2;
//   ship.y = canvas.height/2;
//   ship.angle = 0;
//   ship.color = "white";
// }
//
// function reset() {
//   emptyEnemies();
//   shipReset();
//   timeToSpawn = Date.now();
//   resetBullets();
//   if (restart === true) {
//     points = 0;
//     ship.lives = 2;
//     ship.bombs = 2;
//     bombsDisplay.innerHTML = "Bombs Left: " + (ship.bombs);
//     livesDisplay.removeAttribute("id");
//     livesDisplay.setAttribute("id", "livesDisplay");
//     livesDisplay.innerHTML = "Lives Left: " + ship.lives;
//   }
//   pointBoard.innerHTML = "Points: " + points;
//   if (pause === true) {
//     pauseGame();
//   }
// }
//
// function fillBullets() {
//   if (bullets.length === 10) {
//     for (var i = 0; i < 80; i++) {
//       bullets.push(new Bullet(ship.x, ship.y, ship.angle));
//     }
//   }
// }
//
// function checkBulletCollision() {
//   for (var i = 0; i < bullets.length; i++) {
//     let bx = bullets[i].x;
//     let by = bullets[i].y;
//     let enemyX;
//     let enemyY;
//     let enemyWidth;
//     for (var j = 0; j < enemies.length; j++) {
//       enemyX = enemies[j].x;
//       enemyY = enemies[j].y;
//       enemyWidth = enemies[j].size/2;
//       if (bx >= enemyX - enemyWidth && bx <= enemyX + enemyWidth
//         && by >= enemyY - enemyWidth && by <= enemyY + enemyWidth ) {
//
//         createParticles(enemies[j].x, enemies[j].y, enemies[j].color);
//         replaceEnemy(enemies[j]);
//         enemies.splice(j, 1);
//           enemyDestroy.play();
//           points += 10;
//           pointBoard.innerHTML = "Points: " + points;
//       }
//     }
//   }
// }
//
// function updateLives() {
//   ship.lives -= 1;
//   if (ship.lives < 0) {
//     livesDisplay.removeAttribute("id");
//     livesDisplay.setAttribute("id", "gameOver");
//     livesDisplay.innerHTML = "Game Over!!! Press R to restart";
//   } else {
//     livesDisplay.innerHTML = "Lives Left: " + (ship.lives);
//   }
// }
//
// function shipCollisionDetection() {
//   for (var i = 0; i < enemies.length; i++) {
//     let enemyX = enemies[i].x;
//     let enemyY = enemies[i].y;
//     let enemyWidth = enemies[i].size/2;
//     if (ship.x >= enemyX - enemyWidth && ship.x <= enemyX + enemyWidth
//        && ship.y >= enemyY - enemyWidth && ship.y <= enemyY + enemyWidth)
//     {
//       ship.color = "black";
//       deathSound.play();
//       createParticles(ship.x, ship.y, "red");
//         if (ship.lives > 0) {
//           updateLives();
//           timeToRespawn = Date.now();
//           reset();
//         } else {
//           bullets = [];
//           if (points > highScore) {
//             highScore = points;
//             highScoreDisplay.innerHTML = highScore;
//           }
//           updateLives();
//           emptyEnemies();
//         }
//     }
//   }
// }
//
// function pauseGame() {
//   pause = !pause;
//   if (pause) {
//     mainSong.pause();
//   } else {
//     mainSong.play();
//   }
// }
//
// function populateBoard () {
//   let time = Date.now() - timeToSpawn;
//   if (ship.lives < 0) {
//   }
//   else if (ship.bombs < 1 || ship.lives < 2) {
//     if (time >= 1000 && enemies.length < 5) {
//       for (var i = 0; i < 6; i++) {
//         enemies.push(new WanderEnemy());
//       }
//     }
//     if (time >= 8000 && enemies.length <= 6) {
//       for (var i = 0; i < 3; i++) {
//         enemies.push(new FollowEnemy());
//         enemies.push(new WanderEnemy());
//         enemies.push(new AvoiderEnemy());
//       }
//     }
//
//     if (time >= 20000 && enemies.length <= 15) {
//       for (var i = 0; i < 2; i++) {
//         enemies.push(new FollowEnemy());
//         enemies.push(new AvoiderEnemy());
//       }
//     }
//   } else {
//     if (time < 3000 && enemies.length < 4) {
//       for (var i = 0; i < 4; i++) {
//         enemies.push(new WanderEnemy());
//       }
//     }
//
//     else if (time >= 5000 && enemies.length < 5) {
//       for (var i = 0; i < 3; i++) {
//         enemies.push(new WanderEnemy());
//       }
//     }
//
//     else if (enemies.length < 8 && time >= 10000) {
//       for (var i = 0; i < 2; i++) {
//         enemies.push(new FollowEnemy());
//       }
//     }
//
//     else if (enemies.length < 10 && time >= 15000 ) {
//       for (var i = 0; i < 3; i++) {
//         enemies.push(new FollowEnemy());
//       }
//       enemies.push(new AvoiderEnemy());
//     }
//
//     else if (enemies.length < 14 && time >= 20000 ) {
//       for (var i = 0; i < 2; i++) {
//         enemies.push(new FollowEnemy());
//         enemies.push(new AvoiderEnemy());
//       }
//     }
//   }
// }
//
// function move() {
//   ship.move();
//   for (var i = 0; i < bullets.length; i++) {
//     bullets[i].move(i);
//   }
//
//   for (var i = 0; i < enemies.length; i++) {
//     enemies[i].move();
//   }
//
//   for (var i = 0; i < particles.length; i++) {
//     particles[i].move();
//   }
// }
//
// function turn () {
//   populateBoard();
//   if (!pause) {
//     move();
//     shipCollisionDetection();
//     checkBulletCollision();
//     draw();
//     checkParticleLife();
//   }
// }
