import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  // @Input() page: number;
  // @Input() count: number;
  // @Input() perPage: number;
  // @Input() pageToShow: number;
  // @Input() loading: boolean;

  @Output() goPrev = new EventEmitter<boolean>();
  @Output() goNext = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onPrev(): void {
    this.goPrev.emit(true);
  };

  onNext(): void {
    this.goNext.emit(true);
  };
}
