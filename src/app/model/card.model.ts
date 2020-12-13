export class Card {
  public name: string;
  public subscribed: boolean;
  public desc: string;

  constructor(name: string, subscribed: boolean, desc: string) {
    this.name = name;
    this.subscribed = subscribed;
    this.desc = desc;
  }
}
