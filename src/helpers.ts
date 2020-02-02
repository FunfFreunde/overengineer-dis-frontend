import * as Phaser from 'phaser';

export const getGameWidth = (scene: Phaser.Scene) => {
    return scene.game.scale.width;
  };

export const getGameHeight = (scene: Phaser.Scene) => {
    return scene.game.scale.height;
  };

export let musicState = (value?: undefined | string | boolean) => {
  if (value != undefined) {
     if (localStorage.getItem('musicState') == 'false') {

      localStorage.setItem('musicState', 'true');
  
    }
    else {
      localStorage.setItem('musicState', 'false');
    }
  }
    
  value = localStorage.getItem('musicState');
  return value;
};