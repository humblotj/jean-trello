import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { DialogRef } from 'src/app/shared/overlay/dialog-ref';

@Component({
  selector: 'app-card-edit-dialog',
  templateUrl: './card-edit-dialog.component.html',
  styleUrls: ['./card-edit-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditDialogComponent implements OnInit {
  @ViewChild('cardTitleRef') cardTitleRef: ElementRef | undefined;

  cardTitle = 'Card Title';
  subscribed = true;

  constructor(private dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onChangeCardTitle(listName: string): void {
    const trim = listName.trim();
    if (trim) {
      this.cardTitle = listName.trim();
    } else {
      this.cardTitleRef && (this.cardTitleRef.nativeElement.value = this.cardTitle);
    }
  }

  blur(event: Event): void {
    (event.target as HTMLTextAreaElement)?.blur();
  }

  close(): void {
    this.dialogRef.close();
  }

}
