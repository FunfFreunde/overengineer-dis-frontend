import { CardType } from "./CardType";
import { Physics, Scene } from "phaser";


export class Card extends Physics.Arcade.Sprite {

    protected _parentScene: Scene

    constructor(
        _parentScene: Scene,
        private readonly _type: CardType,
        protected readonly _spriteName: string,
    ) {
        super(_parentScene, 100, 100, _spriteName);
        this._parentScene = _parentScene;
        this._type = _type;
        this._spriteName = _spriteName;
        _parentScene.add.existing(this);
        console.log(_spriteName);
    };

}