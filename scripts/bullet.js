
const bulletSize = 3;
const bulletSpeed = 4;
class Bullet extends MovingObject {
  constructor(x, y, angle) {
    super(x, y, bulletSize, "yellow", 0, 0)
    this.angle = angle;
    this.i = i+1;
  }

  draw() {
    this.checkBounds();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 *Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  move(i) {
    this.dx = (i + bulletSpeed) * Math.cos(this.angle);
    this.dy = (i + bulletSpeed) * Math.sin(this.angle);
    this.x += this.dx;
    this.y += this.dy;
  }

  checkBounds() {
    if (this.x > canvas.width - ship.size || this.x < ship.size) {
      this.x = ship.x;
      this.y = ship.y;
      this.angle = ship.angle;
    }
    if ( this.y > canvas.width - ship.size || this.y < ship.size) {
      this.y = ship.y;
      this.x = ship.x;
      this.angle = ship.angle;

    }
  }
}
