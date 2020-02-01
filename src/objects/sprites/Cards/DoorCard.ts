
import { Card } from "./Card";
import { CardType, DoorType } from "./CardType";
import { Scene } from "phaser";


export class DoorCard extends Card {
    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _doorType: DoorType
    ) {
        super(_parentScene, posX, posY, CardType.DOOR, _doorType);
        this._parentScene = _parentScene;
    };
}