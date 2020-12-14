import { UUID } from 'angular2-uuid';

export class List {
  public id: string;
  public name: string;
  public pos: number;
  public subscribed: boolean;

  constructor(name: string, pos: number, subscribed: boolean, id?: string) {
    this.name = name;
    this.pos = pos;
    this.subscribed = subscribed;
    this.id = id || UUID.UUID();
  }
}
