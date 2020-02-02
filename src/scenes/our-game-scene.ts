
import { getGameWidth, getGameHeight } from '../helpers';
import { MenuButton } from '../ui/menu-button';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'OurGame'
};

export class OurGame extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.add.image(getGameWidth(this)/2, getGameHeight(this)/2, 'credits').setDisplaySize(getGameHeight(this), getGameHeight(this));

        new MenuButton(this, getGameWidth(this)/2.25, getGameHeight(this)/2+250, '<= Back', () => {
            this.scene.switch('MainMenu');
          });
    }

}
