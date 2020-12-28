import MovingObject from './movingObject';

export default class Ship extends MovingObject{
  constructor(x, y) {
    super(x, y, 10, "white", 0, 0)
    this.angle = 0;
    this.lives = 2;
    this.bombs = 2;
  }

  draw(ctx) {
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
  }

  updatePosition(game) {
    // Slows down player momentum
    this.dx += this.dx > 0 ? -0.01 : 0.01;
    this.dy += this.dy > 0 ? -0.01 : 0.01;

    if (game.input.pressed.left) {
      this.dx -= .1;
    }

    if (game.input.pressed.right) {
      this.dx += .1;
    }

    if (game.input.pressed.up) {
      this.dy -= .1;
    }

    if (game.input.pressed.down) {
      this.dy += .1;
    }

    if (game.input.pressed.rotateLeft) {
      this.angle -= .1;
    }

    if (game.input.pressed.rotateRight) {
      this.angle += .1;
    }
  }

  checkBounds(ship) {
    if (ship.x > 720 - ship.size) {
      this.dx = 0;
      this.x = 720 - this.size;
    }

    if (this.y > 540 - this.size) {
      this.dy = 0;
      this.y = 540 - this.size;
    }

    if (this.y < this.size) {
      this.dy = 0;
      this.y = this.size;
    }

    if (this.x < this.size) {
      this.dx = 0;
      this.x = this.size;
    }
  }
}
