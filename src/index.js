import '../css/index.css';
import Game from './game.js';
import Sound from './sound.js';
import Input from './input.js';

document.addEventListener("DOMContentLoaded", () => {
  // Set up Canvas and User Input
  const canvas = document.getElementById("canvas");
  canvas.width = Game.WIDTH;
  canvas.height = Game.HEIGHT;
  const ctx = canvas.getContext("2d");
  const input = new Input();

  // Set up audio and sound controls
  const sound = new Sound();
  sound.attachHandlers();

  // Set up game and add event listener to start game
  const game = new Game(ctx, input, sound);
  document.getElementById('startGame').addEventListener('click', function() {
    game.start();
    this.classList.add('d-none');
  });

  document.getElementById('how-to').addEventListener('click', function() {
    if (game.playing) {
      game.pause();
    }

    document.getElementById("how-to-modal").classList.remove('d-none');
  });

  document.getElementById('how-to-modal').addEventListener('click', function() {
    document.getElementById("how-to-modal").classList.add('d-none');
  });

  document.getElementById('close-modal').addEventListener('click', function() {
    document.getElementById("how-to-modal").classList.add('d-none');
  });
});
