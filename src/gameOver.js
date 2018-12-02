export default class gameOverState extends Phaser.State {
  create() {
    const nameLabel = this.game.add.text(
      80,
      80,
      'Game over',
      {font: '50px Indie Flower', fill: '#00ff00'}
    );

    const startLabel = this.game.add.text(
      80,
      this.game.world.height-80,
      'press "w" or "UP-key" to restart',
      {font: '25px Arial', fill: '#ffffff'}
    );
    
    const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.restart, this);

    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.restart, this);
  }

  restart() {
    this.game.state.start('play');
  }
}