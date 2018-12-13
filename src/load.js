export default class loadState extends Phaser.State {
  preload() {
    this.loadingBar = this.add.sprite(112, 300, 'loadingBar');
    this.load.setPreloadSprite(this.loadingBar);
    
    this.game.load.image('logo', './assets/images/Unilife.png');

    this.game.load.image('obstacle', './assets/images/tenta_red.png');
    this.game.load.image('powerUp', './assets/images/PU1.png');
    // this.game.load.image('obstacle', './assets/images/tenta.png');
    this.game.load.image('bonusLife','./assets/images/dummy.png'); //TEMP

    // world textures
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
    this.game.load.atlasJSONHash('left', './assets/images/left_arrow.png', './assets/images/left_arrow.json');
    this.game.load.atlasJSONHash('right', './assets/images/right_arrow.png', './assets/images/right_arrow.json');
    this.game.load.atlasJSONHash('pause', './assets/images/pause_button.png', './assets/images/pause_button.json');
    this.game.load.atlasJSONHash('play', './assets/images/play_button.png', './assets/images/play_button.json');
    this.game.load.atlasJSONHash('soundOn', './assets/images/sound_on.png', './assets/images/sound_on.json');
    this.game.load.atlasJSONHash('soundOff', './assets/images/sound_off.png', './assets/images/sound_off.json')

    this.game.load.image('up', './assets/images/up_key.png');
    this.game.load.image('down', './assets/images/down_key.png');

    // sounds
    this.game.load.audio('startljud','./assets/sound/startknapptryckning.wav'); // TODO byt
    this.game.load.audio('hurtljud','./assets/sound/hurt.wav');
    this.game.load.audio('hoppljud','./assets/sound/hopp.wav')
    this.game.load.audio('power','./assets/sound/Powerup.wav');
    this.game.load.audio('gameOver', './assets/sound/gameover.wav');
    this.game.load.audio('highScore', './assets/sound/highscore.wav');
    // this.game.load.audio('dontHeal','./assets/sound/health_pickup_denied.wav');

    //music
    this.game.load.audio('gameMusic','./assets/sound/game_music.wav');
    this.game.load.audio('menuMusic','./assets/sound/menu_music.mp3');
  }

  create() {
    this.game.menuMusic = this.game.sound.add('menuMusic', 1, true);
    this.loadingBar.cropEnabled = false;
    this.game.state.start('menu');
  }

}