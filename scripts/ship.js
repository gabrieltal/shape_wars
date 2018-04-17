class Ship {
  constructor(x, y, angle, color="white") {
    this.x = x;
    this.y = y;
    this.size = 10;
    this.angle = angle;
    this.color = color;
    this.dx = 0;
    this.dy = 0;
  }

  drawShip() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-this.size/2, this.size/2);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(-this.size/2, -this.size/2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }


}
