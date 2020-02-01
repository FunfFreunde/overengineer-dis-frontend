import { Scene } from "phaser";
import { CardType, TireType } from "./CardType";
import { Card } from "./Card";


export class TireCard extends Card {

    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _tireType: TireType
    ) {
        super(_parentScene, posX, posY, CardType.TIRE, _tireType);
        this._parentScene = _parentScene;
    };
}