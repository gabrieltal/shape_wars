
class FollowEnemy extends MovingObject {
  constructor (a, b) {
    let x = Math.floor(Math.random() * canvas.width);
    if ((x >= ship.x - 100) && (x <= ship.x + 100)) x += 200;
    let y = Math.floor(Math.random() * canvas.width);
    super(a || x, b || y, 20, "blue", 0, 0);
    this.speed = .8;
  }

  draw() {
    let width = this.size/2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - width);
    ctx.lineTo(this.x + width, this.y);
    ctx.lineTo(this.x, this.y + width);
    ctx.lineTo(this.x - width, this.y);
    ctx.lineTo(this.x, this.y - width);

    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
    this.updateDirection();
  }

  updateDirection() {
    this.dx = ship.x - this.x < 0 ? -this.speed : this.speed;
    this.dy = ship.y - this.y < 0 ? -this.speed : this.speed;
  }
}
