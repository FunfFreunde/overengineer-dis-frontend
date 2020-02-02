
import { getGameWidth, getGameHeight } from '../helpers';
import { MenuButton } from '../ui/menu-button';
import { Card } from '../objects/sprites/Cards/Card';
import { musicState } from '../helpers';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Settings'
};

export class Settings extends Phaser.Scene {
    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.add.text(300, 150, 'Settings', { fill: '#FFFFFF'}).setFontSize(45);

        new MenuButton(this, 100, 250, 'Music ON/OFF', ()  => {
            musicState("true");
            console.log(musicState());
          });

          new MenuButton(this, getGameWidth(this)/2.25, getGameHeight(this)/2+250, 'Save', () => {
            this.scene.switch('MainMenu');
          });
    }

}
