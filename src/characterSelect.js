export default class characterSelectState extends Phaser.State {
  create() {
    //this.game.stage.backgroundColor = "#ffffff"; //ändrar bakgrundsfärgen
    this.game.stage.backgroundColor = "#000000";
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height - 128, 'gameBackground');
    this.background.alpha = 0.3;
    this.floor = this.game.add.tileSprite(0, this.game.height - 128, 1024, 128, 'floor');
    this.floor.alpha = 0.3;

    //ritar ut två trianglar, inget nödvändigt
    var graphics = this.game.add.graphics(0, 250);

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

    this.nCharacters = 5;

    // the players
    this.selectedPlayer = this.game.add.sprite(0, 0, 'characters', 1);
    this.selectedPlayer.alignIn(this.camera.bounds, Phaser.CENTER);

    this.leftPlayer = this.game.add.sprite(0, 0, 'characters', 0);
    this.leftPlayer.scale.setTo(0.7, 0.7);
    this.leftPlayer.alpha = 0.5;
    this.leftPlayer.alignTo(this.selectedPlayer, Phaser.LEFT_CENTER);

    this.rightPlayer = this.game.add.sprite(0, 0, 'characters', 2);
    this.rightPlayer.scale.setTo(0.7, 0.7);
    this.rightPlayer.alpha = 0.5;
    this.rightPlayer.alignTo(this.selectedPlayer, Phaser.RIGHT_CENTER);

    const nameLabel = this.game.add.text(80, 40, 'select your character',
      { font: '50px Arial', fill: '#fcbfff' });

    const btnTextStyle = { font: '50px Indie Flower', fill: '#ffffff' };

    let playButton = this.game.add.button(400, 400, 'pen', actionOnClick, this, 'pen_hover.png', 'pen_normal.png', 'pen_pressed.png');
    playButton.sfx = this.add.audio('startljud');

    const startLabel = this.game.add.text(80, this.game.world.height - 80,
      'press "w" to start',
      { font: '25px Arial', fill: '#fffeab' });


    const wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    wKey.onDown.addOnce(this.start, this);

    const upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    upKey.onDown.addOnce(this.start, this);

    const leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    leftKey.onDown.add(this.changeSelectionLeft, this);

    const rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    rightKey.onDown.add(this.changeSelectionRight, this);
  }

  start() {
    this.game.state.start('play');
    playButton.sfx.play(); //??
  }

  changeSelectionLeft() { this.changeSelection(1); }
  changeSelectionRight() { this.changeSelection(-1); }

  // changes selection step steps
  changeSelection(step) {
    this.leftPlayer.frame = checkBounds(this.leftPlayer, step, this.nCharacters);
    this.selectedPlayer.frame = checkBounds(this.selectedPlayer, step, this.nCharacters);
    this.rightPlayer.frame = checkBounds(this.rightPlayer, step, this.nCharacters);

    this.game.selectedChar = (this.selectedPlayer.frameName.split('.'))[0]; //remove '.png'
    console.log(this.game.selectedChar);
    
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

function actionOnClick()
{
  this.game.state.start('play');
  playButton.sfx.play();
}