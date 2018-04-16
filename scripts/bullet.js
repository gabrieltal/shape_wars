const bulletSize = 5;

const bulletCount = 10;


function drawBullet() {
  destroyBullet();
  ctx.save();
  ctx.beginPath();
  ctx.arc(a, b, 10, 0, 2 * Math.PI)
  ctx.strokeStyle = "red";
  ctx.fillStyle ="red";
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  ctx.closePath();
}

function destroyBullet() {
  if ( a > canvas.width - shipSize || a < shipSize) {
    a = x;
  }
  if ( b > canvas.width - shipSize || b < shipSize) {
    b = y;
  }
}
