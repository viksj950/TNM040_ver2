import penButton from "./penButton";
import toggleButton from "./toggleButton";

export default class characterSelectState extends Phaser.State {
  create() {
    // dark background
    this.game.stage.backgroundColor = "#000000";
    this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    this.muteButton = this.add.existing(
      new toggleButton(this.game, () => {
        this.game.sound.mute = !this.game.sound.mute;
      }, this, 'soundOn', 'soundOff', 0, 2, 1, this.game.sound.mute)
    );
    this.muteButton.alignIn(this.camera.view, Phaser.TOP_RIGHT, -24, -24);


    this.nCharacters = 5; // number of characters

    this.characters = {
      anton: 0,
      arvid: 1,
      linnea: 2,
      viktor: 3,
      william: 4
    };

    // the players
    this.selectedPlayer = this.add.sprite(0, 0, 'characters', this.characters[this.game.selectedChar]);
    this.selectedPlayer.alignIn(this.camera.bounds, Phaser.CENTER);

    // this.leftPlayer = this.add.button(0, 0, 'characters', this.changeSelectionLeft, this);
    this.leftPlayer = this.add.sprite(0, 0, 'characters');
    this.leftPlayer.frame = this.characters[this.game.selectedChar];
    this.leftPlayer.frame = this.checkBounds(this.leftPlayer, -1, this.nCharacters);
    this.leftPlayer.scale.setTo(0.7, 0.7);
    this.leftPlayer.alpha = 0.5;
    this.leftPlayer.alignTo(this.selectedPlayer, Phaser.LEFT_CENTER);
    
    // this.rightPlayer = this.add.button(0, 0, 'characters', this.changeSelectionRight, this);
    this.rightPlayer = this.add.sprite(0, 0, 'characters');
    this.rightPlayer.frame = this.characters[this.game.selectedChar];
    this.rightPlayer.frame = this.checkBounds(this.rightPlayer, 1, this.nCharacters);
    this.rightPlayer.scale.setTo(0.7, 0.7);
    this.rightPlayer.alpha = 0.5;
    this.rightPlayer.alignTo(this.selectedPlayer, Phaser.RIGHT_CENTER);

    //selection buttons
    let leftBtn = this.add.button(0, 0, 'left', this.changeSelectionLeft, this, 1, 0, 2);
    leftBtn.scale.setTo(1.5, 1.5);
    leftBtn.alignTo(this.leftPlayer, Phaser.LEFT_CENTER);
    leftBtn.setDownSound(this.game.add.sound('startljud', 0.7));

    let rightBtn = this.add.button(0, 0, 'right', this.changeSelectionRight, this, 1, 0, 2);
    rightBtn.scale.setTo(1.5, 1.5);
    rightBtn.alignTo(this.rightPlayer,   Phaser.RIGHT_CENTER);
    rightBtn.setDownSound(this.game.add.sound('startljud', 0.7));

    // pen buttons
    const btnPadding = -40;
    
    this.playButton = this.add.existing(new penButton(this.game, 0, 0, 'Start game', this.start, this));
    this.playButton.alignIn(this.camera.bounds, Phaser.BOTTOM_RIGHT, btnPadding, btnPadding);
    
    this.menuButton = this.add.existing(new penButton(this.game, 500, 0, 'Menu', this.menu, this, true));
    this.menuButton.alignIn(this.camera.bounds, Phaser.BOTTOM_LEFT, this.menuButton.width + btnPadding, btnPadding);
    
    // text
    const nameLabel = this.add.text(20, 10, 'Select your character\n', { // newline to fix text being cut off
      font: '70px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });

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
    this.leftPlayer.frame = this.checkBounds(this.leftPlayer, step, this.nCharacters);
    this.selectedPlayer.frame = this.checkBounds(this.selectedPlayer, step, this.nCharacters);
    this.rightPlayer.frame = this.checkBounds(this.rightPlayer, step, this.nCharacters);

    this.game.selectedChar = (this.selectedPlayer.frameName.split('.'))[0]; //remove '.png'
    // console.log(this.game.selectedChar);
    
  }
  
  checkBounds(player, step, n) {
    let temp = player.frame + step;

    if (temp < 0) {
      temp += n; 
    } else if (temp >= n) {
      temp -= n;
    }
    return temp;
  }
}
