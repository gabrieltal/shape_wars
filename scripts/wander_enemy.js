class WanderEnemy {
  constructor() {
    let x = Math.floor(Math.random() * canvas.width);
    if ( x === ship.x) x+= 5;
    this.size = 20;
    this.x = x;
    this.y = Math.floor(Math.random() * canvas.width);
    this.dx = Math.random() < 0.5 ? -.4 : .4;;
    this.dy = Math.random() < 0.5 ? -.4 : .4;
  }

  drawEnemy () {
    let width = this.size/2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + width, this.y);
    ctx.lineTo(this.x, this.y + width);
    ctx.lineTo(this.x - width, this.y);
    ctx.lineTo(this.x, this.y);

    ctx.lineWidth = 3;
    ctx.strokeStyle = "purple";
    ctx.stroke();
    ctx.closePath();
  }

  enemyMove() {
    this.bounce();
    this.x += this.dx;
    this.y += this.dy;
  }

  bounce() {
    if (this.x > canvas.width) {
      let x = 0;
      if (x === ship.x) x += 5;
      this.x = x;
      this.y = Math.floor(Math.random() * canvas.width);
    } else if (this.x <= 0) {
      this.x = canvas.width;
      this.y = Math.floor(Math.random() * canvas.width);
    }
    if (this.y > canvas.width) {
      let y = 0;
      if (y === ship.y) y += 5;
      this.y = y;
      this.x = Math.floor(Math.random() * canvas.width);
    } else if (this.y <= 0) {
      this.y = canvas.width;
      this.x = Math.floor(Math.random() * canvas.width);
    }
  }


}
