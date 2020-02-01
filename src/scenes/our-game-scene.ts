
import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { CardType, TireType } from '../objects/sprites/Cards/CardType';
import { TireCard } from '../objects/sprites/Cards/TireCard';
import { Card } from '../objects/sprites/Cards/Card';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'OurGame'
};

export class OurGame extends Phaser.Scene {

    public speed: number = 200;

    public hand: [Card];

    constructor() {
        super(sceneConfig);
    }

    public create() {
        console.log("Sheesh");
    }

    public update() {
    }
}
