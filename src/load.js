export default class loadState extends Phaser.State {
  preload() {
    this.loadingBar = this.add.sprite(112, 300, 'loadingBar');
    this.load.setPreloadSprite(this.loadingBar);

    // let loadingLabel = this.game.add.text(80, 150, 'loading...',
    //     {font: '30px Indie Flower', fill: '#afdfdd'});

    
    this.game.load.image('mute', './assets/images/Mute_1.png');
    this.game.load.image('logo', './assets/images/Unilife.png');

    this.game.load.image('obstacle', './assets/images/tenta_red.png');
    this.game.load.image('powerUp', './assets/images/PU1.png');

    this.game.load.image('obstacle', './assets/images/tenta.png');

    // this.game.load.image('startButton','./assets/images/startbuttonup.png');
	
	this.game.load.image('bonusLife','./assets/images/dummy.png'); //TEMP

    this.game.load.image('gameBackground', './assets/images/gameBackground.png');
    this.game.load.image('floor', './assets/images/floor.png');

    // character sprites
    this.game.load.atlasJSONHash('william', './assets/images/william.png', './assets/images/william.json');
    this.game.load.atlasJSONHash('arvid', './assets/images/arvid.png', './assets/images/arvid.json');
    this.game.load.atlasJSONHash('anton', './assets/images/anton.png', './assets/images/anton.json');
    this.game.load.atlasJSONHash('viktor', './assets/images/viktor.png', './assets/images/viktor.json');
    this.game.load.atlasJSONHash('linnea', './assets/images/linnea.png', './assets/images/linnea.json');

    this.game.load.atlasJSONHash('characters', './assets/images/characters.png', './assets/images/characters.json')

    // button textures
    this.game.load.atlasJSONHash('pen', './assets/images/pen_sheet.png', './assets/images/pen_sheet.json');
    
    this.game.load.image('up', './assets/images/up_key.png');
    this.game.load.image('down', './assets/images/down_key.png');

    // sounds
    this.game.load.audio('startljud','./assets/sound/startknapptryckning.wav');
    this.game.load.audio('hurtljud','./assets/sound/hurt.wav');
    this.game.load.audio('hoppljud','./assets/sound/hopp.wav')
	this.game.load.audio('power','./assets/sound/Powerup.wav');
	this.game.load.audio('GO','./assets/sound/startknapptryckning.wav');
	this.game.load.audio('dontHeal','./assets/sound/health_pickup_denied.wav');
  }

  create() {
    this.loadingBar.cropEnabled = false;
    this.game.state.start('menu');
  }

}