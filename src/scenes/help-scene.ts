
import { getGameWidth, getGameHeight } from '../helpers';
import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Help'
};

export class Help extends Phaser.Scene {


    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.add.image(getGameWidth(this)/2, getGameHeight(this)/2, 'menu').setDisplaySize(getGameHeight(this), getGameHeight(this));
        this.add.text(getGameWidth(this)/4.5, getGameHeight(this)/2+200, '[i] This game was developed on the GlobalGameJam 2020!', { fill: '#FFFFFF' }).setFontSize(24);

        new MenuButton(this, getGameWidth(this)/2.25, getGameHeight(this)/2+250, '<= Back', () => {
            this.scene.start('MainMenu');
          });
    }

}
