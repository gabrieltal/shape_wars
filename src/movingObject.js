export default class MovingObject {
  constructor (x, y, size, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.dx = dx;
    this.dy = dy;
  }

  move() {
    this.checkBounds();
    this.x += this.dx;
    this.y += this.dy;
  }

  checkBounds() {
    if (this.x > canvas.width) {
      let x = 0;
      if (x === ship.x) x += 30;
      this.x = x;
      this.y = Math.floor(Math.random() * canvas.width);
    } else if (this.x + this.size <= 0) {
      this.x = canvas.width - this.size;
      this.y = Math.floor(Math.random() * canvas.width);
    }
    if (this.y > canvas.width) {
      let y = 0;
      if (y === ship.y) y += 30;
      this.y = y;
      this.x = Math.floor(Math.random() * canvas.width);
    } else if (this.y <= 0) {
      this.y = canvas.width - this.size;
      this.x = Math.floor(Math.random() * canvas.width);
    }
  }
}