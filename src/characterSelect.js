import penButton from "./penButton";

export default class characterSelectState extends Phaser.State {
  create() {
    // dark background
    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    //ritar ut två trianglar, inget nödvändigt
    var graphics = this.add.graphics(0, 250);

    //ritar första triangeln
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(10, 0xffd900, 1);
    graphics.moveTo(100, 75);
    graphics.lineTo(200, 50);
    graphics.lineTo(200, 100);
    graphics.endFill();

    // ritar andra triangeln
    graphics.beginFill(0xFF3300);
    graphics.moveTo(900, 75)
    graphics.lineTo(800, 50);
    graphics.lineTo(800, 100);
    graphics.endFill();

    this.nCharacters = 5; // number of characters


    // the players
    this.selectedPlayer = this.add.sprite(0, 0, 'characters', 1);
    this.selectedPlayer.alignIn(this.camera.bounds, Phaser.CENTER);

    this.leftPlayer = this.add.button(0, 0, 'characters', this.changeSelectionLeft, this);
    this.leftPlayer.frame = 0;
    this.leftPlayer.scale.setTo(0.7, 0.7);
    this.leftPlayer.alpha = 0.5;
    this.leftPlayer.alignTo(this.selectedPlayer, Phaser.LEFT_CENTER);
    
    this.rightPlayer = this.add.button(0, 0, 'characters', this.changeSelectionRight, this);
    this.rightPlayer.frame = 2;
    this.rightPlayer.scale.setTo(0.7, 0.7);
    this.rightPlayer.alpha = 0.5;
    this.rightPlayer.alignTo(this.selectedPlayer, Phaser.RIGHT_CENTER);


    const nameLabel = this.add.text(20, 10, 'Select your character\n', { // newline to fix text being cut off
      font: '70px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });
      
    // const startLabel = this.game.add.text(80, this.game.world.height - 80,
    //   'press "w" to start',
    //   { font: '25px Arial', fill: '#fffeab' });


    const btnPadding = -40;

    this.playButton = this.add.existing(new penButton(this.game, 0, 0, 'Start game', this.start, this));
    this.playButton.alignIn(this.camera.bounds, Phaser.BOTTOM_RIGHT, btnPadding, btnPadding);

    this.menuButton = this.add.existing(new penButton(this.game, 500, 0, 'Menu', this.menu, this, true));
    this.menuButton.alignIn(this.camera.bounds, Phaser.BOTTOM_LEFT, this.menuButton.width + btnPadding, btnPadding);


    // keyboard
    const wKey = this.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);

    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);

    const leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.changeSelectionLeft, this);

    const rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.changeSelectionRight, this);
  }

  start() {
    this.game.state.start('play');
  }

  menu() {
    this.game.state.start('menu');
  }

  changeSelectionLeft() { this.changeSelection(-1); }
  changeSelectionRight() { this.changeSelection(1); }

  // changes selection step steps
  changeSelection(step) {
    this.leftPlayer.frame = checkBounds(this.leftPlayer, step, this.nCharacters);
    this.selectedPlayer.frame = checkBounds(this.selectedPlayer, step, this.nCharacters);
    this.rightPlayer.frame = checkBounds(this.rightPlayer, step, this.nCharacters);

    this.game.selectedChar = (this.selectedPlayer.frameName.split('.'))[0]; //remove '.png'
    // console.log(this.game.selectedChar);
    
    function checkBounds(player, step, n) {
      let temp = player.frame + step;

      if (temp < 0) {
        temp += n; 
      } else if (temp >= n) {
        temp -= n;
      }
      return temp;
    }
  }
  
}
