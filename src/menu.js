import penButton from "./penButton";

export default class menuState extends Phaser.State {
  create() {
    //add background
    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    // text
    const nameLabel = this.add.text(80, 80, 'Welcome to Uni-Lyfe',
        {font: '50px Arial', fill: '#fcbfff'});
    
    const startLabel = this.add.text(80, this.game.world.height-80, 'press "w" to start', {
      font: '25px Arial', fill: '#fffeab'
    });
	
	/*
	const btnTextStyle = {font: '30px Indie Flower', fill: '#ffffff'};
      btnTextStyle.stroke = "#000000";
      btnTextStyle.strokeThickness = 6;
	  */

    // buttons
    let playButton = this.add.existing(
      new penButton(this.game, 350, 250, 'Play', this.start, this)
    );

    let charSelect = this.add.existing(
      new penButton(this.game, 350, 350, 'Character selection', this.charSelection, this)
    );

    // keyboard
    const wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);

    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  }

  start() {
	const playSound = this.add.audio('startljud');
	playSound.play();
    this.game.state.start('play');
  }

  charSelection() {
	const playSound = this.add.audio('startljud');
	playSound.play();
    this.game.state.start('characterSelect');
  }
}