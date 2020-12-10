import { Component, OnInit, ChangeDetectionStrategy, Type } from '@angular/core';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent implements OnInit {
  content!: Type<any>;

  constructor(private ref: DialogRef) { }

  close(): void {
    this.ref.close(null);
  }

  ngOnInit(): void {
    this.content = this.ref.content;
  }

}
