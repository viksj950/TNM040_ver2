export default class Player extends Phaser.Sprite {
  constructor(game) {
    super(game, 20, 50, 'william', 'jump.png'); // tappar ner spealren från toppen hehe!!!
    
    this.health = this.maxHealth = 3;
    this.isJumping = true; // kunde nog va false om spelaren spawnar på marken

    this.game.physics.enable(this);
    this.body.gravity.y = 1100;
    this.body.allowGravity = true;
    this.body.collideWorldBounds = true;

    this.body.setSize(50, 180, 75, 10); // mixtrar med hitboxen
	let ajsomfan=this.game.add.audio('hurtljud');
    
    //animations
    this.animations.add('run', ['walk1.png', 'walk2.png', 'walk3.png', 'walk2.png'], 5, true);
    this.animations.add('jump', ['jump.png'], 5, true);
    this.animations.add('duck', ['duck.png'], 5, true);
    let damageAnim = this.animations.add('damage' , ['damage.png'], 2, false);
    damageAnim.onComplete.add(() => {this.animations.play('run')}, this); //return to run anim when done

    this.duck = this.duck.bind(this);
    this.run = this.run.bind(this);
    this.jump = this.jump.bind(this);
  }

  jump() {
    if (!this.isJumping) {
		let ajsomfan=this.game.add.audio('hoppljud');
      this.body.velocity.y = -500;
      this.isJumping = true;
      this.body.setSize(50, 90, 75, 100);
      this.animations.play('jump');
    ajsomfan.play();
    }
  }

  damage(amount) {    
  let ajsomfan=this.game.add.audio('hurtljud');
    ajsomfan.play();
    super.damage(amount);
    this.animations.play('damage');
    
    return this;
  }

  duck() {
    if (!this.isJumping) {
      this.body.setSize(55, 95, 75, 95);
      this.animations.play('duck');
    }
  }

  run() {
    if (this.body.touching.down) {
      this.isJumping = false;
      this.animations.play('run', 5, true);
      this.body.setSize(50, 180, 75, 10);
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


    this.alive = false;
    // this.exists = false;
    // this.visible = false;

    console.log('player killed');
    this.animations.play('damage', 1, true);

    if (this.events) {
      this.events.onKilled$dispatch(this);
    }

    return this;
  }

}