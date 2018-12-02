export default class playState extends Phaser.State {
  create() {
    this.keyboard = this.game.input.keyboard;

    this.player = this.game.add.sprite(20, this.game.height/2, 'player');
    this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.bounce.y = 0;
    this.player.body.gravity.y = 1100;
    this.player.body.collideWorldBounds = true;
    
    this.obstacles = this.game.add.group();
    
    this.addObstacle();
    // this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
    
    // this.game.time.events.repeat(2000, 10, this.addObstacle, this);
    this.game.time.events.loop(2000, this.addObstacle, this);

    this.gameStart = this.game.time.totalElapsedSeconds();
  }

  // playerSpeed = 10;

  update() {
    this.game.physics.arcade.overlap(this.player, this.obstacles, this.gameOver, null, this);

    // this.obstacles.x -= 5; //nu finns de kanske kvar nog utanförlhmm adklfjaln¨
    
    if (this.keyboard.isDown(Phaser.Keyboard.SPACEBAR) 
          && this.player.position.y >= 580) { //kinda hack hehehe //kinda hack hehehe

      this.player.body.velocity.y = -500;
    }
  }

  //debug stuff
  render() {
    // this.game.debug.bodyInfo(this.player, 32, 32);
    this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
  }

  addObstacle() {
    this.obstacles.create(this.game.width - 40, this.game.height - 16, 'obstacle');

    // TODO DEThär måste väl va supersämst
    this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
    this.obstacles.forEach((item) => {
      item.body.velocity.x = -100;
    });
  }

  gameOver() {
    this.game.state.start('win'); //hehe
  }

}