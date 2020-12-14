import { UUID } from 'angular2-uuid';

export class Card {
  public id: string;
  public idList: string;
  public name: string;
  public pos: number;
  public subscribed: boolean;
  public desc: string;
  public closed = false;

  constructor(idList: string, name: string, pos: number, subscribed: boolean, desc: string, id?: string) {
    this.idList = idList;
    this.name = name;
    this.pos = pos;
    this.subscribed = subscribed;
    this.desc = desc;
    this.id = id || UUID.UUID();
  }
}
