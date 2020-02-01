
import { Card } from "./Card";
import { JokerType, CardType } from "./CardType";
import { Scene } from "phaser";


export class OpponentCard extends Card {
    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
    ) {
        super(_parentScene, posX, posY, CardType.JOKER, 'man');
        this._parentScene = _parentScene;
        this.setDisplaySize(64, 64);
        _parentScene.add.existing(this);
        this.setInteractive(false);
        _parentScene.input.setDraggable(this, false);
        _parentScene.input.on('drag', () => { });
        _parentScene.input.on('dragstart', () => { });
        _parentScene.input.on('dragend', () => { });
        this.setSize(64, 64);
    };
}