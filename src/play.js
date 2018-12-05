import Player from "./player";
import penButton from "./penButton";

export default class playState extends Phaser.State {
  create() {
    this.game.time.advancedTiming = true; // för att kunna visa fps

    this.game.sound.muteOnPause = false;
    
    // add background
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.autoScroll(-170, 0);


    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.autoScroll(-170, 0);
    this.game.physics.enable(this.floor);
    this.floor.body.immovable = true;
    
    this.obstacles = this.add.group();
    this.obstacles.enableBody = true;
    this.addObstacle();
	
	this.powerUp = this.add.group();
	this.powerUp.enableBody = true;
	this.addPowerUp();

    
    // create player and add
    this.player = new Player(this.game);
    this.add.existing(this.player); //this.game.add?
    this.player.events.onKilled.add(this.gameOver, this); 
    
    // add obstacles all the time
    this.obstacleTimer = this.time.events.loop(2000, this.addObstacle, this);
    this.hjertTimer= this.time.events.loop(3000, this.addPowerUp, this);
	
	//this.game.time.events.loop(this.game.rnd.integerInRange(5000, 12000), this.addPowerUp, this);
	
	/*
	this.game.time.events.loop(2000, this.addObstacle, this);
	this.game.time.events.loop(this.game.rnd.integerInRange(5000, 12000), this.addPowerUp, this);
	*/
    
    // show lives
    this.lifeDisp = this.add.group(); //this.game?
    for (let i = 0; i < this.player.health; i++) {
      this.lifeDisp.create(32 + (40 * i), 32, 'powerUp'); //'player'
    }

    // add pause button
    // TODO 
    this.pauseButton = this.add.button(
      0, // ändra nog
      0,
      'obstacle', // !!
      this.togglePause,
      this // här kan man fylla i frames för hover osv sen
    ); // alignTo()
    // this.pauseButton.anchor.set(0.5);
    this.pauseButton.alignIn(this.camera.view, Phaser.TOP_RIGHT, -32, -32);
    
    // add scorestuff
    this.score = 0;
    this.scoreLabel = this.add.text(50, 50, 'score:\n' + this.score, {
      font: '25px Indie Flower', fill: '#000000'
    });
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.alignTo(this.camera.world.bounds, Phaser.TOP_CENTER, 0, -85);
    this.scoreLabel.align = 'center';
    
    // keyboard stuff, blir det skumt när man kan använda fler olika för samma?
    this.keyboard = this.input.keyboard;

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

    this.pKey = this.keyboard.addKey(Phaser.KeyCode.P);
    this.pKey.onDown.add(this.togglePause, this);

    this.escKey = this.keyboard.addKey(Phaser.KeyCode.ESC);
    this.escKey.onDown.add(this.togglePause, this);

    /* bara för test! */
    this.hKey = this.keyboard.addKey(Phaser.KeyCode.H);
    this.hKey.onDown.add(() => {
      this.player.heal(1);
      this.updateLifeDisp();
    }, this);
    /* -------------- */
  }

