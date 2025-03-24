import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  tap,
} from 'rxjs';

@Component({
  selector: 'lab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() initialSearchTerm: string = '';
  @Output() search = new EventEmitter<string>();

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit(): void {
    const inputEl = this.searchInput.nativeElement;
    fromEvent(inputEl, 'input')
      .pipe(
        debounceTime(300),
        map((event: Event) => (event.target as HTMLInputElement).value),
        filter((term) => term.length != 1),
        distinctUntilChanged(),
        tap((term) => this.search.emit(term))
      )
      .subscribe();
  }
}
