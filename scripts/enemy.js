class Enemy {
  constructor(size, x, y) {
    this.size = size;
    this.x = x;
    this.y = y;
  }

  drawEnemy () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.size, this.y+this.size);
    ctx.lineTo(this.x, this.y + 2*this.size);
    ctx.lineTo(this.x - this.size, this.y + this.size);
    ctx.lineTo(this.x, this.y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
  }
}
