import { Component, OnInit, ChangeDetectionStrategy, ElementRef } from '@angular/core';

@Component({
  selector: '[app-link]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent implements OnInit {

  constructor(public el: ElementRef) { }

  ngOnInit(): void {
  }

}
