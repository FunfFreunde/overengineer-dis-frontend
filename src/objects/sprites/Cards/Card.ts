import { CardType } from "./CardType";
import { Physics, Scene } from "phaser";
import { GameScene } from "../../../scenes/game-scene";


export class Card extends Physics.Arcade.Sprite {

    protected _parentScene: Scene

    constructor(
        _parentScene: Scene,
        posX: number,
        posY: number,
        private readonly _type: CardType,
        protected readonly _spriteName: string,
    ) {
        super(_parentScene, posX, posY, _spriteName);
        this._parentScene = _parentScene;
        this._type = _type;
        this._spriteName = _spriteName;
        this.setDisplaySize(64, 64);
        _parentScene.physics.add.existing(this);
        _parentScene.add.existing(this);
        this.setInteractive();
        _parentScene.input.setDraggable(this);
        _parentScene.input.on('drag', this.onDrag);

        _parentScene.input.on('dragstart', this.onDragStart);
        _parentScene.input.on('dragend', this.onDragRelease);
        this.setSize(206, 313);
    }

    onDrag(pointer: any, gameObject: Card, dragX: number, dragY: number) {
        gameObject.x = dragX
        gameObject.y = dragY
    }

    onDragStart(pointer: any, gameObject: Card) {
        gameObject.setTint(0x000000);
    }

    onDragRelease(pointer: any, gameObject: Card) {
        gameObject.clearTint();
        if (this._parentScene instanceof GameScene) {
            this._parentScene.onResetGrid();
        }
    }

    /**
     * 
     */
    public discard() {
        this.setActive(false);
        this.setVisible(false);
        this.removeAllListeners();
        this.setInteractive(false);
    }

    update() {
    }


}