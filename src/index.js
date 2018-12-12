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
// import penButton from './penButton';

const config = {
  width: 1024,
  height: 576,
  parent: "game", // id of DOM container
  render: Phaser.AUTO,
  antialiasing: true,
}

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.highScore = 0;
    this.selectedChar = 'arvid'; // TODO gör random?
    
    this.state.add('boot', bootState);
    this.state.add('load', loadState);
    this.state.add('menu', menuState);
    this.state.add('characterSelect', characterSelectState);
    this.state.add('play', playState);
    this.state.add('gameOver', gameOverState);

    if (window.localStorage) {
      if (!localStorage.getItem('highScore')) {
        localStorage.setItem('highScore', '0');
      } else {
        // console.log(localStorage.getItem('highScore'));
        this.highScore = parseInt(localStorage.getItem('highScore'));
      }
    }
    
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