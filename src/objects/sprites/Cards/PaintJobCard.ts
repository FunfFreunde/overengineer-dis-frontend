
import { Scene } from "phaser";
import { CardType, PaintJobType } from "./CardType";
import { Card } from "./Card";


export class PaintJobCard extends Card {

    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _paintJobType: PaintJobType
    ) {
        super(_parentScene, posX, posY, CardType.PAINT_JOB, _paintJobType);
        this._parentScene = _parentScene;
    };
}