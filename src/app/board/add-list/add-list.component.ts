import {
  Component, OnInit,
  ChangeDetectionStrategy, Input, ElementRef,
  HostListener, ViewChild, Output, EventEmitter
} from '@angular/core';
import { Store } from '@ngrx/store';
import { List } from 'src/app/model/list.model';
import { AppState } from 'src/app/store/app.reducer';
import { AddList } from '../store/board.actions';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddListComponent implements OnInit {
  @ViewChild('listNameRef') listNameRef: ElementRef | undefined;
  @Input() lists?: List[];

  isActive = false;
  listName = '';

  @HostListener('click', ['$event'])
  onClick(e: Event): void {
    !this.isActive && (this.isActive = true);
    this.el.nativeElement.classList.remove('is-idle');
    this.listNameRef?.nativeElement.focus();
  }

  constructor(private store: Store<AppState>, private el: ElementRef) {
    el.nativeElement.classList.add('is-idle');
  }

  ngOnInit(): void {
  }

  onAddList(e: Event): void {
    e.stopPropagation();

    if (this.listName) {
      this.store.dispatch(AddList({ name: this.listName }));
      this.listName = '';
    }
    this.listNameRef?.nativeElement.focus();
    setTimeout(() =>
      this.el?.nativeElement.scrollIntoView(), 0);
  }

  onCancel(e?: Event): void {
    e?.stopPropagation();

    this.isActive = false;
    this.el.nativeElement.classList.add('is-idle');
  }

}
