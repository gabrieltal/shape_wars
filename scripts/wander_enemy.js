class WanderEnemy extends MovingObject{
  constructor() {
    let x = Math.floor(Math.random() * canvas.width);
    if ( x >= ship.x - 100 && x <= ship.x + 100) x+= 200;
    let y = Math.floor(Math.random() * canvas.width);
    let dx = Math.random() < 0.5 ? -.5 : .5;
    let dy = Math.random() < 0.5 ? -.5 : .5;
    super(x, y, 20, "purple", dx, dy);
  }

  draw () {
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
}
