import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Input } from '@angular/core';

@Component({
  selector: '[app-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent implements OnInit {
  @Input() color: 'primary' | 'secondary' | 'green' = 'secondary';

  constructor(private el: ElementRef) {
    el.nativeElement.classList.add('btn');
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add(this.color);
  }

}
