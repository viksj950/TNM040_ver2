import Player from "./player";

export default class playState extends Phaser.State {
  create() {
    this.game.time.advancedTiming = true; // för att kunna visa fps

    this.game.sound.muteOnPause = false;
    
    // add background
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.autoScroll(-170, 0);



    this.floor = this.game.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.autoScroll(-170, 0);
    this.game.physics.enable(this.floor);
    this.floor.body.immovable = true;
    
    this.obstacles = this.game.add.group();
    this.obstacles.enableBody = true;
    this.addObstacle();

    
    // create player and add
    this.player = new Player(this.game);
    this.game.add.existing(this.player);
    this.player.events.onKilled.add(this.gameOver, this); 
    
    // add obstacles all the time
    this.game.time.events.loop(2000, this.addObstacle, this);
    
    // show lives
    this.lifeDisp = this.game.add.group();
    for (let i = 0; i < this.player.health; i++) {
      this.lifeDisp.create(32 + (30 * i), 32, 'player');
    }

    // add pause button
    // TODO 
    this.pauseButton = this.game.add.button(
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
    this.scoreLabel = this.game.add.text(50, 50, 'score:\n' + this.score, {
      font: '25px Indie Flower', fill: '#000000'
    });
    this.scoreLabel.anchor.setTo(0.5, 0.5);
    this.scoreLabel.alignTo(this.camera.world.bounds, Phaser.TOP_CENTER, 0, -85);
    this.scoreLabel.align = 'center';
    
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
      this.updateLifeDisp();
    }, null, this);

    this.incrementScore();

  }

  //debug stuff
  render() {
    // this.game.debug.body(this.player);
    // this.game.debug.bodyInfo(this.player, 32, 32);
    // this.game.debug.text(`totalElapsedSeconds : ${this.game.time.totalElapsedSeconds().toFixed(5)}`, 32, 32);
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
    // this.game.debug.text(this.player.health, 100, 14,"#ffffff");
  }

  addObstacle() { // tentorna finns nog kvar för evigt offscreen...
    // let obstaclePosition = [16,48,100];
    const obstaclePosition = [150, 200, 285];

    let newObstacle = this.obstacles.create(
      this.game.width + 50,
      this.game.height - obstaclePosition[Math.floor(Math.random()*(4-1)+1)-1],
      'obstacle'
    ); //this.game.height - önskad höjd på hindret
    newObstacle.lifespan = 10000; // TODO se till att detta är ett rimligt värde
    newObstacle.body.velocity.x = -200;
  }

  gameOver() {
	  var ajsomfan=this.add.audio('hurtljud');
    ajsomfan.play();
    
    // timergrejen måste förhindra hopp och grejor
    // // wait a little and then go to gameOver
    // let timer = this.game.time.create(true);
    // timer.add(1200,() => {this.game.state.start('gameOver')}, this);
    // timer.start();
    this.game.state.start('gameOver', true, false, this.score);
  }



  incrementScore() {
    this.score += 1;
    this.scoreLabel.text = 'score:\n' + this.score;
    // TODO
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

      this.pauseMenu = this.game.add.group();

      const btnTextStyle = {font: '50px Indie Flower', fill: '#ffffff'};
        btnTextStyle.stroke = "#000000";
        btnTextStyle.strokeThickness = 6;

      // make resume button
      let resumeButton = new Phaser.Button(this.game, 0, 0, 'pen', this.togglePause, this,0,1,2); // byt texture
      resumeButton.addChild(new Phaser.Text(this.game, 50, -5, 'Resume', btnTextStyle));
      resumeButton.alignIn(this.camera.bounds, Phaser.CENTER);
      
      // make mute button
      let muteButton = new Phaser.Button(this.game, 0, 0, 'pen', () => { // TODO visa om på eller av
        this.game.sound.mute = !this.game.sound.mute;
        console.log('mute: ', this.game.sound.mute);
      }, this,0,1,2);
      muteButton.addChild(new Phaser.Text(this.game, 80, -5, 'Mute', btnTextStyle));
      muteButton.alignIn(this.camera.bounds, Phaser.CENTER, 0, 100);
      
      // make pause text
      let pauseText = this.game.add.text(
        0,
        0,
        'Game Paused',
        {font: '70px Indie Flower', fill: '#ffff00'}
      );
      pauseText.alignIn(this.camera.bounds, Phaser.CENTER, 0, -100);
      
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