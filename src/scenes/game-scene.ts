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
  private _clock: Phaser.Time.Clock;
  private _lastBeat: number;
  private _eventText: Phaser.GameObjects.Text;
  private _dealer: CardDealerInterface;
  private _hand: Physics.Arcade.Group;
  private _opponentHands: Array<Physics.Arcade.Group>;
  private _ws: WebSocket;

  constructor() {
    super(sceneConfig);
  }

  private onServerMessage(message) {
    console.log(message);
    var data = JSON.parse(message.data);
    console.log(data);
    //TODO Event handling!
  }

  private onConnectToGame(event) {
    this._eventText.setText("Connected successfully to game!");
  }

  public create() {
    this._createDropZone();
    this._drawHandCards();
    this._setupCollision();
    this._displayOpponentCardBacks();
    this.onResetGrid();
    this._clock = new Phaser.Time.Clock(this);
    this._ws = new WebSocket('ws://localhost:8081');
    this._ws.onopen = (event) => {
      this.onConnectToGame(event);
      this._lastBeat = this._clock.now;
    };

    this._ws.onerror = (event) => {
      alert("socket error\n\n" + event);
    };



    this._ws.onmessage = (message: MessageEvent) => {
      this.onServerMessage(message);

    };
  }

  private _displayOpponentCardBacks() {
    this._opponentHands = new Array<Physics.Arcade.Group>();
    //TODO this is the Mock for Opposing player "displays"
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
      if (idx === 1) {
        let gridConf = {
          height: 1,
          width: 100,
          cellWidth: 64,
          cellHeight: 64,
          x: getGameWidth(this) /2,
          y: 64
        }
        Phaser.Actions.GridAlign(hand.getChildren(), gridConf);
      }
      else if (idx === 2) {
        let gridConf = {
          height: 100,
          width: 1,
          cellWidth: 64,
          cellHeight: 64,
          x: 64,
          y: 128
        }
        Phaser.Actions.GridAlign(hand.getChildren(), gridConf);
      }
      else {
        let gridConf = {
          height: 100,
          width: 1,
          cellWidth: 64,
          cellHeight: 64,
          x: getGameWidth(this) - 128,
          y: 128
        }
        Phaser.Actions.GridAlign(hand.getChildren(), gridConf);
      }
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
   * opponentID: number
   */
  public onOpponentPlayedCard(opponentID: number) {
    this._eventText.setText('Player: ' + opponentID + ' played...');
    let hand = this._opponentHands[opponentID];
    let played = hand.getChildren().pop();
    if (played instanceof Card) {
      played.discard();
    }
  }
  /**
   * 
   */
  public tryPlayCard(card: Card) {
    this._ws.send(JSON.stringify({foo: 1, bar:2
    }));
    // let success = Math.floor(Math.random() * 4);
    // card.setActive(false);
    // if (success === 1) {
    //   this._eventText.setText('Half-Match!');
    //   card.discard();
    //   this._hand.remove(card);
    // this._schleep_do_NOT_do_this(300);
    // }
    // else if (success === 2) {
    //   this._eventText.setText('Full-Match!');
    //   card.discard()
    //   this._hand.remove(card);
    // this._schleep_do_NOT_do_this(300);
    // }
    // else if (success === 3) {
    //   this.onOpponentPlayedCard(Math.floor(Math.random() * 3));
    //   this._eventText.setText('Not your Turn!!!');
    // this._schleep_do_NOT_do_this(300);
    // }
    // else {
    //   this._eventText.setText('No Match!');
    // this._schleep_do_NOT_do_this(300);
    // }
    // this._schleep_do_NOT_do_this(300);
    // this.onOpponentPlayedCard(Math.floor(1+(3 * Math.random())));
  }

  public update() {
    //HEARTBEAT
    if ((this._clock.now - this._lastBeat) > 10) {
      this._ws.send(JSON.stringify({ ping: 1000 }));
      this._lastBeat = this._clock.now;
    }

  }

  private createOpponentViewCard()
  {
    let card = new OpponentCard(this, 0, 0);
    return card;
  }

  async _schleep_do_NOT_do_this(time: number) {
    await new Promise(resolve => setTimeout(resolve, time));
  }

  public onResetGrid() {

    Phaser.Actions.GridAlign(this._hand.getChildren(), {
      height: 1,
      width: 100,
      cellWidth: 64,
      cellHeight: 64,
      x: getGameWidth(this) / 2 + 128,
      y: getGameHeight(this) - 128
    });
  }
}
