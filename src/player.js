export default class Player extends Phaser.Sprite {
  constructor(game, x, y, demo) {
    super(game, x, y, game.selectedChar, 'jump.png'); // tappar ner spealren från toppen hehe!!!
    this.demo = demo; // silence jump

    this.health = this.maxHealth = 3;
    this.isJumping = true; // kunde nog va false om spelaren spawnar på marken

    this.game.physics.enable(this);
    this.body.gravity.y = 1500;
    this.body.allowGravity = true;
    this.body.collideWorldBounds = true;

    this.body.setSize(50, 230, 75, 50); // mixtrar med hitboxen

    //sounds
    this.jumpSound = this.game.add.audio('hoppljud');
    this.hurtSound = this.game.add.audio('hurtljud');
    
    //animations
    this.animations.add('run', ['walk1.png', 'walk2.png', 'walk3.png', 'walk2.png'], 5, true);
    this.animations.add('jump', ['jump.png'], 5, true);
    this.animations.add('duck', ['duck.png'], 5, true);
    this.animations.add('damage' , ['damage.png'], 2, false)
        .onComplete.add(() => {this.animations.play('run')}, this); //return to run anim when done
    this.animations.add('powerup' , ['powerup.png'], 2, false)
        .onComplete.add(() => {this.animations.play('run')}, this); // TODO måste fixa kanske

    this.duck = this.duck.bind(this);
    this.run = this.run.bind(this);
    this.jump = this.jump.bind(this);
  }

  jump() {
    if (!this.isJumping) {
      this.body.velocity.y = -600;
      this.isJumping = true;
      this.body.setSize(50, 150, 75, 130);
      this.animations.play('jump');
      if (!this.demo) this.jumpSound.play();
    }
  }

  damage(amount) {
    super.damage(amount);
    this.animations.play('damage');
    this.hurtSound.play();
    
    return this;
  }

  duck() {
    if (!this.isJumping) {
      this.body.setSize(50, 150, 75, 130);
      this.animations.play('duck');
    }
  }

  run() {
    if (this.body.touching.down) {
      this.isJumping = false;
      this.animations.play('run', 5, true);
      this.body.setSize(50, 230, 75, 50);
    }
  }

  heal(amount) {
    super.heal(amount);
    this.animations.play('powerup');
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

    this.alive = false;

    // console.log('player killed');
    this.animations.play('damage', 1, true);

    if (this.events) {
      this.events.onKilled$dispatch(this);
    }

    return this;
  }

}