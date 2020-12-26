import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
