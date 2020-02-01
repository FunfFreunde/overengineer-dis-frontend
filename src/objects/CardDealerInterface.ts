import { Scene, Physics } from "phaser";
import { Card } from "./sprites/Cards/Card";


export interface CardDealerInterface {

    requestNewCard(scene: Scene, hand: Physics.Arcade.Group);
    canRequestNewCard(hand: Physics.Arcade.Group): Boolean;
    requestFullHand(scene: Scene): Physics.Arcade.Group;

}