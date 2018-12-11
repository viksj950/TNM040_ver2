import penButton from "./penButton";
import toggleButton from "./toggleButton";

export default class gameOverState extends Phaser.State {
  init(score) {
    this.score = score;
  }

  create() {
    let newHighScore = false;

    if (this.score > this.game.highScore) { 
      newHighScore = true;
      this.game.highScore = this.score;
    }
    //set background
    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    // show score/highscore
    let nameLabel = this.add.text(20, 10, `Game Over, score: ${this.score}`, { // newline to fix text being cut off
      font: '70px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });
    let highScoreText = this.game.add.text(20, 100, `High score: ${this.game.highScore}`, { // newline to fix text being cut off
      font: '40px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });
    highScoreText.anchor.setTo(0.5, 0.5)
    highScoreText.alignTo(nameLabel, Phaser.BOTTOM_LEFT);

    if (newHighScore) {
      highScoreText.setText(`New high score: ${this.game.highScore}`);
      highScoreText.alignTo(nameLabel, Phaser.BOTTOM_LEFT);
      highScoreText.fill = '#ffd700'
      let colorText = this.add.tween(highScoreText.scale).to( { x: 1.1, y: 1.1 }, 500, "Linear", true, 500, 2, true);
    }

    // const startLabel = this.game.add.text(
    //   80,
    //   this.game.world.height-80,
    //   'press "w" or "UP-key" to restart',
    //   {font: '25px Arial', fill: '#ffffff'}
    // );
    
    this.muteButton = this.add.existing(
      new toggleButton(this.game, () => {
        this.game.sound.mute = !this.game.sound.mute;
      }, this, 'soundOn', 'soundOff', 0, 2, 1, this.game.sound.mute)
    );
    this.muteButton.alignIn(this.camera.view, Phaser.TOP_RIGHT, -24, -24);
    
    // make resume button
    let restartButton = this.add.existing(new penButton(this.game, 0, 0, 'Restart', this.restart, this));
    restartButton.alignIn(this.camera.bounds, Phaser.CENTER);
    
    // make mute button
    let menuButton = this.add.existing(new penButton(this.game, 0, 0, 'Menu', this.menu, this));
    menuButton.alignIn(this.camera.bounds, Phaser.CENTER, 0, 100);
    
    // // keyboard
    // const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    // wKey.onDown.addOnce(this.restart, this);

    // const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    // upKey.onDown.addOnce(this.restart, this);
  }

  restart() {
    this.game.state.start('play');
  }

  menu() {
    this.game.state.start('menu');
  }
}