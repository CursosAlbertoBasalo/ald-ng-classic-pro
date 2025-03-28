import { Component, ElementRef, input, output, viewChild } from '@angular/core';
import { debounceTime, filter, fromEvent, map, tap } from 'rxjs';

@Component({
  selector: 'lab-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true,
})
export class SearchComponent {
  public initialTerm = input<string>('');

  public search = output<string>();
  protected searchInput =
    viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  ngAfterViewInit() {
    const inputEmitter$ = fromEvent(
      this.searchInput().nativeElement,
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
