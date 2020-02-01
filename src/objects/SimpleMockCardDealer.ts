import { CardDealerInterface } from "./CardDealerInterface";
import { Scene } from "phaser"
import { Card } from './sprites/Cards/Card';
import { CardType, TireType, DoorType, PaintJobType, WindowType, EngineType, JokerType } from "./sprites/Cards/CardType";
import { TireCard } from "./sprites/Cards/TireCard";
import { EngineCard } from "./sprites/Cards/EngingeCard";
import { JokerCard } from "./sprites/Cards/JokerCard";
import { DoorCard } from "./sprites/Cards/DoorCard";
import { PaintJobCard } from "./sprites/Cards/PaintJobCard";
import { WindowCard } from "./sprites/Cards/WindowCard";


export class SimpleMockCardDealer implements CardDealerInterface{

    constructor(_parentScene: Scene, _playerHand: Array<Card>) {
        this._parentScene = _parentScene;
        this._playerHand = _playerHand;
    }


    requestNewCard(scene: Scene, hand: Array<Card>) {
        console.log('requested new card...');
        if (this.canRequestNewCard(hand)) {
            hand.push(this._createRandomCard(scene));
            console.log('new card generated');
            console.log(hand[0]);
        }
    }

    canRequestNewCard(hand: Array<Card>): Boolean {
        return hand.length < 5;
    }

    requestFullHand(scene: Scene): Array<Card> {
        var hand = new Array<Card>();
        while (this.canRequestNewCard(hand)) {
            this.requestNewCard(scene, hand);
        }
        return hand;
    }

    private _createRandomCard(_scene: Scene): Card {
        let randomArrayItem = (array) => {
            return array[Math.floor(Math.random() * array.length)];
        };
        // let dice = Math.floor(Math.random() * Math.floor(6));
        let type = randomArrayItem(Object.keys(CardType));
        switch (type) {
            case CardType.DOOR:
                const dspec = randomArrayItem(Object.keys(DoorType));
                _scene.physics.add.sprite(200, 200, dspec);
                return _scene.add.sprite(0, 0, new DoorCard(_scene, dspec));
            case CardType.ENGINE:
                return new EngineCard(_scene, randomArrayItem(Object.keys(EngineType)));
            case CardType.JOKER:
                return new JokerCard(_scene, randomArrayItem(Object.keys(JokerType)));
            case CardType.PAINT_JOB:
                return new PaintJobCard(_scene, randomArrayItem(Object.keys(PaintJobType)));
            case CardType.TIRE:
                return new TireCard(_scene, randomArrayItem(Object.keys(TireType)));
            case CardType.WINDOW:
                return new WindowCard(_scene, randomArrayItem(Object.keys(WindowType)));
        }
    }
}