export default class Sound {
  constructor() {
    this.background = new Audio('../public/audio/rolemusicPirateAndDancer.mp3');
    this.bomb = new Audio('../public/audio/cat.wav');
    this.death = new Audio('../public/audio/death-scream.wav');
    this.kill = new Audio('../public/audio/enemy-destroy.wav');
    this.star = new Audio('../public/audio/hadokowa_get_a_dog_pet_a_dog.mp3');
    this.volume = 0.5;

    this.background.loop = true;
  }

  play(track) {
    this[track].volume = this.volume;
    this[track].play();
  }

  all() {
    return [
      this.background,
      this.bomb,
      this.death,
      this.kill,
      this.star
    ];
  }

  mute() {
    this.all().forEach((sound) => {
      sound.mute();
    });
  }

  unmute() {
    this.all().forEach((sound) => {
      sound.unmute();
    });
  }

  pause() {
    this.background.pause();
  }
};
