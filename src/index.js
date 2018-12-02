/**
 * Import Phaser dependencies using `expose-loader`.
 * This makes then available globally and it's something required by Phaser.
 * The order matters since Phaser needs them available before it is imported.
 */

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';
import bootState from './boot';
import loadState from './load';
import menuState from './menu';
import characterSelectState from './characterSelect';
import playState from './play';
import gameOverState from './gameOver';

const config = {
  width: 1024,
  height: 576,
  render: Phaser.AUTO,
  antialiasing: true,
}

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.highScore = 0;
    
    this.state.add('boot', bootState);
    this.state.add('load', loadState);
    this.state.add('menu', menuState);
	this.state.add('characterSelect', characterSelectState);
    this.state.add('play', playState);
    this.state.add('gameOver', gameOverState);
    
    this.state.start('boot');
  }
}

function startGame() {
  new Game();
}

// load webfont, script included in html
WebFont.load({
  active: startGame(), // start game when font is loaded
  google: {
    families: ['Indie Flower']
  }
});

