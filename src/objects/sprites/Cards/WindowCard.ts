
import { Scene } from "phaser";
import { CardType, WindowType } from "./CardType";
import { Card } from "./Card";


export class WindowCard extends Card {

    protected _parentScene: Scene;

    constructor(
        _parentScene: Scene,
        private readonly _windowType: WindowType
    ) {
        super(_parentScene, CardType.WINDOW, _windowType);
        this._parentScene = _parentScene;
    };
}