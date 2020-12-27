import '../css/index.css';
import Game from './game.js';
import Sound from './sound.js';
import Input from './input.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const input = new Input();

  const sound = new Sound();
  const game = new Game(ctx, input, sound);

  document.getElementById('startGame').addEventListener('click', function() {
    game.start();
  });

});
