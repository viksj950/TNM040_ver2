export default class menuState extends Phaser.State {
  create() {
    const nameLabel = this.game.add.text(80, 80, 'Stupid game',
        {font: '50px Arial', fill: '#ffffff'});

    const startLabel = this.game.add.text(80, this.game.world.height-80,
        'press "w" to fart',
        {font: '25px Arifal', fill: '#ffffff'});
    
    const wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wkey.onDown.addOnce(this.start, this);
  }

  start() {
    this.game.state.start('slay');
  }
}