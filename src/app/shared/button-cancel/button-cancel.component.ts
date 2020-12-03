import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-button-cancel]',
  templateUrl: './button-cancel.component.html',
  styleUrls: ['./button-cancel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ButtonCancelComponent implements OnInit {

  constructor(el: ElementRef) {
    el.nativeElement.classList.add('icon-lg');
    el.nativeElement.classList.add('btn-cancel');
  }

  ngOnInit(): void {
  }

}
