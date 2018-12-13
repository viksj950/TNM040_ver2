export default class toggleButton extends Phaser.Button {
  // activated sets inital texture to first(false) or second(true)
  constructor(game, callback, callbackContext, firstTexture, secondTexture,
      overFrame, outFrame, downFrame, activated = false) {

    let texture = '';
    if (activated) texture = secondTexture;
    else texture = firstTexture;

    super(game, 0, 0, texture, function(btn) {

      if (btn.key === firstTexture) {
        btn.loadTexture(secondTexture);
      } else {
        btn.loadTexture(firstTexture);
      }
      // console.log(callbackContext, this, callback);
      // console.log(this.callback);
      callback.apply(this)
      
    }, callbackContext, overFrame, outFrame, downFrame);

    this.setUpSound(this.game.add.sound('startljud'));
  }
}