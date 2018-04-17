class Ship {
  constructor(shipSize, x, y, angle, color="white") {
    this.x = x;
    this.y = y;
    this.shipSize = shipSize;
    this.angle = angle;
    this.color = color;
  }

  drawShip() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-this.shipSize/2, this.shipSize/2);
    ctx.lineTo(this.shipSize, 0);
    ctx.lineTo(-this.shipSize/2, -this.shipSize/2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }
}
