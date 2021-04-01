import penButton from "./penButton.js";

export default class prompt extends Phaser.Group {
  constructor(game, text, yesCallback) {
    super(game);

    const overlay = this.game.add.graphics(0,0);
    overlay.beginFill(0x000000);
    overlay.alpha = 0.7;
    overlay.drawRect(0, 0, this.game.width, this.game.height);
    overlay.endFill();
    
    // overlay.inputEnabled = true;
    
    overlay.inputEnabled = true;
    overlay.input.priorityID = 1;
    overlay.input.useHandCursor = false;
    this.add(overlay);

    let popUp = this.game.add.graphics(0,0);
    popUp.beginFill(0x87dce1);
    popUp.drawRoundedRect(0, 0, 0.75*this.game.width, this.game.height/2, 10);
    popUp.endFill();
    popUp.alignIn(this, Phaser.CENTER);

    this.add(popUp);

    let textObj = new Phaser.Text(this.game, 0, 0, '\n' + text, {
      font: '35px Indie Flower', fill: '#ffffff', stroke: '#000000', strokeThickness: 6
    });
    textObj.alignIn(this.game.camera.bounds, Phaser.CENTER, 0, -100);
    this.add(textObj);

    let charSelect = this.add(
      new penButton(this.game, this.game.width/2 - 15, 330, 'No', this.destroy, this, true)
    );
    charSelect.input.priorityID = 2;
    
    let playButton = this.add(
      new penButton(this.game, this.game.width/2 + 15, 330, 'Yes', yesCallback)
    );
    playButton.input.priorityID = 2;



    // this.pauseButton.bringToTop();
    // this.muteButton.bringToTop();
    
    //add buttons and stuff to pausemenu group
    // this.add(pauseText);
    // this.add(pauseText);
    // this.add(playButton);
    // this.add(charSelect);


  }

}