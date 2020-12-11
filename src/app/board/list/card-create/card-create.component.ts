import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ViewChild, ElementRef, Input, AfterViewInit, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardCreateComponent implements OnInit, AfterViewInit {
  @ViewChild('titleRef') titleRef: ElementRef | undefined;
  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;
  @Input() cardCreateTitle = '';

  @Output() cardCreateTitleChange = new EventEmitter<string>();
  @Output() cardCreateIndexChange = new EventEmitter<number | null>();
  @Output() addCard = new EventEmitter<string>();

  constructor(private el: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.titleRef?.nativeElement.focus();
  }

  onAddCard(): void {
    if (this.cardCreateTitle) {
      this.addCard.emit(this.cardCreateTitle);
      this.cardCreateTitleChange.emit('');
    }
    this.titleRef?.nativeElement.focus();
    this.triggerResize();
    setTimeout(() =>
      this.el?.nativeElement.scrollIntoView(), 0);
  }

  onCancel(): void {
    this.cardCreateTitleChange.emit('');
    this.cardCreateIndexChange.emit(null);
  }

  triggerResize(): void {
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }
}
