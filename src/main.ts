import * as Phaser from 'phaser';
import Scenes from './scenes';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'OverEngineer',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  render: {
    pixelArt: true,
  },

  parent: 'game',
  backgroundColor: '#C5C5C5',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
