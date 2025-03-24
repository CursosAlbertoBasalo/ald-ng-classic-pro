import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { CategorySymbolVO } from 'src/app/domain/category-symbol-vo.type';
import { SymbolsRepositoryService } from 'src/app/shared/symbols-repository.service';

@Component({
  selector: 'lab-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css'],
})
export class SymbolsComponent implements OnInit {
  private searchTerm$ = new BehaviorSubject<string>('');

  protected symbols$: Observable<CategorySymbolVO[]> = this.searchTerm$.pipe(
    tap((term) => this.router.navigate([], { queryParams: { search: term } })),
    switchMap((term) => this.symbolsRepository.getSymbolsBySearchTerm$(term))
  );

  constructor(
    private symbolsRepository: SymbolsRepositoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onSearch(search: string) {
    this.searchTerm$.next(search);
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((params) => params['search'] || ''),
        tap((term) => this.searchTerm$.next(term))
      )
      .subscribe();
  }
}
