import { MenuButton } from '../ui/menu-button';

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
    this.add.text(100, 50, 'This is a sample main menu. Click the "Start" button below to run your game.', { fill: '#FFFFFF' }).setFontSize(24);

    let music = this.sound.add('bg_music');
    music.play({
      volume: .3,
      loop: true
    })

    new MenuButton(this, 100, 150, 'Start Game', () => {
      this.scene.start('Game');
    });

    new MenuButton(this, 100, 250, 'OUR Game', ()  => {
      this.scene.start('OverEngineer');
    });

    new MenuButton(this, 100, 350, 'Settings', () => console.log('settings button clicked'));

    new MenuButton(this, 100, 450, 'Help', () => console.log('help button clicked'));
  }
}
