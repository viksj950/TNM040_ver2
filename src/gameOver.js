export default class gameOverState extends Phaser.State {
  init(score) {
    this.score = score;
  }

  create() {
    if (this.score > this.game.highScore) this.game.highScore = this.score;

    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.floor = this.game.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    // create dark overlay
    this.overlay = this.game.add.graphics(0,0);
    this.overlay.beginFill(0x000000);
    this.overlay.alpha = 0.7;
    this.overlay.drawRect(0, 0, this.game.width, this.game.height);
    this.overlay.endFill();

    const nameLabel = this.game.add.text(
      80,
      80,
      `Game over, your score: ${this.score}\nHigh Score: ${this.game.highScore}`,
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