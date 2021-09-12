import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Card } from 'src/app/model/card.model';
import { List } from 'src/app/model/list.model';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private url = 'https://jrello-backend.herokuapp.com/';

  constructor(private http: HttpClient) { }

  loadBoard(name: string): Observable<{
    id: string;
    cards: Card[];
    lists: List[];
  }> {
    return this.http.post<{ id: string, cards: Card[], lists: List[] }>(this.url + 'board', { name });
  }

  createList({ idBoard, name, pos, subscribed }: {
    idBoard: string,
    name: string,
    pos: number,
    subscribed: boolean
  }): Observable<List> {
    return this.http.post<List>(this.url + 'list', { idBoard, name, pos, subscribed });
  }

  updateList({ _id, idBoard, name, pos, subscribed }: {
    _id: string,
    idBoard: string,
    name: string,
    pos: number,
    subscribed: boolean,
  }): Observable<List> {
    return this.http.put<List>(this.url + 'list/' + _id, { idBoard, name, pos, subscribed });
  }

  deleteList(id: string): Observable<List> {
    return this.http.delete<List>(this.url + 'list/' + id);
  }

  createCard({ name, idBoard, idList, pos, subscribed, desc, closed }: {
    name: string,
    idBoard: string,
    idList: string,
    pos: number,
    subscribed: boolean,
    desc: string,
    closed: boolean
  }): Observable<Card> {
    return this.http.post<Card>(this.url + 'card', { name, idBoard, idList, pos, subscribed, desc, closed });
  }

  updateCard({ _id, name, idBoard, idList, pos, subscribed, desc, closed }: {
    _id: string,
    name: string,
    idBoard: string,
    idList: string,
    pos: number,
    subscribed: boolean,
    desc: string,
    closed: boolean
  }): Observable<Card> {
    return this.http.put<Card>(this.url + 'card/' +  _id, { name, idBoard, idList, pos, subscribed, desc, closed });
  }

  deleteCard(id: string): Observable<Card> {
    return this.http.delete<Card>(this.url + 'card/' + id);
  }

  archiveAllCards(idList: string): Observable<string> {
    return this.http.post<string>(this.url + 'card/archiveAll', { idList });
  }

  moveAllCards({ prev, next }: { prev: string, next: string }): Observable<string> {
    return this.http.post<string>(this.url + 'card/moveAll', { prev, next });
  }

  sortCards({ idList, sortBy }: { idList: string, sortBy: string }): Observable<string> {
    return this.http.post<string>(this.url + 'card/sort', { idList, sortBy });
  }
}
