import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  input,
} from '@angular/core';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'lab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
})
export class SearchComponent {
  public initialTerm = input<string>('');

  @Output() search: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    const inputEmitter$ = fromEvent(
      this.searchInput.nativeElement,
      'input'
    ).pipe(
      debounceTime(300),
      map((event: Event) => (event.target as HTMLInputElement).value)
    );

    inputEmitter$
      .pipe(
        filter((value: string) => value.length != 1),
        tap((value: string) => this.search.emit(value))
      )
      .subscribe();
  }
}
