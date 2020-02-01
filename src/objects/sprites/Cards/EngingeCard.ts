
import { Scene } from "phaser";
import { CardType, EngineType  } from "./CardType";
import { Card } from "./Card";


export class EngineCard extends Card {

    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _engineType: EngineType
    ) {
        super(_parentScene, posX, posY, CardType.ENGINE, _engineType);
        this._parentScene = _parentScene;
    };
}