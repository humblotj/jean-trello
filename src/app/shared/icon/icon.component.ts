import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[app-icon]',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {
  @Input() size: 'sm' | 'lg' = 'sm';
  @Input() color: 'primary' | 'secondary' = 'primary';

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.el.nativeElement.classList.add('icon-' + this.size);
    this.el.nativeElement.classList.add(this.color);
  }
}
