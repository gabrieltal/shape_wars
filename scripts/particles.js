class Particles extends MovingObject {
  constructor(x, y, color, maxLife) {
    let dx = Math.random();
    dx = dx > .5 ? -dx : dx;
    let dy = Math.random();
    dy = dy > .5 ? -dy : dy;
    super(x, y, 1, color, dx, dy);
    this.life = 0;
    this.maxLife = maxLife;
  }

  draw () {
    this.life++;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

}
