class Ship {
  constructor(shipSize, x, y, angle) {
    this.x = x;
    this.y = y;
    this.shipSize = shipSize;
    this.angle = angle;
  }

  drawShip() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-this.shipSize/2, this.shipSize/2);
    ctx.lineTo(this.shipSize, 0);
    ctx.lineTo(-this.shipSize/2, -this.shipSize/2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.restore();
    ctx.closePath();
  }
}
