export default class Sound {
  constructor(volume) {
    this.background = new Audio('../public/audio/rolemusicPirateAndDancer.mp3');
    this.bomb = new Audio('../public/audio/cat.wav');
    this.death = new Audio('../public/audio/death-scream.wav');
    this.kill = new Audio('../public/audio/enemy-destroy.wav');
    this.star = new Audio('../public/audio/hadokowa_get_a_dog_pet_a_dog.mp3');
    this.background.loop = true;
    this.elements = {
      volume: document.getElementById('volume'),
      mute: document.getElementById('mute')
    };
    this.updateVolume(this.elements.volume.value);
  }

  attachHandlers() {
    this.elements.mute.addEventListener('change', () => {
      if (this.elements.mute.checked) {
        this.mute();
      } else {
        this.unmute();
      }
    });

    this.elements.volume.addEventListener('change', () => {
      this.updateVolume(this.elements.volume.value);
    });
  }

  play(track) {
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

  updateVolume(volume) {
    this.all().forEach((sound) => {
      sound.volume = volume;
    });
  }

  mute() {
    this.all().forEach((sound) => {
      sound.muted = true;
    });
  }

  unmute() {
    this.all().forEach((sound) => {
      sound.muted = false;
    });
  }

  pause() {
    this.background.pause();
  }
};
