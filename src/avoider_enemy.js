export default class AvoiderEnemy extends MovingObject {
  constructor () {
    let x = Math.floor(Math.random() * 720);
    if ((x >= game.ship.x - 100) && (x <= game.ship.x + 100)) x += 200;
    let y = Math.floor(Math.random() * 720);
    super(x, y, 20, "green", 0, 0);
    this.speed = .7;
  }

  draw (ctx) {
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

  updatePosition (game) {
    let incomingBullets = false;

    game.bullets.forEach((bullet) => {
      let closeX = Math.abs(bullet.x - this.x) < 75 ? true : false;
      let closeY = Math.abs(bullet.y - this.y) < 75 ? true : false;
      let sameDirectionX = Math.abs(bullet.dx + this.dx) < Math.abs(bullet.dx) ? true : false;
      let sameDirectionY = Math.abs(bullet.dy + this.dy) < Math.abs(bullet.dy) ? true : false;

      if (closeX && closeY && sameDirectionX && sameDirectionY) {
        if (this.dx < 10) {
          this.dx = bullet.dx < 0 ? 5 : -5;
          this.dy = bullet.dy < 0 ? -5 : 5;
        } else if (this.dy < 10) {
          this.dx = bullet.dx < 0 ? -5 : 5;
          this.dy = bullet.dy < 0 ? 5 : -5;
        } else {
          this.dx = bullet.dx < 0 ? 5 : -5;
          this.dy = bullet.dy < 0 ? -5 : 5;
        }
        incomingBullets = true;
      }
    });

    if (!incomingBullets) {
      this.dx = game.ship.x - this.x < 0 ? -this.speed : this.speed;
      this.dy = game.ship.y - this.y < 0 ? -this.speed : this.speed;
    }
  }
}
