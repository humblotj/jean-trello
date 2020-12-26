import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { Card } from 'src/app/model/card.model';
import { DialogService } from 'src/app/shared/overlay/dialog.service';
import { CardEditDialogComponent } from '../card-edit-dialog/card-edit-dialog.component';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() index?: number;
  @Input() listIndex?: number;
  @Input() card?: Card;

  constructor(private dialogService: DialogService, private el: ElementRef) { }

  ngOnInit(): void { }

  onOpenCardEditDialog(): void {
    const dialogRef = this.dialogService.open(CardEditDialogComponent, { card: this.card, index: this.index });
  }

  onOpenCardEdit(): void {
    const dialogRef = this.dialogService.openCardEdit(this.el, { card: this.card, index: this.index });
  }

}
