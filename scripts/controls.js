let keyRight = false;
let keyLeft = false;
let keyUp = false;
let keyDown = false;
let keySpace = false;
let rotateLeft = false;
let rotateRight = false;

function keyDownHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
      keyLeft = true;
      break;
    case 37:
      rotateLeft = true;
      break;
    case 87:
      keyUp = true;
      break;
    case 68:
      keyRight = true;
      break;
    case 39:
      rotateRight = true;
      break;
    case 83:
      keyDown = true;
      break;
    case 75:
      keySpace = true;
      break;
  }
}

function keyUpHandler(e) {
  e.preventDefault();
  switch (e.keyCode) {
    case 65:
      keyLeft = false;
      break;
    case 37:
      rotateLeft = false;
    case 87:
      keyUp = false;
      break;
    case 68:
      keyRight = false;
      break;
    case 39:
      rotateRight = false;
      break;
    case 83:
      keyDown = false;
      break;
    case 75:
      keySpace = false;
      break;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
