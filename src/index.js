import '../css/index.css';
import Game from './game.js';
import Sound from './sound.js';
import Input from './input.js';

document.addEventListener("DOMContentLoaded", () => {
  // Set up Canvas and User Input
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = new Input();

  // Set up audio and sound controls
  const sound = new Sound();
  sound.attachHandlers();

  // Set up game and add event listener to start game
  const game = new Game(ctx, input, sound);
  document.getElementById('startGame').addEventListener('click', function() {
    game.start();
  });
});
