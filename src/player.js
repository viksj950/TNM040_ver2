export default class Player extends Phaser.Sprite {
  constructor(game) {
    super(game, 20, 50, 'player');
    
    this.game.physics.enable(this);
    this.body.gravity.y = 1100;
    this.body.allowGravity = true;
    this.body.collideWorldBounds = true;
    
    this.health = 3;

    // TODO animations
  }

  jump() {
    this.body.velocity.y = -500;
    
    // TODO animation
  }

  damage(amount) {
    console.log(`${amount} damage dealt, health: ${this.health}`);
    
    super.damage(amount);
    // TODO play sound?
    return this;
  }

  duck() {
    // TODO
  }

  kill() {
    // source from phaser
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