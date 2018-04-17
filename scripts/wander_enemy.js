class WanderEnemy {
  constructor(size, x, y) {
    this.size = size;
    this.x = x;
    this.y = y;
  }

  drawEnemy () {
    let width = this.size/2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - width);
    ctx.lineTo(this.x + width, this.y);
    ctx.lineTo(this.x, this.y + width);
    ctx.lineTo(this.x - width, this.y);
    ctx.lineTo(this.x, this.y - width);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.stroke();
    ctx.closePath();
  }

  enemyMove() {
    this.x += Math.random() < 0.5 ? -.3 : .3;
    this.y += Math.random() < 0.5 ? -.3 : .3;
  }


}
