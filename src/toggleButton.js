export default class toggleButton extends Phaser.Button {
  constructor(game, callback, callbackContext, firstTexture, secondTexture,
      overFrame, outFrame, downFrame) {

    super(game, 0, 0, firstTexture, function(btn) {

      if (btn.key === firstTexture) {
        btn.loadTexture(secondTexture);
      } else {
        btn.loadTexture(firstTexture);
      }
      // console.log(callbackContext, this, callback);
      // console.log(this.callback);
      callback.apply(this)
      
    }, callbackContext, overFrame, outFrame, downFrame);

    // TODO audio?!
  }
}