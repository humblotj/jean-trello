import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  selector: '[app-select-form]',
  templateUrl: './select-form.component.html',
  styleUrls: ['./select-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SelectFormComponent implements OnInit {

  constructor(el: ElementRef) {
    el.nativeElement.classList.add('btn');
    el.nativeElement.classList.add('dialog');
    el.nativeElement.classList.add('select-form');
  }

  ngOnInit(): void {
  }

}
