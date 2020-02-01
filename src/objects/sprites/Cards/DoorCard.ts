
import { Card } from "./Card";
import { CardType, DoorType } from "./CardType";
import { Scene } from "phaser";


export class DoorCard extends Card {
    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        private readonly _doorType: DoorType
    ) {
        super(_parentScene, CardType.DOOR, _doorType);
        this._parentScene = _parentScene;
    };
}