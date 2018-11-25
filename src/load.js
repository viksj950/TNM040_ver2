export default class loadState extends Phaser.State {
  preload() {
    let loadingLabel = this.game.add.text(80, 150, 'loading...',
        {font: '30px Courier', fill: '#afdfdd'});

    this.game.load.image('player', './assets/images/epple.png');
    this.game.load.image('obstacle', './assets/images/boll.png');
    this.game.load.image('startButton','./assets/images/startbuttonup.png');

    /* testgrejor */
    this.game.load.atlasJSONHash('testSprite', './assets/images/animation_test/spritesheet.png', './assets/images/animation_test/spritesheet.json');
    this.game.load.image('floor', './assets/images/floor.png');
    /* ---------- */

    this.game.load.audio('startljud','./assets/sound/startknapptryckning.wav');
    this.game.load.audio('hurtljud','./assets/sound/hurt.wav');
  }

  create() {
    this.game.state.start('menu');
  }

}