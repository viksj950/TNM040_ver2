import penButton from "./penButton";
import Player from "./player";
import toggleButton from "./toggleButton";

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

    //music
    this.game.menuMusic = this.game.sound.add('menuMusic', 1, true).play();


    this.logo = this.add.sprite(0, 0, 'logo').alignIn(this.camera.bounds, Phaser.TOP_LEFT, -50, -50);

    this.muteButton = this.add.existing(
      new toggleButton(this.game, () => {
        this.game.sound.mute = !this.game.sound.mute;
      }, this, 'soundOn', 'soundOff', 0, 2, 1, this.game.sound.mute)
    );
    this.muteButton.alignIn(this.camera.view, Phaser.TOP_RIGHT, -24, -24);

    // text
    let textText = this.add.text(0, 0, 'Experience the life of a student', {
      font: '50px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    }).alignTo(this.logo, Phaser.RIGHT_CENTER, 10, 0);

    this.add.text(0, 0, `Current High Score: ${this.game.highScore}`, {
      font: '25px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    }).alignTo(textText, Phaser.BOTTOM_LEFT, -15);

    // buttons
    let playButton = this.add.existing(
      new penButton(this.game, 64, 250, 'Start game', this.start, this)
    ).alignTo(this.logo, Phaser.BOTTOM_LEFT, 0, 50);

    let charSelect = this.add.existing(
      new penButton(this.game, 64, 350, 'Character selection', this.charSelection, this)
    ).alignTo(playButton, Phaser.BOTTOM_CENTER, 0, 40);

    // keyboard
    const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);

      ///////////////////////////
     //// THE TUTORIAL PART ////
    ///////////////////////////

    this.obstacles = this.add.group();
    this.obstacles.enableBody = true;

    this.player = this.add.existing(new Player(this.game, 500, 250, true));
    this.player.scale.x = this.player.scale.y = 0.7;
    
    this.up = this.add.sprite(0, 0, 'up').alignTo(this.player, Phaser.BOTTOM_CENTER, 0, 20);
    this.up.alpha = 0;
    this.down = this.add.sprite(0, 0, 'down').alignTo(this.player, Phaser.BOTTOM_CENTER, 0, 20);
    this.down.alpha = 0;

    this.demonstrateJump();
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

  // adds obstacle low(pos = 0) or high(pos = 1)
  addObstacle(pos) {
    const heights = [420, 305];
    let newObstacle = this.obstacles.create(this.game.width + 50, heights[pos], 'obstacle');
    newObstacle.scale.setTo(0.7, 0.7);
    newObstacle.anchor.setTo(0.5, 0.5);
    newObstacle.body.angularVelocity = -430;
    newObstacle.lifespan = 5000;
    newObstacle.body.velocity.x = - 250;

    this.time.events.add(2350, () => {
      this.add.tween(newObstacle).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
    }, this);
  }

  update() {
    this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
      if (player.isJumping) player.run();
    });
  }

}