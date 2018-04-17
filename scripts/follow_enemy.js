class FollowEnemy {
  constructor (size, x, y) {
    this.size = size;
    this.x = x;
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
}
