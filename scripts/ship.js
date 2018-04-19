class Ship extends MovingObject{
  constructor(x, y) {
    super(x, y, 10, "white", 0, 0)
    this.angle = 0;
    this.lives = 2;
    this.bombs = 1;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-this.size/2, this.size/2);
    ctx.lineTo(this.size, 0);
    ctx.lineTo(-this.size/2, -this.size/2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
    ctx.closePath();
    this.updatePosition();
  }

  updatePosition() {
    if (keyLeft) {
      this.dx -= .04;
    } else if (keyRight) {
      this.dx += .04;
    } else if (keyUp) {
      this.dy -= .04;
    } else if (keyDown) {
      this.dy += .04;
    } else {
      this.dx += this.dx > 0 ? -.02 : 0.02;
      this.dy += this.dy > 0 ? -.02 : 0.02;
    }

    if (rotateLeft) {
      this.angle -= .03;
    } else if (rotateRight) {
      this.angle += .03;
    }
  }

  checkBounds() {
    if ( ship.x > canvas.width - ship.size ) {
      this.dx = 0;
      this.x = canvas.width - this.size;
    }
    if ( this.y  > canvas.height - this.size ) {
      this.dy = 0;
      this.y = canvas.height - this.size;
    }
    if ( this.y < this.size ) {
      this.dy = 0;
      this.y = this.size;
    }
    if ( this.x < this.size ) {
      this.dx = 0;
      this.x = this.size;
    }
  }
}
