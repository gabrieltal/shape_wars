import * as keyCodes from './keyCodes';

export default class Input {
  constructor() {
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.pressed = {
      right: false,
      left: false,
      up: false,
      down: false,
      rotateLeft: false,
      rotateRight: false,
      space: false,
      pause: false
    }
  }

  attachHandlers(game) {
    this.game = game;
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
  }

  keyDownHandler(e) {
    switch (e.keyCode) {
      case keyCodes.A:
        this.pressed.left = true;
        break;
      case keyCodes.LEFT:
        this.pressed.rotateLeft = true;
        break;
      case keyCodes.W:
        this.pressed.up = true;
        break;
      case keyCodes.D:
        this.pressed.right = true;
        break;
      case keyCodes.RIGHT:
        this.pressed.rotateRight = true;
        break;
      case keyCodes.S:
        this.pressed.down = true;
        break;
      case keyCodes.P:
        this.game.pause();
        break;
      case keyCodes.SPACE:
        e.preventDefault();
        if (this.game.playing) {
          this.game.bomb();
        }
        break;
    }
  }

  keyUpHandler(e) {
    switch (e.keyCode) {
      case keyCodes.A:
        this.pressed.left = false;
        break;
      case keyCodes.LEFT:
        this.pressed.rotateLeft = false;
      case keyCodes.W:
        this.pressed.up = false;
        break;
      case keyCodes.D:
        this.pressed.right = false;
        break;
      case keyCodes.RIGHT:
        this.pressed.rotateRight = false;
        break;
      case keyCodes.S:
        this.pressed.down = false;
        break;
    }
  }
}
