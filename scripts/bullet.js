const bulletSize = 5;

const bulletCount = 10;

class Bullet {
  constructor(a, b, angle) {
    this.a = a;
    this.b = b;
    this.angle = angle;
  }

  drawBullet() {
    this.destroyBullet();
    ctx.save();
    ctx.arc(this.a, this.b, 10, 0, 2 *Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }

  destroyBullet() {
    if (this.a > canvas.width - shipSize || this.a < shipSize) {
      this.a = ship.x;
      this.b = ship.y;
      this.angle = ship.angle;
    }
    if ( this.b > canvas.width - shipSize || this.b < shipSize) {
      this.b = ship.y;
      this.a = ship.x;
      this.angle = ship.angle;

    }
  }
}
