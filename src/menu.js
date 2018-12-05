import penButton from "./penButton";
import Player from "./player";

export default class menuState extends Phaser.State {
  create() {
    //add background
    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;
    this.game.physics.enable(this.floor);
    this.floor.body.immovable = true;


    this.logo = this.add.sprite(0, 0, 'logo').alignIn(this.camera.bounds, Phaser.TOP_LEFT, -50, -50);

    // text
    const nameLabel = this.add.text(0, 0, 'Experience the life of a student', {
      font: '50px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    }).alignTo(this.logo, Phaser.RIGHT_CENTER, 10, 0);
    
    const startLabel = this.add.text(80, this.game.world.height-80, 'press "w" to start', {
      font: '25px Arial', fill: '#fffeab'
    });

    // buttons
    let playButton = this.add.existing(
      new penButton(this.game, 64, 250, 'Play', this.start, this)
    ).alignTo(this.logo, Phaser.BOTTOM_LEFT, 0, 50);

    let charSelect = this.add.existing(
      new penButton(this.game, 64, 350, 'Character selection', this.charSelection, this)
    ).alignTo(playButton, Phaser.BOTTOM_CENTER, 0, 40);


      ///////////////////////////
     //// THE TUTORIAL PART ////
    ///////////////////////////

    //this.add.sprite(450, 250, this.game.selectedChar, 'walk1.png');
    // let jump = this.add.sprite(600, 200, this.game.selectedChar, 'jump.png');
    // let duck = this.add.sprite(750, 250, this.game.selectedChar, 'duck.png');
    // jump.scale.x = jump.scale.y = duck.scale.x = duck.scale.y = 0.7;

    // this.jump = this.add.existing(new Player(this.game, 500, 50));
    // this.jump.scale.x = this.jump.scale.y = 0.7;
    // this.time.events.loop(2000, this.jump.jump, this);

    // this.duck = this.add.existing(new Player(this.game, 500, 50));
    // this.duck.scale.x = this.duck.scale.y = 0.7;
    // this.time.events.loop(1000, this.duck.duck, this);
    // this.time.events.loop(2000, this.duck.run, this);
    this.obstacles = this.add.group();
    this.obstacles.enableBody = true;

    this.player = this.add.existing(new Player(this.game, 500, 250));
    this.player.scale.x = this.player.scale.y = 0.7;
    // this.addObstacle();
    // this.time.events.loop(1500, () => {
    //   this.jump.jump();
    //   this.addObstacle();
    // }, this);
    this.demonstrateJump();

    this.up = this.add.sprite(0, 0, 'up').alignTo(this.player, Phaser.BOTTOM_CENTER, 0, 20);
    this.up.alpha = 0;
    this.down = this.add.sprite(0, 0, 'down').alignTo(this.player, Phaser.BOTTOM_CENTER, 0, 20);
    this.down.alpha = 0;
    //////////////////////////

    // keyboard
    const wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);

    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);
  }

  start() {
    this.game.state.start('play');
  }

  charSelection() {
    this.game.state.start('characterSelect');
  }

  demonstrateJump() {
    this.addObstacle(0);
    this.time.events.add(1550, () => {
      this.player.jump();
      this.showKey(this.up);
    }, this);

    this.time.events.add(3000, this.demonstrateDuck, this);
  }

  demonstrateDuck() {
    this.addObstacle(1);
    this.time.events.add(1550, () => {
      this.showKey(this.down);
      this.player.duck();
      this.time.events.add(700, this.player.run, this);
    }, this);

    this.time.events.add(3000, this.demonstrateJump, this);
  }

  showKey(key) {
    key.alpha = 1;
    this.time.events.add(500, () => {
      this.add.tween(key).to({ alpha: 0 }, 700, Phaser.Easing.Linear.None, true);
    }, this);
  }

  // adds obstacle low(0) or high(1)
  addObstacle(pos) {
    const heights = [420, 305];
    let newObstacle = this.obstacles.create(this.game.width + 50, heights[pos], 'obstacle');
    newObstacle.scale.x = newObstacle.scale.y = 0.7;
    newObstacle.body.angularVelocity = -430;
    newObstacle.anchor.setTo(0.5, 0.5);
    newObstacle.lifespan = 5000; // TODO se till att detta är ett rimligt värde
    newObstacle.body.velocity.x = - 250;

    this.time.events.add(2350, () => {
      this.add.tween(newObstacle).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
    }, this);
  }

  update() {
    this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
      if (player.isJumping) player.run();
    });

    this.physics.arcade.collide(this.duck, this.floor);

    // if (this.a.position.x < 480) {
    //   this.add.tween(this.a).to({ alpha: 0 }, 50, Phaser.Easing.Linear.None, true);
    // }
  }
}