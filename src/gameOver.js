import penButton from "./penButton";

export default class gameOverState extends Phaser.State {
  init(score) {
    this.score = score;
  }

  create() { // TODO gör likadan som menu nästan?
    if (this.score > this.game.highScore) this.game.highScore = this.score;

    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    // const nameLabel = this.game.add.text(
    //   80,
    //   80,
    //   `Game over, your score: ${this.score}\nHigh Score: ${this.game.highScore}`,
    //   {font: '50px Indie Flower', fill: '#00ff00'}
    // );
    // TODO kolla om ny highscore och isf uppmärksamma
    const nameLabel = this.add.text(20, 10, `Game Over, your score: ${this.score}\n`, { // newline to fix text being cut off
      font: '70px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });
    this.game.add.text(20, 100, `High score: ${this.game.highScore}\n`, { // newline to fix text being cut off
      font: '50px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });

    // const startLabel = this.game.add.text(
    //   80,
    //   this.game.world.height-80,
    //   'press "w" or "UP-key" to restart',
    //   {font: '25px Arial', fill: '#ffffff'}
    // );
    
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