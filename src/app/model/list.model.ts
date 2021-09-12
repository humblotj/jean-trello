export class List {
  public _id: string;
  public tempId: string;
  public name: string;
  public pos: number;
  public subscribed: boolean;

  constructor(name: string, pos: number, subscribed: boolean, tempId: string) {
    this.name = name;
    this.pos = pos;
    this.subscribed = subscribed;
    this._id = tempId;
    this.tempId = tempId;
  }
}
