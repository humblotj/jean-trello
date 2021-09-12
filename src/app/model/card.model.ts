export class Card {
  public _id: string;
  public tempId: string;
  public idList: string;
  public name: string;
  public pos: number;
  public subscribed: boolean;
  public desc: string;
  public closed = false;
  public create_at = new Date();

  constructor(idList: string, name: string, pos: number, subscribed: boolean, desc: string, tempId: string) {
    this.idList = idList;
    this.name = name.trim();
    this.pos = pos;
    this.subscribed = subscribed;
    this.desc = desc;
    this._id = tempId;
    this.tempId = tempId;
  }
}
