export default class menuState extends Phaser.State {
  create() {
    const nameLabel = this.game.add.text(80, 80, 'yo momma so fat this screen is black',
        {font: '50px Arial', fill: '#fcbfff'});

    const startLabel = this.game.add.text(80, this.game.world.height-80,

        'press "space" to start',
        {font: '25px Arial', fill: '#fffeab'});

    
    const wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    wkey.onDown.addOnce(this.start, this);
  }

  start() {
    this.game.state.start('play');
  }
}