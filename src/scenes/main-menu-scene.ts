import { MenuButton } from '../ui/menu-button';
import { getGameWidth, getGameHeight } from '../helpers';
import { AUTO } from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'MainMenu',
};

/**
 * The initial scene that starts, shows the splash screens, and loads the necessary assets.
 */
export class MainMenuScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.add.image(getGameWidth(this)/2, getGameHeight(this)/2, 'menu').setDisplaySize(getGameHeight(this), getGameHeight(this));

    let music = this.sound.add('bg_music');
    music.play({
      volume: .3,
      loop: true
    })

    new MenuButton(this, getGameWidth(this)/2.25, getGameWidth(this)/2.5, 'Start Game', () => {
      this.scene.start('Game');
    });

    new MenuButton(this, 100, 250, 'OUR Game', ()  => {
      this.scene.start('OverEngineer');
    });

    new MenuButton(this, 100, 350, 'Settings', () => console.log('settings button clicked'));

    new MenuButton(this, 100, 450, 'Help', () => console.log('help button clicked'));
  }
}
