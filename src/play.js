import Player from "./player";

export default class playState extends Phaser.State {
  create() {
    this.game.time.advancedTiming = true; // för att kunna visa fps

    this.floor = this.game.add.sprite(0, this.game.height - 128, 'floor');
    this.game.physics.enable(this.floor);
    this.floor.body.immovable = true;
    this.obstacles = this.game.add.group();
    this.addObstacle();
    // this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
    
    // create player and add to stage
    this.player = new Player(this.game);
    this.game.stage.addChild(this.player);
    this.player.events.onKilled.add(this.gameOver, this); 
    
    this.game.time.events.loop(2000, this.addObstacle, this);
    
    // show lives
    this.lifeDisp = this.game.add.group();
    for (let i = 0; i < this.player.health; i++) {
      this.lifeDisp.create(32 + (30 * i), 32, 'player');
    }
    
    // keyboard stuff, blir det skumt när man kan använda fler olika för samma?
    this.keyboard = this.game.input.keyboard;

    this.downKey = this.keyboard.addKey(Phaser.KeyCode.DOWN);
    this.downKey.onHoldCallback = this.player.duck;
    this.downKey.onUp.add(this.player.run);
    
    this.sKey = this.keyboard.addKey(Phaser.KeyCode.S);
    this.sKey.onHoldCallback = this.player.duck;
    this.sKey.onUp.add(this.player.run);

    this.upKey = this.keyboard.addKey(Phaser.KeyCode.UP);
    this.upKey.onHoldCallback = this.player.jump;

    this.wKey = this.keyboard.addKey(Phaser.KeyCode.W);
    this.wKey.onHoldCallback = this.player.jump;

    // reset keys? prob not
  }

  update() {
    // checks for collision with floor and makes the player run if landing from jump
    this.game.physics.arcade.collide(this.player, this.floor, (player, floor) => {
      if (player.isJumping) player.run();
    });

    this.game.physics.arcade.overlap(this.player, this.obstacles, (player, obstacle) => {
      player.damage(1);
      obstacle.destroy();

      this.lifeDisp.getFirstAlive().kill(); // remove life from lifeDisp
      // this.lifeDisp.getFirstAlive().visible = false;
    }, null, this);
  }

  //debug stuff
  render() {
    this.game.debug.body(this.player);
    // this.game.debug.bodyInfo(this.player, 32, 32);
    // this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
  }

  addObstacle() {
    // let obstaclePosition = [16,48,100];
    const obstaclePosition = [150, 165, 200];

    this.obstacles.create(this.game.width + 50, this.game.height - obstaclePosition[Math.floor(Math.random()*(4-1)+1)-1], 'obstacle'); //this.game.height - önskad höjd på hindret

    // TODO DEThär måste väl va supersämst
    this.game.physics.enable(this.obstacles, Phaser.Physics.ARCADE);
    this.obstacles.forEach((item) => {
      item.body.velocity.x = -200;
    });
  }
  


  gameOver() {
	  var ajsomfan=this.add.audio('hurtljud');
    ajsomfan.play();
    
    this.game.stage.removeChild(this.player); // ??
    // this.player.destroy();
    this.game.state.start('gameOver');
  }

}