import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';
import { PageComponent } from '../../shared/ui/page/page.component';
import { SearchComponent } from '../../shared/ui/search/search.component';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css'],
  standalone: true,
  imports: [PageComponent, SearchComponent, AsyncPipe, CurrencyPipe],
})
export default class SymbolsComponent implements OnInit {
  private symbolsRepository = inject(SymbolsRepositoryService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private searchTerm$ = new BehaviorSubject<string>('');

  protected symbols$: Observable<CategorySymbolVO[]> = this.searchTerm$.pipe(
    distinctUntilChanged(),
    tap((searchTerm) =>
      this.router.navigate([], { queryParams: { search: searchTerm } })
    ),
    switchMap((searchTerm) =>
      this.symbolsRepository.getSymbolsBySearchTerm$(searchTerm)
    )
  );

  protected paramSearchTerm = '';

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        map((params) => params['search'] || ''),
        filter((searchTerm) => searchTerm !== ''),
        tap((searchTerm) => (this.paramSearchTerm = searchTerm)),
        tap((searchTerm) => this.searchTerm$.next(searchTerm))
      )
      .subscribe();
  }

  onSearch(value: string) {
    this.searchTerm$.next(value);
  }
}
