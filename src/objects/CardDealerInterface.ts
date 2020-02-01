import { Scene } from "phaser";
import { Card } from "./sprites/Cards/Card";


export interface CardDealerInterface {

    requestNewCard(scene: Scene, hand: Array<Card>);
    canRequestNewCard(hand: Array<Card>): Boolean;
    requestFullHand(scene: Scene): Array<Card>;

}