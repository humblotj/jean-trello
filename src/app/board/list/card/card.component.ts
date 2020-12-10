import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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

  constructor(private dialogService: DialogService) { }

  ngOnInit(): void {
  }

  onOpenEditCard(): void {
    this.dialogService.open(CardEditDialogComponent);
  }

}
