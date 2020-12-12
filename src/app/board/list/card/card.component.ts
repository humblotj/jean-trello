import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DialogService } from 'src/app/shared/overlay/dialog.service';
import { CardEditDialogComponent } from '../../card-edit-dialog/card-edit-dialog.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() title = '';

  constructor(private dialogService: DialogService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  onOpenEditCard(): void {
    const dialogRef = this.dialogService.open(CardEditDialogComponent, { title: this.title });
    dialogRef.afterClosed$.subscribe((title: string) => {
      if (title) {
        this.title = title;
        this.cdr.markForCheck();
      }
    });
  }

}
