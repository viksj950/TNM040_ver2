export default class winState extends Phaser.State {
  create() {
    const nameLabel = this.game.add.text(
      80,
      80,
      'YOU WON',
      {font: '50px Arial', fill: '#00ff00'}
    );

    const startLabel = this.game.add.text(
      80,
      this.game.world.height-80,
      'press "w" to restart',
      {font: '25px Arial', fill: '#ffffff'}
    );
    
    const wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.restart, this);
  }

  restart() {
    this.game.state.start('menu');
  }
}