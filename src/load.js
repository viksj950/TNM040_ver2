export default class loadState extends Phaser.State {
  preload() {
    let loadingLabel = this.game.add.text(80, 150, 'loading...',
        {font: '30px Courier', fill: '#ffffff'});

    // this.game.load.image('player', './assets/images/player.png');
    // this.game.load.image('win', './assets/images/win.png');
  }

  create() {
    this.game.state.start('menu');
  }

}