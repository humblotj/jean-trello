import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardComponent implements OnInit {
  lists = ['To Do'];

  cardCreatePosition: 'top' | 'bottom' = 'bottom';
  cardCreateTitle = '';
  cardCreateIndex: number | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onAddList(listName: string): void {
    this.lists = [...this.lists, listName];
  }

  onArchiveList(index: number): void {
    this.lists = [...this.lists.slice(0, index), ...this.lists.slice(index + 1)];
  }

}
