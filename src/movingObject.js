export default class MovingObject {
  constructor (x, y, size, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  move(game) {
    this.checkBounds(game.ship);
    this.x += this.dx;
    this.y += this.dy;
    this.updatePosition(game);
  }

  checkBounds(ship) {
    if (this.x > 720) {
      let x = 0;
      if (x === ship.x) x += 30;
      this.x = x;
      this.y = Math.floor(Math.random() * 540);
    } else if (this.x + this.size <= 0) {
      this.x = 720 - this.size;
      this.y = Math.floor(Math.random() * 540);
    }
    if (this.y > 540) {
      let y = 0;
      if (y === ship.y) y += 30;
      this.y = y;
      this.x = Math.floor(Math.random() * 720);
    } else if (this.y <= 0) {
      this.y = 540 - this.size;
      this.x = Math.floor(Math.random() * 720);
    }
  }
}
