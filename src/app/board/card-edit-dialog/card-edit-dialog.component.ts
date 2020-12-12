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

  cardTitle: string;
  subscribed = false;

  constructor(private dialogRef: DialogRef) {
    this.cardTitle = dialogRef?.data?.title || '';
  }

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
    this.dialogRef.close(this.cardTitle);
  }

  toggleWatch(): void {
    this.subscribed = !this.subscribed;
  }
}
