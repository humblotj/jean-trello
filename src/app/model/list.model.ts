import { Card } from './card.model';

export class List {
  public name: string;
  public subscribed: boolean;
  public cards: Card[];

  constructor(name: string, subscribed: boolean, cards: Card[]) {
    this.name = name;
    this.subscribed = subscribed;
    this.cards = cards;
  }
}
