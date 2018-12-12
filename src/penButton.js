export default class penButton extends Phaser.Button {
  constructor(game, x, y, text, callback, callbackContext, flipped = false) {
    super(game, x, y, 'pen', callback, callbackContext, 0, 1, 2); 

    // this.flipped = flipped;

    const style = {
      font: '30px Indie Flower',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 6
    };

    let textObject = this.addChild(new Phaser.Text(this.game, 0, 0, text, style));
    
    // center text in button
    textObject.anchor.setTo(0.5, 0.5);
    textObject.position.setTo(this.width / 2, this.height / 2);
    
    if (flipped) {
      this.position.x + this.width;
      this.scale.x *= -1;
      textObject.scale.x *= -1;

    }

    this.setUpSound(this.game.add.sound('startljud', 0.7));

    this.hoverScale = 0.1;
  }

}