export default class menuState extends Phaser.State {
  
  create() {
    const nameLabel = this.game.add.text(80, 80, 'yo momma so fat this screen is black',
        {font: '50px Arial', fill: '#fcbfff'});

  	var button=this.add.button(this.world.center, this.world.center, 'startButton', function(){this.game.state.start('play'); button.sfx.play();});
    button.sfx=this.add.audio('startljud');

    const startLabel = this.game.add.text(80, this.game.world.height-80,

        'press "w" or "UP-key" to start',
        {font: '25px Arial', fill: '#fffeab'});
		
	  
    const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);

    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  }

  start() {
    this.game.state.start('play');
  }
}