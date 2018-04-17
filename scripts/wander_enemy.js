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

  bounce() {
    if (this.x > canvas.width - this.size || this.x < this.size) {
      let x = Math.floor(Math.random() * canvas.width);
      if (x === ship.x) x++;
      this.x = x;
      this.y = Math.floor(Math.random() * canvas.width);
    }
    if ( this.y > canvas.width - this.size || this.y < this.size) {
      let x = Math.floor(Math.random() * canvas.width);
      if (x === ship.x) x++;
      this.x = x;
      this.y = Math.floor(Math.random() * canvas.width);
    }
  }


}