  update() {
    // checks for collision with floor and makes the player run if landing from jump
    this.physics.arcade.collide(this.player, this.floor, (player, floor) => {
      if (player.isJumping) player.run();
    });

    this.physics.arcade.overlap(this.player, this.obstacles, (player, obstacle) => {
      player.damage(1);
      obstacle.destroy();
      this.updateLifeDisp();
    }, null, this);
	
	this.game.physics.arcade.overlap(this.player, this.powerUp,(player, powerUp) =>
	{
		
      let p = this.game.add.text(80, 150, 'Bonus Lyfe!',
        {font: '20px Courier', fill: '#ffffff"'});
		
		this.game.time.events.add(600, function() {    this.game.add.tween(p).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);    
		this.game.add.tween(p).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
		this.player.heal(1);

      this.updateLifeDisp();
	     var pickup=this.add.audio('power');
		pickup.play();
		  powerUp.destroy();
		  
	}, null, this);

    //this.physics.arcade.overlap(this.player, this.powerUp, this.powerTaken, null, this);

    this.incrementScore();
    this.obstacles.forEach((child) => {child.angle -= 3;}); // uppdaterar ju inte hitboxen dock

    if (this.score % 500 === 0) {
      this.increaseDifficulty();
    }
  }

  increaseDifficulty() {
    this.obstacleTimer.delay -= 100;
  }

  //debug stuff
  render() {
    // this.game.debug.body(this.player);
    // this.game.debug.bodyInfo(this.player, 32, 32);
    // this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
    // this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    //this.obstacles.forEachAlive((member) => {this.game.debug.body(member);}, this);
    // this.game.debug.text(this.player.health, 100, 14,"#ffffff");
  }

  addObstacle() {
    // let obstaclePosition = [16,48,100];
    const obstaclePosition = [150, 185, 285];

    let newObstacle = this.obstacles.create(
      this.game.width + 50,
      this.game.height - obstaclePosition[Math.floor(Math.random()*(4-1)+1)-1],
      'obstacle'
    ); //this.game.height - önskad höjd på hindret
    newObstacle.body.setSize(24, 24, 0, 4); // verkar funka med 24x32-bild
    newObstacle.anchor.setTo(0.5, 0.5);
    newObstacle.lifespan = 10000; // TODO se till att detta är ett rimligt värde
    newObstacle.body.velocity.x = -200;
  }
  
  addPowerUp() {
	  this.powerUp.create(this.game.width - 60, this.game.height - 200, 'powerUp');
	  
	  this.game.physics.enable(this.powerUp, Phaser.Physics.ARCADE);
	this.powerUp.forEach((item) => { item.body.velocity.x = -200;
	console.log("iloop");});
	 


	//this.game.time.events.loop(this.game.rnd.integerInRange(5000, 12000), this.addPowerUp, this);
  }
  
  /*
  powerTaken(){
       this.game.add.text(80, 150, 'power!',
        {font: '30px Courier', fill: '#afdfdd'});
      console.log("pickup!");
  } */

  gameOver() {    
    // timergrejen måste förhindra hopp och grejor
    // // wait a little and then go to gameOver
    // let timer = this.game.time.create(true);
    // // this.physics.arcade.isPaused = true;
    // timer.add(1200,() => {this.game.state.start('gameOver')}, this);
    // timer.start();
	var ajsomfan=this.add.audio('GO');
    ajsomfan.play();
    
    this.game.state.start('gameOver', true, false, this.score);
  }



  incrementScore() {
    this.score += 1;
    this.scoreLabel.text = 'score:\n' + this.score;
  }

  togglePause() {
    if (!this.game.paused) {
      this.game.paused = true;

      // create dark overlay
      this.overlay = this.game.add.graphics(0,0);
      this.overlay.beginFill(0x000000);
      this.overlay.alpha = 0.7;
      this.overlay.drawRect(0, 0, this.game.width, this.game.height);
      this.overlay.endFill();

      this.pauseMenu = this.add.group();

      // make buttons
      let resumeButton = new penButton(this.game, 0, 0, 'Resume', this.togglePause, this);
      resumeButton.alignIn(this.camera.bounds, Phaser.CENTER);

      let muteButton = new penButton(this.game, 0, 0, 'Mute', () => { // TODO visa om på eller av eller ska nogm flytta
        this.game.sound.mute = !this.game.sound.mute;
        console.log('mute: ', this.game.sound.mute);
      }, this);
      muteButton.alignIn(this.camera.bounds, Phaser.CENTER, 0, 100);
      
      // make pause text
      let pauseText = this.game.add.text( 0, 0, 'Game Paused', {
        font: '70px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
      });
      pauseText.alignIn(this.camera.bounds, Phaser.CENTER, 0, -100); // går att lägga på i slutet av förra
      
      //add buttons and stuff to pausemenu group
      this.pauseMenu.add(pauseText);
      this.pauseMenu.add(resumeButton);
      this.pauseMenu.add(muteButton);
    } else {
      this.pauseMenu.destroy();
      this.overlay.destroy();
      this.game.paused = false;
    }
  }

  updateLifeDisp() {
    let health = this.player.health; //liv som "delas ut"
    
    for (let i = 0; i < this.lifeDisp.total; i++) {
      if (health > 0) {
        this.lifeDisp.getAt(i).alpha = 1;
        health--;
      } else {
        this.lifeDisp.getAt(i).alpha = 0.2;
      }
    }
  }

}