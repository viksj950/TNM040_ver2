export default class Player extends Phaser.Sprite {
  constructor(game) {
    super(game, 20, 50, 'testSprite'); // tappar ner spealren från toppen hehe!!!
    
    this.health = this.maxHealth = 3;
    this.isJumping = true; // kunde nog va false om spelaren spawnar på marken

    this.game.physics.enable(this);
    this.body.gravity.y = 1100;
    this.body.allowGravity = true;
    this.body.collideWorldBounds = true;

    this.body.setSize(50, 80, 50, 50); // mixtrar med hitboxen
    
    //animations
    this.runAnimation = this.animations.add('run');
    this.animations.play('run', 5, true);
    // TODO add animations

    this.duck = this.duck.bind(this);
    this.run = this.run.bind(this);
    this.jump = this.jump.bind(this);
  }

  jump() {
    if (!this.isJumping) {
      this.body.velocity.y = -500;
      this.isJumping = true;
      this.body.setSize(50, 80, 50, 50);
      // this.y -= 50;
      // this.body.setSize(50, 50, 50, 40);
    }
  }

  damage(amount) {    
    super.damage(amount);
    return this;
  }

  duck() {
    if (!this.isJumping) {
      this.body.setSize(50, 50, 50, 80); //hax?
    }
  }

  run() {
    if (this.body.touching.down) {
      this.isJumping = false;
      this.animations.play('run', 5, true);
      this.body.setSize(50, 80, 50, 50);
    }
  }

  kill() {
    // source from phaser:
    /*this.alive = false;
    this.exists = false;
    this.visible = false;

    if (this.events)
    {
      this.events.onKilled$dispatch(this);
    }

    return this;*/


    // this.alive = false;
    // this.exists = false;
    // this.visible = false;

    console.log('player killed');

    if (this.events) {
      this.events.onKilled$dispatch(this);
    }

    return this;
  }

}