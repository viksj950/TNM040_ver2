import Player from "./player";

export default class playState extends Phaser.State {
  create() {
    this.game.time.advancedTiming = true; // för att kunna visa fps

    this.keyboard = this.game.input.keyboard;
    
    // create player and add to stage
    this.player = new Player(this.game);
    this.game.stage.addChild(this.player);

    this.obstacles = this.game.add.group();
    this.addObstacle();
    // this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
    
    this.game.time.events.loop(2000, this.addObstacle, this);
    this.player.events.onKilled.add(this.gameOver, this);

    // show lives
    this.lifeDisp = this.game.add.group();
    for (let i = 0; i < this.player.health; i++) {
      this.lifeDisp.create(32 + (30 * i), 32, 'player');
    }
  }

  update() {
    this.game.physics.arcade.overlap(this.player, this.obstacles, (player, obstacle) => {
      player.damage(1);
      obstacle.destroy();
      this.lifeDisp.getFirstAlive().kill(); // remove life from lifeDisp
      // this.lifeDisp.getFirstAlive().visible = false;
    }, null, this);
    
    if (this.keyboard.isDown(Phaser.Keyboard.SPACEBAR)
        && this.player.position.y >= 500) { //kinda hack hehehe

      // this.player.body.velocity.y = -500;
      this.player.jump();
    }
  }

  //debug stuff
  render() {
    this.game.debug.body(this.player);
    // this.game.debug.bodyInfo(this.player, 32, 32);
    // this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
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
	  var ajsomfan=this.add.audio('hurtljud');
    ajsomfan.play();
    
    this.game.stage.removeChild(this.player); // ??
    // this.player.destroy();
    this.game.state.start('win');
  }

}