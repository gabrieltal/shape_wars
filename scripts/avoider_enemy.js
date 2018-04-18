class AvoiderEnemy extends MovingObject {
  constructor () {
    let x = Math.floor(Math.random() * canvas.width);
    if ((x >= ship.x - 200) && (x <= ship.x + 200)) x += 300;
    let y = Math.floor(Math.random() * canvas.width);
    super(x, y, 20, "green", 0, 0);
    this.speed = .2;
  }

  draw () {
    let width = this.size / 2;
    let halfWidth = (width / 2);
    let corner = (halfWidth / 2) + halfWidth
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - width);
    ctx.lineTo(this.x + halfWidth, this.y - corner);
    ctx.lineTo(this.x + halfWidth, this.y + corner);
    ctx.lineTo(this.x, this.y + width);
    ctx.lineTo(this.x - halfWidth, this.y + corner);
    ctx.lineTo(this.x - halfWidth, this.y - corner);
    ctx.lineTo(this.x, this.y - width);
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }
}
