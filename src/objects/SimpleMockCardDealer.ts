import { CardDealerInterface } from "./CardDealerInterface";
import { Scene, Physics } from "phaser"
import { Card } from './sprites/Cards/Card';
import { CardType, TireType, DoorType, PaintJobType, WindowType, EngineType, JokerType } from "./sprites/Cards/CardType";
import { TireCard } from "./sprites/Cards/TireCard";
import { EngineCard } from "./sprites/Cards/EngingeCard";
import { JokerCard } from "./sprites/Cards/JokerCard";
import { DoorCard } from "./sprites/Cards/DoorCard";
import { PaintJobCard } from "./sprites/Cards/PaintJobCard";
import { WindowCard } from "./sprites/Cards/WindowCard";


export class SimpleMockCardDealer implements CardDealerInterface{

    private lastX: number;

    constructor() {
        this.lastX = 200;
    }


    requestNewCard(scene: Scene, hand: Physics.Arcade.Group) {
        if (this.canRequestNewCard(hand)) {
            hand.add(this._createRandomCard(scene, this.lastX, 800));
            this.lastX += 500;
        }
    }

    canRequestNewCard(hand: Physics.Arcade.Group): Boolean {
        return hand.countActive() < 5;
    }

    requestFullHand(scene: Scene): Physics.Arcade.Group {
        const hand = scene.physics.add.group({
            classType: Card,
            runChildUpdate: true,
            defaultKey: 'card',
            maxSize: 5
        });

        while (this.canRequestNewCard(hand)) {
            this.requestNewCard(scene, hand);
        }
        scene.physics.add.collider(hand, hand);
        return hand;
    }

    private _createRandomCard(_scene: Scene, posX, posY): Card {
        var randomArrayItem = (array) => {
            let idx = array[Math.floor(Math.random() * array.length)];
            return idx;
        }
        // let dice = Math.floor(Math.random() * Math.floor(6));
        let type = randomArrayItem(Object.keys(CardType));
        switch (type) {
            case CardType.DOOR:
                const dspec = randomArrayItem(Object.keys(DoorType));
                return new DoorCard(_scene, posX, posY, dspec);
            case CardType.ENGINE:
                return new EngineCard(_scene, posX, posY, randomArrayItem(Object.keys(EngineType)));
            case CardType.JOKER:
                return new JokerCard(_scene, posX, posY, randomArrayItem(Object.keys(JokerType)));
            case CardType.PAINT_JOB:
                return new PaintJobCard(_scene,posX, posY, randomArrayItem(Object.keys(PaintJobType)));
            case CardType.TIRE:
                return new TireCard(_scene, posX, posY, randomArrayItem(Object.keys(TireType)));
            case CardType.WINDOW:
                return new WindowCard(_scene, posX, posY, randomArrayItem(Object.keys(WindowType)));
            default:
                return new WindowCard(_scene, posX, posY, randomArrayItem(Object.keys(WindowType)));
        }
    }
}