import '../css/index.css';
import Game from './game.js';
import Sound from './controls/sound.js';
import Input from './controls/input.js';

document.addEventListener("DOMContentLoaded", () => {
  // Set up Canvas
  const canvas = document.getElementById("canvas");
  canvas.width = Game.WIDTH;
  canvas.height = Game.HEIGHT;
  const ctx = canvas.getContext("2d");

  // Set up user input
  const input = new Input();

  // Set up audio and sound controls
  const sound = new Sound();
  sound.attachHandlers();

  // Set up game and event listener to click to start game
  const game = new Game(ctx, input, sound);
  document.getElementById('startGame').addEventListener('click', function() {
    this.classList.add('d-none');
    game.start();
  });
});
