import { Input, Physics } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { Card } from '../objects/sprites/Cards/Card';
import { TireCard } from '../objects/sprites/Cards/TireCard';
import { CardType, TireType } from '../objects/sprites/Cards/CardType';
import { CardDealerInterface } from '../objects/CardDealerInterface';
import { SimpleMockCardDealer } from '../objects/SimpleMockCardDealer';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  key: 'Game',
};

export class GameScene extends Phaser.Scene {

  public speed: number = 200;

  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private image: Phaser.Physics.Arcade.Sprite;
  private _dealer: CardDealerInterface;
  private _hand: Physics.Arcade.Group;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this.physics.world.setBounds(0, 0, 800, 600);
    this._setupHandCards();
    this._drawHandCards();
    this._setupCollision();
  }

  private _setupHandCards() {
  }

  private _setupCollision() {
    this.physics.add.collider(this._hand, this._hand);
  }

  private _drawHandCards() {
    this._dealer = new SimpleMockCardDealer();
    this._hand = this._dealer.requestFullHand(this);
  }

  public update() {
    // // // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    // // const velocity = new Phaser.Math.Vector2(0, 0);

    // // if (this.cursorKeys.left.isDown) {
    // //   velocity.x -= 1;
    // // }
    // // if (this.cursorKeys.right.isDown) {
    // //   velocity.x += 1;
    // // }
    // // if (this.cursorKeys.up.isDown) {
    // //   velocity.y -= 1;
    // // }
    // // if (this.cursorKeys.down.isDown) {
    // //   velocity.y += 1;
    // // }

    // // // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    // // const normalizedVelocity = velocity.normalize();
    // // this.image.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
