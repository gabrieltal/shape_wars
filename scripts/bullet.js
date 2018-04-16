const bulletSize = 3;

class Bullet {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  drawBullet() {
    this.destroyBullet();
    ctx.beginPath();
    ctx.arc(this.x, this.y, bulletSize, 0, 2 *Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  destroyBullet() {
    if (this.x > canvas.width - shipSize || this.x < shipSize) {
      this.x = ship.x;
      this.y = ship.y;
      this.angle = ship.angle;
    }
    if ( this.y > canvas.width - shipSize || this.y < shipSize) {
      this.y = ship.y;
      this.x = ship.x;
      this.angle = ship.angle;

    }
  }
}
