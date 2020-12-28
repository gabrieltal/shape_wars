import MovingObject from './movingObject';

export default class FollowEnemy extends MovingObject {
  constructor (game) {
    let x = Math.floor(Math.random() * 720);
    if ((x >= game.ship.x - 100) && (x <= game.ship.x + 100)) x += 200;
    let y = Math.floor(Math.random() * 720);
    super(x, y, 20, "blue", 0, 0);
    this.speed = .8;
  }

  draw(ctx) {
    let width = this.size/2;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - width);
    ctx.lineTo(this.x + width, this.y);
    ctx.lineTo(this.x, this.y + width);
    ctx.lineTo(this.x - width, this.y);
    ctx.lineTo(this.x, this.y - width);

    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  updatePosition(game) {
    this.dx = game.ship.x - this.x < 0 ? -this.speed : this.speed;
    this.dy = game.ship.y - this.y < 0 ? -this.speed : this.speed;
  }
}
