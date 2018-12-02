export default class menuState extends Phaser.State {
  create() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.floor = this.game.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');

    const nameLabel = this.game.add.text(80, 80, 'yo momma so fat this screen is black',
        {font: '50px Arial', fill: '#fcbfff'});
    
    const btnTextStyle = {font: '50px Indie Flower', fill: '#ffffff'};

  	//var button=this.add.button(this.world.center, this.world.center, 'startButton', function(){this.game.state.start('play'); button.sfx.play();});
    //button.sfx=this.add.audio('startljud');
    
    let playButton=this.game.add.button(400, 250, 'pen', actionOnClick, this, 'pen_hover.png','pen_normal.png','pen_pressed.png' );
    //playButton.addchild(new Phaser.Text(this.game, 0, 0, 'Play', btnTextStyle));
    //playButton.alignIn(this.camera.bounds, Phaser.CENTER);
	  playButton.sfx=this.add.audio('startljud');

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
    playButton.sfx.play(); //??
  }
}

function actionOnClick()
{
  this.game.state.start('play');
  playButton.sfx.play();
}