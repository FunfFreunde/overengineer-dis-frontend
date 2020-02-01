import { CardType } from "./CardType";
import { Physics, Scene } from "phaser";


export class Card extends Physics.Arcade.Sprite {

    protected _parentScene: Scene

    constructor(
        _parentScene: Scene,
        private readonly _type: CardType,
        protected readonly _spriteName: string,
    ) {
        //TODO replace 'tire_winter' with actual sprite name for card type
        super(_parentScene, 200, 800, 'tire_winter');
        this._parentScene = _parentScene;
        this._type = _type;
        this._spriteName = _spriteName;
        _parentScene.physics.add.existing(this);
        _parentScene.add.existing(this);
        this.setInteractive();
        _parentScene.input.setDraggable(this);
        this.body.touching.down = true;
        _parentScene.input.on('drag', this.onDrag);

        _parentScene.input.on('dragstart', this.onDragStart);
        _parentScene.input.on('dragend', this.onDragRelease);
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
    }

    update() {
    }


}