export default class menuState extends Phaser.State {
  create() {
    const nameLabel = this.game.add.text(80, 80, 'yo momma so fat this screen is black',
        {font: '50px Arial', fill: '#fcbfff'});
    
    const btnTextStyle = {font: '30px Indie Flower', fill: '#ffffff'};
      btnTextStyle.stroke = "#000000";
      btnTextStyle.strokeThickness = 6;

    //button.sfx=this.add.audio('startljud');
    let playButton=this.game.add.button(350, 250, 'pen', actionOnClick, this, 'pen_hover.png','pen_normal.png','pen_pressed.png' );
    playButton.addChild(new Phaser.Text(this.game, 105, 0, 'Play', btnTextStyle));

    let charSelect=this.game.add.button(350, 350, 'pen', actionOnClick, this, 'pen_hover.png','pen_normal.png','pen_pressed.png' );//Byt actionOnClick till rätt funktion
    charSelect.addChild(new Phaser.Text(this.game, 10, 0, 'Character selection', btnTextStyle));

    const startLabel = this.game.add.text(80, this.game.world.height-80,
        'press "w" to start',
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

function actionOnClick()
{
  const playSound = this.add.audio('startljud');
  playSound.play();
  this.game.state.start('play');
}