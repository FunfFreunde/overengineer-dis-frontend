import { Input, Physics, GameObjects } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { Card } from '../objects/sprites/Cards/Card';
import { TireCard } from '../objects/sprites/Cards/TireCard';
import { CardType, TireType } from '../objects/sprites/Cards/CardType';
import { CardDealerInterface } from '../objects/CardDealerInterface';
import { SimpleMockCardDealer } from '../objects/SimpleMockCardDealer';
import { OpponentCard } from '../objects/sprites/Cards/OpponentCard';

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

  private _dropZone: Phaser.Physics.Arcade.Sprite;
  private _eventText: Phaser.GameObjects.Text;
  private _dealer: CardDealerInterface;
  private _hand: Physics.Arcade.Group;
  private _opponentHands: Array<Physics.Arcade.Group>;

  constructor() {
    super(sceneConfig);
  }

  public create() {
    this._createDropZone();
    this._drawHandCards();
    this._setupCollision();
    this._displayOpponentCardBacks();
    this.onResetGrid();
  }

  private _displayOpponentCardBacks() {
    this._opponentHands = new Array<Physics.Arcade.Group>();
    [1, 2, 3].map((idx) => {
      let hand = this.physics.add.group({
        classType: Card,
        runChildUpdate: false,
        defaultKey: 'card',
        maxSize: 5
      });
      for (let i = 0; i < 5; i++) {
        let card = this.createOpponentViewCard();
        hand.add(card);
      }
      this._opponentHands[idx] = hand;
      let gridConf = {
        height: 1,
        width: 100,
        cellWidth: 64,
        cellHeight: 64,
        x: 200,
        y: 64
      }
      Phaser.Actions.GridAlign(hand.getChildren(), gridConf);
    });
  }

  private _createDropZone() {
    this._dropZone = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'man');
    this._eventText = this.add.text(getGameWidth(this)/ 2 - 300, getGameWidth(this) / 2 - 600, "Let's get started.")
  }


  private _setupCollision() {
    this.physics.add.collider(this._hand, this._hand);
    this.physics.add.overlap(this._hand, this._dropZone, (objA, card) => {
      if (card instanceof Card) {
        this.tryPlayCard(card);
        this.onResetGrid();
      }
    });
  }

  private _drawHandCards() {
    this._dealer = new SimpleMockCardDealer();
    this._hand = this._dealer.requestFullHand(this);
  }

  /**
   * 
   */
  public tryPlayCard(card: Card) {
    let success = Math.floor(Math.random() * 4);
    card.setActive(false);
    if (success === 1) {
      this._eventText.setText('Half-Match!');
      card.discard();
      this._hand.remove(card);
    }
    else if (success === 2) {
      this._eventText.setText('Full-Match!');
      card.discard()
      this._hand.remove(card);
    }
    else if (success === 3){
      this._eventText.setText('Not your Turn!!!');
    }
    else {
      this._eventText.setText('No Match!');
    }
  }

  public update() {

  }

  public onResetGrid() {

    Phaser.Actions.GridAlign(this._hand.getChildren(), {
      height: 1,
      width: 100,
      cellWidth: 64,
      cellHeight: 64,
      x: 200,
      y: 700
    });
  }

  private createOpponentViewCard()
  {
    let card = new OpponentCard(this, 0, 0);
    return card;
  }
}
