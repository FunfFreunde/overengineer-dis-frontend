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


export class WebSocketCardDealer implements CardDealerInterface{

    constructor() {
    }


    requestNewCard(scene: Scene, hand: Physics.Arcade.Group) {
        if (this.canRequestNewCard(hand)) {
        }
    }

    canRequestNewCard(hand: Physics.Arcade.Group): Boolean {
        return hand.countActive() < 5;
    }


    requestFullHand(scene: Scene, data:Array<Object>): Physics.Arcade.Group {
        const hand = scene.physics.add.group({
            classType: Card,
            runChildUpdate: true,
            defaultKey: 'card',
            maxSize: 5
        });

        for(var i=0;i<5;i++){
            var obj = data[i];
            hand.add(this._createCard(scene, 0, 800, obj));
        }
        scene.physics.add.collider(hand, hand);
        return hand;
    }

    private _createCard(_scene: Scene, posX, posY, data): Card {
        if(data.type == 'Joker'){
            switch (data.payload.joker_type){
                case 'Intern':
                    return new JokerCard(_scene, posX, posY, JokerType.APPRENTICE);
                case 'ShoddyWork':
                    return new JokerCard(_scene, posX, posY, JokerType.SHODDY);
                case 'Cancellation':
                    return new JokerCard(_scene, posX, posY, JokerType.CANCEL);
            }
        }
        else{
            switch(data.payload.part_type){
                case 'Motor':
                    switch(data.payload.part_type.specialization){
                        case 'Electric':
                            return new EngineCard(_scene, posX, posY, EngineType.ELECTRONIC);
                        case 'Diesel':
                            return new EngineCard(_scene, posX, posY, EngineType.DIESEL);
                        case 'Gasoline':
                            return new EngineCard(_scene, posX, posY, EngineType.GASOLINE);
                    }
                    break;
                case 'Door':
                    switch(data.payload.part_type.specialization){
                        case 'Front':
                            return new DoorCard(_scene, posX, posY, DoorType.FRONT);
                        case 'Back':
                            return new DoorCard(_scene, posX, posY, DoorType.REAR);
                        case 'Slide':
                            return new DoorCard(_scene, posX, posY, DoorType.SLIDER);
                    }
                    break;
                case 'Windows':
                    switch(data.payload.part_type.specialization){
                        case 'Front':
                            return new WindowCard(_scene, posX, posY, WindowType.FRONT);
                        case 'Back':
                            return new WindowCard(_scene, posX, posY, WindowType.REAR);
                        case 'Side':
                            return new WindowCard(_scene, posX, posY, WindowType.SIDE);
                    }
                    break;
                case 'Tire':
                    switch(data.payload.part_type.specialization){
                        case 'Summer':
                            return new TireCard(_scene, posX, posY, TireType.SUMMER);
                        case 'Winter':
                            return new TireCard(_scene, posX, posY, TireType.WINTER);
                        case 'Generic':
                            return new TireCard(_scene, posX, posY, TireType.ALL);
                    }
                    break;
                case 'Paint':
                    switch(data.payload.part_type.specialization){
                        case 'Red':
                            return new PaintJobCard(_scene, posX, posY, PaintJobType.RED);
                        case 'Green':
                            return new PaintJobCard(_scene, posX, posY, PaintJobType.GREEN);
                        case 'Blue':
                            return new PaintJobCard(_scene, posX, posY, PaintJobType.RED);
                        case 'Yellow':
                            return new PaintJobCard(_scene, posX, posY, PaintJobType.YELLOW);
                    }
                    break;
            }
        }
        var randomArrayItem = (array) => {
            let idx = array[Math.floor(Math.random() * array.length)];
            return idx;
        }
        // let dice = Math.floor(Math.random() * Math.floor(6));
        let types = [CardType.TIRE, CardType.WINDOW , CardType.DOOR , CardType.PAINT_JOB , CardType.JOKER];

        let type = randomArrayItem(types);
        switch (type) {
            case CardType.DOOR:
                const dspec = DoorType[randomArrayItem(Object.keys(DoorType))];
                return new DoorCard(_scene, posX, posY, dspec);
            case CardType.ENGINE:
                return new EngineCard(_scene, posX, posY, EngineType[randomArrayItem(Object.keys(EngineType))]);
            case CardType.JOKER:
                return new JokerCard(_scene, posX, posY, JokerType[randomArrayItem(Object.keys(JokerType))]);
            case CardType.PAINT_JOB:
                return new PaintJobCard(_scene,posX, posY, PaintJobType[randomArrayItem(Object.keys(PaintJobType))]);
            case CardType.TIRE:
                return new TireCard(_scene, posX, posY, TireType[randomArrayItem(Object.keys(TireType))]);
            case CardType.WINDOW:
                return new WindowCard(_scene, posX, posY, WindowType[randomArrayItem(Object.keys(WindowType))]);
            default:
                return new WindowCard(_scene, posX, posY, WindowType[randomArrayItem(Object.keys(WindowType))]);
        }
    }
}