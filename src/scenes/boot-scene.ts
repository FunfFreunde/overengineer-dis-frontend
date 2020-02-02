import { getGameWidth, getGameHeight } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Boot',
};

/**
 * The initial scene that loads all necessary assets to the game and displays a loading bar.
 */
export class BootScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public preload() {
    const halfWidth = getGameWidth(this) * 0.5;
    const halfHeight = getGameHeight(this) * 0.5;

    const progressBarHeight = 100;
    const progressBarWidth = 400;

    const progressBarContainer = this.add.rectangle(halfWidth, halfHeight, progressBarWidth, progressBarHeight, 0x000000);
    const progressBar = this.add.rectangle(halfWidth + 20 - progressBarContainer.width * 0.5, halfHeight, 10, progressBarHeight - 20, 0x888888);

    const loadingText = this.add.text(halfWidth - 75, halfHeight - 100, 'Loading...').setFontSize(24);
    const percentText = this.add.text(halfWidth - 25, halfHeight, '0%').setFontSize(24);
    const assetText = this.add.text(halfWidth - 25, halfHeight + 100, '').setFontSize(24);

    this.load.on('progress', (value) => {
      progressBar.width = (progressBarWidth - 30) * value;

      const percent = Math.round(value) * 100;
      percentText.setText(`${percent}%`);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(file.key);
    });

    this.load.on('complete', () => {
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      progressBar.destroy();
      progressBarContainer.destroy();

      this.scene.start('MainMenu');
    });

    this.loadAssets();
  }

  /**
   * All assets that need to be loaded by the game (sprites, images, animations, tiles, music, etc)
   * should be added to this method. Once loaded in, the loader will keep track of them, indepedent of which scene
   * is currently active, so they can be accessed anywhere.
   */
  private loadAssets() {
    // Load sample assets

    this.load.image('man', 'assets/character.png');
    this.load.image('tire_winter', 'assets/tire_winter.png');
    this.load.image('tire_summer', 'assets/tire_summer.png');
    this.load.image('tire_all', 'assets/tire_all.png');
    this.load.image('window_front', 'assets/window_front.png');
    this.load.image('window_rear', 'assets/window_rear.png');
    this.load.image('window_side', 'assets/window_side.png');
    this.load.image('engine_gas', 'assets/engine_gas.png');
    this.load.image('engine_electro', 'assets/engine_electro.png');
    this.load.image('engine_diesel', 'assets/engine_diesel.png');
    this.load.image('door_slide', 'assets/door_slide.png');
    this.load.image('door_front', 'assets/door_front.png');
    this.load.image('door_back', 'assets/door_back.png');
    this.load.image('paint_red', 'assets/paint_red.png');
    this.load.image('paint_green', 'assets/paint_green.png');
    this.load.image('paint_blue', 'assets/paint_blue.png');
    this.load.image('paint_yellow', 'assets/paint_yellow.png');
    this.load.image('menu', 'assets/menu_quad.png');

    // Audio
    this.load.audio('bg_music', ['assets/menu_music.wav']);
    this.load.audio('submit', ['assets/tools.wav']);
    this.load.audio('hover', ['assets/hover.ogg']);
    this.load.audio('game_music', ['assets/game_music.wav']);
  }

}
