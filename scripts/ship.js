const shipSize = 10;
let angle = 0;
function drawShip() {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.beginPath();
  ctx.moveTo(-shipSize/2, shipSize/2);
  ctx.lineTo(shipSize, 0);
  ctx.lineTo(-shipSize/2, -shipSize/2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.restore();
  ctx.closePath();
}
