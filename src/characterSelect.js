export default class characterSelectState extends Phaser.State {
  create() {
	  this.game.stage.backgroundColor = "#ffffff";
	  var graphics = this.game.add.graphics(0, 250);
graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
       graphics.moveTo(100,75);
    graphics.lineTo(200, 50);
    graphics.lineTo(200, 100);
	graphics.endFill();
	
    graphics.beginFill(0xFF3300);
    
    // draw a second shape
    graphics.moveTo(900,75)
    graphics.lineTo(800, 50);
    graphics.lineTo(800, 100);

    graphics.endFill();
   
    const nameLabel = this.game.add.text(80, 80, 'select your character',
        {font: '50px Arial', fill: '#fcbfff'});
    
    const btnTextStyle = {font: '50px Indie Flower', fill: '#ffffff'};
    
    let playButton=this.game.add.button(400, 400, 'pen', actionOnClick, this, 'pen_hover.png','pen_normal.png','pen_pressed.png' );
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