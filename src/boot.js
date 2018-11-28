export default class bootState extends Phaser.State {
  preload() {
    //load loading bar image
    this.game.load.image('loadingBar','./assets/images/loadingBar.png');
  }
  create() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.state.start('load');
  }
}