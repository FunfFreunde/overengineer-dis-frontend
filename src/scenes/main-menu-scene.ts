import { MenuButton } from '../ui/menu-button';
import { getGameWidth, getGameHeight, musicState } from '../helpers';
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
  private music;
  constructor() {
    super(sceneConfig);
  }

  public update() {
    musicState() == 'true' ? this.music.resume():this.music.pause();
  }


  public create() {
    this.add.image(getGameWidth(this)/2, getGameHeight(this)/2, 'menu').setDisplaySize(getGameHeight(this), getGameHeight(this));
    
    this.music = this.sound.add('bg_music');
    let submit = this.sound.add('submit');
    this.music.play({
      volume: .3,
      loop: true,
    });
    if(musicState() == 'false') {
      this.music.pause()
    }
    new MenuButton(this, getGameWidth(this)/2.25, getGameWidth(this)/2.5, 'Start Game', () => {
      submit.play({
        volume: .2,
      });
      this.music.stop();
      this.scene.start('Game');
      
    });

    new MenuButton(this, 100, 250, 'About', ()  => {
      this.scene.switch('OurGame');
    });

    new MenuButton(this, 100, 350, 'Settings', () => {
      this.scene.switch('Settings');
    });

    new MenuButton(this, 100, 450, 'Help', () => window.location.href = "https://github.com/FunfFreunde");
  }
}
