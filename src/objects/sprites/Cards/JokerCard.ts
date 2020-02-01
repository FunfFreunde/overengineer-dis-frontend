import { Card } from "./Card";
import { JokerType, CardType } from "./CardType";
import { Scene } from "phaser";


export class JokerCard extends Card {
    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _jokerType: JokerType
    ) {
        super(_parentScene, posX, posY, CardType.JOKER, _jokerType);
        this._parentScene = _parentScene;
    };
}